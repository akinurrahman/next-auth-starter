'use client';

import { useState } from 'react';

import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Pagination } from '@/types';

import { useTableEditor } from './use-table-editor';

interface UseDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onDataUpdate?: (updatedData: TData) => void;
  pagination?: Pagination;
}

export function useDataTable<TData, TValue>({
  columns,
  data,
  onDataUpdate,
  pagination,
}: UseDataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const {
    editingRow,
    startEditing,
    cancelEditing,
    saveEditing,
    handleFieldChange,
    getCurrentValue,
  } = useTableEditor<TData>({ onDataUpdate });

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      ...(pagination && {
        pagination: {
          pageIndex: pagination.page - 1,
          pageSize: pagination.limit,
        },
      }),
    },
    meta: {
      editingRow,
      startEditing,
      cancelEditing,
      saveEditing,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    ...(pagination && { getPaginationRowModel: getPaginationRowModel() }),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    manualPagination: !!pagination,
    pageCount: pagination?.totalPages ?? -1,
  });

  return { table, editingRow, getCurrentValue, handleFieldChange };
}
