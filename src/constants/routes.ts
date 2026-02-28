import { UserRole } from '@/constants/ROLES';

export const DEFAULT_ROUTES_BY_ROLE: Record<UserRole, string> = {
  SUPER_ADMIN: '/dashboard',
  ADMIN: '/institute/profile',
  TEACHER: '/dashboard',
  ACCOUNTANT: '/dashboard',
  STUDENT: '/dashboard',
  PARENT: '/dashboard',
};

export const AUTH_ROUTES = ['/login', '/forgot-password'];
