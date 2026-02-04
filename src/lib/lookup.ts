import { BadgeVariant } from '@ui/badge';

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
  };
}
