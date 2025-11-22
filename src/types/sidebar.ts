export interface NavItem {
  title: string;
  url: string;
  icon: string;
  items?: NavSubItem[];
  showBadge?: boolean;
  roles?: string[];
}

export interface NavSubItem {
  title: string;
  url: string;
  roles?: string[];
}
