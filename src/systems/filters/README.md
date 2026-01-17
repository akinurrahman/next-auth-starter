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
    // Responsive span: full width on mobile, half width on desktop
    span: { mobile: 'full', desktop: 'half' },
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
    // Responsive span: full width on mobile, half width on desktop
    span: { mobile: 'full', desktop: 'half' },
  },
  {
    key: 'category',
    label: 'Category',
    type: 'select',
    // Simple string value still works (defaults to this value on all screens)
    span: 'full',
    options: [
      { label: 'All Categories', value: 'all' },
      { label: 'Technology', value: 'tech' },
      { label: 'Business', value: 'business' },
    ],
    defaultValue: 'all',
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
  span: 'full', // takes full width on all screens
}
```

### Date Picker (Responsive)
```tsx
{
  key: 'createdAt',
  label: 'Created Date',
  type: 'date',
  span: { mobile: 'full', desktop: 'half' }, // full on mobile, half on desktop
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
  span?: 'full' | 'half' | ResponsiveSpan; // Width (default: 'half')
  options?: FilterOption[];       // For select/radio
  defaultValue?: string;          // Default value
  disabled?: boolean;             // Disable filter
  orientation?: 'horizontal' | 'vertical'; // For radio
}

interface ResponsiveSpan {
  mobile?: 'full' | 'half';       // Mobile width (default: 'full')
  desktop?: 'full' | 'half';      // Desktop width (default: 'half')
}
```

### Span Options

**Simple String:**
- `'half'` - Half width on all screen sizes
- `'full'` - Full width on all screen sizes

**Responsive Object:**
- `{ mobile: 'full', desktop: 'half' }` - Full on mobile, half on desktop (recommended)
- `{ mobile: 'half', desktop: 'full' }` - Half on mobile, full on desktop
- `{ mobile: 'full' }` - Full on mobile, defaults to half on desktop
- `{ desktop: 'half' }` - Defaults to full on mobile, half on desktop
