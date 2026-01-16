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
import { useSidebarStore } from '@/stores/sidebar.store';

export function NavMain() {
  const pathname = usePathname();
  const router = useRouter();
  const items = useSidebarStore(store => store.sidebarData);
  const { state } = useSidebar();

  const [openItems, setOpenItems] = useState<Record<string, boolean>>(() => {
    const initialState: Record<string, boolean> = {};
    items.forEach(item => {
      if (item.items?.length) {
        const isChildActive = item.items.some(sub => pathname === sub.url);
        const isParentActive = pathname === item.url || pathname.startsWith(`${item.url}/`);
        initialState[item.title] = isChildActive || isParentActive;
      }
    });
    return initialState;
  });

  const isRouteActive = (url: string) => pathname === url || pathname.startsWith(`${url}/`);

  return (
    <TooltipProvider>
      <SidebarGroup>
        <SidebarMenu>
          {items.map(item => {
            const hasSubItems = !!item.items?.length;
            const Icon =
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (LucideIcons as Record<string, any>)[item.icon || 'Star'] || LucideIcons.Star;

            if (hasSubItems) {
              const isChildActive = item.items?.some(sub => pathname === sub.url);
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
                              router.push(item.url);
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
                                className={`h-4 w-4 transition-transform ${
                                  isOpen ? 'rotate-90' : ''
                                }`}
                              />
                            </button>
                          )}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="right">{item.title}</TooltipContent>
                    </Tooltip>

                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map(sub => (
                          <SidebarMenuSubItem key={sub.title}>
                            <SidebarMenuSubButton asChild isActive={pathname === sub.url}>
                              <Link href={sub.url}>
                                <span>{sub.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
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
                    <SidebarMenuButton asChild isActive={isRouteActive(item.url)}>
                      <Link href={item.url}>
                        <Icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </TooltipTrigger>
                  <TooltipContent side="right">{item.title}</TooltipContent>
                </Tooltip>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroup>
    </TooltipProvider>
  );
}
