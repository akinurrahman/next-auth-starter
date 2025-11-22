import React from 'react';

import RoleProtectionProvider from '@/components/providers/rbac';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <RoleProtectionProvider>{children}</RoleProtectionProvider>;
};

export default Layout;
