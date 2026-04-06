'use client';

import { Suspense, useState } from 'react';

import { useTheme } from 'next-themes';

import type { ColumnDef } from '@tanstack/react-table';
import {
  Activity,
  AlertCircle,
  BarChart3,
  Bell,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  DollarSign,
  Info,
  Layers,
  LayoutDashboard,
  Moon,
  MousePointer,
  Palette,
  Search,
  Settings,
  ShieldCheck,
  Sun,
  Table2,
  Tag,
  TrendingUp,
  Type,
  Users,
  Zap,
} from 'lucide-react';

import ActionButtons from '@/components/shared/action-buttons';
import AnimatedTabs from '@/components/shared/animated-tabs';
import FilterButtons from '@/components/shared/filter-buttons';
import SearchInput from '@/components/shared/search-input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { DataTable, DataTableColumnHeader } from '@/systems/data-table';

/* ─────────────────────────── helpers ─────────────────────────── */

function SectionHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div>
      <h2 className="text-base font-semibold tracking-tight">{title}</h2>
      {description && <p className="text-muted-foreground mt-0.5 text-sm">{description}</p>}
    </div>
  );
}

function SubSectionLabel({ label }: { label: string }) {
  return (
    <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">{label}</p>
  );
}

/* ─────────────────────────── stats data ─────────────────────────── */

const STATS = [
  {
    label: 'Total Revenue',
    value: '$48,295',
    subtitle: 'This month',
    icon: DollarSign,
    trend: { value: '+12.5%', positive: true },
    border: 'border-l-primary',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    label: 'Active Users',
    value: '3,842',
    subtitle: 'vs. last month',
    icon: Users,
    trend: { value: '+4.2%', positive: true },
    border: 'border-l-success',
    iconBg: 'bg-success/10',
    iconColor: 'text-success',
  },
  {
    label: 'New Orders',
    value: '1,290',
    subtitle: 'Last 30 days',
    icon: Activity,
    trend: { value: '-2.1%', positive: false },
    border: 'border-l-warning',
    iconBg: 'bg-warning/10',
    iconColor: 'text-warning',
  },
  {
    label: 'Growth Rate',
    value: '24.8%',
    subtitle: 'Year over year',
    icon: TrendingUp,
    trend: { value: '+8.3%', positive: true },
    border: 'border-l-destructive',
    iconBg: 'bg-destructive/10',
    iconColor: 'text-destructive',
  },
];

/* ─────────────────────────── data table demo ─────────────────────────── */

type DemoUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive' | 'Pending';
  joined: string;
};

const DEMO_USERS: DemoUser[] = [
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
  {
    id: '6',
    name: 'Raj Patel',
    email: 'raj@acme.com',
    role: 'Viewer',
    status: 'Inactive',
    joined: 'Jun 14, 2024',
  },
];

const userColumns: ColumnDef<DemoUser>[] = [
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

/* ─────────────────────────── filter & tab demo data ─────────────────────────── */

const FILTER_OPTIONS = [
  { label: 'All', value: 'All' },
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Pending', value: 'pending' },
];

const DEMO_TABS = [
  {
    id: 'tab-overview',
    label: 'Overview',
    path: '',
    title: 'Overview',
    description: 'General overview',
    icon: LayoutDashboard,
  },
  {
    id: 'tab-analytics',
    label: 'Analytics',
    path: '',
    title: 'Analytics',
    description: 'Usage analytics',
    icon: BarChart3,
  },
  {
    id: 'tab-members',
    label: 'Members',
    path: '',
    title: 'Members',
    description: 'Team members',
    icon: Users,
  },
  {
    id: 'tab-settings',
    label: 'Settings',
    path: '',
    title: 'Settings',
    description: 'Configuration',
    icon: Settings,
  },
];

/* ─────────────────────────── nav config ─────────────────────────── */

type SubItem = { id: string; label: string };
type NavItem = { id: string; label: string; icon: React.ElementType; subitems?: SubItem[] };
type NavGroup = { label: string; items: NavItem[] };

const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Overview',
    items: [{ id: 'overview', label: 'Overview', icon: LayoutDashboard }],
  },
  {
    label: 'Foundations',
    items: [
      { id: 'colors', label: 'Colors', icon: Palette },
      { id: 'typography', label: 'Typography', icon: Type },
    ],
  },
  {
    label: 'UI Components',
    items: [
      {
        id: 'actions',
        label: 'Actions',
        icon: MousePointer,
        subitems: [
          { id: 'actions-variants', label: 'Button Variants' },
          { id: 'actions-sizes', label: 'Sizes & States' },
        ],
      },
      {
        id: 'forms',
        label: 'Form Controls',
        icon: Settings,
        subitems: [
          { id: 'forms-inputs', label: 'Text Inputs' },
          { id: 'forms-selects', label: 'Selects & Pickers' },
        ],
      },
      { id: 'badges', label: 'Badges', icon: Tag },
      { id: 'cards', label: 'Cards', icon: CreditCard },
    ],
  },
  {
    label: 'Data & Metrics',
    items: [
      { id: 'stats', label: 'Statistics', icon: BarChart3 },
      {
        id: 'datatable',
        label: 'Data Table',
        icon: Table2,
        subitems: [
          { id: 'datatable-view', label: 'Table View' },
          { id: 'datatable-loading', label: 'Loading State' },
        ],
      },
      { id: 'progress', label: 'Progress', icon: TrendingUp },
    ],
  },
  {
    label: 'Utilities',
    items: [
      { id: 'search-filter', label: 'Search & Filter', icon: Search },
      { id: 'animated-tabs', label: 'Animated Tabs', icon: Layers },
      { id: 'action-buttons', label: 'Action Buttons', icon: Zap },
      { id: 'feedback', label: 'Feedback', icon: AlertCircle },
    ],
  },
];

/* ─────────────────────────── page ─────────────────────────── */

export default function Page() {
  const { resolvedTheme, setTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('overview');
  const [demoTab, setDemoTab] = useState('tab-overview');

  const scrollTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <SidebarProvider defaultOpen>
      <Sidebar collapsible="icon">
        {/* ── Brand ── */}
        <SidebarHeader className="border-sidebar-border border-b px-3 py-3">
          <div className="flex items-center gap-2.5">
            <div className="bg-primary text-primary-foreground shadow-primary/30 flex h-7 w-7 shrink-0 items-center justify-center rounded-md shadow-sm">
              <ShieldCheck className="size-3.5" />
            </div>
            <div className="min-w-0 group-data-[collapsible=icon]:hidden">
              <p className="text-sidebar-foreground truncate text-sm leading-none font-semibold">
                Design System
              </p>
              <p className="text-sidebar-foreground/50 mt-0.5 text-[10px]">Component Preview</p>
            </div>
          </div>
        </SidebarHeader>

        {/* ── Nav ── */}
        <SidebarContent>
          {NAV_GROUPS.map(group => (
            <SidebarGroup key={group.label}>
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              <SidebarMenu>
                {group.items.map(item => {
                  const Icon = item.icon;
                  const hasSubitems = !!item.subitems?.length;
                  const isActive =
                    activeSection === item.id || item.subitems?.some(s => s.id === activeSection);

                  if (hasSubitems) {
                    return (
                      <SidebarMenuItem key={item.id}>
                        <Collapsible defaultOpen className="group/collapsible">
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton isActive={isActive} tooltip={item.label}>
                              <Icon />
                              <span>{item.label}</span>
                              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {item.subitems!.map(sub => (
                                <SidebarMenuSubItem key={sub.id}>
                                  <SidebarMenuSubButton
                                    isActive={activeSection === sub.id}
                                    onClick={() => scrollTo(sub.id)}
                                  >
                                    <span>{sub.label}</span>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </Collapsible>
                      </SidebarMenuItem>
                    );
                  }

                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        isActive={activeSection === item.id}
                        onClick={() => scrollTo(item.id)}
                        tooltip={item.label}
                      >
                        <Icon />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroup>
          ))}
        </SidebarContent>

        {/* ── User footer ── */}
        <SidebarFooter className="border-sidebar-border border-t p-3">
          <div className="flex items-center gap-2.5 group-data-[collapsible=icon]:justify-center">
            <Avatar className="size-7 shrink-0">
              <AvatarFallback className="text-[10px]">JD</AvatarFallback>
            </Avatar>
            <div className="min-w-0 group-data-[collapsible=icon]:hidden">
              <p className="text-sidebar-foreground truncate text-xs font-medium">Jane Doe</p>
              <p className="text-sidebar-foreground/50 truncate text-[10px]">jane@acme.com</p>
            </div>
          </div>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      {/* ── Main ── */}
      <div className="bg-background flex min-h-svh flex-1 flex-col">
        {/* Topbar */}
        <header className="border-border/60 bg-background/90 sticky top-0 z-40 flex h-12 shrink-0 items-center gap-3 border-b px-4 backdrop-blur-sm">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-4" />
          <span className="text-sm font-medium">UI Design System</span>
          <div className="ml-auto flex items-center gap-2">
            <Badge variant="secondary" className="text-[10px]">
              Preview
            </Badge>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            >
              {resolvedTheme === 'dark' ? (
                <Sun className="size-3.5" />
              ) : (
                <Moon className="size-3.5" />
              )}
            </Button>
          </div>
        </header>

        <main className="flex-1 space-y-12 px-6 py-10 md:px-10">
          {/* ─────────── Overview ─────────── */}
          <section id="overview">
            <p className="text-primary mb-2 text-xs font-semibold tracking-widest uppercase">
              Component Library
            </p>
            <h1 className="title mb-3">UI Design System</h1>
            <p className="description max-w-xl">
              A live preview of all core components — colors, typography, form controls, badges,
              cards, data tables, and more. Toggle the theme above to test light and dark mode.
            </p>
          </section>

          <Separator />

          {/* ─────────── Colors ─────────── */}
          <section id="colors" className="scroll-mt-14 space-y-4">
            <SectionHeader title="Colors" description="Primary scale and semantic surface tokens" />
            <div className="space-y-3">
              <div>
                <p className="text-muted-foreground mb-2 text-xs font-medium tracking-wider uppercase">
                  Primary
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {[8, 15, 25, 35, 45, 55, 65, 75, 85, 95].map((opacity, i) => (
                    <div key={opacity} className="flex flex-col items-center gap-1">
                      <div
                        className="h-8 w-8 rounded border shadow-xs"
                        style={{
                          background: `color-mix(in oklch, var(--primary) ${opacity}%, var(--background))`,
                        }}
                      />
                      <span className="text-muted-foreground text-[9px]">{(i + 1) * 100}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-muted-foreground mb-2 text-xs font-medium tracking-wider uppercase">
                  Semantic
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    ['Bg', 'bg-background border'],
                    ['Card', 'bg-card border'],
                    ['Muted', 'bg-muted border'],
                    ['Primary', 'bg-primary'],
                    ['Secondary', 'bg-secondary border'],
                    ['Accent', 'bg-accent border'],
                    ['Destructive', 'bg-destructive'],
                    ['Success', 'bg-success'],
                    ['Warning', 'bg-warning'],
                  ].map(([label, cls]) => (
                    <div key={label} className="flex flex-col items-center gap-1">
                      <div className={cn('border-border h-8 w-14 rounded shadow-xs', cls)} />
                      <span className="text-muted-foreground text-[9px]">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <Separator />

          {/* ─────────── Typography ─────────── */}
          <section id="typography" className="scroll-mt-14 space-y-4">
            <SectionHeader
              title="Typography"
              description="Plus Jakarta Sans — heading hierarchy and body"
            />
            <div className="space-y-2">
              <p className="text-4xl font-bold" style={{ letterSpacing: '-0.025em' }}>
                Display / Hero
              </p>
              <p className="text-3xl font-semibold" style={{ letterSpacing: '-0.02em' }}>
                Heading One
              </p>
              <p className="text-2xl font-semibold">Heading Two</p>
              <p className="text-xl font-medium">Heading Three</p>
              <p className="text-base">
                Body — The quick brown fox jumps over the lazy dog. Clear, readable, professional.
              </p>
              <p className="text-muted-foreground text-sm">
                Small / Muted — Supporting text, captions, helper labels, and secondary information.
              </p>
              <p className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
                Overline · Label · Caption
              </p>
            </div>
          </section>

          <Separator />

          {/* ─────────── Actions ─────────── */}
          <section id="actions" className="scroll-mt-14 space-y-6">
            <SectionHeader title="Actions" description="All button variants and sizes" />

            <div id="actions-variants" className="scroll-mt-14 space-y-2">
              <SubSectionLabel label="Variants" />
              <div className="flex flex-wrap gap-2.5">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>

            <div id="actions-sizes" className="scroll-mt-14 space-y-2">
              <SubSectionLabel label="Sizes & States" />
              <div className="flex flex-wrap items-center gap-2.5">
                <Button size="lg">Large</Button>
                <Button size="default">Default</Button>
                <Button size="sm">Small</Button>
                <Button size="icon">
                  <Settings className="size-4" />
                </Button>
                <Button size="icon" variant="outline">
                  <Bell className="size-4" />
                </Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>
          </section>

          <Separator />

          {/* ─────────── Form Controls ─────────── */}
          <section id="forms" className="scroll-mt-14 space-y-6">
            <SectionHeader title="Form Controls" description="Inputs, selects, and checkboxes" />

            <div id="forms-inputs" className="scroll-mt-14 space-y-2">
              <SubSectionLabel label="Text Inputs" />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="ds-email">Email address</Label>
                  <Input id="ds-email" type="email" placeholder="you@example.com" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="ds-pass">Password</Label>
                  <Input id="ds-pass" type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="ds-search-demo">Search</Label>
                  <div className="relative">
                    <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                    <Input id="ds-search-demo" className="pl-9" placeholder="Search anything…" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="ds-disabled">Disabled</Label>
                  <Input id="ds-disabled" placeholder="Disabled input" disabled />
                </div>
              </div>
            </div>

            <div id="forms-selects" className="scroll-mt-14 space-y-2">
              <SubSectionLabel label="Selects & Pickers" />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="ds-role">Role</Label>
                  <Select>
                    <SelectTrigger className="w-full" id="ds-role">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Checkboxes</Label>
                  <div className="flex flex-col gap-2 pt-1">
                    <div className="flex items-center gap-2">
                      <Checkbox id="ds-terms" />
                      <Label htmlFor="ds-terms" className="text-sm font-normal">
                        Agree to terms
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="ds-marketing" defaultChecked />
                      <Label htmlFor="ds-marketing" className="text-sm font-normal">
                        Marketing emails
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="ds-disabled-cb" disabled />
                      <Label
                        htmlFor="ds-disabled-cb"
                        className="text-muted-foreground text-sm font-normal"
                      >
                        Disabled option
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Separator />

          {/* ─────────── Badges ─────────── */}
          <section id="badges" className="scroll-mt-14 space-y-4">
            <SectionHeader title="Badges" description="Semantic status and label variants" />
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="success">Active</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="destructive">Error</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="pending">Pending</Badge>
              <Badge variant="inactive">Inactive</Badge>
              <Badge variant="muted">Muted</Badge>
            </div>
          </section>

          <Separator />

          {/* ─────────── Cards ─────────── */}
          <section id="cards" className="scroll-mt-14 space-y-4">
            <SectionHeader title="Cards" description="Surface variants for content grouping" />
            <div className="grid gap-4 sm:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Account Overview</CardTitle>
                  <CardDescription>Your subscription and billing details.</CardDescription>
                </CardHeader>
                <CardContent className="text-sm">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-9">
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Jane Doe</p>
                      <p className="text-muted-foreground text-xs">jane@acme.com</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="gap-2 border-t pt-4">
                  <Button size="sm" variant="outline" className="flex-1">
                    Settings
                  </Button>
                  <Button size="sm" className="flex-1">
                    Upgrade
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">Notifications</CardTitle>
                      <CardDescription>Recent activity</CardDescription>
                    </div>
                    <Badge variant="destructive">3 new</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  {[
                    { text: 'New user signed up', time: '2m ago', icon: Users },
                    { text: 'Payment received', time: '1h ago', icon: DollarSign },
                    { text: 'Server alert', time: '3h ago', icon: AlertCircle },
                  ].map((n, i) => {
                    const Icon = n.icon;
                    return (
                      <div key={i} className="flex items-center gap-2.5">
                        <div className="bg-muted flex size-7 shrink-0 items-center justify-center rounded-full">
                          <Icon className="text-muted-foreground size-3.5" />
                        </div>
                        <p className="flex-1 text-xs">{n.text}</p>
                        <span className="text-muted-foreground text-[10px]">{n.time}</span>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Loading State</CardTitle>
                  <CardDescription>Skeleton placeholders</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Skeleton className="size-9 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-3 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-5/6" />
                  <Skeleton className="h-3 w-4/6" />
                  <Skeleton className="mt-2 h-8 w-full rounded-md" />
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator />

          {/* ─────────── Statistics ─────────── */}
          <section id="stats" className="scroll-mt-14 space-y-4">
            <SectionHeader
              title="Statistics"
              description="Key metric cards with trend indicators"
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {STATS.map(card => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.label}
                    className={cn(
                      'bg-card group relative flex flex-col gap-3 overflow-hidden rounded-xl border border-l-3 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md',
                      card.border
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <p className="text-muted-foreground text-sm font-medium">{card.label}</p>
                      <div
                        className={cn(
                          'rounded-lg px-2.5 py-2 transition-transform duration-200 group-hover:scale-110',
                          card.iconBg
                        )}
                      >
                        <Icon className={cn('size-4', card.iconColor)} />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <p className="text-card-foreground text-3xl font-bold tracking-tight">
                        {card.value}
                      </p>
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-muted-foreground text-xs">{card.subtitle}</p>
                        <span
                          className={cn(
                            'flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold',
                            card.trend.positive
                              ? 'bg-success/10 text-success'
                              : 'bg-destructive/10 text-destructive'
                          )}
                        >
                          {card.trend.value}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <Separator />

          {/* ─────────── Data Table ─────────── */}
          <section id="datatable" className="scroll-mt-14 space-y-6">
            <SectionHeader
              title="Data Table"
              description="Full-featured table with sorting and pagination"
            />

            <div id="datatable-view" className="scroll-mt-14 space-y-2">
              <SubSectionLabel label="Table View" />
              <DataTable columns={userColumns} data={DEMO_USERS} />
            </div>

            <div id="datatable-loading" className="scroll-mt-14 space-y-2">
              <SubSectionLabel label="Loading State" />
              <DataTable columns={userColumns} data={[]} isLoading />
            </div>
          </section>

          <Separator />

          {/* ─────────── Progress ─────────── */}
          <section id="progress" className="scroll-mt-14 space-y-4">
            <SectionHeader title="Progress" description="Determinate progress indicators" />
            <div className="space-y-4">
              {[
                { label: 'Storage used', value: 68, description: '34 GB of 50 GB' },
                { label: 'Team capacity', value: 42, description: '21 of 50 seats' },
                { label: 'Budget consumed', value: 89, description: '$89,000 of $100,000' },
              ].map(item => (
                <div key={item.label} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.label}</span>
                    <span className="text-muted-foreground text-xs">{item.description}</span>
                  </div>
                  <Progress value={item.value} />
                </div>
              ))}
            </div>
          </section>

          <Separator />

          {/* ─────────── Search & Filter ─────────── */}
          <section id="search-filter" className="scroll-mt-14 space-y-4">
            <SectionHeader
              title="Search & Filter"
              description="Debounced search input and status filter buttons"
            />
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">User Management Toolbar</CardTitle>
                <CardDescription>
                  Combined search and filter — a common pattern for data list pages.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-3">
                  <Suspense
                    fallback={<div className="bg-muted h-9 w-64 animate-pulse rounded-md" />}
                  >
                    <SearchInput placeholder="Search users…" searchParam="demo_search" />
                  </Suspense>
                  <Suspense
                    fallback={<div className="bg-muted h-9 w-52 animate-pulse rounded-md" />}
                  >
                    <FilterButtons
                      options={FILTER_OPTIONS}
                      filterParam="demo_status"
                      defaultOption="All"
                    />
                  </Suspense>
                </div>
              </CardContent>
            </Card>
          </section>

          <Separator />

          {/* ─────────── Animated Tabs ─────────── */}
          <section id="animated-tabs" className="scroll-mt-14 space-y-4">
            <SectionHeader
              title="Animated Tabs"
              description="Spring-animated tab indicator with icon support"
            />
            <Card>
              <CardContent className="pt-6">
                <AnimatedTabs
                  activeTab={demoTab}
                  tabConfigs={DEMO_TABS}
                  onTabChange={setDemoTab}
                  size="md"
                  showLabel
                >
                  <TabsContent value="tab-overview" className="mt-4">
                    <div className="rounded-lg border border-dashed p-6 text-center">
                      <LayoutDashboard className="text-muted-foreground mx-auto mb-2 size-8" />
                      <p className="text-sm font-medium">Overview Panel</p>
                      <p className="text-muted-foreground mt-1 text-xs">
                        General statistics and key metrics at a glance.
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="tab-analytics" className="mt-4">
                    <div className="rounded-lg border border-dashed p-6 text-center">
                      <BarChart3 className="text-muted-foreground mx-auto mb-2 size-8" />
                      <p className="text-sm font-medium">Analytics Panel</p>
                      <p className="text-muted-foreground mt-1 text-xs">
                        Detailed usage analytics and trends over time.
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="tab-members" className="mt-4">
                    <div className="rounded-lg border border-dashed p-6 text-center">
                      <Users className="text-muted-foreground mx-auto mb-2 size-8" />
                      <p className="text-sm font-medium">Members Panel</p>
                      <p className="text-muted-foreground mt-1 text-xs">
                        Team members, roles, and permission management.
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="tab-settings" className="mt-4">
                    <div className="rounded-lg border border-dashed p-6 text-center">
                      <Settings className="text-muted-foreground mx-auto mb-2 size-8" />
                      <p className="text-sm font-medium">Settings Panel</p>
                      <p className="text-muted-foreground mt-1 text-xs">
                        Application configuration and preferences.
                      </p>
                    </div>
                  </TabsContent>
                </AnimatedTabs>
              </CardContent>
            </Card>
          </section>

          <Separator />

          {/* ─────────── Action Buttons ─────────── */}
          <section id="action-buttons" className="scroll-mt-14 space-y-4">
            <SectionHeader
              title="Action Buttons"
              description="Standard form footer with save and clear actions"
            />
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Edit Profile</CardTitle>
                <CardDescription>Update your display name and contact information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="ab-name">Full name</Label>
                    <Input id="ab-name" defaultValue="Jane Doe" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="ab-email">Email</Label>
                    <Input id="ab-email" type="email" defaultValue="jane@acme.com" />
                  </div>
                </div>
                <ActionButtons saveLabel="Save Profile" />
              </CardContent>
            </Card>
          </section>

          <Separator />

          {/* ─────────── Feedback ─────────── */}
          <section id="feedback" className="scroll-mt-14 space-y-4">
            <SectionHeader title="Feedback" description="Contextual alerts and notifications" />
            <div className="space-y-3">
              <Alert>
                <Info className="size-4" />
                <AlertTitle>Information</AlertTitle>
                <AlertDescription>
                  Your session will expire in 15 minutes. Save your work to avoid losing changes.
                </AlertDescription>
              </Alert>
              <Alert className="border-success/30 bg-success/5 text-success">
                <CheckCircle2 className="size-4" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription className="text-success/80">
                  Your changes have been saved and deployed to production successfully.
                </AlertDescription>
              </Alert>
              <Alert className="border-warning/30 bg-warning/5 text-warning">
                <AlertCircle className="size-4" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription className="text-warning/80">
                  You are approaching your API rate limit. Consider upgrading your plan.
                </AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <AlertCircle className="size-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Failed to connect to the database. Please check your credentials and try again.
                </AlertDescription>
              </Alert>
            </div>
          </section>

          {/* Footer */}
          <Separator />
          <footer className="pb-4 text-center">
            <p className="text-muted-foreground text-xs">
              Design System Preview · Built with shadcn/ui + Plus Jakarta Sans
            </p>
          </footer>
        </main>
      </div>
    </SidebarProvider>
  );
}
