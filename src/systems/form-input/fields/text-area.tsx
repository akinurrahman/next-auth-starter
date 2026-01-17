import React from 'react';

import { Textarea } from '@ui/textarea';
import { ControllerRenderProps } from 'react-hook-form';

import { TextareaFieldProps } from '../types';

interface TextAreaProps {
  props: TextareaFieldProps;
  field: ControllerRenderProps;
}

const TextArea = ({ props, field }: TextAreaProps) => {
  return (
    <Textarea
      placeholder={props.placeholder}
      rows={props.rows}
      maxLength={props.maxLength}
      {...field}
      disabled={props.disabled}
      className={props.className}
    />
  );
};

export default TextArea;
