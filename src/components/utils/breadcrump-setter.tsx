'use client';

import { useEffect } from 'react';

import { useBreadcrumbStore } from '@/stores/breadcrumb';

interface BreadcrumpSetterProps {
  items: { title: string; url: string }[];
}

const BreadcrumpSetter = ({ items }: BreadcrumpSetterProps) => {
  const setBreadcrumbs = useBreadcrumbStore(store => store.setBreadcrumbs);

  useEffect(() => {
    setBreadcrumbs(items);

    return () => {
      setBreadcrumbs([]);
    };
  }, [items, setBreadcrumbs]);
  return null;
};

export default BreadcrumpSetter;
