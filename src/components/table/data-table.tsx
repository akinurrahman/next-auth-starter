'use client';

import * as React from 'react';

import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Skeleton } from '@ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@ui/table';

import { useTableEditor } from '@/hooks/use-table-editor';

import { DataTablePagination } from './data-table-pagination';
import { EditableCell } from './editable-cell';

export interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Helper function to convert API pagination to component pagination
export const mapApiPaginationToComponentPagination = (apiPagination: {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}): PaginationData => ({
  page: apiPagination.currentPage,
  limit: apiPagination.itemsPerPage,
  total: apiPagination.totalItems,
  totalPages: apiPagination.totalPages,
  hasNext: apiPagination.hasNextPage,
  hasPrev: apiPagination.hasPrevPage,
});

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onDataUpdate?: (updatedData: TData) => void;
  isLoading?: boolean;
  pagination?: PaginationData;
  onPaginationChange?: (page: number, limit: number) => void;
  limit?: number;
}

export function DataTable<TData, TValue>({
  columns,
  data = [],
  onDataUpdate,
  isLoading = false,
  pagination,
  onPaginationChange,
  limit = 10,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);

  // Use our custom hook for editing logic
  const {
    editingRow,
    startEditing,
    cancelEditing,
    saveEditing,
    handleFieldChange,
    getCurrentValue,
  } = useTableEditor<TData>({ onDataUpdate });

  // Add editing state to table
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination: {
        pageIndex: pagination ? pagination.page - 1 : 0,
        pageSize: pagination?.limit || limit,
      },
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
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    // Server-side pagination
    manualPagination: !!pagination,
    pageCount: pagination?.totalPages || -1,
  });

  return (
    <div className="space-y-4">
      <div className="text-card-foreground flex flex-col gap-6 overflow-hidden rounded-md border shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/50">
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <TableHead className="pl-4" key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {isLoading ? (
                // Loading skeleton rows
                Array.from({ length: 10 }).map((_, index) => (
                  <TableRow key={`skeleton-${index}`}>
                    {columns.map((_, columnIndex) => (
                      <TableCell key={`skeleton-cell-${columnIndex}`} className="pl-4">
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map(row => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map(cell => (
                      <TableCell className="pl-4" key={cell.id}>
                        <EditableCell
                          column={cell.column}
                          value={getCurrentValue(cell.column.id, cell.getValue())}
                          isEditing={editingRow === row.id}
                          onChange={value => handleFieldChange(cell.column.id, value)}
                          renderDefault={() =>
                            flexRender(cell.column.columnDef.cell, cell.getContext())
                          }
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      {pagination && (
        <DataTablePagination
          table={table}
          pagination={pagination}
          onPaginationChange={onPaginationChange}
        />
      )}
    </div>
  );
}
