import React, { useState, useRef, useEffect } from 'react';

interface Option {
  value: string;
  label: string;
}

interface DropdownProps {
  options: Option[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  placeholder?: string;
  searchable?: boolean;
  allowAll?: boolean;
  multi?: boolean;
}

// Add a simple fuzzy search helper
function fuzzyMatch(str: string, search: string) {
  if (!search) return true;
  str = str.toLowerCase();
  search = search.toLowerCase();
  // Simple fuzzy: all chars in order
  let i = 0;
  for (let j = 0; j < str.length && i < search.length; j++) {
    if (str[j] === search[i]) i++;
  }
  return i === search.length || str.includes(search);
}

export default function Dropdown({ options, value, onChange, placeholder = 'Select...', searchable = true, allowAll = true, multi = false }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filtered = options.filter(opt => fuzzyMatch(opt.label, search));
  const showAll = allowAll && !options.some(opt => opt.value === 'all');
  
  // Separate "All" option from other filtered options for proper ordering
  const allOption = filtered.find(opt => opt.value === 'all');
  const otherOptions = filtered.filter(opt => opt.value !== 'all');

  const isSelected = (val: string) => Array.isArray(value) ? value.includes(val) : value === val;
  const handleSelect = (val: string) => {
    if (multi) {
      if (val === 'all') {
        // If "All" is selected, clear everything else and set to "all"
        onChange('all');
        setOpen(false);
        return;
      }
      
      let arr: string[] = Array.isArray(value) ? [...value] : [];
      
      // If "All" was previously selected and we're selecting something else,
      // remove "All" first
      if (arr.includes('all') || value === 'all') {
        arr = [];
      }
      
      if (arr.includes(val)) {
        // Remove the item if it's already selected
        arr = arr.filter((v: string) => v !== val);
      } else {
        // Add the item if it's not selected
        arr.push(val);
      }
      
      // If nothing is selected after removal, default back to "all"
      if (arr.length === 0) {
        onChange('all');
      } else {
        onChange(arr);
      }
    } else {
      onChange(val);
      setOpen(false);
    }
  };

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        className={`w-full px-4 py-2 text-left rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-theme ${multi ? 'pr-8' : ''}`}
        onClick={() => setOpen(o => !o)}
      >
        <div className="flex items-center justify-between">
          <span className="truncate">
            {Array.isArray(value)
              ? value.length > 0
                ? value.includes('all') 
                  ? options.find(opt => opt.value === 'all')?.label || 'All'
                  : value.map(v => options.find(opt => opt.value === v)?.label).filter(Boolean).join(', ')
                : placeholder
              : value === 'all'
                ? options.find(opt => opt.value === 'all')?.label || 'All'
                : value
                ? options.find(opt => opt.value === value)?.label
                : placeholder}
          </span>
          {multi && Array.isArray(value) && value.length > 1 && !value.includes('all') && (
            <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{value.length}</span>
          )}
          {multi && !Array.isArray(value) && (
            <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-1 rounded">Multi</span>
          )}
        </div>
      </button>
      {open && (
        <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto">
          {searchable && (
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full px-3 py-2 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none"
              placeholder="Search..."
              autoFocus
            />
          )}
          {(showAll || allOption) && (
            <div
              className={`px-4 py-2 cursor-pointer ${isSelected('all') ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white'}`}
              onClick={() => handleSelect('all')}
            >
              {allOption ? allOption.label : 'All'}
            </div>
          )}
          {otherOptions.map(opt => (
            <div
              key={opt.value}
              className={`px-4 py-2 cursor-pointer ${isSelected(opt.value) ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white'}`}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </div>
          ))}
          {!allOption && otherOptions.length === 0 && !showAll && search && (
            <div
              className="px-4 py-2 cursor-pointer bg-green-100 text-green-800 hover:bg-green-200 rounded"
              onClick={() => {
                onChange(search);
                setOpen(false);
                setSearch('');
              }}
            >
              Create &quot;{search}&quot;
            </div>
          )}
          {!allOption && otherOptions.length === 0 && !showAll && !search && (
            <div className="px-4 py-2 text-gray-400">No options found</div>
          )}
        </div>
      )}
    </div>
  );
}
