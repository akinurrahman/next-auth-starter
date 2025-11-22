// Define a union type for all possible field types
export type FieldType = 'input' | 'select' | 'date' | 'checkbox' | 'number' | 'textarea';

// Base meta interface
export interface BaseColumnMeta {
  editable?: boolean;
  fieldType: FieldType;
}

// Type for select fields that require options
export interface SelectColumnMeta extends BaseColumnMeta {
  fieldType: 'select';
  options: { label: string; value: string }[];
}

// Type for number fields with optional min/max/step
export interface NumberColumnMeta extends BaseColumnMeta {
  fieldType: 'number';
  min?: number;
  max?: number;
  step?: number;
}

// Type for date fields with optional format
export interface DateColumnMeta extends BaseColumnMeta {
  fieldType: 'date';
  format?: string;
}

// Type for textarea fields with optional rows
export interface TextareaColumnMeta extends BaseColumnMeta {
  fieldType: 'textarea';
  rows?: number;
}

// Type for input fields with optional placeholder
export interface InputColumnMeta extends BaseColumnMeta {
  fieldType: 'input';
  placeholder?: string;
}

// Type for checkbox fields
export interface CheckboxColumnMeta extends BaseColumnMeta {
  fieldType: 'checkbox';
}

// Union type for all possible meta types
export type CustomColumnMeta =
  | SelectColumnMeta
  | NumberColumnMeta
  | DateColumnMeta
  | TextareaColumnMeta
  | InputColumnMeta
  | CheckboxColumnMeta;
