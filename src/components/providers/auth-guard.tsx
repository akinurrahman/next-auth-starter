'use client';

import { useEffect } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { DEFAULT_ROUTES_BY_ROLE } from '@/constants/routes';
import { canAccessRoute, isAuthRoute } from '@/lib/route-access';
import { useAuthStore } from '@/stores/auth.store';
import { useSidebarStore } from '@/stores/sidebar.store';

import { FullScreenLoader } from '../loader/loader';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const isAuthInitialized = useAuthStore(s => s.isAuthInitialized);
  const accessToken = useAuthStore(s => s.accessToken);
  const user = useAuthStore(s => s.user);

  const buildSidebar = useSidebarStore(s => s.buildSidebar);

  useEffect(() => {
    if (!user?.role) return;
    buildSidebar(user.role);
  }, [user?.role, buildSidebar]);

  // Access control
  useEffect(() => {
    if (!isAuthInitialized) return;

    if (!accessToken) {
      if (!isAuthRoute(pathname)) {
        router.replace('/login');
      }
      return;
    }

    //  Authenticated but identity not loaded yet
    if (!user) return;

    // Authenticated user on auth-only route
    if (isAuthRoute(pathname)) {
      const redirectTo = DEFAULT_ROUTES_BY_ROLE[user.role];
      if (redirectTo) {
        router.replace(redirectTo);
      }
      return;
    }

    // Protected route check
    const allowed = canAccessRoute(pathname, user.role);
    if (!allowed) {
      router.replace('/access-denied');
    }
  }, [isAuthInitialized, accessToken, user, pathname, router]);

  // Render control
  if (!isAuthInitialized || (accessToken && !user)) {
    return <FullScreenLoader />;
  }

  return <>{children}</>;
}
