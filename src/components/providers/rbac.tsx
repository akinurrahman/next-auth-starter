'use client';

import { useEffect } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { toast } from 'sonner';

import { DEFAULT_ROUTES_BY_ROLE, authenticationRoute } from '@/constants';
import { useAuthStore } from '@/stores/auth.store';

import { FullScreenLoader } from '../loader/loader';

interface RoleProtectionProviderProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const RoleProtectionProvider = ({ children, allowedRoles = [] }: RoleProtectionProviderProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const user = useAuthStore(state => state.user);
  const isAuthenticated = useAuthStore(state => !!state.accessToken);
  const isAuthInitialized = useAuthStore(state => state.isAuthInitialized);

  useEffect(() => {
    if (!isAuthInitialized) return;

    const isAuthRoute = authenticationRoute.some(route => pathname.startsWith(route));

    if (!isAuthenticated) {
      // Allow access to authentication routes if not authenticated
      if (!isAuthRoute) {
        router.replace('/login');
      }
      return;
    }

    // If authenticated, block access to authentication routes
    if (isAuthRoute) {
      const defaultRoute =
        (DEFAULT_ROUTES_BY_ROLE as Record<string, string>)[user?.role || ''] || '/';
      router.replace(defaultRoute);
      return;
    }

    // Role-based access control
    if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role || '')) {
      toast.error('Access Denied: You do not have permission to view this page.');
      router.replace('/access-denied');
    }
  }, [isAuthInitialized, isAuthenticated, user, allowedRoles, pathname, router]);

  if (!isAuthInitialized) return <FullScreenLoader />;

  return <>{children}</>;
};

export default RoleProtectionProvider;
