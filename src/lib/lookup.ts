import { BadgeVariant } from '@ui/badge';
import z from 'zod';

export type LookupConfig<T extends string> = Record<
  T,
  {
    label: string;
    badgeVariant: BadgeVariant;
  }
>;

export function createLookup<T extends string>(config: LookupConfig<T>) {
  const entries = Object.entries(config) as [T, LookupConfig<T>[T]][];

  return {
    config,
    keys: Object.keys(config).reduce(
      (acc, key) => {
        acc[key as T] = key as T;
        return acc;
      },
      {} as Record<T, T>
    ),
    values: entries.map(([key]) => key),
    options: entries.map(([value, meta]) => ({
      value,
      label: meta.label,
    })),
    getLabel(value: T) {
      return config[value].label;
    },
    getBadgeVariant(value: T) {
      return config[value].badgeVariant;
    },
    toZodEnum() {
      return z.enum(Object.keys(config) as [T, ...T[]]);
    },
  };
}
