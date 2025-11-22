'use client';

import { useEffect } from 'react';

import { Table } from '@tanstack/react-table';
import { Button } from '@ui/button';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useQueryState } from 'nuqs';

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  pagination?: PaginationData;
  onPaginationChange?: (page: number, limit: number) => void;
}

export function DataTablePagination<TData>({
  table,
  pagination,
  onPaginationChange,
}: DataTablePaginationProps<TData>) {
  const [page, setPage] = useQueryState('page', { defaultValue: '1' });

  // Use server-side pagination if available, otherwise fall back to client-side
  const isServerSide = !!pagination;

  // Convert params to numbers
  const pageIndex = Number(page) - 1;

  // Sync table state with query params on mount
  useEffect(() => {
    if (!isServerSide && table.getState().pagination.pageIndex !== pageIndex) {
      table.setPageIndex(pageIndex);
    }
  }, [pageIndex, table, isServerSide]);

  // Server-side pagination values
  const serverTotalRows = pagination?.total || 0;
  const serverCurrentPage = pagination?.page || 1;
  const serverTotalPages = pagination?.totalPages || 1;
  const serverPageSize = pagination?.limit || 10;
  const serverHasNext = pagination?.hasNext || false;
  const serverHasPrev = pagination?.hasPrev || false;
  const serverStartRow = (serverCurrentPage - 1) * serverPageSize + 1;
  const serverEndRow = Math.min(serverStartRow + serverPageSize - 1, serverTotalRows);

  // Client-side pagination values
  const clientTotalRows = table.getFilteredRowModel().rows.length;
  const clientSelectedRows = table.getFilteredSelectedRowModel().rows.length;
  const clientCurrentPage = pageIndex + 1;
  const clientTotalPages = table.getPageCount();
  const clientPageSize = table.getState().pagination.pageSize;
  const clientStartRow = pageIndex * clientPageSize + 1;
  const clientEndRow = Math.min(clientStartRow + clientPageSize - 1, clientTotalRows);

  // Use appropriate values based on pagination mode
  const totalRows = isServerSide ? serverTotalRows : clientTotalRows;
  const selectedRows = isServerSide ? 0 : clientSelectedRows; // Server-side doesn't track selection across pages
  const currentPage = isServerSide ? serverCurrentPage : clientCurrentPage;
  const totalPages = isServerSide ? serverTotalPages : clientTotalPages;
  const startRow = isServerSide ? serverStartRow : clientStartRow;
  const endRow = isServerSide ? serverEndRow : clientEndRow;
  const canPrevious = isServerSide ? serverHasPrev : table.getCanPreviousPage();
  const canNext = isServerSide ? serverHasNext : table.getCanNextPage();

  const handlePageChange = (newPage: number) => {
    if (isServerSide && onPaginationChange) {
      onPaginationChange(newPage, serverPageSize);
      setPage(newPage.toString());
    } else {
      table.setPageIndex(newPage - 1);
      setPage(newPage.toString());
    }
  };

  const handleFirstPage = () => {
    handlePageChange(1);
  };

  const handlePreviousPage = () => {
    if (isServerSide) {
      handlePageChange(currentPage - 1);
    } else {
      table.previousPage();
      setPage(`${pageIndex}`);
    }
  };

  const handleNextPage = () => {
    if (isServerSide) {
      handlePageChange(currentPage + 1);
    } else {
      table.nextPage();
      setPage(`${pageIndex + 2}`);
    }
  };

  const handleLastPage = () => {
    if (isServerSide) {
      handlePageChange(totalPages);
    } else {
      table.setPageIndex(table.getPageCount() - 1);
      setPage(`${table.getPageCount()}`);
    }
  };

  return (
    <div className="flex items-center justify-between">
      {/* Left side - Selection info or row count */}
      <div className="flex-1">
        {/* Desktop view - show detailed info */}
        <div className="hidden sm:block">
          {selectedRows > 0 ? (
            <div className="text-muted-foreground text-sm">
              <span className="font-medium">{selectedRows}</span> of{' '}
              <span className="font-medium">{totalRows}</span> row(s) selected
            </div>
          ) : (
            <div className="text-muted-foreground text-sm">
              Showing <span className="font-medium">{startRow}</span> to{' '}
              <span className="font-medium">{endRow}</span> of{' '}
              <span className="font-medium">{totalRows}</span> results
            </div>
          )}
        </div>

        {/* Mobile view - show only page info */}
        <div className="block sm:hidden">
          <span className="text-muted-foreground text-sm">
            Page <span className="font-medium">{currentPage}</span> of{' '}
            <span className="font-medium">{totalPages}</span>
          </span>
        </div>
      </div>

      {/* Right side - Pagination controls */}
      <div className="flex items-center space-x-2">
        {/* Page info - only show on desktop */}
        <div className="hidden items-center space-x-2 sm:flex">
          <span className="text-muted-foreground text-sm">
            Page <span className="font-medium">{currentPage}</span> of{' '}
            <span className="font-medium">{totalPages}</span>
          </span>
        </div>

        {/* Pagination buttons */}
        <div className="ml-4 flex items-center space-x-1">
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={handleFirstPage}
            disabled={!canPrevious}
            title="Go to first page"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={handlePreviousPage}
            disabled={!canPrevious}
            title="Go to previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={handleNextPage}
            disabled={!canNext}
            title="Go to next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={handleLastPage}
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
