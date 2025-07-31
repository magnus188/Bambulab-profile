'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getUserProfiles, deleteProfile, trackDownload } from '../../services/profileService';
import { FilamentProfile } from '../../types';
import { Edit, Trash2, Download, Plus, ArrowLeft } from 'lucide-react';
import UploadModal from '../../components/UploadModal';
import { useRouter } from 'next/navigation';
import { downloadFileFromUrl } from '../../utils/downloadUtils';

export default function MyProfilesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [profiles, setProfiles] = useState<FilamentProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState<FilamentProfile | null>(null);
  const [error, setError] = useState('');

  const loadUserProfiles = useCallback(async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      const userProfiles = await getUserProfiles(user.uid);
      setProfiles(userProfiles);
    } catch (err) {
      setError('Failed to load your profiles');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin');
      return;
    }

    if (user) {
      loadUserProfiles();
    }
  }, [user, loading, router, loadUserProfiles]);

  const handleEditProfile = (profile: FilamentProfile) => {
    setEditingProfile(profile);
    setIsUploadModalOpen(true);
  };

  const handleDeleteProfile = async (profileId: string) => {
    if (!confirm('Are you sure you want to delete this profile?')) return;
    
    try {
      await deleteProfile(profileId);
      setProfiles(profiles.filter(p => p.id !== profileId));
    } catch (err) {
      setError('Failed to delete profile');
      console.error(err);
    }
  };

  const handleDownloadProfile = async (fileUrl: string, fileName: string, profileId: string) => {
    console.log('handleDownloadProfile called with:', { fileUrl, fileName, profileId });
    
    try {
      // Track download
      console.log('Tracking download...');
      await trackDownload(profileId);
      console.log('Download tracked successfully');
      
      // Download the file
      console.log('Starting file download...');
      await downloadFileFromUrl(fileUrl, fileName);
      console.log('File download completed');
      
      // Update download count locally instead of reloading all profiles
      setProfiles(prevProfiles => 
        prevProfiles.map(profile => 
          profile.id === profileId 
            ? { ...profile, downloadCount: (profile.downloadCount || 0) + 1 }
            : profile
        )
      );
      console.log('Download count updated locally');
    } catch (error) {
      console.error('Download failed:', error);
      setError('Failed to download file');
    }
  };

  const handleModalClose = () => {
    setIsUploadModalOpen(false);
    setEditingProfile(null);
  };

  const handleUploadSuccess = () => {
    setIsUploadModalOpen(false);
    setEditingProfile(null);
    loadUserProfiles();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to signin
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            Back to All Profiles
          </button>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              My Profiles
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage your uploaded filament profiles
            </p>
          </div>
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            Upload New Profile
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
            <p className="text-red-700 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Profiles Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-500 dark:text-gray-400">Loading your profiles...</div>
          </div>
        ) : profiles.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 dark:text-gray-400 mb-4">
              You haven&apos;t uploaded any profiles yet.
            </div>
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
              Upload Your First Profile
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles.map((profile) => (
              <div
                key={profile.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {profile.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {profile.producer} • {profile.material}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditProfile(profile)}
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors"
                      title="Edit profile"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteProfile(profile.id)}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                      title="Delete profile"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <div>
                    <span className="font-medium">Downloads:</span> {profile.downloadCount || 0}
                  </div>
                  <div>
                    <span className="font-medium">Votes:</span> {(profile.upvotes || 0) - (profile.downvotes || 0)}
                  </div>
                  <div>
                    <span className="font-medium">Uploaded:</span>{' '}
                    {profile.uploadedAt?.toDate ? profile.uploadedAt.toDate().toLocaleDateString() : 'Unknown'}
                  </div>
                </div>

                {/* Files section */}
                <div className="space-y-3">
                  {/* Filament file */}
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 dark:text-white text-sm">
                        Filament Profile
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {profile.fileName}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownloadProfile(profile.fileUrl, profile.fileName, profile.id)}
                      className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-md transition-colors"
                      title="Download filament profile"
                    >
                      <Download size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Upload/Edit Modal */}
        <UploadModal
          isOpen={isUploadModalOpen}
          onClose={handleModalClose}
          onUploadSuccess={handleUploadSuccess}
          editingProfile={editingProfile}
        />
      </div>
    </div>
  );
}
