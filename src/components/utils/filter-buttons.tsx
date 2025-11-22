'use client';

import React, { useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterButtonsProps {
  options: FilterOption[];
  filterParam?: string;
  defaultOption?: string;
  className?: string;
  onFilterChange?: (value: string) => void;
  variant?: 'tabs' | 'select'; // New prop to control UI type
  placeholder?: string; // For select dropdown
}

const FilterButtons = ({
  options,
  filterParam = 'status',
  defaultOption = 'All',
  className = '',
  onFilterChange,
  variant = 'tabs',
  placeholder = 'Select an option...',
}: FilterButtonsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeFilter, setActiveFilter] = useState<string>(defaultOption);

  useEffect(() => {
    const filterQuery = searchParams.get(filterParam) || defaultOption;
    setActiveFilter(filterQuery);
  }, [searchParams, filterParam, defaultOption]);

  const handleFilterChange = (value: string) => {
    setActiveFilter(value);
    const params = new URLSearchParams(searchParams);

    if (value && value !== defaultOption) {
      params.set(filterParam, value);
    } else {
      params.delete(filterParam);
    }

    router.replace(`?${params.toString()}`, { scroll: false });

    // Call optional callback for additional handling
    onFilterChange?.(value);
  };

  // Render tabs variant (original implementation)
  if (variant === 'tabs') {
    return (
      <div className={`flex gap-2 ${className}`}>
        {options.map(option => (
          <Button
            key={option.value}
            variant={activeFilter === option.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFilterChange(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>
    );
  }

  // Render select dropdown variant
  return (
    <div className={className}>
      <Select value={activeFilter} onValueChange={handleFilterChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterButtons;
