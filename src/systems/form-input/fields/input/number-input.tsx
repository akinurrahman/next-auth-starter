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
      onChange={e => field.onChange(e.target.value === '' ? '' : Number(e.target.value))}
      onBlur={field.onBlur}
      value={field.value ?? ''}
      ref={field.ref}
    />
  );
}
