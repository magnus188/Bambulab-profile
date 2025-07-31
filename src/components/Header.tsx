'use client';

import { Moon, Sun } from 'lucide-react';
import Image from 'next/image';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { getAuth, signOut } from 'firebase/auth';
import { FaUserCircle } from 'react-icons/fa';
import UploadModal from './UploadModal';
import { useState } from 'react';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { user, loading } = useAuth();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Bambu Lab Filament Profiles
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            {/* Auth UI */}
            {!loading && !user && (
              <a
                href="/signin"
                className="px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
              >
                Sign In
              </a>
            )}
            {!loading && user && (
              <>
                <a
                  href="/my-profiles"
                  className="px-4 py-2 rounded-md bg-gray-600 text-white font-semibold hover:bg-gray-700 transition-colors"
                >
                  My Profiles
                </a>
                <button
                  onClick={() => setIsUploadModalOpen(true)}
                  style={{ backgroundColor: '#4285f4' }}
                  className="px-4 py-2 rounded-md text-white font-semibold transition-colors hover:bg-[#1967d2]"
                >
                  Upload Profile
                </button>
                <div className="relative group">
                  <button
                    className="flex items-center focus:outline-none group"
                    tabIndex={0}
                  >
                    {user.photoURL ? (
                      <Image
                        src={user.photoURL}
                        alt="Profile"
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full border-2 border-blue-500"
                      />
                    ) : (
                      <FaUserCircle
                        size={32}
                        className="text-gray-500 dark:text-gray-300"
                      />
                    )}
                  </button>
                  {/* Dropdown menu */}
                  <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg opacity-0 group-focus-within:opacity-100 group-hover:opacity-100 pointer-events-none group-focus-within:pointer-events-auto group-hover:pointer-events-auto transition-opacity z-50">
                    <button
                      onClick={async () => {
                        const auth = getAuth();
                        await signOut(auth);
                      }}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
                <UploadModal
                  isOpen={isUploadModalOpen}
                  onClose={() => setIsUploadModalOpen(false)}
                  onUploadSuccess={() => setIsUploadModalOpen(false)}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
