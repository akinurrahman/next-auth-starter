'use client';

import { useEffect } from 'react';

import { useSidebarStore } from '@/stores/sidebar.store';
import { NavItem } from '@/types/sidebar';

interface SidebarInitializerProps {
  sidebarData: NavItem[];
}

const SidebarInitializer = ({ sidebarData }: SidebarInitializerProps) => {
  const setSidebarData = useSidebarStore(state => state.setSidebarData);

  useEffect(() => {
    setSidebarData(sidebarData);
  }, [setSidebarData, sidebarData]);

  return null;
};

export default SidebarInitializer;
