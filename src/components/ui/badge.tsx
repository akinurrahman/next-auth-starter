import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none transition-colors overflow-hidden',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',

        secondary:
          'border-transparent bg-secondary/80 text-secondary-foreground dark:bg-secondary/40 [a&]:hover:bg-secondary/60',

        destructive:
          'border-transparent bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 [a&]:hover:bg-red-200 dark:[a&]:hover:bg-red-900/50',

        outline:
          'border-border bg-transparent text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',

        success:
          'border-transparent bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 [a&]:hover:bg-emerald-200',

        warning:
          'border-transparent bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 [a&]:hover:bg-amber-200',

        info: 'border-transparent bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-400 [a&]:hover:bg-sky-200',

        pending:
          'border-transparent bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 [a&]:hover:bg-orange-200',

        inactive:
          'border-transparent bg-stone-100 text-stone-600 dark:bg-stone-800/50 dark:text-stone-400 [a&]:hover:bg-stone-200',

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
