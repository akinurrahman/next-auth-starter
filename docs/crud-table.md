# CRUD Feature Guide — Table Layer

> Read alongside [`crud-base.md`](./crud-base.md) for every feature.
> This file covers both the standard and dialog variants — the column and table shape is the same either way; only `onEdit`'s signature differs.

---

## 1. `components/<feature>-column.tsx`

```tsx
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@ui/badge';
import { Button } from '@ui/button';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@ui/dropdown-menu';
import { Feature } from '../definitions/feature.types';
import { MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { formatDate } from '@/lib/format';
import { FeatureStatus } from '../definitions/feature.constants';

interface GetFeatureColumnsContext {
  onEdit:   (id: string)    => void;   // standard: receives id — see dialog note below
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

**Dialog variant — `onEdit` signature change:**

When using the dialog pattern, `onEdit` receives the full item (not just the ID) so it can be passed directly to `openModal()` without a re-fetch:

```tsx
interface GetFeatureColumnsContext {
  onEdit:   (item: Feature) => void;   // ← full item, not id
  onDelete: (item: Feature) => void;
}

// in the Actions cell:
<DropdownMenuItem onClick={() => onEdit(row.original)}>
```

---

## 2. `components/<feature>-table.tsx`

### Standard (full-page form)

```tsx
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Feature } from '../definitions/feature.types';
import { Pagination } from '@/types';
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

### Dialog variant

The table receives `onEdit` as a prop (instead of owning the router navigation) because the list page owns the modal state:

```tsx
import React from 'react';
import { Feature } from '../definitions/feature.types';
import { Pagination } from '@/types';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/error';
import { useConfirmation } from '@/systems/confirmation/hooks/use-confirmation';
import { DataTable } from '@/systems/data-table';
import { useDeleteFeature } from '../hooks/use-feature';
import { getFeatureColumns } from './feature-column';

interface FeatureTableProps {
  data:       Feature[];
  pagination: Pagination | undefined;
  isLoading:  boolean;
  onEdit:     (item: Feature) => void;   // ← injected from list page
}

const FeatureTable = ({ data, pagination, isLoading, onEdit }: FeatureTableProps) => {
  const deleteMutation = useDeleteFeature();
  const { confirm } = useConfirmation<Feature>();

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

**Key difference:** the standard table owns `onEdit` internally (uses router); the dialog table receives it as a prop from the list page because the list page owns `useModalState`.
