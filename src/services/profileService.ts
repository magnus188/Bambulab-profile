import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  where,
  DocumentData,
  doc,
  updateDoc
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from 'firebase/storage';
import { db, storage } from '../lib/firebase';
import { FilamentProfile, UploadProfileData } from '../types';

const PROFILES_COLLECTION = 'filament-profiles';

export const uploadProfile = async (data: UploadProfileData): Promise<string> => {
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
      fileName: data.file.name,
      fileUrl,
      uploadedAt: new Date(),
      metadata: {
        fileSize: data.file.size,
        fileType: data.file.type,
      },
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
      profiles.push({
        id: doc.id,
        name: data.name,
        producer: data.producer,
        printers: data.printers,
        material: data.material,
        fileName: data.fileName,
        fileUrl: data.fileUrl,
        uploadedAt: data.uploadedAt.toDate(),
        metadata: data.metadata,
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

export const addConfigFileToProfile = async (profileId: string, configFile: File, printers: string[]): Promise<void> => {
  try {
    // Upload config file to Firebase Storage
    const configRef = ref(storage, `configs/${Date.now()}_${configFile.name}`);
    const uploadResult = await uploadBytes(configRef, configFile);
    const configFileUrl = await getDownloadURL(uploadResult.ref);
    // Update Firestore document
    const profileDoc = doc(db, PROFILES_COLLECTION, profileId);
    await updateDoc(profileDoc, {
      configFileName: configFile.name,
      configFileUrl,
      configMetadata: {
        fileSize: configFile.size,
        fileType: configFile.type,
      },
      configPrinters: printers,
    });
  } catch (error) {
    console.error('Error adding config file to profile:', error);
    throw error;
  }
};
