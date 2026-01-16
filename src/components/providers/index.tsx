'use client';

import { Suspense } from 'react';

import { ThemeProvider } from 'next-themes';

import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { Toaster } from '@/components/ui/sonner';
import '@/lib/api/interceptors';
import { ConfirmationDialog } from '@/systems/confirmation/components/confirmation-dialog';

import { QueryProvider } from './query-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <QueryProvider>
        <NuqsAdapter>
          <Suspense fallback={null}>{children}</Suspense>
          <ConfirmationDialog />
        </NuqsAdapter>
        <Toaster richColors />
      </QueryProvider>
    </ThemeProvider>
  );
}
