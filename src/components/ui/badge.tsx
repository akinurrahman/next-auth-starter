import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
        destructive:
          'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline: 'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
        success:
          'border-transparent bg-green-100 text-green-800 [a&]:hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300',
        warning:
          'border-transparent bg-amber-100 text-amber-800 [a&]:hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-300',
        info: 'border-transparent bg-blue-100 text-blue-800 [a&]:hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300',
        muted: 'border-transparent bg-muted text-muted-foreground [a&]:hover:bg-muted/80',
        pending:
          'border-transparent bg-gray-100 text-gray-800 [a&]:hover:bg-gray-200 dark:bg-gray-900/30 dark:text-gray-300',
        processing:
          'border-transparent bg-purple-100 text-purple-800 [a&]:hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300',
        neutral:
          'border-transparent bg-slate-100 text-slate-800 [a&]:hover:bg-slate-200 dark:bg-slate-900/30 dark:text-slate-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export type BadgeVariant = VariantProps<typeof badgeVariants>['variant'];
export { Badge, badgeVariants };
