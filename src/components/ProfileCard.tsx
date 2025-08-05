'use client';

import { Download, Calendar, FileText, ThumbsUp, ThumbsDown } from 'lucide-react';
import { FilamentProfile } from '../types/index';
import { useAuth } from '../contexts/AuthContext';
import { voteOnProfile, removeVote } from '../services/profileService';
import { useState } from 'react';

interface ProfileCardProps {
  profile: FilamentProfile;
  onVoteUpdate?: (profileId: string, userId: string, voteType: 'up' | 'down' | null) => void;
}

// Notion-style color map for materials
// TODO: make responsive to new material types
const materialColors: Record<string, string> = {
  'PLA': 'bg-pink-200 text-pink-800',
  'PETG': 'bg-orange-200 text-orange-800',
  'ABS': 'bg-yellow-200 text-yellow-800',
  'TPU': 'bg-green-200 text-green-800',
  'Nylon': 'bg-blue-200 text-blue-800',
  'PC': 'bg-purple-200 text-purple-800',
  'ASA': 'bg-red-200 text-red-800',
  // fallback
  'default': 'bg-gray-200 text-gray-800',
};

// Color map for file types
const fileTypeColors: Record<string, string> = {
  'json': 'bg-blue-100 text-blue-800',
  'bbsflmt': 'bg-emerald-100 text-emerald-800',
  // fallback
  'default': 'bg-gray-100 text-gray-800',
};

function getMaterialColor(material: string) {
  return materialColors[material] || materialColors['default'];
}

function getFileTypeColor(fileType: string) {
  return fileTypeColors[fileType] || fileTypeColors['default'];
}

export default function ProfileCard({ profile, onVoteUpdate }: ProfileCardProps) {
  const { user } = useAuth();
  const [isVoting, setIsVoting] = useState(false);
  
  const formatDate = (timestamp: any) => {
    const date = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const getUserVote = () => {
    if (!user) return null;
    return profile.votedUsers?.[user.uid] || null;
  };

  const handleVote = async (voteType: 'up' | 'down', event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent opening modal when clicking vote buttons
    
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

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const currentVote = getUserVote();
  const voteScore = (profile.upvotes || 0) - (profile.downvotes || 0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            {profile.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            by {profile.producer}
          </p>
        </div>
      </div>
      
      {/* Material and File Type tags */}
      <div className="mb-4 flex gap-2 items-center">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getMaterialColor(profile.material)}`}>
          {profile.material}
        </span>
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getFileTypeColor(profile.fileType)}`}>
          {profile.fileType.toUpperCase()}
        </span>
      </div>

      {/* Stats */}
      <div className="mb-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Download size={14} />
            <span>{profile.downloadCount || 0}</span>
          </div>
          <div className="flex items-center gap-1">
            <ThumbsUp size={14} />
            <span className={voteScore > 0 ? 'text-green-600 font-medium' : ''}>{voteScore}</span>
          </div>
        </div>
        
        {/* Voting buttons */}
        {user && (
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => handleVote('up', e)}
              disabled={isVoting}
              className={`p-1 rounded transition-colors ${
                currentVote === 'up'
                  ? 'text-green-600 bg-green-50 dark:bg-green-900/20'
                  : 'text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20'
              } ${isVoting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <ThumbsUp size={16} />
            </button>
            <button
              onClick={(e) => handleVote('down', e)}
              disabled={isVoting}
              className={`p-1 rounded transition-colors ${
                currentVote === 'down'
                  ? 'text-red-600 bg-red-50 dark:bg-red-900/20'
                  : 'text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20'
              } ${isVoting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <ThumbsDown size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Upload date */}
      <div className="text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <Calendar size={14} />
          <span>{formatDate(profile.uploadedAt)}</span>
        </div>
      </div>
    </div>
  );
}
