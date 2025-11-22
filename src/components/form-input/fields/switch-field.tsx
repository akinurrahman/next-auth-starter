'use client';

import React from 'react';

import { Switch } from '@ui/switch';
import { useFormContext } from 'react-hook-form';

import { SwitchFieldProps } from '../types';

interface SwitchProps {
  props: SwitchFieldProps;
}

const SwitchField = ({ props }: SwitchProps) => {
  const { getValues, setValue } = useFormContext();
  const isChecked = getValues(props.name) || false;

  const onToggle = () => {
    setValue(props.name, !isChecked);
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex-1 space-y-0.5">
        {props.title && <h4 className="text-sm leading-none font-medium">{props.title}</h4>}
        {props.details && <p className="text-muted-foreground text-sm">{props.details}</p>}
      </div>
      <Switch
        id={props.name}
        checked={isChecked}
        onCheckedChange={onToggle}
        disabled={props.disabled}
      />
    </div>
  );
};

export default SwitchField;
