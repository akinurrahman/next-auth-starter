// 'use client';

// import * as React from 'react';

// import { AppHeader } from '@/components/layout/app-header';
// import { NavMain } from '@/components/layout/nav-main';
// import { NavUser } from '@/components/layout/nav-user';
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarHeader,
//   SidebarRail,
// } from '@/components/ui/sidebar';
// import { useAuthStore } from '@/stores/auth.store';

// export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
//   const user = useAuthStore(s => s.user);
//   return (
//     <Sidebar collapsible="icon" {...props}>
//       <SidebarHeader>
//         <AppHeader user={user} />
//       </SidebarHeader>
//       <SidebarContent>
//         <NavMain />
//       </SidebarContent>
//       <SidebarFooter>
//         <NavUser user={user} />
//       </SidebarFooter>
//       <SidebarRail />
//     </Sidebar>
//   );
// }

'use client';

import * as React from 'react';

import { AppHeader } from '@/components/layout/app-header';
import { NavMain } from '@/components/layout/nav-main';
import { NavUser } from '@/components/layout/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { useAuthStore } from '@/stores/auth.store';

// 'use client';

// import * as React from 'react';

// import { AppHeader } from '@/components/layout/app-header';
// import { NavMain } from '@/components/layout/nav-main';
// import { NavUser } from '@/components/layout/nav-user';
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarHeader,
//   SidebarRail,
// } from '@/components/ui/sidebar';
// import { useAuthStore } from '@/stores/auth.store';

// export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
//   const user = useAuthStore(s => s.user);
//   return (
//     <Sidebar collapsible="icon" {...props}>
//       <SidebarHeader>
//         <AppHeader user={user} />
//       </SidebarHeader>
//       <SidebarContent>
//         <NavMain />
//       </SidebarContent>
//       <SidebarFooter>
//         <NavUser user={user} />
//       </SidebarFooter>
//       <SidebarRail />
//     </Sidebar>
//   );
// }

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useAuthStore(s => s.user);
  return (
    //     <Sidebar collapsible="icon" {...props}>
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <AppHeader user={user} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
