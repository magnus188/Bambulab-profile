'use client';

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import ProfileGrid from '../components/ProfileGrid';
import UploadModal from '../components/UploadModal';
import { getProfiles, getProducers } from '../services/profileService';
import { FilamentProfile } from '../types';

export default function Home() {
  const [profiles, setProfiles] = useState<FilamentProfile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<FilamentProfile[]>([]);
  const [producers, setProducers] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);
  const [printers, setPrinters] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProducer, setSelectedProducer] = useState('all');
  const [selectedMaterial, setSelectedMaterial] = useState('all');
  const [selectedPrinter, setSelectedPrinter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const [profilesData, producersData] = await Promise.all([
        getProfiles(),
        getProducers(),
      ]);
      setProfiles(profilesData);
      setProducers(producersData);
      // Extract unique materials and printers from profiles
      const uniqueMaterials = Array.from(new Set(profilesData.map(p => p.material).filter(Boolean)));
      setMaterials(uniqueMaterials);
      const allPrinters = profilesData.flatMap(p => p.printers || []);
      const uniquePrinters = Array.from(new Set(allPrinters));
      setPrinters(uniquePrinters);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProfiles = () => {
    let filtered = profiles;

    // Filter by producer
    if (selectedProducer !== 'all') {
      filtered = filtered.filter((profile) => profile.producer === selectedProducer);
    }
    // Filter by material
    if (selectedMaterial !== 'all') {
      filtered = filtered.filter((profile) => profile.material === selectedMaterial);
    }
    // Filter by printer
    if (selectedPrinter !== 'all') {
      filtered = filtered.filter((profile) => profile.printers && profile.printers.includes(selectedPrinter));
    }
    // Filter by search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (profile) =>
          profile.name.toLowerCase().includes(searchLower) ||
          profile.producer.toLowerCase().includes(searchLower) ||
          profile.material.toLowerCase().includes(searchLower) ||
          (profile.printers && profile.printers.some(printer => printer.toLowerCase().includes(searchLower)))
      );
    }
    setFilteredProfiles(filtered);
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  useEffect(() => {
    filterProfiles();
  }, [profiles, searchTerm, selectedProducer, selectedMaterial, selectedPrinter]);

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
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              <Plus size={20} />
              Upload Profile
            </button>
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
              printers={printers}
              selectedPrinter={selectedPrinter}
              onPrinterChange={setSelectedPrinter}
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
        <ProfileGrid profiles={filteredProfiles} loading={loading} />
      </main>

      {/* Upload Modal */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />
    </div>
  );
}
