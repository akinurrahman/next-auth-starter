'use client';

import { ThemeProvider } from 'next-themes';

import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { Toaster } from '@/components/ui/sonner';
import { DeleteConfirmationDialog } from '@/components/utils';
import '@/lib/api/interceptors';

import { QueryProvider } from './query-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <QueryProvider>
        <NuqsAdapter>
          {children}
          <DeleteConfirmationDialog />
        </NuqsAdapter>
        <Toaster richColors />
      </QueryProvider>
    </ThemeProvider>
  );
}
