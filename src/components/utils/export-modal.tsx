'use client';

import React, { useState } from 'react';

import { Button } from '@ui/button';
import DatePicker from '@ui/date-picker';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/popover';
import { Calendar, Download } from 'lucide-react';

import { cn } from '@/lib/utils';

interface ExportModalProps {
  onExport: (startDate?: string, endDate?: string) => void;
  className?: string;
  trigger?: React.ReactNode;
  title?: string;
  buttonText?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const ExportModal = ({
  onExport,
  className,
  trigger,
  title = 'Export Sessions',
  buttonText = 'Export',
  variant = 'outline',
  size = 'default',
}: ExportModalProps) => {
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);

  const handleExport = () => {
    onExport(startDate, endDate);
    setIsOpen(false);
    setStartDate(undefined);
    setEndDate(undefined);
  };

  const handleClearDates = () => {
    setStartDate(undefined);
    setEndDate(undefined);
  };

  const defaultTrigger = (
    <Button variant={variant} size={size} className={cn('gap-2', className)}>
      <Download className="h-4 w-4" />
      {buttonText}
    </Button>
  );

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>{trigger || defaultTrigger}</PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="end">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <h3 className="font-medium">{title}</h3>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-muted-foreground mb-2 block text-sm font-medium">
                Start Date (Optional)
              </label>
              <DatePicker
                date={startDate}
                onDateChange={setStartDate}
                placeholder="Select start date"
              />
            </div>

            <div>
              <label className="text-muted-foreground mb-2 block text-sm font-medium">
                End Date (Optional)
              </label>
              <DatePicker date={endDate} onDateChange={setEndDate} placeholder="Select end date" />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearDates}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear Dates
            </Button>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleExport}
                disabled={startDate && endDate ? new Date(startDate) > new Date(endDate) : false}
              >
                Export
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ExportModal;
