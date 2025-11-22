import { Input } from '@ui/input';
import { ControllerRenderProps } from 'react-hook-form';

import { InputFieldProps } from '../../types';

interface TextInputProps {
  props: InputFieldProps;
  field: ControllerRenderProps;
}

export function DefaultInput({ props, field }: TextInputProps) {
  return (
    <Input
      type={props.type || 'text'}
      placeholder={props.placeholder}
      {...field}
      value={field.value || ''}
      disabled={props.disabled}
      className={props.className}
    />
  );
}
