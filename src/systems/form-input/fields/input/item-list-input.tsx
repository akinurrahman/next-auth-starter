'use client';

import { useState } from 'react';

import { Badge } from '@ui/badge';
import { Button } from '@ui/button';
import { Input } from '@ui/input';
import { Plus, X } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { InputFieldProps } from '../../types';

interface MultiItemInputProps {
  props: InputFieldProps;
}

export function ItemListInput({ props }: MultiItemInputProps) {
  const [inputValue, setInputValue] = useState('');
  const { getValues, setValue } = useFormContext();

  const value = getValues(props.name) || [];

  const addItem = () => {
    if (inputValue.trim() && !value.includes(inputValue.trim())) {
      setValue(props.name, [...value, inputValue.trim()]);
      setInputValue('');
    }
  };

  const removeItem = (itemToRemove: string) => {
    setValue(
      props.name,
      value.filter((item: string) => item !== itemToRemove)
    );
  };

  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap gap-2">
        {value.map((item: string) => (
          <Badge key={item} variant="secondary" className="flex items-center gap-1">
            {item}
            <button
              type="button"
              onClick={() => removeItem(item)}
              className="hover:bg-muted-foreground/20 ml-1 rounded-full"
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove {item}</span>
            </button>
          </Badge>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          placeholder={props.placeholder}
          className="flex-1"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addItem();
            }
          }}
        />
        <Button variant="outline" size="icon" onClick={addItem} type="button">
          <Plus className="h-4 w-4" />
          <span className="sr-only">Add item</span>
        </Button>
      </div>
    </div>
  );
}
