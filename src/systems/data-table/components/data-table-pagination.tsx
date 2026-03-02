'use client';

import { useEffect } from 'react';

import { Table } from '@tanstack/react-table';
import { Button } from '@ui/button';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useQueryState } from 'nuqs';

import { Pagination } from '@/types';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  pagination: Pagination;
  onPaginationChange?: (page: number, limit: number) => void;
}

export function DataTablePagination<TData>({
  table,
  pagination,
  onPaginationChange,
}: DataTablePaginationProps<TData>) {
  const [page, setPage] = useQueryState('page', { defaultValue: '1' });

  const pageIndex = Number(page) - 1;

  // Sync table state with query params on mount for client-side mode
  useEffect(() => {
    if (table.getState().pagination.pageIndex !== pageIndex) {
      table.setPageIndex(pageIndex);
    }
  }, [pageIndex, table]);

  const totalRows = pagination.total;
  const currentPage = pagination.page;
  const totalPages = pagination.totalPages;
  const pageSize = pagination.limit;
  const startRow = (currentPage - 1) * pageSize + 1;
  const endRow = Math.min(startRow + pageSize - 1, totalRows);
  const canPrevious = pagination.hasPrev;
  const canNext = pagination.hasNext;

  const handlePageChange = (newPage: number) => {
    onPaginationChange?.(newPage, pageSize);
    setPage(newPage.toString());
  };

  return (
    <div className="flex items-center justify-between">
      {/* Left side - row count */}
      <div className="flex-1">
        <div className="hidden sm:block">
          <div className="text-muted-foreground text-sm">
            Showing <span className="font-medium">{startRow}</span> to{' '}
            <span className="font-medium">{endRow}</span> of{' '}
            <span className="font-medium">{totalRows}</span> results
          </div>
        </div>

        <div className="block sm:hidden">
          <span className="text-muted-foreground text-sm">
            Page <span className="font-medium">{currentPage}</span> of{' '}
            <span className="font-medium">{totalPages}</span>
          </span>
        </div>
      </div>

      {/* Right side - controls */}
      <div className="flex items-center space-x-2">
        <div className="hidden items-center space-x-2 sm:flex">
          <span className="text-muted-foreground text-sm">
            Page <span className="font-medium">{currentPage}</span> of{' '}
            <span className="font-medium">{totalPages}</span>
          </span>
        </div>

        <div className="ml-4 flex items-center space-x-1">
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => handlePageChange(1)}
            disabled={!canPrevious}
            title="Go to first page"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!canPrevious}
            title="Go to previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!canNext}
            title="Go to next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => handlePageChange(totalPages)}
            disabled={!canNext}
            title="Go to last page"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
