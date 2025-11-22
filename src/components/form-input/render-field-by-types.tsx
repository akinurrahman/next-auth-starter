import { ControllerRenderProps } from 'react-hook-form';

import { CheckboxField } from './fields/check-box';
import { renderInputByType } from './fields/input';
import RadioGroupComponent from './fields/radio-group';
import SelectField from './fields/select-field';
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
      return <SelectField props={props} field={field} />;
    case 'slider':
      return <SliderField props={props} />;
    // case "file":
    //   return renderFileByVariant(props);
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
