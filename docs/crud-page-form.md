# CRUD Feature Guide — Full-Page Form Pattern

> Read alongside [`crud-base.md`](./crud-base.md) + [`crud-table.md`](./crud-table.md) when the feature uses **dedicated `/create` and `/[id]/edit` routes**.
> Use this pattern when the form has 3+ fields or warrants its own page-level breadcrumb and context.
> For 1–2 field forms, use [`crud-dialog-form.md`](./crud-dialog-form.md) instead.

---

## 1. `hooks/use-<feature>-form.ts`

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

**Navigation rules:**

| Current route | After success | Back button |
|---|---|---|
| `/create` | `router.push(nav.back(pathname))` | `router.push(nav.back(pathname))` |
| `/[id]/edit` | `router.push(nav.back(pathname, 2))` | `router.push(nav.back(pathname, 2))` |

---

## 2. `pages/<feature>-list.tsx`

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
- Omit `QueryParamSelect` if the feature has no status/enum filter. Use `FilterPopover` when there are 2+ filters.

---

## 3. `pages/<feature>-form.tsx`

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
- Form page `PageHeader` gets `onBack`, no `icon`.
- `BreadcrumpSetter` is not used on the form page — only the list page sets breadcrumbs.
- `ActionButtons` does not receive `onCancel` on the page form — only `isSubmitting` and `onReset`.
