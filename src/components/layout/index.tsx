import React, { ReactNode } from 'react';

import { Separator } from '@ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@ui/sidebar';

import { AppSidebar } from './app-sidebar';
import BreadCrump from './breadcrump';

const LayoutWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset className="flex min-h-0 flex-col overflow-hidden">
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
          <BreadCrump />
        </header>
        <div className="flex-1 overflow-auto p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default LayoutWrapper;
