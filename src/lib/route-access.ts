import { UserRole } from '@/constants/ROLES';
import { SIDEBAR_ITEMS } from '@/constants/SIDEBAR_ITEMS';
import { AUTH_ROUTES } from '@/constants/routes';

export function canAccessRoute(pathname: string, role: UserRole): boolean {
  // Public auth routes are always allowed
  if (AUTH_ROUTES.includes(pathname)) {
    return true;
  }

  const allItems = SIDEBAR_ITEMS()
    .flatMap(group => group.items)
    .flatMap(item => (item.items ? [item, ...item.items] : [item]));

  const matched = allItems.find(
    item => pathname === item.url || pathname.startsWith(`${item.url}/`)
  );

  // Unknown route → deny
  if (!matched) return false;

  // No role restriction → allow
  if (!matched.roles || matched.roles.length === 0) return true;

  // Role-based access
  return matched.roles.includes(role);
}

export function isAuthRoute(pathname: string) {
  return AUTH_ROUTES.includes(pathname);
}
