export interface BaseFieldProps {
  name: string;
  label?: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  title?: string;
  max?: number;
  className?: string;
}

export interface InputFieldProps extends BaseFieldProps {
  fieldType: 'input';
  type?: 'text' | 'number' | 'multi-item' | 'password' | 'date' | 'time';
}

export interface TextareaFieldProps extends BaseFieldProps {
  fieldType: 'textarea';
  rows?: number;
  maxLength?: number;
}

interface Select {
  label: string;
  value: string;
}

export interface SelectFieldProps extends BaseFieldProps {
  fieldType: 'select';
  options: Select[];
}
export interface SliderFieldProps extends BaseFieldProps {
  fieldType: 'slider';
  sliderLabel: string;
  suffix: string;
  marks?: number[];
  max: number;
}

export interface FileUploadProps extends BaseFieldProps {
  fieldType: 'file';
  accept?: string;
  FileDescription?: string;
  variant: 'v1' | 'v2' | 'v3';
  multiple?: boolean;
}
export interface CheckBoxProps extends BaseFieldProps {
  fieldType: 'checkbox';
}
export interface SwitchFieldProps extends BaseFieldProps {
  fieldType: 'switch';
  details?: string;
}
export interface RadioGroupProps extends BaseFieldProps {
  fieldType: 'radio-group';
  options: {
    value: string;
    label: string;
    description: string;
  }[];
}

export type FormInputProps =
  | InputFieldProps
  | TextareaFieldProps
  | SelectFieldProps
  | SliderFieldProps
  | FileUploadProps
  | CheckBoxProps
  | SwitchFieldProps
  | RadioGroupProps;
