'use client';

import { useEffect } from 'react';

import Link from 'next/link';

import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  ArrowRight,
  Code2,
  Database,
  Layers,
  LayoutGrid,
  Lock,
  Palette,
  RefreshCw,
  Shield,
  Sparkles,
  Terminal,
  Users,
  Zap,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/* ── GitHub icon (not in lucide-react v1.x) ────────────────────── */
function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

/* ── Data ─────────────────────────────────────────────────────── */

const FEATURES = [
  {
    icon: Shield,
    title: 'Full Auth Flow',
    description: 'Login, logout, and token refresh with Axios interceptors and retry queuing.',
  },
  {
    icon: Lock,
    title: 'Route Protection',
    description: 'AuthGuard, role-based access control, and access-denied page handling.',
  },
  {
    icon: RefreshCw,
    title: 'Token Refresh',
    description: 'Seamless refresh with request queueing — no dropped API calls mid-flight.',
  },
  {
    icon: Database,
    title: 'TanStack Query',
    description: 'Server state, caching, and async data fetching built into the foundation.',
  },
  {
    icon: Layers,
    title: 'Feature Architecture',
    description: 'Scalable feature-based folder structure that grows gracefully with your app.',
  },
  {
    icon: Palette,
    title: '12 Themes',
    description: '6 colour families × light/dark each. Beautiful UI system powered by Shadcn.',
  },
  {
    icon: LayoutGrid,
    title: 'Data Table',
    description:
      'TanStack Table with sorting, pagination, and column filtering — ready to plug in.',
  },
  {
    icon: Zap,
    title: 'DX Optimised',
    description:
      'Husky, lint-staged, Prettier, Zod, and TypeScript fully configured out of the box.',
  },
  {
    icon: Users,
    title: 'RBAC Sidebar',
    description: 'Role-based sidebar nav that conditionally renders items based on user roles.',
  },
] as const;

const STACK = [
  'Next.js 15',
  'React 19',
  'TypeScript',
  'App Router',
  'Zustand',
  'TanStack Query',
  'TanStack Table',
  'Axios',
  'TailwindCSS v4',
  'Shadcn UI',
  'Framer Motion',
  'next-themes',
  'nuqs',
  'Zod',
  'Recharts',
  'Sonner',
] as const;

const TREE: { text: string; cls: string; comment?: string }[] = [
  { text: 'src/', cls: 'text-[#7dd3fc] font-semibold' },
  { text: '├─ app/', cls: 'text-[#f8fafc]/75' },
  { text: '│  ├─ (auth)/', cls: 'text-[#f8fafc]/45', comment: '# login · forgot-password' },
  { text: '│  └─ (protected)/', cls: 'text-[#f8fafc]/45', comment: '# dashboard · settings' },
  { text: '├─ features/', cls: 'text-[#f8fafc]/75' },
  { text: '│  ├─ auth/', cls: 'text-[#f8fafc]/45', comment: '# components · hooks' },
  { text: '│  └─ dashboards/', cls: 'text-[#f8fafc]/45' },
  { text: '├─ components/', cls: 'text-[#f8fafc]/75' },
  { text: '│  ├─ layout/', cls: 'text-[#f8fafc]/45', comment: '# sidebar · header' },
  { text: '│  ├─ providers/', cls: 'text-[#f8fafc]/45', comment: '# query · theme' },
  { text: '│  └─ ui/', cls: 'text-[#f8fafc]/45', comment: '# shadcn primitives' },
  { text: '├─ lib/', cls: 'text-[#f8fafc]/75' },
  { text: '│  └─ api/', cls: 'text-[#f8fafc]/45', comment: '# axios · interceptors' },
  { text: '└─ stores/', cls: 'text-[#f8fafc]/75' },
];

/* ── Animation variants ───────────────────────────────────────── */

const bezier = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.62, ease: bezier },
  }),
};

/* ── Component ────────────────────────────────────────────────── */

export default function LandingPage() {
  /* Inject distinctive Google Fonts */
  useEffect(() => {
    const id = 'landing-page-fonts';
    if (document.getElementById(id)) return;

    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap';
    document.head.appendChild(link);

    return () => {
      document.getElementById(id)?.remove();
    };
  }, []);

  return (
    <div
      className="min-h-screen overflow-x-hidden bg-[#09090c] text-white selection:bg-blue-500/30"
      style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
    >
      {/* ── Navbar ─────────────────────────────────────────── */}
      <header className="fixed top-0 right-0 left-0 z-50 border-b border-white/6 bg-[#09090c]/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]">
              <Terminal size={13} className="text-white" />
            </div>
            <span className="text-sm font-semibold tracking-tight">next-auth-starter</span>
          </div>

          <nav className="hidden items-center gap-6 sm:flex">
            <a
              href="#features"
              className="text-xs text-white/40 transition-colors hover:text-white/70"
            >
              Features
            </a>
            <a
              href="#stack"
              className="text-xs text-white/40 transition-colors hover:text-white/70"
            >
              Stack
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/akinurrahman/vite-react-starter"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-sm text-white/40 transition-colors hover:text-white/70"
            >
              <GitHubIcon size={15} />
            </a>
            <Button asChild size="sm" className="h-8 text-xs">
              <Link href="/login">Get started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 pt-36 pb-28">
        {/* Grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.28]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '52px 52px',
          }}
        />
        {/* Glow blobs */}
        <div className="pointer-events-none absolute top-0 left-1/2 h-125 w-175 -translate-x-1/2 -translate-y-1/3 rounded-full bg-blue-600/12 blur-[130px]" />
        <div className="pointer-events-none absolute top-32 left-[8%] h-90 w-90 rounded-full bg-blue-700/8 blur-[80px]" />
        <div className="pointer-events-none absolute right-[5%] bottom-0 h-70 w-70 rounded-full bg-blue-500/6 blur-[70px]" />

        <div className="relative mx-auto max-w-6xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-7 flex"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/8 px-3 py-1.5 text-[11px] font-medium text-blue-300">
              <Sparkles size={10} />
              <span>Production-ready · Open source · v0.1.0</span>
            </div>
          </motion.div>

          <div className="flex flex-col items-start gap-16 lg:flex-row">
            {/* Left: copy */}
            <div className="min-w-0 flex-1">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mb-6 text-[clamp(2.8rem,5.5vw,5.2rem)] leading-[1.07] font-normal tracking-[-0.025em] text-white"
                style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
              >
                Skip the boring{' '}
                <em className="bg-linear-to-br from-blue-300 via-blue-400 to-blue-500 bg-clip-text text-transparent not-italic">
                  setup.
                </em>
                <br />
                Start building.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mb-10 max-w-lg text-[1.05rem] leading-relaxed text-white/50"
              >
                A Next.js 15 App Router starter with full auth flow, RBAC, token refresh queueing,
                TanStack Query, Shadcn UI, and everything else you&apos;d spend days configuring —
                already done.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap gap-3"
              >
                <Button asChild size="lg" className="h-11 gap-1.5 px-6 text-sm font-medium">
                  <Link href="/login">
                    Open the demo
                    <ArrowRight size={15} />
                  </Link>
                </Button>
                <a
                  href="https://github.com/akinurrahman/vite-react-starter"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-md border border-white/10 bg-white/4 px-6 text-sm font-medium text-white/60 transition-all hover:border-white/15 hover:bg-white/8 hover:text-white/90"
                >
                  <GitHubIcon size={16} />
                  Clone on GitHub
                </a>
              </motion.div>

              {/* Quick stat row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-12 flex flex-wrap gap-6 border-t border-white/6 pt-8"
              >
                {[
                  { value: '16+', label: 'Libraries' },
                  { value: '12', label: 'Themes' },
                  { value: '∞', label: 'Pages ready to fill' },
                ].map(stat => (
                  <div key={stat.label}>
                    <p
                      className="text-2xl font-semibold tracking-tight text-white"
                      style={{ fontFamily: "'Instrument Serif', serif" }}
                    >
                      {stat.value}
                    </p>
                    <p className="mt-0.5 text-xs text-white/35">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: terminal */}
            <motion.div
              initial={{ opacity: 0, x: 28, y: 8 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.35, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="w-full shrink-0 lg:w-100"
            >
              <div className="overflow-hidden rounded-xl border border-white/9 bg-[#0d0e11] shadow-[0_24px_64px_rgba(0,0,0,0.55)]">
                {/* Window chrome */}
                <div className="flex items-center gap-1.5 border-b border-white/6 bg-[#111215] px-4 py-3">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  <span
                    className="ml-4 text-[10px] text-white/20"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    ~/next-auth-starter
                  </span>
                </div>

                {/* Prompt line */}
                <div
                  className="px-5 pt-4 pb-1 text-[11px] text-white/30"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  <span className="text-[#28c840]">❯</span>{' '}
                  <span className="text-white/50">tree src/</span>
                </div>

                {/* Tree */}
                <div
                  className="px-5 py-3 text-[11.5px] leading-[1.9]"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {TREE.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.55 + i * 0.045,
                        duration: 0.28,
                        ease: 'easeOut',
                      }}
                      className="flex items-baseline gap-2 whitespace-pre"
                    >
                      <span className={cn('shrink-0', line.cls)}>{line.text}</span>
                      {line.comment && (
                        <span className="text-[10px] text-[#3d4451]">{line.comment}</span>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Bottom prompt */}
                <div
                  className="px-5 pt-1 pb-4 text-[11px] text-white/20"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  <span className="text-[#28c840]">❯</span> <span className="animate-pulse">_</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────── */}
      <section id="features" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            className="mb-14"
          >
            <div className="mb-4 flex items-center gap-2">
              <div className="h-4 w-px bg-blue-500" />
              <p className="text-xs font-semibold tracking-[0.18em] text-blue-400 uppercase">
                What&apos;s included
              </p>
            </div>
            <h2
              className="max-w-md text-[clamp(2rem,3.5vw,3rem)] leading-[1.12] font-normal tracking-[-0.02em] text-white"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              Everything except
              <br />
              <em className="text-white/50 not-italic">your</em> features.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={fadeUp}
                  className={cn(
                    'group relative rounded-xl border border-white/7 bg-white/2 p-5',
                    'transition-all duration-300 hover:border-blue-500/25 hover:bg-[#0e1420]',
                    i === 0 && 'lg:col-span-2'
                  )}
                >
                  {i === 0 && (
                    <div className="pointer-events-none absolute inset-0 rounded-xl bg-linear-to-br from-blue-600/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  )}
                  <div className="relative flex items-start gap-4">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-blue-500/20 bg-blue-500/10 transition-all group-hover:border-blue-500/35 group-hover:bg-blue-500/18">
                      <Icon size={15} className="text-blue-400" />
                    </div>
                    <div>
                      <h3 className="mb-1.5 text-sm font-semibold text-white/90">
                        {feature.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-white/38">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Stack ─────────────────────────────────────────────── */}
      <section id="stack" className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border border-white/7 bg-white/2 px-10 py-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-8 flex items-center gap-3"
            >
              <Code2 size={14} className="text-blue-400" />
              <p className="text-xs font-semibold tracking-[0.2em] text-white/40 uppercase">
                Built with
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap gap-2"
            >
              {STACK.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                  className="cursor-default rounded-full border border-white/9 bg-white/3 px-3 py-1.5 text-[12px] font-medium text-white/50 transition-all hover:border-blue-500/30 hover:bg-blue-500/7 hover:text-blue-300"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 left-1/2 h-100 w-175 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[110px]" />
        </div>

        <div className="relative mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/4 px-3 py-1.5 text-[11px] text-white/35"
          >
            <Sparkles size={10} />
            <span>Free & open source · MIT license</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 text-[clamp(2.2rem,4.5vw,4rem)] leading-[1.08] font-normal tracking-[-0.025em] text-white"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            Clone it.
            <br />
            Make it{' '}
            <em className="bg-linear-to-r from-blue-300 to-blue-400 bg-clip-text text-transparent not-italic">
              yours.
            </em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mb-10 max-w-md text-[1rem] leading-relaxed text-white/40"
          >
            No licensing hassle. No setup maze. Fork it, rename it, and start shipping the product
            you actually care about.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <Button asChild size="lg" className="h-11 gap-1.5 px-8 font-medium">
              <Link href="/login">
                Explore the demo
                <ArrowRight size={15} />
              </Link>
            </Button>
            <a
              href="https://github.com/akinurrahman/vite-react-starter"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-md border border-white/10 bg-white/3 px-8 text-sm font-medium text-white/55 transition-all hover:border-white/15 hover:bg-white/7 hover:text-white/90"
            >
              <GitHubIcon size={16} />
              View on GitHub
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer className="border-t border-white/6 px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-blue-500/80">
              <Terminal size={10} className="text-white" />
            </div>
            <span className="text-sm font-medium text-white/35">next-auth-starter</span>
          </div>

          <p className="text-[11px] text-white/22">
            Built by{' '}
            <a
              href="https://github.com/akinurrahman/vite-react-starter"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-white/50"
            >
              Akinur Rahman
            </a>{' '}
            · MIT License
          </p>

          <div className="flex items-center gap-5 text-xs text-white/30">
            <Link href="/login" className="transition-colors hover:text-white/60">
              Demo
            </Link>
            <a
              href="https://github.com/akinurrahman/vite-react-starter"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-white/60"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
