'use client';

import { flexRender } from '@tanstack/react-table';
import { Skeleton } from '@ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@ui/table';

import { useDataTable } from '../hooks/use-data-table';
import type { DataTableProps } from '../types';
import { DataTablePagination } from './data-table-pagination';
import { EditableCell } from './editable-cell';

export function DataTable<TData, TValue>({
  columns,
  data = [],
  onDataUpdate,
  isLoading = false,
  pagination,
  onPaginationChange,
}: DataTableProps<TData, TValue>) {
  const { table, editingRow, getCurrentValue, handleFieldChange } = useDataTable({
    columns,
    data,
    onDataUpdate,
    pagination,
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
