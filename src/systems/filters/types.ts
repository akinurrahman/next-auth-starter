export type FilterType = 'date' | 'select' | 'radio' | 'switch';

export type DateDisplayFormat =
  | 'PPP' // Jan 5, 2025
  | 'PP' // Jan 5, 2025 (short)
  | 'P' // 01/05/2025
  | 'dd/MM/yyyy' // 05/01/2025
  | 'yyyy-MM-dd'; // 2025-01-05

export interface FilterOption {
  label: string;
  value: string;
}

export type SpanValue = 'full' | 'half';

export interface ResponsiveSpan {
  mobile?: SpanValue;
  desktop?: SpanValue;
}

export interface FilterConfig {
  key: string;
  label: string;
  type: FilterType;
  span?: SpanValue | ResponsiveSpan;
  options?: FilterOption[];
  defaultValue?: string;
  disabled?: boolean;
  orientation?: 'horizontal' | 'vertical'; // for radio type
  placeholder?: string; // for select type
  /** Key of the parent filter this field depends on. When the parent value changes, this field's value is cleared automatically. */
  dependsOn?: string;
  /** When true, the field is always rendered even if its `dependsOn` parent has no value selected. The clear-on-parent-change behaviour still applies. Defaults to false (field is hidden until parent is set). */
  alwaysVisible?: boolean;
  /** Dynamic options callback. Receives the current draft filter state. Overrides `options` when provided. Only applies to `select` type. */
  optionsFn?: (filters: Record<string, string | undefined>) => FilterOption[];
}
