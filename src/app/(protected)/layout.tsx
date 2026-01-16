'use client';

import { useEffect } from 'react';

import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

import LayoutWrapper from '@/components/layout';
import { canAccessRoute } from '@/lib/route-access';
import { useAuthStore } from '@/stores/auth.store';
import { useSidebarStore } from '@/stores/sidebar.store';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const user = useAuthStore(s => s.user);
  const buildSidebar = useSidebarStore(s => s.buildSidebar);

  useEffect(() => {
    if (user?.role) {
      buildSidebar(user.role);

      const allowed = canAccessRoute(pathname, user.role);
      if (!allowed) {
        router.replace('/access-denied');
      }
    }
  }, [user?.role, pathname, buildSidebar, router]);

  return <LayoutWrapper>{children}</LayoutWrapper>;
}
