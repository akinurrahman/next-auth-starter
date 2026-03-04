# CRUD Feature Guide — Dialog Form Pattern
> Attach alongside `crud-base.md` + `crud-table.md` when the feature has **1–2 fields** and opening a full page is overkill.  
> Uses a shadcn `Dialog` managed by `useModalState`. No `/create` or `/[id]/edit` routes are generated.  
> For 3+ field forms, use `crud-page-form.md` instead.

---

## 1. `hooks/use-<feature>-form.ts`

Accepts the full item object instead of an ID. No routing — success calls `onClose()`.

```typescript
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Feature } from '../definitions/feature.types';
import { getErrorMessage } from '@/lib/error';
import { FeatureInput, featureSchema } from '../definitions/feature.schema';
import { useCreateFeature, useUpdateFeature } from './use-feature';

const defaultValues: FeatureInput = { name: '' };

// Map API response shape → form field values (handles date reformatting etc.)
const mapToFormValues = (item: Feature): FeatureInput => ({
  name: item.name,
  // startDate: formatDate(item.startDate, 'yyyy-MM-dd'),
});

export const useFeatureForm = ({
  item,
  onClose,
}: {
  item: Feature | null;   // null → create mode, Feature → edit mode
  onClose: () => void;
}) => {
  const isEditMode = item !== null;
  const createMutation = useCreateFeature();
  const updateMutation = useUpdateFeature();

  const form = useForm<FeatureInput>({
    defaultValues,
    resolver: zodResolver(featureSchema),
  });

  useEffect(() => {
    if (item) {
      form.reset(mapToFormValues(item));
    } else {
      form.reset(defaultValues);
    }
  }, [item]);

  const handleSubmit: SubmitHandler<FeatureInput> = async formData => {
    try {
      if (isEditMode) {
        await updateMutation.mutateAsync({ data: formData, featureId: item.id });
        toast.success('Updated successfully');
      } else {
        await createMutation.mutateAsync(formData);
        toast.success('Created successfully');
      }
      onClose();
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

No `useRouter`, `usePathname`, or `nav` imports — navigation is replaced entirely by `onClose()`.

---

## 2. `pages/<feature>-list.tsx`

The list page is the single orchestrator — it owns `useModalState`, wires `onEdit`, and renders the dialog.

```tsx
'use client';

import React from 'react';
import { Button } from '@ui/button';
import { Card, CardContent, CardHeader } from '@ui/card';
import { SomeIcon, PlusCircleIcon } from 'lucide-react';
import { Feature } from '../definitions/feature.types';
import { SearchInput } from '@/components/shared';
import BreadcrumpSetter from '@/components/shared/breadcrump-setter';
import PageHeader from '@/components/shared/page-header';
import { useModalState } from '@/hooks/use-modal-state';
import { QueryParamSelect } from '@/systems/shared/query-param-select';
import FeatureDialog from '../components/feature-dialog';
import FeatureTable from '../components/feature-table';
import { FeatureStatus } from '../definitions/feature.constants';
import { useFeatureQuery } from '../hooks/use-feature';

const FeatureList = () => {
  const modal = useModalState<Feature>();
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
          <Button onClick={() => modal.openModal()} variant="outline">
            <PlusCircleIcon /> Create Feature
          </Button>
        </div>
        <FeatureTable
          data={data}
          isLoading={isLoading}
          pagination={pagination}
          onEdit={modal.openModal}   {/* passes full item → edit mode */}
        />
      </CardContent>
      <FeatureDialog
        open={modal.open}
        item={modal.item}
        onClose={modal.closeModal}
      />
    </Card>
  );
};

export default FeatureList;
```

**Rules:**
- `'use client'` directive required.
- `BreadcrumpSetter` is always the first child inside `<Card>`.
- No `useRouter`, `usePathname`, or `nav` imports.
- `modal.openModal()` (no args) → create mode; `modal.openModal(item)` → edit mode.
- `<FeatureDialog>` always rendered as the last child inside `<Card>`.
- Omit `QueryParamSelect` if the feature has no status/enum filter.

---

## 3. `components/<feature>-dialog.tsx`

```tsx
'use client';

import React from 'react';
import { FormInput } from '@form-input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@ui/dialog';
import { Feature } from '../definitions/feature.types';
import { FormProvider } from 'react-hook-form';
import ActionButtons from '@/components/shared/action-buttons';
import { useFeatureForm } from '../hooks/use-feature-form';

interface FeatureDialogProps {
  open:    boolean;
  item:    Feature | null;   // null → create mode, Feature → edit mode
  onClose: () => void;
}

const FeatureDialog = ({ open, item, onClose }: FeatureDialogProps) => {
  const isEditMode = item !== null;
  const { form, handleSubmit, isSubmitting } = useFeatureForm({ item, onClose });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Edit Feature' : 'Create Feature'}</DialogTitle>
          <DialogDescription>
            {isEditMode ? 'Update the feature details.' : 'Add a new feature.'}
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormInput fieldType="input" name="name" placeholder="Enter name" />
            {/* additional FormInput fields */}

            <ActionButtons
              isSubmitting={isSubmitting}
              onReset={form.reset}
              onCancel={onClose}
            />
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default FeatureDialog;
```

**Rules:**
- `onOpenChange={onClose}` ensures the dialog closes on backdrop click or Escape key.
- `item === null` drives create mode; `item !== null` drives edit mode — same derivation as in `useFeatureForm`.
- `ActionButtons` receives `onCancel={onClose}` so the cancel button closes the dialog.
- `<feature>-dialog.tsx` lives in `components/`, not `pages/` — it has no route association.
- `FormProvider` wraps the entire `<form>` inside `DialogContent`.
- `ActionButtons` always last inside the form.
