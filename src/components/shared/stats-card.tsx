import React from 'react';

import { LucideIcon, TrendingDown, TrendingUp } from 'lucide-react';

import { cn } from '@/lib/utils';

interface StatsTrend {
  value: string;
  positive: boolean;
}

interface StatsCardProps {
  label: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  borderAccent: string;
  trend?: StatsTrend;
}

const StatsCard = ({
  label,
  value,
  subtitle,
  icon: Icon,
  iconBg,
  iconColor,
  borderAccent,
  trend,
}: StatsCardProps) => {
  return (
    <div
      className={cn(
        'bg-card group relative flex flex-col gap-3 overflow-hidden rounded-xl border border-l-3 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md',
        borderAccent
      )}
    >
      {/* Top row: label + icon */}
      <div className="flex items-start justify-between">
        <p className="text-muted-foreground text-sm font-medium">{label}</p>
        <div
          className={cn(
            'rounded-lg px-2.5 py-2 transition-transform duration-200 group-hover:scale-110',
            iconBg
          )}
        >
          <Icon className={cn('size-4', iconColor)} />
        </div>
      </div>

      {/* Bottom row: value + subtitle + optional trend */}
      <div className="flex flex-col gap-1.5">
        <p className="text-card-foreground text-3xl font-bold tracking-tight">{value}</p>
        <div className="flex items-center justify-between gap-2">
          <p className="text-muted-foreground text-xs">{subtitle}</p>
          {trend && (
            <span
              className={cn(
                'flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold',
                trend.positive ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
              )}
            >
              {trend.positive ? (
                <TrendingUp className="size-3" />
              ) : (
                <TrendingDown className="size-3" />
              )}
              {trend.value}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
