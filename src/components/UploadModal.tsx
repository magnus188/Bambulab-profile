'use client';

import { useState, useEffect } from 'react';
import { X, Upload, AlertCircle } from 'lucide-react';
import { uploadProfile } from '../services/profileService';
import { UploadProfileData } from '../types';
import Dropdown from './Dropdown';
import { getProducers, getMaterials } from '../services/profileService';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: () => void;
}

export default function UploadModal({ isOpen, onClose, onUploadSuccess }: UploadModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    producer: '',
    material: '',
    printers: [] as string[],
  });
  const [filamentFile, setFilamentFile] = useState<File | null>(null);
  const [configFile, setConfigFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [producers, setProducers] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);

  useEffect(() => {
    async function fetchOptions() {
      const [prods, mats] = await Promise.all([
        getProducers(),
        getMaterials(),
      ]);
      setProducers(prods);
      setMaterials(mats);
    }
    fetchOptions();
  }, []);

  const resetForm = () => {
    setFormData({ name: '', producer: '', material: '', printers: [] });
    setFilamentFile(null);
    setConfigFile(null);
    setError('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === 'application/json') {
        setConfigFile(selectedFile);
        setError('');
      } else {
        setError('Please select a JSON file.');
        setConfigFile(null);
      }
    }
  };

  const handleFilamentFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    if (!filamentFile) {
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
    if (configFile && (!formData.printers[0] || !formData.printers[0].trim())) {
      setError('Please select a printer for the config file.');
      return;
    }
    setIsUploading(true);
    setError('');
    try {
      const uploadData: UploadProfileData = {
        name: formData.name.trim(),
        producer: formData.producer.trim(),
        material: formData.material,
        printers: configFile ? formData.printers : [],
        file: filamentFile,
      };
      await uploadProfile(uploadData);
      onUploadSuccess();
      handleClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload profile');
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  // Dropdown options
  const materialOptions = materials.map(m => ({ value: m, label: m }));
  const producerOptions = producers.map(p => ({ value: p, label: p }));
  const printerOptions = ['A1 Mini', 'A1', 'P1S', 'X1C', 'H2D'].map(printer => ({ value: printer, label: printer }));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Upload New Profile
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
          {configFile && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Printer</label>
              <Dropdown
                options={printerOptions}
                value={formData.printers[0] || ''}
                onChange={val => setFormData({ ...formData, printers: [val as string] })}
                placeholder="Select printer..."
                searchable
                allowAll={false}
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Filament Profile File (JSON)</label>
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
                      required
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
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Config File (JSON, optional)</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600 dark:text-gray-400">
                  <label className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500">
                    <span>Upload config file</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">JSON files only</p>
                {configFile && (
                  <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                    Selected: {configFile.name}
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
              {isUploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
