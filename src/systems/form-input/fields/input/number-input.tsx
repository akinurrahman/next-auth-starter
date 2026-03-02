import { Input } from '@ui/input';
import { ControllerRenderProps } from 'react-hook-form';

import { InputFieldProps } from '../../types';

interface NumberProps {
  props: InputFieldProps;
  field: ControllerRenderProps;
}

export function NumberInput({ props, field }: NumberProps) {
  return (
    <Input
      type="number"
      placeholder={props.placeholder}
      value={field.value ?? ''}
      ref={field.ref}
      onBlur={field.onBlur}
      disabled={props.disabled}
      onChange={e => {
        const val = e.target.value;

        if (val === '') {
          field.onChange('');
          return;
        }

        const num = Number(val);

        if (props.max === undefined || num <= props.max) {
          field.onChange(num);
        }
      }}
    />
  );
}
