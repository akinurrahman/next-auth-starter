'use client';

import { FormControl } from '@ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/select';
import { ControllerRenderProps } from 'react-hook-form';

import type { SelectFieldProps } from '../types';

interface SelectProps {
  props: SelectFieldProps;
  field: ControllerRenderProps;
}

const SelectField = ({ props, field }: SelectProps) => {
  return (
    <Select
      disabled={props.disabled}
      onValueChange={value => value && field.onChange(value)}
      value={field.value}
    >
      <FormControl>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={props.placeholder} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {props.options.map(item => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectField;
