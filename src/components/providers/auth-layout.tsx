'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { FullScreenLoader } from '@/components/loader/loader';
import { DEFAULT_ROUTES_BY_ROLE } from '@/constants/routes';
import { useAuthStore } from '@/stores/auth.store';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const isAuthInitialized = useAuthStore(s => s.isAuthInitialized);
  const accessToken = useAuthStore(s => s.accessToken);
  const user = useAuthStore(s => s.user);

  useEffect(() => {
    // wait until hydration + /me
    if (!isAuthInitialized) return;

    // authenticated + identity known → leave auth pages
    if (accessToken && user?.role) {
      const redirectTo = DEFAULT_ROUTES_BY_ROLE[user.role];
      router.replace(redirectTo);
    }
  }, [isAuthInitialized, accessToken, user?.role, router]);

  // prevent flash of login form while redirecting
  if (!isAuthInitialized || (accessToken && !user)) {
    return <FullScreenLoader />;
  }

  return <>{children}</>;
}
