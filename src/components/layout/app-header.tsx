'use client';

import { Layers } from 'lucide-react';

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { APP_NAME } from '@/constants';
import { User } from '@/features/auth/login/types/auth.types';

interface props {
  user: User | null;
}

export function AppHeader({ user: _ }: props) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" className="cursor-default">
          <div className="bg-primary text-primary-foreground shadow-primary/30 flex aspect-square size-8 items-center justify-center rounded-lg shadow-sm">
            <Layers className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{APP_NAME}</span>
            {/* <span className="truncate text-xs">{formatRole(user?.role)}</span> */}
            <span className="truncate text-xs">Super Admin</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
