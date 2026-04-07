'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { Activity, AlertCircle, DollarSign, TrendingUp, Users } from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import BreadcrumpSetter from '@/components/shared/breadcrump-setter';
import StatsCard from '@/components/shared/stats-card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { DataTable, DataTableColumnHeader } from '@/systems/data-table';

/* ─────────────────────────── stats ─────────────────────────── */

const STATS = [
  {
    label: 'Total Revenue',
    value: '$48,295',
    subtitle: 'This month',
    icon: DollarSign,
    trend: { value: '+12.5%', positive: true },
    borderAccent: 'border-l-primary',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    label: 'Active Users',
    value: '3,842',
    subtitle: 'vs. last month',
    icon: Users,
    trend: { value: '+4.2%', positive: true },
    borderAccent: 'border-l-success',
    iconBg: 'bg-success/10',
    iconColor: 'text-success',
  },
  {
    label: 'New Orders',
    value: '1,290',
    subtitle: 'Last 30 days',
    icon: Activity,
    trend: { value: '-2.1%', positive: false },
    borderAccent: 'border-l-warning',
    iconBg: 'bg-warning/10',
    iconColor: 'text-warning',
  },
  {
    label: 'Growth Rate',
    value: '24.8%',
    subtitle: 'Year over year',
    icon: TrendingUp,
    trend: { value: '+8.3%', positive: true },
    borderAccent: 'border-l-destructive',
    iconBg: 'bg-destructive/10',
    iconColor: 'text-destructive',
  },
];

/* ─────────────────────────── chart data ─────────────────────────── */

const MONTHLY_REVENUE = [
  { month: 'Jan', revenue: 32000, expenses: 21000 },
  { month: 'Feb', revenue: 38000, expenses: 24000 },
  { month: 'Mar', revenue: 29000, expenses: 19000 },
  { month: 'Apr', revenue: 45000, expenses: 27000 },
  { month: 'May', revenue: 41000, expenses: 25000 },
  { month: 'Jun', revenue: 52000, expenses: 31000 },
  { month: 'Jul', revenue: 48000, expenses: 28000 },
  { month: 'Aug', revenue: 61000, expenses: 34000 },
  { month: 'Sep', revenue: 57000, expenses: 32000 },
  { month: 'Oct', revenue: 68000, expenses: 38000 },
  { month: 'Nov', revenue: 74000, expenses: 41000 },
  { month: 'Dec', revenue: 89000, expenses: 47000 },
];

const WEEKLY_VISITORS = [
  { day: 'Mon', visitors: 1842 },
  { day: 'Tue', visitors: 2391 },
  { day: 'Wed', visitors: 2105 },
  { day: 'Thu', visitors: 3274 },
  { day: 'Fri', visitors: 3820 },
  { day: 'Sat', visitors: 1658 },
  { day: 'Sun', visitors: 1124 },
];

const CONVERSION_TREND = [
  { month: 'Jan', rate: 3.2 },
  { month: 'Feb', rate: 3.8 },
  { month: 'Mar', rate: 3.5 },
  { month: 'Apr', rate: 4.1 },
  { month: 'May', rate: 4.6 },
  { month: 'Jun', rate: 4.3 },
  { month: 'Jul', rate: 5.0 },
  { month: 'Aug', rate: 5.4 },
  { month: 'Sep', rate: 5.1 },
  { month: 'Oct', rate: 5.8 },
  { month: 'Nov', rate: 6.2 },
  { month: 'Dec', rate: 6.7 },
];

const TRAFFIC_SOURCES = [
  { name: 'Organic', value: 42 },
  { name: 'Direct', value: 28 },
  { name: 'Referral', value: 18 },
  { name: 'Social', value: 12 },
];

/* ─────────────────────────── table data ─────────────────────────── */

type RecentUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive' | 'Pending';
  joined: string;
};

const RECENT_USERS: RecentUser[] = [
  {
    id: '1',
    name: 'Jane Doe',
    email: 'jane@acme.com',
    role: 'Admin',
    status: 'Active',
    joined: 'Jan 12, 2024',
  },
  {
    id: '2',
    name: 'Mark Ellis',
    email: 'mark@acme.com',
    role: 'Editor',
    status: 'Active',
    joined: 'Feb 3, 2024',
  },
  {
    id: '3',
    name: 'Sara Kim',
    email: 'sara@acme.com',
    role: 'Viewer',
    status: 'Inactive',
    joined: 'Mar 19, 2024',
  },
  {
    id: '4',
    name: 'Tom Bernard',
    email: 'tom@acme.com',
    role: 'Editor',
    status: 'Pending',
    joined: 'Apr 7, 2024',
  },
  {
    id: '5',
    name: 'Lisa Chen',
    email: 'lisa@acme.com',
    role: 'Admin',
    status: 'Active',
    joined: 'May 22, 2024',
  },
];

const userColumns: ColumnDef<RecentUser>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-2.5">
        <Avatar className="size-6">
          <AvatarFallback className="text-[10px]">
            {row
              .getValue<string>('name')
              .split(' ')
              .map(n => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
        <span className="font-medium">{row.getValue('name')}</span>
      </div>
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    cell: ({ row }) => (
      <span className="text-muted-foreground text-sm">{row.getValue('email')}</span>
    ),
  },
  {
    accessorKey: 'role',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
    cell: ({ row }) => <Badge variant="outline">{row.getValue('role')}</Badge>,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.getValue<string>('status');
      return (
        <Badge
          variant={status === 'Active' ? 'success' : status === 'Pending' ? 'pending' : 'inactive'}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'joined',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Joined" />,
    cell: ({ row }) => (
      <span className="text-muted-foreground text-sm">{row.getValue('joined')}</span>
    ),
  },
];

/* ─────────────────────────── recent activity ─────────────────────────── */

const RECENT_ACTIVITY = [
  { text: 'New user signed up', time: '2m ago', icon: Users },
  { text: 'Payment received — $1,240', time: '18m ago', icon: DollarSign },
  { text: 'Server alert triggered', time: '1h ago', icon: AlertCircle },
  { text: 'Monthly report generated', time: '3h ago', icon: Activity },
  { text: 'New subscription plan activated', time: '5h ago', icon: TrendingUp },
];

/* ─────────────────────────── progress goals ─────────────────────────── */

const GOALS = [
  { label: 'Revenue target', value: 68, description: '$48k of $70k' },
  { label: 'User acquisition', value: 53, description: '3,842 of 7,200' },
  { label: 'Support resolution', value: 91, description: '182 of 200 tickets' },
];

/* ─────────────────────────── component ─────────────────────────── */

const AdminDashboard = () => {
  return (
    <div className="layout space-y-8">
      <BreadcrumpSetter items={[{ title: 'Dashboard', url: '#' }]} />

      {/* ── Page title ── */}
      <div>
        <p className="text-primary mb-1 text-xs font-semibold tracking-widest uppercase">
          Overview
        </p>
        <h1 className="title">Admin Dashboard</h1>
        <p className="description mt-1">Key metrics, activity, and team performance at a glance.</p>
      </div>

      {/* ── Stats ── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map(card => (
          <StatsCard key={card.label} {...card} />
        ))}
      </div>

      {/* ── Charts ── */}
      <div className="grid gap-5 sm:grid-cols-2">
        {/* Area Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Revenue vs Expenses</CardTitle>
            <CardDescription>Monthly comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={MONTHLY_REVENUE} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--muted-foreground)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="var(--muted-foreground)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={v => `$${v / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    background: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  labelStyle={{ color: 'var(--foreground)', fontWeight: 600 }}
                  itemStyle={{ color: 'var(--muted-foreground)' }}
                  formatter={v => [`$${(Number(v) / 1000).toFixed(1)}k`]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--primary)"
                  strokeWidth={2}
                  fill="url(#gradRevenue)"
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stroke="var(--muted-foreground)"
                  strokeWidth={1.5}
                  fill="url(#gradExpenses)"
                  strokeDasharray="4 2"
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="text-muted-foreground mt-3 flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span
                  className="inline-block h-2 w-4 rounded-full"
                  style={{ background: 'var(--primary)' }}
                />
                Revenue
              </span>
              <span className="flex items-center gap-1.5">
                <span
                  className="inline-block h-2 w-4 rounded-full opacity-50"
                  style={{ background: 'var(--muted-foreground)' }}
                />
                Expenses
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Weekly Visitors</CardTitle>
            <CardDescription>Unique visitors per day</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={WEEKLY_VISITORS}
                margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
                barSize={28}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={v => `${(v / 1000).toFixed(1)}k`}
                />
                <Tooltip
                  contentStyle={{
                    background: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  labelStyle={{ color: 'var(--foreground)', fontWeight: 600 }}
                  itemStyle={{ color: 'var(--muted-foreground)' }}
                  cursor={{ fill: 'var(--muted)', radius: 4 }}
                />
                <Bar dataKey="visitors" fill="var(--primary)" radius={[4, 4, 0, 0]}>
                  {WEEKLY_VISITORS.map((_, i) => (
                    <Cell key={i} fillOpacity={i === 4 ? 1 : 0.55} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <p className="text-muted-foreground mt-3 text-xs">
              Friday peaks at 3,820 unique visitors
            </p>
          </CardContent>
        </Card>

        {/* Line Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <CardDescription>Monthly trend</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart
                data={CONVERSION_TREND}
                margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={v => `${v}%`}
                  domain={[2, 8]}
                />
                <Tooltip
                  contentStyle={{
                    background: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  labelStyle={{ color: 'var(--foreground)', fontWeight: 600 }}
                  itemStyle={{ color: 'var(--muted-foreground)' }}
                  formatter={v => [`${v}%`, 'Conversion']}
                />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="var(--primary)"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: 'var(--primary)', strokeWidth: 2, stroke: 'var(--card)' }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-muted-foreground mt-3 text-xs">+68% improvement over 12 months</p>
          </CardContent>
        </Card>

        {/* Donut Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Traffic Sources</CardTitle>
            <CardDescription>Acquisition breakdown</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-6">
            <ResponsiveContainer width={140} height={140}>
              <PieChart>
                <Pie
                  data={TRAFFIC_SOURCES}
                  cx="50%"
                  cy="50%"
                  innerRadius={42}
                  outerRadius={64}
                  paddingAngle={3}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {TRAFFIC_SOURCES.map((_, i) => (
                    <Cell
                      key={i}
                      fill={
                        [
                          'var(--primary)',
                          'color-mix(in oklch, var(--primary) 65%, var(--background))',
                          'color-mix(in oklch, var(--primary) 40%, var(--background))',
                          'color-mix(in oklch, var(--primary) 20%, var(--background))',
                        ][i]
                      }
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  formatter={v => [`${v}%`]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-1 flex-col gap-2">
              {TRAFFIC_SOURCES.map((src, i) => (
                <div key={src.name} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{
                        background: [
                          'var(--primary)',
                          'color-mix(in oklch, var(--primary) 65%, var(--background))',
                          'color-mix(in oklch, var(--primary) 40%, var(--background))',
                          'color-mix(in oklch, var(--primary) 20%, var(--background))',
                        ][i],
                      }}
                    />
                    <span className="text-muted-foreground text-xs">{src.name}</span>
                  </div>
                  <span className="text-xs font-semibold tabular-nums">{src.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid items-start gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
              <Badge variant="destructive">5 new</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {RECENT_ACTIVITY.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="bg-muted flex size-7 shrink-0 items-center justify-center rounded-full">
                    <Icon className="text-muted-foreground size-3.5" />
                  </div>
                  <p className="flex-1 text-xs">{item.text}</p>
                  <span className="text-muted-foreground text-[10px]">{item.time}</span>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Goals */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Monthly Goals</CardTitle>
            <CardDescription>Progress toward this month&apos;s targets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {GOALS.map(goal => (
              <div key={goal.label} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{goal.label}</span>
                  <span className="text-muted-foreground text-xs">{goal.description}</span>
                </div>
                <Progress value={goal.value} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-3 lg:col-span-2">
        <div>
          <h2 className="text-base font-semibold tracking-tight">Recent Users</h2>
          <p className="text-muted-foreground mt-0.5 text-sm">Latest sign-ups and their status</p>
        </div>
        <DataTable columns={userColumns} data={RECENT_USERS} />
      </div>
    </div>
  );
};

export default AdminDashboard;
