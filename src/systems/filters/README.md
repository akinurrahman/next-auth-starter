# Filters System

A reusable filtering system with URL state management for Next.js applications.

## Quick Start

```tsx
import { FilterPopover } from '@/systems/filters/components/filter-popover';
import { FilterConfig } from '@/systems/filters/types';

const config: FilterConfig[] = [
  {
    key: 'status',
    label: 'Status',
    type: 'select',
    span: { mobile: 'full', desktop: 'half' },
    options: [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
    ],
    defaultValue: '',
  },
  {
    key: 'date',
    label: 'Date',
    type: 'date',
    span: { mobile: 'full', desktop: 'half' },
  },
];

export function MyPage() {
  return <FilterPopover config={config} />;
}
```

---

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
  span: { mobile: 'full', desktop: 'half' },
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

---

## Cascading (Dependent) Selects

Fields can depend on other fields using `dependsOn` and `optionsFn`. When the parent field's value changes inside the popover:
- The child's value is **automatically cleared**
- The child's options update via `optionsFn` on every render
- The child field is **hidden** until the parent has a value (unless `alwaysVisible: true` is set)
- Clearing cascades recursively: A → B → C all clear when A changes

### Basic cascade (hidden until parent selected)

```tsx
// parent
{
  key: 'classInstanceId',
  label: 'Class',
  type: 'select',
  options: classOptions,
},
// child — hidden until a class is selected
{
  key: 'sectionId',
  label: 'Section',
  type: 'select',
  dependsOn: 'classInstanceId',
  optionsFn: (filters) =>
    filters.classInstanceId
      ? sectionsData?.filter(s => s.classId === filters.classInstanceId)
          .map(s => ({ value: s.id, label: s.name })) ?? []
      : [],
},
```

### Always-visible child (clear only, no hide)

Use `alwaysVisible: true` when the child should always be shown but still auto-clear when its parent changes (e.g. class list should always be visible but must reload when academic year changes).

```tsx
{
  key: 'classInstanceId',
  label: 'Class',
  type: 'select',
  dependsOn: 'academicYearId',   // clears + options reload when year changes
  alwaysVisible: true,            // but don't hide it when year is unset
  optionsFn: (filters) =>
    classInstances?.map(c => ({ value: c.id, label: c.name })) ?? [],
},
```

### Fetching dependent options live (before Apply)

When dependent options come from an API, use `onTempFilterChange` on `FilterPopover` to react to in-popover selections before the user hits **Apply**. This lets you trigger a fetch while the popover is still open.

```tsx
const [tempYearId, setTempYearId] = useState(searchParams.get('academicYearId') ?? '');
const [tempClassId, setTempClassId] = useState(searchParams.get('classInstanceId') ?? '');

const { data: classInstances } = useGetClassInstances({ academicYear: tempYearId });
const { data: sections } = useGetSections({ classInstanceId: tempClassId });

const handleTempFilterChange = useCallback(
  (filters: Record<string, string | undefined>) => {
    setTempYearId(filters.academicYearId ?? defaultYearId);
    setTempClassId(filters.classInstanceId ?? '');
  },
  [defaultYearId]
);

const filterConfig: FilterConfig[] = [
  {
    key: 'academicYearId',
    label: 'Academic Year',
    type: 'select',
    options: yearOptions,
  },
  {
    key: 'classInstanceId',
    label: 'Class',
    type: 'select',
    dependsOn: 'academicYearId',
    alwaysVisible: true,
    options: classInstances?.map(c => ({ value: c.id, label: c.name })) ?? [],
  },
  {
    key: 'sectionId',
    label: 'Section',
    type: 'select',
    dependsOn: 'classInstanceId',
    optionsFn: (filters) =>
      filters.classInstanceId
        ? sections?.map(s => ({ value: s.id, label: s.name })) ?? []
        : [],
  },
];

return (
  <FilterPopover
    config={filterConfig}
    onTempFilterChange={handleTempFilterChange}
  />
);
```

### Multi-level cascades (A → B → C)

Clearing cascades **recursively** — when A changes, B is cleared, and because B changed, C is also cleared, all in one state update. Just define each field's `dependsOn` pointing to its direct parent.

```tsx
// A → B → C
{ key: 'country' },
{ key: 'state',  dependsOn: 'country' },
{ key: 'city',   dependsOn: 'state' },
// Changing country clears both state and city automatically.
```

---

## `FilterPopover` Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `config` | `FilterConfig[]` | ✓ | Array of filter field definitions |
| `onTempFilterChange` | `(filters) => void` | — | Called on every in-popover draft change. Use to fetch dependent options before Apply. |

---

## `FilterConfig` Reference

```typescript
interface FilterConfig {
  key: string;               // URL search param key
  label: string;             // Field label shown in the popover
  type: 'date' | 'select' | 'radio' | 'switch';
  span?: 'full' | 'half' | ResponsiveSpan; // Grid width (default: 'half')
  options?: FilterOption[];  // Static options (for select / radio)
  defaultValue?: string;     // Value applied when the URL param is absent
  disabled?: boolean;        // Renders the field as non-interactive
  orientation?: 'horizontal' | 'vertical'; // Radio layout (default: 'vertical')
  placeholder?: string;      // Select placeholder text

  // Cascading
  dependsOn?: string;        // Key of the parent field. Child value clears when parent changes.
  alwaysVisible?: boolean;   // When true, the field is always rendered even if its parent has no value. Default: false.
  optionsFn?: (filters: Record<string, string | undefined>) => FilterOption[];
                             // Dynamic options for 'select'. Receives current draft filter state. Overrides `options` when provided.
}

interface FilterOption {
  label: string;
  value: string;
}

interface ResponsiveSpan {
  mobile?: 'full' | 'half';  // Default: 'full'
  desktop?: 'full' | 'half'; // Default: 'half'
}
```

### Span quick reference

| Value | Mobile | Desktop |
|---|---|---|
| `'half'` | half | half |
| `'full'` | full | full |
| `{ mobile: 'full', desktop: 'half' }` | full | half |
| `{ mobile: 'half', desktop: 'full' }` | half | full |

---

## `useFilters` Hook

```tsx
import { useFilters } from '@/systems/filters/hooks/use-filters';

const { filters, applyFilters, clearAll, activeCount } = useFilters(config);

filters.status        // current value from URL, e.g. 'active'
activeCount           // number of active (non-empty, non-disabled) filters
applyFilters({ status: 'inactive' }); // batch-update URL params
clearAll();           // remove all filter params from URL
```

