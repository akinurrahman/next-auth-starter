export type SidebarItem = {
  title: string;
  url: string;
  icon?: string;
  roles?: string[];
  items?: SidebarItem[];
};

export type SidebarGroup = {
  group: string;
  roles?: string[];
  items: SidebarItem[];
};
