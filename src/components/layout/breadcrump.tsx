'use client';

import React from 'react';

import Link from 'next/link';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@ui/breadcrumb';

import { useBreadcrumbStore } from '@/stores/breadcrumb';

const BreadCrump = () => {
  const breadcrumbs = useBreadcrumbStore(state => state.breadcrumbs);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((item, idx) => (
          <React.Fragment key={idx}>
            <BreadcrumbItem className="hidden lg:block">
              {item.url ? (
                <BreadcrumbLink asChild>
                  <Link href={item.url}>{item.title}</Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{item.title}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {idx < breadcrumbs.length - 1 && <BreadcrumbSeparator className="hidden lg:block" />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrump;
