import { SidebarGroup } from '@/types/sidebar';

import { USER_ROLES } from './ROLES';

export const SIDEBAR_ITEMS = (): SidebarGroup[] => [
  // ─── SUPER ADMIN ────────────────────────────────────────────────────────────
  {
    group: 'Management',
    roles: [USER_ROLES.keys.SUPER_ADMIN],
    items: [
      {
        title: 'Dashboard',
        url: '/dashboard',
        icon: 'LayoutDashboard',
        roles: [USER_ROLES.keys.SUPER_ADMIN],
      },
      {
        title: 'Institutions',
        url: '/institutions',
        icon: 'Building2',
        roles: [USER_ROLES.keys.SUPER_ADMIN],
      },
    ],
  },

  // ─── ADMIN ──────────────────────────────────────────────────────────────────
  {
    group: 'Institution',
    roles: [USER_ROLES.keys.ADMIN],
    items: [
      {
        title: 'Overview',
        url: '/institute/overview',
        icon: 'LayoutDashboard',
        roles: [USER_ROLES.keys.ADMIN],
      },
      {
        title: 'Configuration',
        url: '/institute/profile',
        icon: 'Settings2',
        roles: [USER_ROLES.keys.ADMIN],
      },
    ],
  },
  {
    group: 'Setup',
    roles: [USER_ROLES.keys.ADMIN],
    items: [
      {
        title: 'Classes & Sections',
        url: '/academics/classes',
        icon: 'LayoutGrid',
        roles: [USER_ROLES.keys.ADMIN],
      },
      {
        title: 'Subjects',
        url: '/academics/subjects',
        icon: 'BookMarked',
        roles: [USER_ROLES.keys.ADMIN],
      },
    ],
  },
  {
    group: 'Academic Year',
    roles: [USER_ROLES.keys.ADMIN],
    items: [
      {
        title: 'Academic Years',
        url: '/academics/academic-years',
        icon: 'CalendarDays',
        roles: [USER_ROLES.keys.ADMIN],
        items: [
          { title: 'Class Setup', url: '/academics/classes' },
          { title: 'Students', url: '/academics/students' },
          { title: 'Exams', url: '/academics/exams' },
          { title: 'Marks', url: '/academics/marks' },
          { title: 'Results', url: '/academics/results' },
          { title: 'Annual Results', url: '/academics/annual-results' },
          { title: 'Promotion', url: '/academics/promotion' },
        ],
      },
    ],
  },
  {
    group: 'Students',
    roles: [USER_ROLES.keys.ADMIN],
    items: [
      {
        title: 'All Students',
        url: '/students',
        icon: 'Users',
        roles: [USER_ROLES.keys.ADMIN],
      },
      {
        title: 'Login Access',
        url: '/students/login-access',
        icon: 'KeyRound',
        roles: [USER_ROLES.keys.ADMIN],
      },
    ],
  },
];
