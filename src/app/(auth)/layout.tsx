'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { DEFAULT_ROUTES_BY_ROLE } from '@/constants/routes';
import { useAuthStore } from '@/stores/auth.store';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const user = useAuthStore(s => s.user);
  const isLoggedIn = useAuthStore(s => s.isLoggedIn);
  const isAuthInitialized = useAuthStore(s => s.isAuthInitialized);

  useEffect(() => {
    // wait until auth state is ready
    if (!isAuthInitialized) return;

    if (isLoggedIn && user?.role) {
      const redirectTo = DEFAULT_ROUTES_BY_ROLE[user.role] ?? '/';

      router.replace(redirectTo);
    }
  }, [isLoggedIn, user?.role, isAuthInitialized, router]);

  return children;
}
