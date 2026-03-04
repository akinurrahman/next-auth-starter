# Feature Implementation Guide

> Source of truth for implementing CRUD features in this codebase.  
> Attach this file to every AI session before asking it to implement a feature.

---

## 1. What You (the developer) provide before asking AI

For each new feature, you create these files manually (AI must NOT touch them):

| File | Purpose |
|---|---|
| `hooks/use-<feature>.ts` | All API hooks (useQuery / useMutation) + aggregator |
| `definitions/<feature>.constants.ts` | `createLookup` constants for enums/statuses |
| `definitions/<feature>.types.ts` | Response types and `ListQueryParams` shape |
| `definitions/<feature>.schema.ts` | Zod schema + inferred `Input` type |

Once those exist, attach this file + those 4 files and ask AI to generate the rest.

---

## 2. Feature Folder Layout

Domain is **optional**. Use a domain when the feature belongs to a broad topic area; omit it for standalone features.

```
# with domain
src/features/<domain>/<feature-name>/

# without domain
src/features/<feature-name>/
```

Internal structure is always the same:

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

**Where entity types live:** This is a monorepo. AI must check both locations before deciding:
1. **`@valturex/contracts`** (shared package) — preferred source for entities used across apps (e.g. `AcademicYear`, `Pagination`, `ApiResponse<T>`, `PaginatedApiResponse<T>`)
2. **`definitions/<feature>.types.ts`** — for types that are local to this feature only

Never re-declare a type that already exists in `@valturex/contracts`. If the type is in the attached `definitions/` file, import it from there.

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

All API hooks live here, plus the **aggregator hook** `useFeatureQuery` used by the list page.

**Aggregator placement rule:**
- Keep `useFeatureQuery` in this file by default — it is tightly coupled to the get hooks here.
- Only extract it if this file grows beyond ~150 lines / 6+ mutations; in that case move mutations to `use-<feature>-mutations.ts` and keep query hooks (including the aggregator) here.

```typescript
import { useSearchParams } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// Check @valturex/contracts first; fall back to local definitions if the type is feature-local
import { Feature, ApiResponse, PaginatedApiResponse } from '@valturex/contracts';
import { apiCall } from '@/lib/api/api-call';
import { buildQuery } from '@/lib/utils';
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

## 8. `hooks/use-<feature>-form.ts`

```typescript
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/error';
import { formatDate } from '@/lib/format';
import { nav } from '@/lib/navigation';
import { FeatureInput, featureSchema } from '../definitions/feature.schema';
import { useCreateFeature, useGetFeatureById, useUpdateFeature } from './use-feature';

const defaultValues: FeatureInput = { name: '' };

// Map API response shape → form field values (handles date reformatting etc.)
const mapToFormValues = (data: FeatureInput): FeatureInput => ({
  name: data.name,
  // startDate: formatDate(data.startDate, 'yyyy-MM-dd'),
});

export const useFeatureForm = ({ featureId }: { featureId?: string }) => {
  const isEditMode = Boolean(featureId);
  const router = useRouter();
  const pathname = usePathname();
  const createMutation = useCreateFeature();
  const updateMutation = useUpdateFeature();
  const { data } = useGetFeatureById(featureId);

  const form = useForm<FeatureInput>({
    defaultValues,
    resolver: zodResolver(featureSchema),
  });

  useEffect(() => {
    if (isEditMode && data?.data) {
      form.reset(mapToFormValues(data.data));
    } else {
      form.reset(defaultValues);
    }
  }, [isEditMode, data]);

  const handleSubmit: SubmitHandler<FeatureInput> = async formData => {
    try {
      if (isEditMode && featureId) {
        await updateMutation.mutateAsync({ data: formData, featureId });
        toast.success('Updated successfully');
        router.push(nav.back(pathname, 2));
      } else {
        await createMutation.mutateAsync(formData);
        toast.success('Created successfully');
        router.push(nav.back(pathname));
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return {
    form,
    handleSubmit,
    isSubmitting: createMutation.isPending || updateMutation.isPending,
  };
};
```

**Navigation rules (always relative):**

| Current route | After success | Back button |
|---|---|---|
| `/create` | `router.push(nav.back(pathname))` | `router.push(nav.back(pathname))` |
| `/[id]/edit` | `router.push(nav.back(pathname, 2))` | `router.push(nav.back(pathname, 2))` |

---

## 9. `components/<feature>-column.tsx`

```tsx
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@ui/badge';
import { Button } from '@ui/button';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@ui/dropdown-menu';
import { Feature } from '@valturex/contracts';  // check the hook for import location. it might be from package if monorepo or it might be from loocal definations too. 
import { MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { formatDate } from '@/lib/format';
import { FeatureStatus } from '../definitions/feature.constants';

interface GetFeatureColumnsContext {
  onEdit:   (id: string)    => void;
  onDelete: (item: Feature) => void;
}

export const getFeatureColumns = (
  context: GetFeatureColumnsContext
): ColumnDef<Feature>[] => {
  const { onEdit, onDelete } = context;
  return [
    {
      id: 'slNo',
      header: '#',
      cell: ({ row }) => (
        <span className="text-muted-foreground">{row.index + 1}</span>
      ),
    },
    { accessorKey: 'name', header: 'Name' },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <Badge variant={FeatureStatus.getBadgeVariant(status)}>
            {FeatureStatus.getLabel(status)}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Created',
      cell: ({ row }) => (
        <span className="text-muted-foreground text-sm">
          {formatDate(row.original.createdAt, 'dd MMM, yyyy')}
        </span>
      ),
    },
    {
      header: 'Actions',
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(row.original.id)}>
              <Pencil className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(row.original)}>
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];
};
```

**Rules:**
- Always a named factory function `getXxxColumns(context)` — never a React component.
- All action handlers arrive via `context` — never call mutations here.
- Conditionally render menu items based on status when required (e.g. hide Edit when ACTIVE).

---

## 10. `components/<feature>-table.tsx`

```tsx
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Feature, Pagination } from '@valturex/contracts';  // or local definitions
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/error';
import { nav } from '@/lib/navigation';
import { useConfirmation } from '@/systems/confirmation/hooks/use-confirmation';
import { DataTable } from '@/systems/data-table';
import { useDeleteFeature } from '../hooks/use-feature';
import { getFeatureColumns } from './feature-column';

interface FeatureTableProps {
  data:       Feature[];
  pagination: Pagination | undefined;
  isLoading:  boolean;
}

const FeatureTable = ({ data, pagination, isLoading }: FeatureTableProps) => {
  const router = useRouter();
  const pathname = usePathname();
  
  const deleteMutation = useDeleteFeature();
  const { confirm } = useConfirmation<Feature>();

  const onEdit = (id: string) => {
    router.push(nav.edit(pathname, id));
  };

  const onDelete = (item: Feature) => {
    confirm({
      title: 'Delete Feature',
      description: `Are you sure you want to delete "${item.name}"?`,
      item,
      variant: 'destructive',
      onConfirm: async () => {
        try {
          await deleteMutation.mutateAsync(item.id);
          toast.success('Deleted successfully');
        } catch (error) {
          toast.error(getErrorMessage(error));
        }
      },
    });
  };

  const columns = getFeatureColumns({ onEdit, onDelete });
  return (
    <DataTable data={data} columns={columns} pagination={pagination} isLoading={isLoading} />
  );
};

export default FeatureTable;
```

**Rules:**
- Dumb component: receives data, passes to `DataTable`, wires handlers.
- All mutations happen here — NOT in column definitions.
- Navigation to edit uses `nav.edit(pathname, id)`.

---

## 11. `pages/<feature>-list.tsx`

```tsx
'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@ui/button';
import { Card, CardContent, CardHeader } from '@ui/card';
import { SomeIcon, PlusCircleIcon } from 'lucide-react';
import { SearchInput } from '@/components/shared';
import BreadcrumpSetter from '@/components/shared/breadcrump-setter';
import PageHeader from '@/components/shared/page-header';
import { nav } from '@/lib/navigation';
import { QueryParamSelect } from '@/systems/shared/query-param-select';
import FeatureTable from '../components/feature-table';
import { FeatureStatus } from '../definitions/feature.constants';
import { useFeatureQuery } from '../hooks/use-feature';

const FeatureList = () => {
  const router = useRouter();
  const pathname = usePathname();
  
  const { data, isLoading, pagination } = useFeatureQuery();

  return (
    <Card className="layout">
      <BreadcrumpSetter items={[{ title: 'Features', url: '#' }]} />
      <CardHeader>
        <PageHeader
          title="Features"
          description="List of all features"
          icon={<SomeIcon />}
        />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <SearchInput placeholder="Search features..." className="md:min-w-xs" />
            <QueryParamSelect
              paramKey="status"
              options={FeatureStatus.options}
              includeAllOption
            />
          </div>
          <Button onClick={() => router.push(nav.create(pathname))} variant="outline">
            <PlusCircleIcon /> Create Feature
          </Button>
        </div>
        <FeatureTable data={data} isLoading={isLoading} pagination={pagination} />
      </CardContent>
    </Card>
  );
};

export default FeatureList;
```

**Rules:**
- `'use client'` directive required.
- `BreadcrumpSetter` is always the first child inside `<Card>`.
- List page `PageHeader` gets `icon`, no `onBack`.
- Omit `QueryParamSelect` if the feature has no status/enum filter.

---

## 12. `pages/<feature>-form.tsx`

```tsx
'use client';

import React from 'react';
import { useParams, useRouter, usePathname } from 'next/navigation';
import { FormInput } from '@form-input';
import { Card, CardContent, CardHeader } from '@ui/card';
import { FormProvider } from 'react-hook-form';
import ActionButtons from '@/components/shared/action-buttons';
import PageHeader from '@/components/shared/page-header';
import { nav } from '@/lib/navigation';
import { useFeatureForm } from '../hooks/use-feature-form';

const FeatureForm = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams() as { featureId?: string };
  const { featureId } = params;
  const isEditMode = Boolean(featureId);

  const { form, handleSubmit, isSubmitting } = useFeatureForm({ featureId });

  return (
    <Card className="layout">
      <CardHeader>
        <PageHeader
          title={isEditMode ? 'Edit Feature' : 'Create Feature'}
          description={
            isEditMode ? 'Update the feature details.' : 'Add a new feature.'
          }
          onBack={() => router.push(isEditMode ? nav.back(pathname, 2) : nav.back(pathname))}
        />
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormInput fieldType="input" name="name" placeholder="Enter name" />
            {/* additional FormInput fields */}

            <ActionButtons isSubmitting={isSubmitting} onReset={form.reset} />
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

export default FeatureForm;
```

**Rules:**
- `'use client'` directive required.
- `useParams()` cast with the exact param key matching the dynamic folder name (e.g. `{ yearId }`, `{ featureId }`).
- Form page `PageHeader` gets `onBack`, no `icon`.
- `FormProvider` wraps the entire `<form>`.
- `ActionButtons` always last inside the form.

---

## 13. Shared Components Reference

### `PageHeader`
```tsx
// List page — icon, no back
<PageHeader title="Title" description="Subtitle" icon={<Icon />} />

// Form page — back, no icon
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
Always first child inside `<Card>`.

### `ActionButtons`
```tsx
<ActionButtons
  isSubmitting={isSubmitting}
  onReset={form.reset}
  saveLabel="Save Changes"  // optional
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
```tsx
<QueryParamSelect
  paramKey="status"
  options={FeatureStatus.options}  // [{ value, label }]
  includeAllOption
/>
```

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
Must be inside `<FormProvider>`.

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

## 14. `lib/` Utilities

| Function | Signature | Notes |
|---|---|---|
| `apiCall` | `(endpoint, data?, method?)` | Default `GET`. Import from `@/lib/api/api-call`. |
| `buildQuery` | `(params: Record<string, ...>)` | Skips falsy values. Returns query string. |
| `getErrorMessage` | `(error: unknown)` | Extracts readable string from Axios/Error/unknown. |
| `formatDate` | `(date, format?)` | date-fns wrapper. Default `'dd MMM yyyy, hh:mm a'`. Use `'dd MMM, yyyy'` in tables, `'yyyy-MM-dd'` for form defaults. |
| `formatCurrency` | `(value, currency?)` | INR by default. |
| `cn` | `(...classes)` | clsx + tailwind-merge. |
| `nav` | `nav.create(pathname)`, `nav.edit(pathname, id)`, `nav.back(pathname, depth?)` | Import from `@/lib/navigation`. Builds absolute routes from current `pathname`. |

---

## 15. Import Path Aliases

| Alias | Resolves to |
|---|---|
| `@ui/<component>` | `src/components/ui/<component>` |
| `@form-input` | Form input system |
| `@/lib/...` | `src/lib/...` |
| `@/components/shared` | `src/components/shared/index.ts` |
| `@/systems/data-table` | DataTable system |
| `@/systems/confirmation/...` | Confirmation dialog system |
| `@/systems/shared/query-param-select` | `QueryParamSelect` component |
| `@valturex/contracts` | Shared monorepo contracts package |

---

## 16. Pre-Implementation Checklist

Before asking AI to implement, confirm you have created:

- [ ] `hooks/use-<feature>.ts` — API hooks + `useXxxQuery` aggregator
- [ ] `definitions/<feature>.constants.ts` — all `createLookup` configs
- [ ] `definitions/<feature>.types.ts` — `ListQueryParams` type defined
- [ ] `definitions/<feature>.schema.ts` — Zod schema + `Input` type

AI will then generate (in order):
1. `components/<feature>-column.tsx`
2. `components/<feature>-table.tsx`
3. `pages/<feature>-list.tsx`
4. `pages/<feature>-form.tsx`
5. App route `page.tsx` thin wrappers
