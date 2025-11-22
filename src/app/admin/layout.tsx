import React, { ReactNode } from 'react';

import LayoutWrapper from '@/components/layout';
import RoleProtectionProvider from '@/components/providers/rbac';
import SidebarInitializer from '@/components/providers/sidebar-initilizer';
import { adminSidebar } from '@/constants/sidebar-data';

const Layout = ({ children }: { children: ReactNode }) => {
  const data = adminSidebar();
  return (
    <RoleProtectionProvider>
      <SidebarInitializer sidebarData={data} />
      <LayoutWrapper>{children}</LayoutWrapper>
    </RoleProtectionProvider>
  );
};

export default Layout;
