import React from 'react';

import AuthLayout from '@/components/providers/auth-layout';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default Layout;
