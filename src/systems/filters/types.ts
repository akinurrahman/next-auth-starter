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

export interface FilterConfig {
  key: string;
  label: string;
  type: FilterType;
  span?: 'full' | 'half';
  options?: FilterOption[];
  defaultValue?: string;
  disabled?: boolean;
  orientation?: 'horizontal' | 'vertical'; // for radio type
}
