import React, { useRef, useState } from 'react';
import { FilamentProfile } from '../types';
import { X, Download, Upload } from 'lucide-react';
import Dropdown from './Dropdown';
import { addConfigFileToProfile } from '../services/profileService';

interface ProfileDetailModalProps {
  profile: FilamentProfile;
  onClose: () => void;
}

function formatFileSize(bytes: number) {
  if (!bytes) return '';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  }).format(date);
}

export default function ProfileDetailModal({ profile, onClose }: ProfileDetailModalProps) {
  const configInputRef = useRef<HTMLInputElement>(null);
  const [configFile, setConfigFile] = useState<File | null>(null);
  const [selectedPrinter, setSelectedPrinter] = useState<string>('');
  const printerOptions = ['A1 Mini', 'A1', 'P1S', 'X1C', 'H2D'].map(printer => ({ value: printer, label: printer }));
  const [isSaving, setIsSaving] = useState(false);
  const handleConfigFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === 'application/json') {
        setConfigFile(selectedFile);
      } else {
        setConfigFile(null);
      }
    }
  };
  // TODO: Implement config file upload logic if missing
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
        <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          <div>Material: <span className="font-medium text-gray-900 dark:text-white">{profile.material}</span></div>
          {profile.printers && profile.printers.length > 0 && (
            <div>Printers: <span className="font-medium text-gray-900 dark:text-white">{profile.printers.join(', ')}</span></div>
          )}
          <div>Uploaded: {formatDate(profile.uploadedAt)}</div>
        </div>
        {/* File(s) section */}
        <div className="mt-8 border-t pt-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Files</h3>
          <div className="flex flex-col gap-4">
            {profile.fileUrl && (
              <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 rounded p-4">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">{profile.fileName}</div>
                  {profile.metadata && (
                    <div className="text-xs text-gray-500 dark:text-gray-400">{formatFileSize(profile.metadata.fileSize)}</div>
                  )}
                </div>
                <a
                  href={profile.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  download={profile.fileName}
                >
                  <Download size={16} /> Download
                </a>
              </div>
            )}
            {/* Printer select above dropzone if configFile is being added */}
            {configFile && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Printer</label>
                <Dropdown
                  options={printerOptions}
                  value={selectedPrinter}
                  onChange={val => setSelectedPrinter(val as string)}
                  placeholder="Select printer..."
                  searchable
                  allowAll={false}
                />
              </div>
            )}
            {/* Config file upload dropzone (UI only) */}
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
                        onChange={handleConfigFileChange}
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
          </div>
        </div>
        {/* Save button sticky at bottom right */}
        <div className="sticky bottom-0 flex justify-end bg-white dark:bg-gray-800 pt-6 pb-2 px-2 -mx-8 rounded-b-lg">
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={!configFile || !selectedPrinter || isSaving}
            onClick={async () => {
              if (!configFile || !selectedPrinter) return;
              setIsSaving(true);
              try {
                await addConfigFileToProfile(profile.id, configFile, [selectedPrinter]);
                onClose();
              } catch (err) {
                // Optionally show error
              } finally {
                setIsSaving(false);
              }
            }}
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
} 