'use client';

import { FilamentProfile } from '../types';
import ProfileCard from './ProfileCard';
import ProfileDetailModal from './ProfileDetailModal';
import { useState } from 'react';

interface ProfileGridProps {
  profiles: FilamentProfile[];
  loading: boolean;
}

export default function ProfileGrid({ profiles, loading }: ProfileGridProps) {
  const [selectedProfile, setSelectedProfile] = useState<FilamentProfile | null>(null);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="bg-gray-200 dark:bg-gray-700 rounded-lg h-48 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (profiles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 dark:text-gray-500">
          <svg
            className="mx-auto h-12 w-12 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No profiles found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Try adjusting your search or filters, or upload a new profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {profiles.map((profile) => (
          <div key={profile.id} onClick={() => setSelectedProfile(profile)} className="cursor-pointer">
            <ProfileCard profile={profile} />
          </div>
        ))}
      </div>
      {selectedProfile && (
        <ProfileDetailModal
          profile={selectedProfile}
          onClose={() => setSelectedProfile(null)}
        />
      )}
    </>
  );
}
