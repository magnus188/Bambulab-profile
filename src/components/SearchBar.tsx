'use client';

import { Search } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export default function SearchBar({ searchTerm, onSearchChange }: SearchBarProps) {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="relative" style={{ width: '40vw' }}>
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-7 w-7 text-theme" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="block w-full pl-14 pr-4 py-4 text-2xl border border-gray-300 dark:border-gray-600 rounded-lg leading-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-theme focus:border-transparent shadow-md"
          placeholder="Search profiles..."
        />
      </div>
    </div>
  );
}
