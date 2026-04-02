# createLookup

A small utility to define enum-like UI mappings (label, badge, icon, classes) with a safe way to handle messy backend values.

---

## Define a lookup

```ts
import { createLookup } from '@/lib/lookup';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

export const OrderStatus = createLookup({
  completed: {
    label: 'Completed',
    badgeVariant: 'success',
    icon: CheckCircle,
  },
  pending: {
    label: 'Pending',
    badgeVariant: 'warning',
    icon: Clock,
  },
  cancelled: {
    label: 'Cancelled',
    badgeVariant: 'destructive',
    icon: XCircle,
  },
  processing: {
    label: 'Processing',
    badgeVariant: 'default',
    icon: Clock,
    iconClassName: 'animate-spin',
  },
} as const);

export type OrderStatusType = keyof typeof OrderStatus.config;
```

---

## Use in UI

```tsx
const item = OrderStatus.resolve(rawValue);

const Icon = item?.icon;
const iconClass = item?.iconClassName ?? '';

<Badge variant={item?.badgeVariant ?? 'default'}>
  {Icon && <Icon className={`w-3 h-3 mr-1 ${iconClass}`} />}
  {item?.label ?? String(rawValue ?? '')}
</Badge>
```

---

## What you get

- `config` → original config
- `keys` → `{ key: 'key' }`
- `values` → `['key1', 'key2']`
- `options` → `[{ value, label }]` (use in selects/filters)
- `resolve(value)` → safely handle `string | null | undefined`
- `toZodEnum()` → `z.enum([...])`

---

## Notes

- Use `resolve()` for anything coming from API or user input
- It returns `null` (and logs a warning) if value is invalid
- Keep lookup as a data layer, not a place for UI logic
- Access fields directly from the resolved item (`item?.label`, `item?.icon`, etc.)
