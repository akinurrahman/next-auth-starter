import type { ColumnDef } from '@tanstack/react-table';

import { Pagination } from '@/types';

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onDataUpdate?: (updatedData: TData) => void;
  isLoading?: boolean;
  pagination?: Pagination;
  onPaginationChange?: (page: number, limit: number) => void;
}
