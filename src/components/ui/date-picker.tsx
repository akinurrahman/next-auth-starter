'use client';

import React, { useState } from 'react';

import { Button } from '@ui/button';
import { Calendar } from '@ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/popover';
import { format, parse } from 'date-fns';
import { Calendar as CalendarIcon, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { DateDisplayFormat } from '@/systems/filters/types';

interface DatePickerProps {
  date?: string; // yyyy-MM-dd format
  onDateChange?: (date: string | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  displayFormat?: DateDisplayFormat;
}

const DatePicker = ({
  date,
  onDateChange,
  placeholder = 'Pick a date',
  className,
  disabled = false,
  displayFormat = 'PPP',
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // convert string (yyyy-MM-dd) into a valid Date
  const parsedDate = date ? parse(date, 'yyyy-MM-dd', new Date()) : undefined;

  const formatted = parsedDate ? format(parsedDate, displayFormat) : placeholder;

  const handleSelect = (selected?: Date) => {
    if (!selected) {
      onDateChange?.(undefined);
    } else {
      const formatted = format(selected, 'yyyy-MM-dd');
      onDateChange?.(formatted);
    }

    setIsOpen(false);
  };

  const handleClear = () => {
    onDateChange?.(undefined);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal',
            !parsedDate && 'text-muted-foreground',
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {formatted}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        {/* clear button */}
        {parsedDate && (
          <div className="flex justify-end p-2">
            <button
              onClick={handleClear}
              className="flex items-center text-xs text-red-500 hover:underline"
            >
              <X size={12} className="mr-1" /> Clear
            </button>
          </div>
        )}

        <Calendar mode="single" selected={parsedDate} onSelect={d => handleSelect(d as Date)} />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
