'use client';

import * as React from 'react';

import { Badge } from '@ui/badge';
import { Button } from '@ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/popover';
import { Separator } from '@ui/separator';
import { Check, ChevronDown, X } from 'lucide-react';
import { ControllerRenderProps } from 'react-hook-form';

import { cn } from '@/lib/utils';

import { MultiSelectFieldProps } from '../../types';

interface MultiSelectProps {
  props: MultiSelectFieldProps;
  field: ControllerRenderProps;
}

const MultiSelect = ({ props, field }: MultiSelectProps) => {
  const [open, setOpen] = React.useState(false);
  const [selectedValues, setSelectedValues] = React.useState<string[]>(field.value || []);

  React.useEffect(() => {
    setSelectedValues(field.value || []);
  }, [field.value]);

  const handleUnselect = (value: string) => {
    const newSelectedValues = selectedValues.filter(item => item !== value);
    setSelectedValues(newSelectedValues);
    field.onChange(newSelectedValues);
  };

  const handleSelect = (value: string) => {
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter(item => item !== value)
      : [...selectedValues, value];
    setSelectedValues(newSelectedValues);
    field.onChange(newSelectedValues);
  };

  const handleClearAll = () => {
    setSelectedValues([]);
    field.onChange([]);
  };

  const handleSelectAll = () => {
    const allValues = props?.options?.map(option => option.value) || [];
    setSelectedValues(allValues);
    field.onChange(allValues);
  };

  return (
    <Popover open={open} onOpenChange={setOpen} modal={props.modalPopover}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('text-foreground h-auto min-h-10 w-full justify-between', props.className)}
          onClick={() => setOpen(!open)}
          disabled={props.disabled}
        >
          <div className="mx-auto flex w-full items-center justify-between">
            <div className="flex flex-wrap items-center gap-1">
              {selectedValues.length > 0 ? (
                props.maxCount && selectedValues.length > props.maxCount ? (
                  <div className="flex items-center gap-2">
                    {selectedValues.slice(0, props.maxCount).map(value => {
                      const option = props?.options?.find(option => option.value === value);
                      const IconComponent = option?.icon;
                      return (
                        <Badge
                          variant="secondary"
                          key={value}
                          className="flex items-center gap-1 rounded-sm px-1 font-normal capitalize"
                          onClick={e => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleUnselect(value);
                          }}
                        >
                          {IconComponent && <IconComponent className="h-4 w-4" />}
                          {option?.label}
                          <X className="ml-1 h-3 w-3 cursor-pointer" />
                        </Badge>
                      );
                    })}
                    <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                      +{selectedValues.length - props.maxCount} more
                    </Badge>
                  </div>
                ) : (
                  selectedValues.map(value => {
                    const option = props?.options?.find(option => option.value === value);
                    const IconComponent = option?.icon;
                    return (
                      <Badge
                        variant="secondary"
                        key={value}
                        className="flex items-center gap-1 rounded-sm px-1 font-normal capitalize"
                        onClick={e => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleUnselect(value);
                        }}
                      >
                        {IconComponent && <IconComponent className="h-4 w-4" />}
                        {option?.label}
                        <X className="ml-1 h-3 w-3 cursor-pointer" />
                      </Badge>
                    );
                  })
                )
              ) : (
                <span className="text-muted-foreground mx-3 text-sm font-normal">
                  {props.placeholder}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {selectedValues.length > 0 && (
                <div
                  className="text-muted-foreground hover:text-foreground flex cursor-pointer items-center rounded-sm"
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleClearAll();
                  }}
                >
                  <X className="h-4 w-4" />
                </div>
              )}
              <Separator orientation="vertical" className="flex min-h-6 w-px" />
              <ChevronDown className="text-muted-foreground h-4 w-4 opacity-50" />
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList className="max-h-60 overflow-y-auto">
            <CommandEmpty>No item found.</CommandEmpty>
            {props.showSelectAll && (
              <>
                <CommandGroup>
                  <CommandItem
                    onSelect={handleSelectAll}
                    className="cursor-pointer font-medium"
                    disabled={selectedValues.length === props?.options?.length}
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Select All
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
              </>
            )}
            <CommandGroup>
              {props?.options?.map(option => {
                const isSelected = selectedValues.includes(option.value);
                const IconComponent = option.icon;
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => handleSelect(option.value)}
                    className="cursor-pointer capitalize"
                  >
                    <Check
                      className={cn('mr-2 h-4 w-4', isSelected ? 'opacity-100' : 'opacity-0')}
                    />
                    {IconComponent && <IconComponent className="mr-2 h-4 w-4" />}
                    <span>{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {(selectedValues.length > 0 || true) && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <div className="flex items-center gap-1 p-1">
                    {selectedValues.length > 0 ? (
                      <CommandItem
                        onSelect={handleClearAll}
                        className="text-destructive hover:text-destructive flex-1 cursor-pointer justify-center rounded-sm px-3 py-2 text-center text-nowrap"
                      >
                        <X className="mr-2 h-4 w-4" />
                        Clear All
                      </CommandItem>
                    ) : (
                      <div className="flex-1" />
                    )}
                    <CommandItem
                      onSelect={() => setOpen(false)}
                      className="flex-1 cursor-pointer justify-center rounded-sm px-3 py-2 text-center"
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Close
                    </CommandItem>
                  </div>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default MultiSelect;
