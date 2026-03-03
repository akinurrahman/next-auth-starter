import { useState } from 'react';

import { SidebarGroup } from '@/types/sidebar';

export function useInitialSidebarOpen(
  groups: SidebarGroup[],
  pathname: string,
  resolvedUrl: (url: string) => string
) {
  const allItems = groups.flatMap(g => g.items);

  const [openItems, setOpenItems] = useState<Record<string, boolean>>(() => {
    const initialState: Record<string, boolean> = {};

    allItems.forEach(item => {
      if (!item.items?.length) return;

      const resolvedParent = resolvedUrl(item.url);

      const isChildActive = item.items.some(sub => pathname === resolvedUrl(sub.url));

      const isParentActive =
        pathname === resolvedParent || pathname.startsWith(`${resolvedParent}/`);

      initialState[item.title] = isChildActive || isParentActive;
    });

    return initialState;
  });

  return { openItems, setOpenItems };
}
