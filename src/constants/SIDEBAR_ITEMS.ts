import { SidebarItem } from '@/types/sidebar';

import { USER_ROLES } from './ROLES';

export const SIDEBAR_ITEMS = (): SidebarItem[] => [
  {
    title: 'A',
    url: '/dashboard',
    icon: 'Home',
    roles: [USER_ROLES.SUPER_ADMIN],
  },
  {
    title: 'Management',
    url: '/management',
    icon: 'Settings',
    roles: [USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN],
    items: [
      {
        title: 'D',
        url: '/d',
        roles: [USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN],
      },
    ],
  },
];
