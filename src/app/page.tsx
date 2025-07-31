'use client';

import { useState, useEffect, useCallback } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import ProfileGrid from '../components/ProfileGrid';
import { getProducers, getProfilesSorted } from '../services/profileService';
import { FilamentProfile } from '../types';

export default function Home() {
  const [profiles, setProfiles] = useState<FilamentProfile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<FilamentProfile[]>([]);
  const [producers, setProducers] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProducer, setSelectedProducer] = useState('all');
  const [selectedMaterial, setSelectedMaterial] = useState('all');
  const [sortBy, setSortBy] = useState<'newest' | 'votes' | 'downloads'>('newest');
  const [loading, setLoading] = useState(true);
  // const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const fetchProfiles = useCallback(async () => {
    try {
      setLoading(true);
      const [profilesData, producersData] = await Promise.all([
        getProfilesSorted(sortBy),
        getProducers(),
      ]);
      setProfiles(profilesData);
      setProducers(producersData);
      // Extract unique materials from profiles
      const uniqueMaterials = Array.from(new Set(profilesData.map(p => p.material).filter(Boolean)));
      setMaterials(uniqueMaterials);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    } finally {
      setLoading(false);
    }
  }, [sortBy]);

  const handleVoteUpdate = (profileId: string, userId: string, voteType: 'up' | 'down' | null) => {
    setProfiles(prevProfiles => {
      return prevProfiles.map(profile => {
        if (profile.id !== profileId) return profile;
        
        const currentVotes = profile.votedUsers || {};
        const previousVote = currentVotes[userId];
        const newVotedUsers = { ...currentVotes };
        
        let newUpvotes = profile.upvotes || 0;
        let newDownvotes = profile.downvotes || 0;
        
        if (voteType === null) {
          // Remove vote
          delete newVotedUsers[userId];
          if (previousVote === 'up') {
            newUpvotes = Math.max(0, newUpvotes - 1);
          } else if (previousVote === 'down') {
            newDownvotes = Math.max(0, newDownvotes - 1);
          }
        } else {
          // Add or change vote
          newVotedUsers[userId] = voteType;
          
          if (previousVote === 'up' && voteType === 'down') {
            newUpvotes = Math.max(0, newUpvotes - 1);
            newDownvotes = newDownvotes + 1;
          } else if (previousVote === 'down' && voteType === 'up') {
            newDownvotes = Math.max(0, newDownvotes - 1);
            newUpvotes = newUpvotes + 1;
          } else if (!previousVote) {
            if (voteType === 'up') {
              newUpvotes = newUpvotes + 1;
            } else {
              newDownvotes = newDownvotes + 1;
            }
          }
        }
        
        return {
          ...profile,
          votedUsers: newVotedUsers,
          upvotes: newUpvotes,
          downvotes: newDownvotes
        };
      });
    });
  };

  const filterProfiles = useCallback(() => {
    let filtered = profiles;

    // Filter by producer
    if (selectedProducer !== 'all') {
      filtered = filtered.filter((profile) => profile.producer === selectedProducer);
    }
    // Filter by material
    if (selectedMaterial !== 'all') {
      filtered = filtered.filter((profile) => profile.material === selectedMaterial);
    }
    // Filter by search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (profile) =>
          profile.name.toLowerCase().includes(searchLower) ||
          profile.producer.toLowerCase().includes(searchLower) ||
          profile.material.toLowerCase().includes(searchLower)
      );
    }
    setFilteredProfiles(filtered);
  }, [profiles, searchTerm, selectedProducer, selectedMaterial]);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  useEffect(() => {
    filterProfiles();
  }, [filterProfiles]);

  const handleUploadSuccess = () => {
    fetchProfiles();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Upload Section */}
        <div className="mb-8 space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Filament Profiles
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover and share optimized filament profiles for your Bambu Lab 3D printer. 
              Upload your own or download profiles shared by the community.
            </p>
          </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>
        </div>

        {/* Filter Section */}
        {producers.length > 0 && (
          <div className="mb-8">
            <FilterBar
              producers={producers}
              selectedProducer={selectedProducer}
              onProducerChange={setSelectedProducer}
              materials={materials}
              selectedMaterial={selectedMaterial}
              onMaterialChange={setSelectedMaterial}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </div>
        )}

        {/* Results Section */}
        <div className="mb-4">
          {!loading && (
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              {filteredProfiles.length === 1
                ? '1 profile found'
                : `${filteredProfiles.length} profiles found`}
            </p>
          )}
        </div>

        {/* Profiles Grid */}
        <ProfileGrid profiles={filteredProfiles} loading={loading} onVoteUpdate={handleVoteUpdate} />
      </main>

      {/* Upload Modal removed, now handled in Header */}
    </div>
  );
}
