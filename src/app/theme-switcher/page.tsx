'use client';

import { useEffect, useState } from 'react';

import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';

import { FamilyCard } from './_components/family-card';
import { FAMILIES } from './_components/theme-data';

export default function ThemeSwitcherPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeThemeId = mounted ? (theme ?? 'light') : 'light';

  return (
    <div className="relative min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Subtle dot-grid overlay */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, color-mix(in oklch, var(--foreground) 5%, transparent) 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="group mb-10 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-150 focus-visible:outline-none"
          style={{
            color: 'var(--muted-foreground)',
            border: '1px solid var(--border)',
            background: 'var(--card)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = 'var(--foreground)';
            e.currentTarget.style.borderColor = 'var(--primary)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = 'var(--muted-foreground)';
            e.currentTarget.style.borderColor = 'var(--border)';
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-150 group-hover:-translate-x-0.5"
          >
            <path d="M19 12H5M5 12l7 7M5 12l7-7" />
          </svg>
          Back
        </button>

        {/* Header */}
        <header className="mb-12">
          <div className="mb-5 flex items-center gap-3">
            <div
              className="flex h-7 w-7 items-center justify-center rounded-lg"
              style={{
                background: 'var(--primary)',
                boxShadow: '0 0 14px color-mix(in oklch, var(--primary) 38%, transparent)',
              }}
            >
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="3" fill="var(--primary-foreground)" />
                <circle cx="2" cy="2" r="1.5" fill="var(--primary-foreground)" opacity="0.6" />
                <circle cx="12" cy="2" r="1.5" fill="var(--primary-foreground)" opacity="0.6" />
                <circle cx="2" cy="12" r="1.5" fill="var(--primary-foreground)" opacity="0.6" />
                <circle cx="12" cy="12" r="1.5" fill="var(--primary-foreground)" opacity="0.6" />
              </svg>
            </div>
            <span
              className="font-mono text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: 'var(--muted-foreground)' }}
            >
              Appearance
            </span>
          </div>

          <h1
            className="mb-3 text-5xl font-black tracking-[-0.035em] sm:text-6xl"
            style={{ color: 'var(--foreground)', lineHeight: 1.05 }}
          >
            Choose your
            <br />
            <span style={{ color: 'var(--primary)' }}>aesthetic.</span>
          </h1>

          <p
            className="max-w-md text-base leading-relaxed"
            style={{ color: 'var(--muted-foreground)' }}
          >
            Six handcrafted colour systems — each with a light and dark soul. Toggle between
            variants, click the preview to apply.
          </p>
        </header>

        {/* Theme grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FAMILIES.map((family, i) => (
            <FamilyCard
              key={family.index}
              family={family}
              activeThemeId={activeThemeId}
              delay={i * 65}
              onApply={setTheme}
            />
          ))}
        </div>

        {/* Footer rule */}
        <div className="mt-16 flex items-center gap-4">
          <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
            Theme preference is persisted in your browser.
          </p>
          <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
        </div>
      </div>
    </div>
  );
}
