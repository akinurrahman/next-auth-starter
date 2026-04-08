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
  /** Called whenever the draft filter state inside the popover changes. Use this to react to in-progress selections (e.g. to fetch dependent options) before the user hits Apply. */
  onTempFilterChange?: (filters: Record<string, string | undefined>) => void;
}

export function FilterPopover({ config, onTempFilterChange }: FilterPopoverProps) {
  const { filters, applyFilters, clearAll, activeCount } = useFilters(config);

  const [open, setOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState(filters);

  // Sync tempFilters from URL state, but ONLY while the popover is closed.
  // While open, the user is making in-progress selections. A parent re-render
  // (e.g. triggered by onTempFilterChange fetching dependent data) creates a new
  // config reference → useFilters recomputes → filters gets a new object reference
  // → without this guard, the effect would reset the user's draft selections.
  useEffect(() => {
    if (!open) {
      setTempFilters(filters);
    }
  }, [filters, open]);

  // notify parent of in-popover draft changes (for dependent options fetching etc.)
  useEffect(() => {
    onTempFilterChange?.(tempFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tempFilters]);

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

      <PopoverContent className="w-90 p-4" align="start">
        <div className="grid grid-cols-2 gap-4">
          {config.map(item => {
            // hide dependent fields until their parent has a value (unless alwaysVisible is set)
            if (item.dependsOn && !item.alwaysVisible && !tempFilters[item.dependsOn]) return null;
            return (
              <React.Fragment key={item.key}>
                {renderFilterField(
                  item,
                  tempFilters[item.key],
                  v => {
                    setTempFilters(prev => {
                      const next: Record<string, string | undefined> = { ...prev, [item.key]: v };
                      // cascade-clear all descendants recursively (handles A→B→C chains)
                      const cleared = new Set<string>([item.key]);
                      let progress = true;
                      while (progress) {
                        progress = false;
                        config.forEach(c => {
                          if (c.dependsOn && cleared.has(c.dependsOn) && !cleared.has(c.key)) {
                            next[c.key] = undefined;
                            cleared.add(c.key);
                            progress = true;
                          }
                        });
                      }
                      return next;
                    });
                  },
                  tempFilters
                )}
              </React.Fragment>
            );
          })}
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
