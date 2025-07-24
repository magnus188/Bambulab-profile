'use client';

import { Download, Calendar, FileText } from 'lucide-react';
import { FilamentProfile } from '../types';

interface ProfileCardProps {
  profile: FilamentProfile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  const handleDownload = () => {
    window.open(profile.fileUrl, '_blank');
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

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
        <button
          onClick={handleDownload}
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          aria-label="Download profile"
        >
          <Download size={16} />
        </button>
      </div>

      <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <FileText size={14} />
          <span>{profile.fileName}</span>
        </div>
        
        {profile.metadata && (
          <div className="text-xs">
            Size: {formatFileSize(profile.metadata.fileSize)}
          </div>
        )}
        
        <div className="flex items-center gap-2">
          <Calendar size={14} />
          <span>Uploaded {formatDate(profile.uploadedAt)}</span>
        </div>
      </div>
    </div>
  );
}
