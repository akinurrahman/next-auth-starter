'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { ChevronRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useInitialSidebarOpen } from '@/lib/navbar/use-initial-sidebar-open';
import { useResolvedActiveRoute } from '@/lib/navbar/use-resolved-active-route';
import { useResolvedRoute } from '@/lib/navbar/use-resolved-route';
import { useSidebarStore } from '@/stores/sidebar.store';
import { SidebarItem } from '@/types/sidebar';

export function NavMain() {
  const router = useRouter();
  const groups = useSidebarStore(store => store.sidebarData);
  const { state } = useSidebar();

  const { resolvedUrl } = useResolvedRoute();
  const { pathname, isRouteActive, isExact } = useResolvedActiveRoute(resolvedUrl);

  const { openItems, setOpenItems } = useInitialSidebarOpen(groups, pathname, resolvedUrl);

  const renderItem = (item: SidebarItem) => {
    const hasSubItems = !!item.items?.length;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Icon = (LucideIcons as Record<string, any>)[item.icon || 'Star'] || LucideIcons.Star;

    const parentUrl = resolvedUrl(item.url);

    if (hasSubItems) {
      const isChildActive = !!item.items?.some(sub => isExact(sub.url));

      const isParentActive = isRouteActive(item.url);

      const isOpen = openItems[item.title] ?? (isChildActive || isParentActive);

      return (
        <Collapsible
          key={item.title}
          open={isOpen}
          onOpenChange={open => setOpenItems(prev => ({ ...prev, [item.title]: open }))}
        >
          <SidebarMenuItem>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex">
                  <SidebarMenuButton
                    isActive={isParentActive}
                    onClick={() => {
                      setOpenItems(prev => ({
                        ...prev,
                        [item.title]: true,
                      }));
                      router.push(parentUrl);
                    }}
                  >
                    <Icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>

                  {state === 'expanded' && (
                    <button
                      onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        setOpenItems(prev => ({
                          ...prev,
                          [item.title]: !prev[item.title],
                        }));
                      }}
                    >
                      <ChevronRight
                        className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-90' : ''}`}
                      />
                    </button>
                  )}
                </div>
              </TooltipTrigger>

              <TooltipContent side="right">{item.title}</TooltipContent>
            </Tooltip>

            <CollapsibleContent>
              <SidebarMenuSub>
                {item.items?.map(sub => {
                  const subUrl = resolvedUrl(sub.url);
                  const isSubActive = isExact(sub.url);

                  return (
                    <SidebarMenuSubItem key={sub.title}>
                      <SidebarMenuSubButton asChild isActive={isSubActive}>
                        <Link href={subUrl}>
                          <span>{sub.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  );
                })}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      );
    }

    return (
      <SidebarMenuItem key={item.title}>
        <Tooltip>
          <TooltipTrigger asChild>
            <SidebarMenuButton asChild isActive={isRouteActive(item.url)}>
              <Link href={parentUrl}>
                <Icon />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </TooltipTrigger>

          <TooltipContent side="right">{item.title}</TooltipContent>
        </Tooltip>
      </SidebarMenuItem>
    );
  };

  return (
    <TooltipProvider>
      {groups.map(group => (
        <SidebarGroup key={group.group} className="py-0">
          <SidebarGroupLabel className="h-7">{group.group}</SidebarGroupLabel>

          <SidebarMenu>{group.items.map(renderItem)}</SidebarMenu>
        </SidebarGroup>
      ))}
    </TooltipProvider>
  );
}
