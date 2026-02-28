import { SidebarGroup } from '@/types/sidebar';

import { USER_ROLES } from './ROLES';

const { SUPER_ADMIN, ADMIN } = USER_ROLES.keys;

export const SIDEBAR_ITEMS = (): SidebarGroup[] => [
  // ─── SUPER ADMIN ────────────────────────────────────────────────────────────
  {
    group: 'Management',
    roles: [SUPER_ADMIN],
    items: [
      {
        title: 'Dashboard',
        url: '/dashboard',
        icon: 'LayoutDashboard',
        roles: ['SUPER_ADMIN'],
      },
      {
        title: 'Institutions',
        url: '/institutions',
        icon: 'Building2',
        roles: [SUPER_ADMIN],
      },
    ],
  },

  // ─── ADMIN ──────────────────────────────────────────────────────────────────
  {
    group: 'Institution',
    roles: [ADMIN],
    items: [
      {
        title: 'Overview',
        url: '/institute/overview',
        icon: 'LayoutDashboard',
        roles: [ADMIN],
      },
      {
        title: 'Configuration',
        url: '/institute/profile',
        icon: 'Settings2',
        roles: [ADMIN],
      },
    ],
  },
  {
    group: 'Setup',
    roles: [ADMIN],
    items: [
      {
        title: 'Classes & Sections',
        url: '/academics/classes',
        icon: 'LayoutGrid',
        roles: [ADMIN],
      },
      {
        title: 'Subjects',
        url: '/academics/subjects',
        icon: 'BookMarked',
        roles: [ADMIN],
      },
    ],
  },
  {
    group: 'Academic Year',
    roles: [ADMIN],
    items: [
      {
        title: 'Academic Years',
        url: '/academics/academic-years',
        icon: 'CalendarDays',
        roles: [ADMIN],
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
    roles: [ADMIN],
    items: [
      {
        title: 'All Students',
        url: '/students',
        icon: 'Users',
        roles: [ADMIN],
      },
      {
        title: 'Login Access',
        url: '/students/login-access',
        icon: 'KeyRound',
        roles: [ADMIN],
      },
    ],
  },
];
