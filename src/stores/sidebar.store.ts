import { create } from 'zustand';

import { SIDEBAR_ITEMS } from '@/constants/SIDEBAR_ITEMS';
import { SidebarGroup } from '@/types/sidebar';

type SidebarState = {
  sidebarData: SidebarGroup[];
  buildSidebar: (role: string) => void;
};

export const useSidebarStore = create<SidebarState>(set => ({
  sidebarData: [],
  buildSidebar: role => {
    const filtered = SIDEBAR_ITEMS()
      .filter(group => !group.roles || group.roles.includes(role))
      .map(group => ({
        ...group,
        items: group.items
          .filter(item => !item.roles || item.roles.includes(role))
          .map(item => ({
            ...item,
            items: item.items?.filter(sub => !sub.roles || sub.roles.includes(role)),
          })),
      }))
      .filter(group => group.items.length > 0);

    set({ sidebarData: filtered });
  },
}));
