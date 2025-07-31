import React, { useState } from 'react';
import { FilamentProfile } from '../types/index';
import { X, Download, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { trackDownload, voteOnProfile, removeVote } from '../services/profileService';
import { downloadFileFromUrl } from '../utils/downloadUtils';

interface ProfileDetailModalProps {
  profile: FilamentProfile;
  onClose: () => void;
  onVoteUpdate?: (profileId: string, userId: string, voteType: 'up' | 'down' | null) => void;
}

function formatFileSize(bytes: number) {
  if (!bytes) return '';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function formatDate(timestamp: any) {
  const date = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  }).format(date);
}

export default function ProfileDetailModal({ profile, onClose, onVoteUpdate }: ProfileDetailModalProps) {
  const { user } = useAuth();
  const [isVoting, setIsVoting] = useState(false);
  
  const getUserVote = () => {
    if (!user) return null;
    return profile.votedUsers?.[user.uid] || null;
  };

  const handleVote = async (voteType: 'up' | 'down') => {
    if (!user || isVoting) return;
    
    setIsVoting(true);
    try {
      const currentVote = getUserVote();
      
      if (currentVote === voteType) {
        // Remove vote if clicking the same vote
        await removeVote(profile.id, user.uid);
        onVoteUpdate?.(profile.id, user.uid, null);
      } else {
        // Add or change vote
        await voteOnProfile(profile.id, user.uid, voteType);
        onVoteUpdate?.(profile.id, user.uid, voteType);
      }
    } catch (error) {
      console.error('Error voting:', error);
    } finally {
      setIsVoting(false);
    }
  };

  // Helper to download the filament profile
  const handleDownloadFile = async () => {
    try {
      // Track download
      await trackDownload(profile.id);
      
      // Download the file
      await downloadFileFromUrl(profile.fileUrl, profile.fileName);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const currentVote = getUserVote();
  const voteScore = (profile.upvotes || 0) - (profile.downvotes || 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-3xl p-8 relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          <X size={28} />
        </button>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{profile.name}</h2>
        <p className="text-md text-gray-600 dark:text-gray-400 mb-2">by {profile.producer}</p>
        
        {/* Profile Details */}
        <div className="mb-4 text-sm text-gray-500 dark:text-gray-400 space-y-1">
          <div>Material: <span className="font-medium text-gray-900 dark:text-white">{profile.material}</span></div>
          <div>Uploaded: {formatDate(profile.uploadedAt)}</div>
        </div>

        {/* Description */}
        {profile.description && (
          <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Description</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{profile.description}</p>
          </div>
        )}

        {/* Stats and Voting */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Download size={16} />
              <span>{profile.downloadCount || 0} downloads</span>
            </div>
            <div className="flex items-center gap-2">
              <ThumbsUp size={16} />
              <span className={voteScore > 0 ? 'text-green-600 font-medium' : voteScore < 0 ? 'text-red-600 font-medium' : ''}>
                {voteScore} {voteScore === 1 ? 'vote' : 'votes'}
              </span>
            </div>
          </div>
          
          {/* Voting buttons */}
          {user && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleVote('up')}
                disabled={isVoting}
                className={`flex items-center gap-1 px-3 py-1 rounded text-sm transition-colors ${
                  currentVote === 'up'
                    ? 'text-green-600 bg-green-50 dark:bg-green-900/20'
                    : 'text-gray-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20'
                } ${isVoting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <ThumbsUp size={16} />
                {profile.upvotes || 0}
              </button>
              <button
                onClick={() => handleVote('down')}
                disabled={isVoting}
                className={`flex items-center gap-1 px-3 py-1 rounded text-sm transition-colors ${
                  currentVote === 'down'
                    ? 'text-red-600 bg-red-50 dark:bg-red-900/20'
                    : 'text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20'
                } ${isVoting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <ThumbsDown size={16} />
                {profile.downvotes || 0}
              </button>
            </div>
          )}
        </div>
        
        {/* File section */}
        <div className="mt-8 border-t pt-6 border-gray-900/20 dark:border-white/20">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Filament Profile</h3>
          <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 rounded p-4">
            <div>
              <div className="font-medium text-gray-900 dark:text-white">{profile.fileName}</div>
            </div>
            <button
              onClick={handleDownloadFile}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              <Download size={16} /> Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 