import type React from 'react';

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
  /** Key of the parent form field. When the parent's value changes, this field's value is automatically cleared. Supports recursive chains (A → B → C). */
  dependsOn?: string;
  /** When `dependsOn` is set, the field is hidden until the parent has a value. Set `alwaysVisible: true` to keep the field visible while still auto-clearing and reacting to the parent. Default: false (field is hidden). */
  alwaysVisible?: boolean;
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

export interface SelectOption {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface SingleSelectFieldProps extends BaseFieldProps {
  fieldType: 'select';
  type?: never;
  /** Static options list. Optional when `optionsFn` is provided. */
  options?: SelectOption[];
  /** Dynamic options callback. Receives the full current form values. Overrides `options` when provided. */
  optionsFn?: (formValues: Record<string, unknown>) => SelectOption[];
}

export interface MultiSelectFieldProps extends BaseFieldProps {
  fieldType: 'select';
  type: 'multi-select';
  /** Static options list. Optional when `optionsFn` is provided. */
  options?: SelectOption[];
  modalPopover?: boolean;
  maxCount?: number;
  showSelectAll?: boolean;
  /** Dynamic options callback. Receives the full current form values. Overrides `options` when provided. */
  optionsFn?: (formValues: Record<string, unknown>) => SelectOption[];
}

export type SelectFieldProps = SingleSelectFieldProps | MultiSelectFieldProps;
export interface SliderFieldProps extends BaseFieldProps {
  fieldType: 'slider';
  sliderLabel: string;
  suffix: string;
  marks?: number[];
  max: number;
}

export type FileUploadCategory = 'student_photo' | 'institution_logo' | 'document';

export interface FileUploadProps extends BaseFieldProps {
  fieldType: 'file';
  accept?: string;
  fileDescription?: string;
  variant: 'v1' | 'v2' | 'v3';
  multiple?: boolean;
  category: FileUploadCategory;
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
  | SingleSelectFieldProps
  | MultiSelectFieldProps
  | SliderFieldProps
  | FileUploadProps
  | CheckBoxProps
  | SwitchFieldProps
  | RadioGroupProps;
