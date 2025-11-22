import { create } from 'zustand';

export type BreadcrumbItem = { title: string; url?: string };

type BreadcrumbState = {
  breadcrumbs: BreadcrumbItem[];
  setBreadcrumbs: (items: BreadcrumbItem[]) => void;
};

export const useBreadcrumbStore = create<BreadcrumbState>(set => ({
  breadcrumbs: [],
  setBreadcrumbs: items => set({ breadcrumbs: items }),
}));
