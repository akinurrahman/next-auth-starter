import React from 'react';

import { Label } from '@ui/label';
import { RadioGroup, RadioGroupItem } from '@ui/radio-group';
import { ControllerRenderProps } from 'react-hook-form';

import { RadioGroupProps } from '../types';

interface RadioProps {
  props: RadioGroupProps;
  field: ControllerRenderProps;
}

const RadioGroupComponent = ({ props, field }: RadioProps) => {
  return (
    <RadioGroup value={field.value} onValueChange={field.onChange}>
      {props.options.map(option => (
        <div key={option.value} className="flex items-start space-x-2">
          <RadioGroupItem value={option.value} id={option.value} />
          <div className="grid gap-1.5">
            <Label htmlFor={option.value} className="font-medium">
              {option.label}
            </Label>
            {option.description && (
              <p className="text-muted-foreground text-sm">{option.description}</p>
            )}
          </div>
        </div>
      ))}
    </RadioGroup>
  );
};

export default RadioGroupComponent;
