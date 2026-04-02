import React from 'react';

import { AlertTriangle, IndianRupee, Package, XCircle } from 'lucide-react';

import { StatsCard } from '@/components/shared';

const cards = [
  {
    label: 'Total Items',
    value: '120',
    subtitle: 'Products tracked',
    icon: Package,
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    borderAccent: 'border-l-primary',
  },
  {
    label: 'Inventory Value',
    value: '₹1,50,000',
    subtitle: 'Total stock worth',
    icon: IndianRupee,
    iconBg: 'bg-success/10',
    iconColor: 'text-success',
    borderAccent: 'border-l-success',
  },
  {
    label: 'Low Stock',
    value: '5',
    subtitle: 'Need restocking',
    icon: AlertTriangle,
    iconBg: 'bg-warning/10',
    iconColor: 'text-warning',
    borderAccent: 'border-l-warning',
    trend: { value: '-2.5%', positive: false },
  },
  {
    label: 'Out of Stock',
    value: '0',
    subtitle: 'Urgent attention',
    icon: XCircle,
    iconBg: 'bg-destructive/10',
    iconColor: 'text-destructive',
    borderAccent: 'border-l-destructive',
    trend: { value: '-8.2%', positive: false },
  },
];

const Page = () => {
  return (
    <div className="layout mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <StatsCard key={index} {...card} />
      ))}
    </div>
  );
};

export default Page;
