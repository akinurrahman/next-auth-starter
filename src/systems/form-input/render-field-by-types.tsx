import { ControllerRenderProps } from 'react-hook-form';

import { CheckboxField } from './fields/check-box';
import { renderFileByVariant } from './fields/file-upload';
import { renderInputByType } from './fields/input';
import RadioGroupComponent from './fields/radio-group';
import { renderSelectByType } from './fields/select';
import SliderField from './fields/slider-field';
import SwitchField from './fields/switch-field';
import TextArea from './fields/text-area';
import { FormInputProps } from './types';

export function renderFieldByType(props: FormInputProps, field: ControllerRenderProps) {
  switch (props.fieldType) {
    case 'input':
      return renderInputByType(props, field);
    case 'textarea':
      return <TextArea props={props} field={field} />;
    case 'select':
      return renderSelectByType(props, field);
    case 'slider':
      return <SliderField props={props} />;
    case 'file':
      return renderFileByVariant(props, field);
    case 'checkbox':
      return <CheckboxField />;
    case 'switch':
      return <SwitchField props={props} />;
    case 'radio-group':
      return <RadioGroupComponent props={props} field={field} />;
    default:
      return null;
  }
}
