# Filters Feature

A reusable filtering system with URL state management for Next.js applications.

## Quick Start

```tsx
import { FilterPopover } from '@/features/filters/components/filter-popover';
import { FilterConfig } from '@/features/filters/types';

const config: FilterConfig[] = [
  {
    key: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { label: 'All', value: 'all' },
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
    ],
    defaultValue: 'all',
  },
  {
    key: 'date',
    label: 'Date',
    type: 'date',
  },
];

export function MyPage() {
  return <FilterPopover config={config} />;
}
```

## Filter Types

### Select Dropdown
```tsx
{
  key: 'role',
  label: 'Role',
  type: 'select',
  options: [
    { label: 'Admin', value: 'admin' },
    { label: 'User', value: 'user' },
  ],
}
```

### Radio Group
```tsx
{
  key: 'status',
  label: 'Status',
  type: 'radio',
  orientation: 'horizontal', // or 'vertical'
  options: [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
  ],
}
```

### Date Picker
```tsx
{
  key: 'createdAt',
  label: 'Created Date',
  type: 'date',
  span: 'full', // takes full width
}
```

### Switch
```tsx
{
  key: 'verified',
  label: 'Email Verified',
  type: 'switch',
}
```

## Using the Hook

```tsx
import { useFilters } from '@/features/filters/hooks/use-filters';

const { filters, applyFilters, clearAll, activeCount } = useFilters(config);

// Access filter values
console.log(filters.status); // 'active'

// Update filters programmatically
applyFilters({ status: 'inactive' });

// Clear all filters
clearAll();
```

## Configuration Options

```typescript
interface FilterConfig {
  key: string;                    // URL param key
  label: string;                  // Display label
  type: 'date' | 'select' | 'radio' | 'switch';
  span?: 'full' | 'half';         // Width (default: 'half')
  options?: FilterOption[];       // For select/radio
  defaultValue?: string;          // Default value
  disabled?: boolean;             // Disable filter
  orientation?: 'horizontal' | 'vertical'; // For radio
}
```
