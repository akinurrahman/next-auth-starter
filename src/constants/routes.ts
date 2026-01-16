import { UserRole } from '@/constants/ROLES';

export const DEFAULT_ROUTES_BY_ROLE: Partial<Record<UserRole, string>> = {
  SUPER_ADMIN: '/dashboard',
  ADMIN: '/d',
};
export const authenticationRoute = ['/login', '/forgot-password'];
