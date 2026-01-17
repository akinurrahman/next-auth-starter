'use client';

import React, { useEffect, useState } from 'react';

import { Label } from '@ui/label';
import { Slider } from '@ui/slider';
import { useFormContext } from 'react-hook-form';

import { SliderFieldProps } from '../types';

interface SliderProps {
  props: SliderFieldProps;
}

const SliderField = ({ props }: SliderProps) => {
  const { setValue, watch } = useFormContext();
  const formValue = watch(props.name);
  const [sliderValue, setSliderValue] = useState<number[]>([100]);

  useEffect(() => {
    setSliderValue([formValue]);
  }, [formValue]);

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value);
    setValue(props.name, value[0]); // Update form value
  };
  return (
    <div className="grid gap-3">
      <div className="flex justify-between">
        <Label htmlFor="stock">
          {props.sliderLabel} {props.required && <span className="text-destructive">*</span>}
        </Label>
        <span className="text-sm font-medium">
          {sliderValue[0]} {props.suffix}
        </span>
      </div>
      <Slider
        id="stock"
        value={sliderValue}
        onValueChange={handleSliderChange}
        max={props.max}
        step={1}
        className="py-4"
      />
      <div className="text-muted-foreground flex justify-between text-sm">
        {props.marks?.map((mark, index) => (
          <span key={index}>{mark}</span>
        ))}
      </div>
    </div>
  );
};

export default SliderField;
