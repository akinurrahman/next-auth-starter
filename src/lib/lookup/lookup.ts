import { BadgeVariant } from '@ui/badge';
import { LucideIcon } from 'lucide-react';
import z from 'zod';

export type LookupConfig<T extends string> = Record<
  T,
  {
    label: string;
    badgeVariant: BadgeVariant;
    icon?: LucideIcon;
    iconClassName?: string;
    className?: string;
  }
>;

export function createLookup<T extends string>(config: LookupConfig<T>, name?: string) {
  const entries = Object.entries(config) as [T, LookupConfig<T>[T]][];
  const values = entries.map(([key]) => key);

  function warn(value: string) {
    console.warn(
      `[Lookup${name ? `:${name}` : ''}] Unknown or missing value: "${value}". Expected one of: ${values.join(', ')}`
    );
  }

  function resolve(value: string | null | undefined) {
    if (!value || !Object.prototype.hasOwnProperty.call(config, value)) {
      warn(String(value));
      return null;
    }
    return config[value as T];
  }

  return {
    config,

    keys: Object.keys(config).reduce(
      (acc, key) => {
        acc[key as T] = key as T;
        return acc;
      },
      {} as Record<T, T>
    ),

    values,

    options: entries.map(([value, meta]) => ({
      value,
      label: meta.label,
    })),

    // single safe resolver (no function explosion)
    resolve,

    toZodEnum() {
      return z.enum(values as [T, ...T[]]);
    },
  };
}
