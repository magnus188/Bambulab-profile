import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  where,
  DocumentData,
  doc,
  updateDoc,
  serverTimestamp,
  increment
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from 'firebase/storage';
import { db, storage } from '../lib/firebase';
import { FilamentProfile, UploadProfileData } from '../types/index';

const PROFILES_COLLECTION = 'filament-profiles';

export const uploadProfile = async (data: UploadProfileData & { creatorUid?: string }): Promise<string> => {
  try {
    // Check if profile with same name already exists
    const existingQuery = query(
      collection(db, PROFILES_COLLECTION),
      where('name', '==', data.name)
    );
    const existingProfiles = await getDocs(existingQuery);
    
    if (!existingProfiles.empty) {
      throw new Error(`A profile with the name "${data.name}" already exists.`);
    }

    // Upload file to Firebase Storage
    const fileRef = ref(storage, `profiles/${Date.now()}_${data.file.name}`);
    const uploadResult = await uploadBytes(fileRef, data.file);
    const fileUrl = await getDownloadURL(uploadResult.ref);

    // Save profile metadata to Firestore
    const profileData = {
      name: data.name,
      producer: data.producer,
      material: data.material,
      description: data.description,
      fileName: data.file.name,
      fileUrl,
      uploadedBy: data.creatorUid || '',
      uploadedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      downloadCount: 0,
      upvotes: 0,
      downvotes: 0,
      votedUsers: {}
    };

    const docRef = await addDoc(collection(db, PROFILES_COLLECTION), profileData);
    return docRef.id;
  } catch (error) {
    console.error('Error uploading profile:', error);
    throw error;
  }
};

export const getProfiles = async (searchTerm?: string, producer?: string, material?: string): Promise<FilamentProfile[]> => {
  try {
    let profileQuery = query(
      collection(db, PROFILES_COLLECTION),
      orderBy('uploadedAt', 'desc')
    );

    if (producer && producer !== 'all') {
    profileQuery = query(
      collection(db, PROFILES_COLLECTION),
      where('producer', '==', producer),
      orderBy('uploadedAt', 'desc')
    );
  }
  if (material && material !== 'all') {
    profileQuery = query(
      collection(db, PROFILES_COLLECTION),
      where('material', '==', material),
      orderBy('uploadedAt', 'desc')
    );
    }

    const querySnapshot = await getDocs(profileQuery);
    let profiles: FilamentProfile[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data() as DocumentData;
      // Skip deleted profiles
      if (data.deleted === true) return;
      
      profiles.push({
        id: doc.id,
        name: data.name,
        producer: data.producer,
        material: data.material,
        description: data.description || '',
        fileName: data.fileName,
        fileUrl: data.fileUrl,
        uploadedBy: data.uploadedBy || data.creatorUid || '',
        uploadedAt: data.uploadedAt,
        createdAt: data.createdAt || data.uploadedAt,
        updatedAt: data.updatedAt || data.uploadedAt,
        downloadCount: data.downloadCount || 0,
        upvotes: data.upvotes || 0,
        downvotes: data.downvotes || 0,
        votedUsers: data.votedUsers || {}
      });
    });

    // Filter by search term if provided
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      profiles = profiles.filter((profile) =>
        profile.name.toLowerCase().includes(searchLower) ||
        profile.producer.toLowerCase().includes(searchLower)
      );
    }

    return profiles;
  } catch (error) {
    console.error('Error getting profiles:', error);
    throw error;
  }
};

export const getProducers = async (): Promise<string[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, PROFILES_COLLECTION));
    const producers = new Set<string>();

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.producer) {
        producers.add(data.producer);
      }
    });

    return Array.from(producers).sort();
  } catch (error) {
    console.error('Error getting producers:', error);
    throw error;
  }
};

export const getMaterials = async (): Promise<string[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, PROFILES_COLLECTION));
    const materials = new Set<string>();
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.material) {
        materials.add(data.material);
      }
    });
    return Array.from(materials).sort();
  } catch (error) {
    console.error('Error getting materials:', error);
    throw error;
  }
};

export const deleteProfile = async (profileId: string): Promise<void> => {
  try {
    // Note: This doesn't delete the files from storage for safety
    // In production, you might want to implement file cleanup
    const profileDoc = doc(db, PROFILES_COLLECTION, profileId);
    await updateDoc(profileDoc, {
      deleted: true,
      deletedAt: new Date()
    });
  } catch (error) {
    console.error('Error deleting profile:', error);
    throw error;
  }
};

export const getUserProfiles = async (userUid: string): Promise<FilamentProfile[]> => {
  try {
    // First try to get profiles by uploadedBy field
    let userQuery = query(
      collection(db, PROFILES_COLLECTION),
      where('uploadedBy', '==', userUid),
      orderBy('uploadedAt', 'desc')
    );

    let querySnapshot = await getDocs(userQuery);
    const profiles: FilamentProfile[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data() as DocumentData;
      // Skip deleted profiles
      if (data.deleted === true) return;
      
      profiles.push({
        id: doc.id,
        name: data.name,
        producer: data.producer,
        material: data.material,
        description: data.description || '',
        fileName: data.fileName,
        fileUrl: data.fileUrl,
        uploadedBy: data.uploadedBy || data.creatorUid || '',
        uploadedAt: data.uploadedAt,
        createdAt: data.createdAt || data.uploadedAt,
        updatedAt: data.updatedAt || data.uploadedAt,
        downloadCount: data.downloadCount || 0,
        upvotes: data.upvotes || 0,
        downvotes: data.downvotes || 0,
        votedUsers: data.votedUsers || {}
      });
    });

    // Fallback: if no profiles found with uploadedBy, try creatorUid (for backwards compatibility)
    if (profiles.length === 0) {
      userQuery = query(
        collection(db, PROFILES_COLLECTION),
        where('creatorUid', '==', userUid),
        orderBy('uploadedAt', 'desc')
      );

      querySnapshot = await getDocs(userQuery);
      
      querySnapshot.forEach((doc) => {
        const data = doc.data() as DocumentData;
        // Skip deleted profiles
        if (data.deleted === true) return;
        
        profiles.push({
          id: doc.id,
          name: data.name,
          producer: data.producer,
          material: data.material,
          description: data.description || '',
          fileName: data.fileName,
          fileUrl: data.fileUrl,
          uploadedBy: data.uploadedBy || data.creatorUid || '',
          uploadedAt: data.uploadedAt,
          createdAt: data.createdAt || data.uploadedAt,
          updatedAt: data.updatedAt || data.uploadedAt,
          downloadCount: data.downloadCount || 0,
          upvotes: data.upvotes || 0,
          downvotes: data.downvotes || 0,
          votedUsers: data.votedUsers || {}
        });
      });
    }

    return profiles;
  } catch (error) {
    console.error('Error getting user profiles:', error);
    throw error;
  }
};

export const updateProfile = async (profileId: string, updateData: Partial<UploadProfileData>): Promise<void> => {
  try {
    const profileDoc = doc(db, PROFILES_COLLECTION, profileId);
    
    const updatePayload: any = {
      updatedAt: serverTimestamp()
    };
    
    if (updateData.name !== undefined) updatePayload.name = updateData.name;
    if (updateData.producer !== undefined) updatePayload.producer = updateData.producer;
    if (updateData.material !== undefined) updatePayload.material = updateData.material;
    if (updateData.description !== undefined) updatePayload.description = updateData.description;
    
    if (updateData.file) {
      // Upload new file if provided
      const fileRef = ref(storage, `profiles/${Date.now()}_${updateData.file.name}`);
      const uploadResult = await uploadBytes(fileRef, updateData.file);
      const fileUrl = await getDownloadURL(uploadResult.ref);
      
      updatePayload.fileName = updateData.file.name;
      updatePayload.fileUrl = fileUrl;
      updatePayload.metadata = {
        fileSize: updateData.file.size,
        fileType: updateData.file.type,
      };
    }

    await updateDoc(profileDoc, updatePayload);
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

// Track download
export const trackDownload = async (profileId: string): Promise<void> => {
  try {
    const profileDoc = doc(db, PROFILES_COLLECTION, profileId);
    await updateDoc(profileDoc, {
      downloadCount: increment(1)
    });
  } catch (error) {
    console.error('Error tracking download:', error);
    throw error;
  }
};

// Vote on profile
export const voteOnProfile = async (profileId: string, userId: string, voteType: 'up' | 'down'): Promise<void> => {
  try {
    const profileDoc = doc(db, PROFILES_COLLECTION, profileId);
    
    // Get current profile data to check existing vote
    const profileSnapshot = await getDocs(query(collection(db, PROFILES_COLLECTION), where('__name__', '==', profileId)));
    if (profileSnapshot.empty) {
      throw new Error('Profile not found');
    }
    
    const currentData = profileSnapshot.docs[0].data();
    const currentVotes = currentData.votedUsers || {};
    const previousVote = currentVotes[userId];
    
    const updateData: any = {
      [`votedUsers.${userId}`]: voteType
    };
    
    // Adjust vote counts based on previous vote
    if (previousVote === 'up' && voteType === 'down') {
      updateData.upvotes = increment(-1);
      updateData.downvotes = increment(1);
    } else if (previousVote === 'down' && voteType === 'up') {
      updateData.downvotes = increment(-1);
      updateData.upvotes = increment(1);
    } else if (!previousVote) {
      if (voteType === 'up') {
        updateData.upvotes = increment(1);
      } else {
        updateData.downvotes = increment(1);
      }
    }
    
    await updateDoc(profileDoc, updateData);
  } catch (error) {
    console.error('Error voting on profile:', error);
    throw error;
  }
};

// Remove vote
export const removeVote = async (profileId: string, userId: string): Promise<void> => {
  try {
    const profileDoc = doc(db, PROFILES_COLLECTION, profileId);
    
    // Get current profile data to check existing vote
    const profileSnapshot = await getDocs(query(collection(db, PROFILES_COLLECTION), where('__name__', '==', profileId)));
    if (profileSnapshot.empty) {
      throw new Error('Profile not found');
    }
    
    const currentData = profileSnapshot.docs[0].data();
    const currentVotes = currentData.votedUsers || {};
    const previousVote = currentVotes[userId];
    
    if (previousVote) {
      const updateData: any = {
        [`votedUsers.${userId}`]: null
      };
      
      if (previousVote === 'up') {
        updateData.upvotes = increment(-1);
      } else {
        updateData.downvotes = increment(-1);
      }
      
      await updateDoc(profileDoc, updateData);
    }
  } catch (error) {
    console.error('Error removing vote:', error);
    throw error;
  }
};

// Get profiles with sorting options
export const getProfilesSorted = async (sortBy: 'newest' | 'votes' | 'downloads' = 'newest'): Promise<FilamentProfile[]> => {
  try {
    const profiles = await getProfiles();
    
    switch (sortBy) {
      case 'votes':
        return profiles.sort((a, b) => {
          const aScore = (a.upvotes || 0) - (a.downvotes || 0);
          const bScore = (b.upvotes || 0) - (b.downvotes || 0);
          return bScore - aScore; // Higher score first
        });
      case 'downloads':
        return profiles.sort((a, b) => (b.downloadCount || 0) - (a.downloadCount || 0));
      case 'newest':
      default:
        return profiles; // Already sorted by uploadedAt desc
    }
  } catch (error) {
    console.error('Error getting sorted profiles:', error);
    throw error;
  }
};
