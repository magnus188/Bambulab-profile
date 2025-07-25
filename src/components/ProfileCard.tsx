'use client';

import { Download, Calendar, FileText } from 'lucide-react';
import { FilamentProfile } from '../types';

interface ProfileCardProps {
  profile: FilamentProfile;
}

// Notion-style color map for materials
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

function getMaterialColor(material: string) {
  return materialColors[material] || materialColors['default'];
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
      </div>
      {/* Material and printer tags as text */}
      <div className="mb-4 flex gap-2 items-center">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getMaterialColor(profile.material)}`}>{profile.material}</span>
        {profile.printers && profile.printers.length > 0 && (
          <span className="inline-block bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 px-3 py-1 rounded-full text-xs font-semibold">{profile.printers[0]}</span>
        )}
      </div>
      <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <Calendar size={14} />
          <span>{formatDate(profile.uploadedAt)}</span>
        </div>
      </div>
    </div>
  );
}
