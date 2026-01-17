import { useCallback, useMemo } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { FilterConfig } from '../types';

export function useFilters(config: FilterConfig[]) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Build filter state
  const filters = useMemo(() => {
    const result: Record<string, string | undefined> = {};

    // Load URL params
    searchParams.forEach((v, k) => {
      result[k] = v || undefined;
    });

    // Apply defaultValue if missing (even if "#")
    config.forEach(field => {
      if (!result[field.key] && field.defaultValue) {
        result[field.key] = field.defaultValue;
      }
    });

    return result;
  }, [searchParams, config]);

  // Apply selected filters (batch)
  const applyFilters = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (!value || value === '#') {
          // Remove hash or empty values from URL
          params.delete(key);
        } else {
          // Set other values in URL
          params.set(key, value);
        }
      });

      router.replace(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  // Remove everything from the URL
  const clearAll = useCallback(() => {
    router.replace('?');
  }, [router]);

  // Count active filters (ignore "#", "all", disabled fields)
  const activeCount = useMemo(() => {
    return config.filter(field => {
      if (field.disabled) return false;

      const v = filters[field.key];
      return v && v !== '#' && v !== 'all';
    }).length;
  }, [filters, config]);

  return {
    filters,
    applyFilters,
    clearAll,
    activeCount,
  };
}
