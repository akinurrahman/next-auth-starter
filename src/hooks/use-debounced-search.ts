import { useCallback, useEffect, useMemo, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { debouncedSearch } from '@/lib/debounce';

interface UseDebouncedSearchOptions {
  searchParam?: string;
  onSearchChange?: (value: string) => void;
}

export const useDebouncedSearch = ({
  searchParam = 'search',
  onSearchChange,
}: UseDebouncedSearchOptions = {}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<string>('');

  // Create a persistent debounced URL update function
  const debouncedUrlUpdate = useMemo(
    () => (value: string) => {
      debouncedSearch((searchValue: string) => {
        const params = new URLSearchParams(searchParams);
        if (searchValue) {
          params.set(searchParam, searchValue);
        } else {
          params.delete(searchParam);
        }
        router.replace(`?${params.toString()}`, { scroll: false });
      }, value);
    },
    [searchParams, searchParam, router]
  );

  useEffect(() => {
    const searchQuery = searchParams.get(searchParam) || '';
    setSearch(searchQuery);
  }, [searchParams, searchParam]);

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearch(value);
      debouncedUrlUpdate(value);
      onSearchChange?.(value);
    },
    [debouncedUrlUpdate, onSearchChange]
  );

  return {
    search,
    handleSearchChange,
  };
};
