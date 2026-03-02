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
          'border-transparent bg-secondary/50 text-secondary-foreground dark:bg-secondary/30 [a&]:hover:bg-secondary/70 dark:[a&]:hover:bg-secondary/50',

        destructive:
          'border-transparent bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 [a&]:hover:bg-red-200 dark:[a&]:hover:bg-red-900/50',

        outline:
          'border border-border bg-transparent text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',

        success:
          'border-transparent bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 [a&]:hover:bg-green-200 dark:[a&]:hover:bg-green-900/50',

        warning:
          'border-transparent bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 [a&]:hover:bg-yellow-200 dark:[a&]:hover:bg-yellow-900/50',

        info: 'border-transparent bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 [a&]:hover:bg-blue-200 dark:[a&]:hover:bg-blue-900/50',

        pending:
          'border-transparent bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 [a&]:hover:bg-orange-200 dark:[a&]:hover:bg-orange-900/50',

        inactive:
          'border-transparent bg-slate-100 text-slate-700 dark:bg-slate-800/40 dark:text-slate-300 [a&]:hover:bg-slate-200 dark:[a&]:hover:bg-slate-700/50',

        muted: 'border-transparent bg-muted text-muted-foreground [a&]:hover:bg-muted/80',
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
