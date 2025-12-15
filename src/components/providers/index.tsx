'use client';

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
          {children}
          <ConfirmationDialog />
        </NuqsAdapter>
        <Toaster richColors />
      </QueryProvider>
    </ThemeProvider>
  );
}
