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

  // For mobile: show first, ellipsis, last if more than 2 items
  const renderMobileBreadcrumbs = () => {
    if (breadcrumbs.length <= 2) {
      return breadcrumbs.map((item, idx) => (
        <React.Fragment key={idx}>
          <BreadcrumbItem>
            {item.url ? (
              <BreadcrumbLink asChild>
                <Link href={item.url}>{item.title}</Link>
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage>{item.title}</BreadcrumbPage>
            )}
          </BreadcrumbItem>
          {idx < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
        </React.Fragment>
      ));
    }

    // More than 2 items: show first, ellipsis, last
    const firstItem = breadcrumbs[0];
    const lastItem = breadcrumbs[breadcrumbs.length - 1];

    return (
      <>
        <BreadcrumbItem>
          {firstItem.url ? (
            <BreadcrumbLink asChild>
              <Link href={firstItem.url}>{firstItem.title}</Link>
            </BreadcrumbLink>
          ) : (
            <BreadcrumbPage>{firstItem.title}</BreadcrumbPage>
          )}
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>...</BreadcrumbPage>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          {lastItem.url ? (
            <BreadcrumbLink asChild>
              <Link href={lastItem.url}>{lastItem.title}</Link>
            </BreadcrumbLink>
          ) : (
            <BreadcrumbPage>{lastItem.title}</BreadcrumbPage>
          )}
        </BreadcrumbItem>
      </>
    );
  };

  // For desktop: show all items
  const renderDesktopBreadcrumbs = () => {
    return breadcrumbs.map((item, idx) => (
      <React.Fragment key={idx}>
        <BreadcrumbItem>
          {item.url ? (
            <BreadcrumbLink asChild>
              <Link href={item.url}>{item.title}</Link>
            </BreadcrumbLink>
          ) : (
            <BreadcrumbPage>{item.title}</BreadcrumbPage>
          )}
        </BreadcrumbItem>
        {idx < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
      </React.Fragment>
    ));
  };

  return (
    <Breadcrumb>
      <BreadcrumbList className="lg:hidden">{renderMobileBreadcrumbs()}</BreadcrumbList>
      <BreadcrumbList className="hidden lg:flex">{renderDesktopBreadcrumbs()}</BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrump;
