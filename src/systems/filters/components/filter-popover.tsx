'use client';

import React, { useEffect, useState } from 'react';

import { Button } from '@ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/popover';
import { Filter } from 'lucide-react';

import { useFilters } from '../hooks/use-filters';
import { FilterConfig } from '../types';
import { renderFilterField } from '../utils/filter-renderer';

interface FilterPopoverProps {
  config: FilterConfig[];
}

export function FilterPopover({ config }: FilterPopoverProps) {
  const { filters, applyFilters, clearAll, activeCount } = useFilters(config);

  const [open, setOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState(filters);

  // sync tempFilters when URL changes
  useEffect(() => {
    setTempFilters(filters);
  }, [filters]);

  const handleApply = () => {
    applyFilters(tempFilters);
    setOpen(false);
  };

  const handleClear = () => {
    clearAll();
    setOpen(false); // close popover
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="relative">
          <Filter size={16} />

          {activeCount > 0 && (
            <span className="bg-primary absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] leading-none text-white">
              {activeCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[360px] p-4" align="start">
        <div className="grid grid-cols-2 gap-4">
          {config.map(item => (
            <React.Fragment key={item.key}>
              {renderFilterField(item, tempFilters[item.key], v =>
                setTempFilters(prev => ({
                  ...prev,
                  [item.key]: v,
                }))
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={handleClear}>
            Clear
          </Button>

          <Button onClick={handleApply}>Apply</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
