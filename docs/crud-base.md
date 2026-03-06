# CRUD Feature Guide — Base

> Read this file for every new feature, regardless of which form pattern you use.
> Then read [`crud-table.md`](./crud-table.md) and exactly one of [`crud-page-form.md`](./crud-page-form.md) or [`crud-dialog-form.md`](./crud-dialog-form.md).

---

## 1. Pre-Implementation Checklist

Before writing any components, create these four files manually. They represent your feature's data contract and are never generated — they come from the API spec and your product requirements.

| File | Purpose |
|---|---|
| `hooks/use-<feature>.ts` | All API hooks (useQuery / useMutation) + aggregator |
| `definitions/<feature>.constants.ts` | `createLookup` constants for enums/statuses |
| `definitions/<feature>.types.ts` | Response types and `ListQueryParams` shape |
| `definitions/<feature>.schema.ts` | Zod schema + inferred `Input` type |

Once those exist, follow the rest of this guide to implement the UI layer.

---

## 2. Feature Folder Layout

Domain is **optional**. Use a domain when the feature belongs to a broad topic area (e.g. `academics-management`); omit it for standalone features.

```
# with domain
src/features/<domain>/<feature-name>/

# without domain
src/features/<feature-name>/
```

**Standard (full-page form) structure:**

```
<feature-name>/
├── components/
│   ├── <feature>-column.tsx      # Column factory function
│   └── <feature>-table.tsx       # DataTable wrapper (dumb)
├── definitions/
│   ├── <feature>.constants.ts    # createLookup enums
│   ├── <feature>.schema.ts       # Zod schema + Input type
│   └── <feature>.types.ts        # Response types, query param type
├── hooks/
│   ├── use-<feature>.ts          # API hooks + useXxxQuery aggregator
│   └── use-<feature>-form.ts     # Form logic (create/edit duality)
└── pages/
    ├── <feature>-list.tsx        # List page component
    └── <feature>-form.tsx        # Create/Edit page component
```

**Dialog variant structure** (for 1–2 field forms — drop `pages/`, add `<feature>-dialog.tsx`):

```
<feature-name>/
├── components/
│   ├── <feature>-column.tsx
│   ├── <feature>-table.tsx
│   └── <feature>-dialog.tsx   ← create/edit dialog (replaces pages/)
├── definitions/
│   └── ...
└── hooks/
    ├── use-<feature>.ts
    └── use-<feature>-form.ts
```

No extra App route files are needed beyond the list page — create and edit open as dialogs on the same page.

---

## 3. Next.js App Routes (`src/app/(protected)/...`)

Route pages are **always thin** — no logic, no hooks, one import, one JSX render.

```tsx
// src/app/(protected)/<feature>/page.tsx
import React from 'react';
import FeatureList from '@/features/<domain?>/<feature>/pages/<feature>-list';

export default function Page() {
  return <FeatureList />;
}
```

**Standard only** — also create these two routes:

```tsx
// src/app/(protected)/<feature>/create/page.tsx
import React from 'react';
import FeatureForm from '@/features/<domain?>/<feature>/pages/<feature>-form';

export default function Page() {
  return <FeatureForm />;
}
```

```tsx
// src/app/(protected)/<feature>/[featureId]/edit/page.tsx
import React from 'react';
import FeatureForm from '@/features/<domain?>/<feature>/pages/<feature>-form';

export default function Page() {
  return <FeatureForm />;
}
```

> **Dialog variant:** Only create the list route (`page.tsx`). Skip `/create` and `/[featureId]/edit` entirely — create and edit are handled by a dialog on the list page.

---

## 4. `definitions/<feature>.constants.ts`

```typescript
import { createLookup } from '@/lib/lookup';

export const FeatureStatus = createLookup({
  DRAFT:  { label: 'Draft',  badgeVariant: 'warning'     },
  ACTIVE: { label: 'Active', badgeVariant: 'success'     },
  CLOSED: { label: 'Closed', badgeVariant: 'destructive' },
} as const);

export type FeatureStatusType = keyof typeof FeatureStatus.config;
```

`createLookup` returns:
- `.keys` — `{ DRAFT: 'DRAFT', ACTIVE: 'ACTIVE', ... }`
- `.options` — `[{ value: 'DRAFT', label: 'Draft' }, ...]` → use in `QueryParamSelect` and form selects
- `.getLabel(value)` — display string
- `.getBadgeVariant(value)` — badge variant string
- `.toZodEnum()` — `z.enum([...])`

---

## 5. `definitions/<feature>.types.ts`

```typescript
import { FeatureStatusType } from './feature.constants';

export type FeatureListQueryParams = {
  page?: string;
  limit?: string;
  search?: string;
  status?: FeatureStatusType;
};
```

**Where entity types live:**
- Feature-specific entities (e.g. `Feature`) — declare or re-export them in `definitions/<feature>.types.ts`.
- Shared pagination/response wrappers (`Pagination`, `ApiResponse<T>`, `PaginatedApiResponse<T>`) — import from `@/types`.

---

## 6. `definitions/<feature>.schema.ts`

```typescript
import z from 'zod';
import { dateToISO } from '@/validators/common.schema';

export const featureSchema = z.object({
  name:      z.string().min(3, 'Name must be at least 3 characters'),
  startDate: dateToISO('Start date'),   // use dateToISO for date fields
  // ...
});

export type FeatureInput = z.infer<typeof featureSchema>;
```

---

## 7. `hooks/use-<feature>.ts`

All API hooks live here, plus the **aggregator hook** `useFeatureQuery` consumed by the list page.

**Aggregator placement rule:**
- Keep `useFeatureQuery` in this file by default — it is tightly coupled to the query hooks here.
- Only extract mutations if this file grows beyond ~150 lines or 6+ mutations; in that case move mutations to `use-<feature>-mutations.ts` and keep query hooks (including the aggregator) here.

```typescript
import { useSearchParams } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiCall } from '@/lib/api/api-call';
import { buildQuery } from '@/lib/utils';
import { ApiResponse, PaginatedApiResponse } from '@/types';
import { Feature } from '../definitions/feature.types';
import { FeatureInput } from '../definitions/feature.schema';
import { FeatureListQueryParams } from '../definitions/feature.types';
import { FeatureStatusType } from '../definitions/feature.constants';

const BASE = `/institution/features`;   // actual REST base path

export const useGetFeatures = (query: FeatureListQueryParams) => {
  const queryString = buildQuery(query);
  return useQuery<PaginatedApiResponse<Feature>>({
    queryKey: [BASE, queryString],
    queryFn: () => apiCall(`${BASE}?${queryString}`),
  });
};

export const useGetFeatureById = (id: string | undefined) =>
  useQuery<ApiResponse<Feature>>({
    queryKey: [BASE, id],
    queryFn: () => apiCall(`${BASE}/${id}`),
    enabled: Boolean(id),
  });

export const useCreateFeature = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, unknown, FeatureInput>({
    mutationFn: data => apiCall(BASE, data, 'POST'),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [BASE] }),
  });
};

export const useUpdateFeature = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, unknown, { data: FeatureInput; featureId: string }>({
    mutationFn: ({ data, featureId }) => apiCall(`${BASE}/${featureId}`, data, 'PATCH'),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [BASE] }),
  });
};

export const useDeleteFeature = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, unknown, string>({
    mutationFn: id => apiCall(`${BASE}/${id}`, {}, 'DELETE'),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [BASE] }),
  });
};

// Aggregator — consumed only by the list page
export const useFeatureQuery = () => {
  const searchParams = useSearchParams();
  const page   = searchParams.get('page')   || '1';
  const limit  = searchParams.get('limit')  || '10';
  const search = searchParams.get('search') || '';
  const status = (searchParams.get('status') as FeatureStatusType) || undefined;

  const { data, isPending } = useGetFeatures({ page, limit, status, search });
  return {
    data:       data?.data || [],
    isLoading:  isPending,
    pagination: data?.pagination,
  };
};
```

`apiCall(endpoint, data?, method?)` defaults to `'GET'`.

---

## 8. Shared Components Reference

### `PageHeader`

```tsx
// List page — icon, no back button
<PageHeader title="Title" description="Subtitle" icon={<Icon />} />

// Form page — back button, no icon
<PageHeader
  title={isEditMode ? 'Edit X' : 'Create X'}
  description="..."
  onBack={() => router.push(isEditMode ? nav.back(pathname, 2) : nav.back(pathname))}
/>
```

### `BreadcrumpSetter`

```tsx
<BreadcrumpSetter items={[
  { title: 'Parent', url: '/parent' },
  { title: 'Current', url: '#' },
]} />
```

Always the **first child** inside `<Card>`.

### `ActionButtons`

```tsx
<ActionButtons
  isSubmitting={isSubmitting}
  onReset={form.reset}
  saveLabel="Save Changes"  // optional
  onCancel={onClose}        // dialog variant only
/>
```

### `SearchInput`

```tsx
<SearchInput
  placeholder="Search..."
  searchParam="search"    // optional, default 'search'
  className="md:min-w-xs"
/>
```

### `QueryParamSelect`

Use for a **single** enum/status filter inline in the toolbar:

```tsx
<QueryParamSelect
  paramKey="status"
  options={FeatureStatus.options}  // [{ value, label }]
  includeAllOption
/>
```

### `FilterPopover`

Use when there are **2 or more filters** — replaces all `QueryParamSelect` instances with a single popover button:

```tsx
import { FilterPopover } from '@/systems/filters/components/filter-popover';
import { FilterConfig } from '@/systems/filters/types';

const filterConfig: FilterConfig[] = [
  {
    key: 'status',
    label: 'Status',
    type: 'select',
    span: { mobile: 'full', desktop: 'half' },
    options: FeatureStatus.options,
    defaultValue: '',
  },
  {
    key: 'startDate',
    label: 'Start Date',
    type: 'date',
    span: { mobile: 'full', desktop: 'half' },
  },
];

// in JSX toolbar (replaces all QueryParamSelect):
<FilterPopover config={filterConfig} />
```

**Filter type options:** `'select'` · `'radio'` · `'date'` · `'switch'`  
**Span options:** `'full'` · `'half'` · `{ mobile: 'full' | 'half', desktop: 'full' | 'half' }`

### `DataTable`

```tsx
import { DataTable } from '@/systems/data-table';

<DataTable data={data} columns={columns} pagination={pagination} isLoading={isLoading} />
```

### `FormInput`

```tsx
import { FormInput } from '@form-input';

<FormInput fieldType="input"    name="name"        placeholder="..." />
<FormInput fieldType="input"    type="date" name="startDate"  placeholder="..." />
<FormInput fieldType="textarea" name="description" placeholder="..." />
<FormInput fieldType="select"   name="status" options={FeatureStatus.options} placeholder="..." />
```

Must be placed inside `<FormProvider>`.

### `useConfirmation`

```tsx
import { useConfirmation } from '@/systems/confirmation/hooks/use-confirmation';

const { confirm } = useConfirmation<ItemType>();

confirm({
  title: 'Confirm Action',
  description: 'Are you sure?',
  item: theItem,
  variant: 'destructive' | 'confirm',
  onConfirm: async () => { /* mutation */ },
});
```

---

## 9. `lib/` Utilities

| Function | Signature | Notes |
|---|---|---|
| `apiCall` | `(endpoint, data?, method?)` | Default `GET`. Import from `@/lib/api/api-call`. |
| `buildQuery` | `(params: Record<string, ...>)` | Skips falsy values. Returns query string. |
| `getErrorMessage` | `(error: unknown)` | Extracts readable string from Axios/Error/unknown. |
| `formatDate` | `(date, format?)` | date-fns wrapper. Default `'dd MMM yyyy, hh:mm a'`. Use `'dd MMM, yyyy'` in tables, `'yyyy-MM-dd'` for form defaults. |
| `formatCurrency` | `(value, currency?)` | INR by default. |
| `cn` | `(...classes)` | clsx + tailwind-merge. |
| `nav` | `nav.create(pathname)`, `nav.edit(pathname, id)`, `nav.back(pathname, depth?)` | Import from `@/lib/navigation`. Builds absolute routes from current `pathname`. |
| `useModalState` | `useModalState<T>()` → `{ open, item, openModal, closeModal, hasItem }` | Import from `@/hooks/use-modal-state`. Call `openModal()` for create, `openModal(item)` for edit. |

---

## 10. Import Path Aliases

| Alias | Resolves to |
|---|---|
| `@ui/<component>` | `src/components/ui/<component>` |
| `@form-input` | Form input system |
| `@/lib/...` | `src/lib/...` |
| `@/components/shared` | `src/components/shared/index.ts` |
| `@/systems/data-table` | DataTable system |
| `@/systems/confirmation/...` | Confirmation dialog system |
| `@/systems/shared/query-param-select` | `QueryParamSelect` component — single filter only |
| `@/systems/filters/...` | `FilterPopover` + `FilterConfig` — use for 2+ filters |
| `@/types` | `Pagination`, `ApiResponse<T>`, `PaginatedApiResponse<T>` and other shared types |

---

## 11. Implementation Checklist

### Before you start

- [ ] `hooks/use-<feature>.ts` — API hooks + `useXxxQuery` aggregator written
- [ ] `definitions/<feature>.constants.ts` — all `createLookup` configs defined
- [ ] `definitions/<feature>.types.ts` — entity type + `ListQueryParams` type defined
- [ ] `definitions/<feature>.schema.ts` — Zod schema + `Input` type defined

### Standard (full-page form)

1. `components/<feature>-column.tsx`
2. `components/<feature>-table.tsx`
3. `hooks/use-<feature>-form.ts`
4. `pages/<feature>-list.tsx`
5. `pages/<feature>-form.tsx`
6. App routes: `page.tsx`, `create/page.tsx`, `[featureId]/edit/page.tsx`

### Dialog variant

1. `components/<feature>-column.tsx`
2. `components/<feature>-table.tsx`
3. `hooks/use-<feature>-form.ts`
4. `components/<feature>-dialog.tsx`
5. `pages/<feature>-list.tsx`
6. App route: `page.tsx` only
