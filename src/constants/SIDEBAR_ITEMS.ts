import { SidebarGroup } from '@/types/sidebar';

export const SIDEBAR_ITEMS = (): SidebarGroup[] => [
  {
    group: 'General',
    items: [
      { title: 'Dashboard', url: '/dashboard', icon: 'LayoutDashboard' },
      { title: 'Activity', url: '/activity', icon: 'Activity' },
      { title: 'Notifications', url: '/notifications', icon: 'Bell' },
    ],
  },

  {
    group: 'Workspace',
    items: [
      { title: 'Projects', url: '/projects', icon: 'FolderKanban' },
      { title: 'Tasks', url: '/tasks', icon: 'CheckSquare' },
      { title: 'Calendar', url: '/calendar', icon: 'CalendarDays' },
      { title: 'Files', url: '/files', icon: 'Folder' },
    ],
  },

  {
    group: 'Team',
    items: [
      { title: 'Members', url: '/team/members', icon: 'Users' },
      { title: 'Roles & Permissions', url: '/team/roles', icon: 'Shield' },
      { title: 'Invitations', url: '/team/invitations', icon: 'UserPlus' },
    ],
  },

  {
    group: 'Reports',
    items: [
      {
        title: 'Analytics',
        url: '/reports/analytics',
        icon: 'BarChart3',
        items: [
          { title: 'Overview', url: '/reports/analytics/overview' },
          { title: 'Usage', url: '/reports/analytics/usage' },
          { title: 'Performance', url: '/reports/analytics/performance' },
        ],
      },
      { title: 'Logs', url: '/reports/logs', icon: 'FileText' },
    ],
  },

  {
    group: 'Settings',
    items: [
      { title: 'Profile', url: '/settings/profile', icon: 'User' },
      { title: 'Billing', url: '/settings/billing', icon: 'CreditCard' },
      { title: 'Integrations', url: '/settings/integrations', icon: 'Plug' },
      { title: 'API Keys', url: '/settings/api-keys', icon: 'Key' },
    ],
  },
];
