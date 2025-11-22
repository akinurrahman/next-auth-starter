'use client';

import React, { useState } from 'react';

import { Button } from '@ui/button';
import { Calendar } from '@ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

interface DatePickerProps {
  date?: string; // ISO date string
  onDateChange?: (date: string | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const DatePicker = ({
  date,
  onDateChange,
  placeholder = 'Pick a date',
  className,
  disabled = false,
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (selectedDate: Date | undefined) => {
    const isoDate = selectedDate ? selectedDate.toISOString() : undefined;
    onDateChange?.(isoDate);
    setIsOpen(false);
  };

  const dateObject = date ? new Date(date) : undefined;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground',
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dateObject ? format(dateObject, 'PPP') : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={dateObject}
          onSelect={date => handleDateChange(date as Date)}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
