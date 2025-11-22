'use client';

import { useState } from 'react';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { ChevronRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useAuthStore } from '@/stores/auth.store';
import { useSidebarStore } from '@/stores/sidebar.store';

export function NavMain() {
  const pathname = usePathname();
  const router = useRouter();
  const items = useSidebarStore(store => store.sidebarData);
  const user = useAuthStore(store => store.user);
  const { state } = useSidebar();

  const [openItems, setOpenItems] = useState<Record<string, boolean>>(() => {
    const initialState: Record<string, boolean> = {};
    items.forEach(item => {
      if (item.items && item.items.length > 0) {
        const isChildActive = !!item.items?.some(subItem => subItem.url === pathname);
        const isParentActive = pathname === item.url || pathname.startsWith(`${item.url}/`);
        initialState[item.title] = isChildActive || isParentActive;
      }
    });
    return initialState;
  });

  const isRouteActive = (itemUrl: string) => {
    if (pathname === itemUrl) return true;
    return pathname.startsWith(`${itemUrl}/`);
  };

  // Check role access
  const hasAccess = (roles?: string[]) => {
    if (!roles || roles.length === 0) return true; // visible to all if not passed
    return roles.includes(user?.role || '');
  };

  return (
    <TooltipProvider>
      <SidebarGroup>
        <SidebarMenu>
          {items.map(item => {
            // Root level role check
            if (!hasAccess(item.roles)) return null;

            const hasSubItems = item.items && item.items.length > 0;
            const IconComponent =
              (LucideIcons as unknown as Record<string, typeof LucideIcons.Star>)[item.icon] ||
              LucideIcons.Star;

            if (hasSubItems) {
              const isChildActive = !!item.items?.some(subItem => subItem.url === pathname);
              const isParentActive = isRouteActive(item.url);
              const isOpen = openItems[item.title] ?? (isChildActive || isParentActive);

              const handleChevronClick = (e: React.MouseEvent) => {
                e.preventDefault();
                e.stopPropagation();
                setOpenItems(prev => ({
                  ...prev,
                  [item.title]: !prev[item.title],
                }));
              };

              const handleItemClick = () => {
                setOpenItems(prev => ({
                  ...prev,
                  [item.title]: true,
                }));
                router.push(item.url);
              };

              return (
                <Collapsible
                  key={item.title}
                  open={isOpen}
                  onOpenChange={open => setOpenItems(prev => ({ ...prev, [item.title]: open }))}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="group/menu-item relative flex">
                          <SidebarMenuButton
                            tooltip={item.title}
                            className={`group-hover/menu-item:bg-sidebar-accent group-hover/menu-item:text-sidebar-accent-foreground h-10 flex-1 cursor-pointer ${state === 'expanded' ? 'rounded-r-none' : ''}`}
                            isActive={isParentActive}
                            onClick={handleItemClick}
                          >
                            <IconComponent />
                            <span>{item.title}</span>
                          </SidebarMenuButton>
                          {state === 'expanded' && (
                            <button
                              className={`bg-sidebar group-hover/menu-item:bg-sidebar-accent group-hover/menu-item:text-sidebar-accent-foreground flex h-10 w-8 items-center justify-center rounded-r-md ${isParentActive ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}
                              onClick={handleChevronClick}
                              aria-label={`Toggle ${item.title} submenu`}
                              data-state={isOpen ? 'open' : 'closed'}
                            >
                              <ChevronRight className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </button>
                          )}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="right" align="center">
                        <p>{item.title}</p>
                      </TooltipContent>
                    </Tooltip>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items
                          ?.filter(subItem => hasAccess(subItem.roles)) // Filter sub-items based on roles
                          .map(subItem => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <SidebarMenuSubButton
                                    asChild
                                    isActive={pathname === subItem.url}
                                    className="h-9"
                                  >
                                    <Link href={subItem.url}>
                                      <span>{subItem.title}</span>
                                    </Link>
                                  </SidebarMenuSubButton>
                                </TooltipTrigger>
                                <TooltipContent side="right" align="center">
                                  <p>{subItem.title}</p>
                                </TooltipContent>
                              </Tooltip>
                            </SidebarMenuSubItem>
                          ))}
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
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={isRouteActive(item.url)}
                      className="h-10"
                    >
                      <Link href={item.url}>
                        {item.icon && <IconComponent />}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </TooltipTrigger>
                  <TooltipContent side="right" align="center">
                    <p>{item.title}</p>
                  </TooltipContent>
                </Tooltip>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroup>
    </TooltipProvider>
  );
}
