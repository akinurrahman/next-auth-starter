import { useAuthStore } from '@/stores/auth.store';

export const APP_NAME = 'IMS';

export const DEFAULT_ROUTES_BY_ROLE = {
  admin: '/admin/dashboard',
} as const;

export const authenticationRoute = ['/login', '/forgot-password'];

export const PREFIX_BY_ROLE = {
  admin: '/admin',
};

export const getPrefixByRole = () => {
  const user = useAuthStore.getState().user;
  const role = user?.role;

  if (role && role in PREFIX_BY_ROLE) return PREFIX_BY_ROLE[role as keyof typeof PREFIX_BY_ROLE];
  return '';
};
