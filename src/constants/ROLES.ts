import { createLookup } from '@/lib/lookup';

export const USER_ROLES = createLookup({
  SUPER_ADMIN: { label: 'Super Admin', badgeVariant: 'default' },
  ADMIN: { label: 'Admin', badgeVariant: 'default' },
});

export type UserRole = keyof typeof USER_ROLES.config;
