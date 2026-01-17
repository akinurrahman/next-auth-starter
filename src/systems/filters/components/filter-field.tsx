import React from 'react';

import { cn } from '@/lib/utils';

import { ResponsiveSpan, SpanValue } from '../types';

interface Props {
  label: string;
  span?: SpanValue | ResponsiveSpan;
  children: React.ReactNode;
}

function getSpanClasses(span: SpanValue | ResponsiveSpan = 'half'): string {
  // If it's a simple string value
  if (typeof span === 'string') {
    return span === 'full' ? 'col-span-2' : 'col-span-1';
  }

  // If it's a responsive object
  const { mobile = 'full', desktop = 'half' } = span;

  const mobileClass = mobile === 'full' ? 'col-span-2' : 'col-span-1';
  const desktopClass = desktop === 'full' ? 'md:col-span-2' : 'md:col-span-1';

  return `${mobileClass} ${desktopClass}`;
}

export function FilterField({ label, span = 'half', children }: Props) {
  return (
    <div className={cn(getSpanClasses(span))}>
      <label className="mb-1 block text-sm font-medium">{label}</label>
      {children}
    </div>
  );
}
