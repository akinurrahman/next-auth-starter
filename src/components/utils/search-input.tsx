'use client';

import React from 'react';

import { Input } from '@ui/input';
import { Search } from 'lucide-react';

import { useDebouncedSearch } from '@/hooks/use-debounced-search';

interface SearchInputProps {
  placeholder?: string;
  searchParam?: string;
  className?: string;
  onSearchChange?: (value: string) => void;
}

const SearchInput = ({
  placeholder = 'Search...',
  searchParam = 'search',
  className = '',
  onSearchChange,
}: SearchInputProps) => {
  const { search, handleSearchChange } = useDebouncedSearch({
    searchParam,
    onSearchChange,
  });

  return (
    <div className={`relative max-w-md flex-1 ${className}`}>
      <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
      <Input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={e => handleSearchChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
};

export default SearchInput;
