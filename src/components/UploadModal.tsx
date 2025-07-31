'use client';

import { useState, useEffect } from 'react';
import { X, Upload, AlertCircle } from 'lucide-react';
import { uploadProfile, updateProfile } from '../services/profileService';
import { useAuth } from '../contexts/AuthContext';
import { UploadProfileData, FilamentProfile } from '../types/index';
import Dropdown from './Dropdown';
import { getProducers } from '../services/profileService';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: () => void;
  editingProfile?: FilamentProfile | null;
}

export default function UploadModal({ isOpen, onClose, onUploadSuccess, editingProfile }: UploadModalProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    producer: '',
    material: '',
    description: '',
  });
  const [filamentFile, setFilamentFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [producers, setProducers] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);

  useEffect(() => {
    async function fetchOptions() {
      const prods = await getProducers();
      setProducers(prods);
      // Materials are dynamically set from user input
    }
    fetchOptions();
  }, []);

    // Pre-populate form when editing
  useEffect(() => {
    if (editingProfile) {
      setFormData({
        name: editingProfile.name,
        producer: editingProfile.producer,
        material: editingProfile.material,
        description: editingProfile.description || '',
      });
    }
  }, [editingProfile]);

  const resetForm = () => {
    setFormData({ name: '', producer: '', material: '', description: '' });
    setFilamentFile(null);
    setError('');
  };

  const handleClose = () => {
    setFormData({ name: '', producer: '', material: '', description: '' });
    setFilamentFile(null);
    setError('');
    onClose();
  };  const handleFilamentFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === 'application/json') {
        setFilamentFile(selectedFile);
        setError('');
      } else {
        setError('Please select a JSON file.');
        setFilamentFile(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // For new profiles, filament file is required
    // For editing, it's optional (only if user wants to update the file)
    if (!editingProfile && !filamentFile) {
      setError('Please upload a filament profile file.');
      return;
    }
    
    if (!formData.name.trim()) {
      setError('Please enter a filament name.');
      return;
    }
    if (!formData.producer.trim()) {
      setError('Please select or add a producer.');
      return;
    }
    if (!formData.material.trim()) {
      setError('Please select or add a material.');
      return;
    }
    
    setIsUploading(true);
    setError('');
    try {
      if (editingProfile) {
        // Update existing profile
        const updateData: Partial<UploadProfileData> = {
          name: formData.name.trim(),
          producer: formData.producer.trim(),
          material: formData.material,
          description: formData.description.trim(),
        };
        
        if (filamentFile) {
          updateData.file = filamentFile;
        }
        
        await updateProfile(editingProfile.id, updateData);
      } else {
        // Create new profile
        if (!filamentFile) {
          setError('Please upload a filament profile file.');
          return;
        }
        
        const uploadData: UploadProfileData & { creatorUid?: string } = {
          name: formData.name.trim(),
          producer: formData.producer.trim(),
          material: formData.material,
          description: formData.description.trim(),
          file: filamentFile,
          creatorUid: user?.uid,
        };
        await uploadProfile(uploadData);
      }
      
      onUploadSuccess();
      handleClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to ${editingProfile ? 'update' : 'upload'} profile`);
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  // Dropdown options
  const materialOptions = materials.map(m => ({ value: m, label: m }));
  const producerOptions = producers.map(p => ({ value: p, label: p }));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {editingProfile ? 'Edit Profile' : 'Upload New Profile'}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md flex items-center gap-2">
            <AlertCircle size={16} className="text-red-500" />
            <span className="text-red-700 dark:text-red-400 text-sm">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Filament Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., PLA Silk Red"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Producer</label>
            <Dropdown
              options={producerOptions}
              value={formData.producer}
              onChange={val => {
                if (!producers.includes(val as string)) {
                  setProducers(prev => [...prev, val as string]);
                }
                setFormData({ ...formData, producer: val as string });
              }}
              placeholder="Select or add producer..."
              searchable
              allowAll={false}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Material</label>
            <Dropdown
              options={materialOptions}
              value={formData.material}
              onChange={val => {
                if (!materials.includes(val as string)) {
                  setMaterials(prev => [...prev, val as string]);
                }
                setFormData({ ...formData, material: val as string });
              }}
              placeholder="Select or add material..."
              searchable
              allowAll={false}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description (Optional)</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Additional notes about this filament profile..."
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Filament Profile File (JSON) {editingProfile ? '(optional - leave empty to keep current file)' : ''}
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600 dark:text-gray-400">
                  <label className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500">
                    <span>Upload filament profile</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleFilamentFileChange}
                      className="sr-only"
                      required={!editingProfile}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">JSON files only</p>
                {filamentFile && (
                  <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                    Selected: {filamentFile.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isUploading ? (editingProfile ? 'Updating...' : 'Uploading...') : (editingProfile ? 'Update' : 'Upload')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
