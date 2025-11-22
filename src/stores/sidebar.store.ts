import { create } from 'zustand';

import { NavItem } from '@/types/sidebar';

interface SidebarState {
  sidebarData: NavItem[];
  setSidebarData: (data: NavItem[]) => void;
}

export const useSidebarStore = create<SidebarState>(set => ({
  sidebarData: [],
  setSidebarData: data => set({ sidebarData: data }),
}));
