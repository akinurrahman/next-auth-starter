import { UserRole } from '@/constants/ROLES';
import { SIDEBAR_ITEMS } from '@/constants/SIDEBAR_ITEMS';

export function canAccessRoute(pathname: string, role: UserRole): boolean {
  const allItems = SIDEBAR_ITEMS().flatMap(item => (item.items ? [item, ...item.items] : [item]));

  const matched = allItems.find(
    item => pathname === item.url || pathname.startsWith(`${item.url}/`)
  );

  // unknown route → deny
  if (!matched) return false;

  // no roles defined → allow
  if (!matched.roles || matched.roles.length === 0) return true;

  return matched.roles.includes(role);
}
