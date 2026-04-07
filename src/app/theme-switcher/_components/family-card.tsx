'use client';

import { useEffect, useState } from 'react';

import { ThemePreview } from './theme-preview';
import type { ThemeFamily } from './types';

function SunIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="22" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="2" y1="12" x2="4" y2="12" />
      <line x1="20" y1="12" x2="22" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

interface Props {
  family: ThemeFamily;
  activeThemeId: string;
  delay: number;
  onApply: (id: string) => void;
}

export function FamilyCard({ family, activeThemeId, delay, onApply }: Props) {
  const isLightActive = activeThemeId === family.light.id;
  const isDarkActive = activeThemeId === family.dark.id;
  const isFamilyActive = isLightActive || isDarkActive;

  const [mode, setMode] = useState<'light' | 'dark'>(isDarkActive ? 'dark' : 'light');
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (isDarkActive) setMode('dark');
    else if (isLightActive) setMode('light');
  }, [isDarkActive, isLightActive]);

  const variant = mode === 'light' ? family.light : family.dark;
  const accent = variant.accentHex;

  function handleModeChange(m: 'light' | 'dark') {
    setMode(m);
    onApply(m === 'light' ? family.light.id : family.dark.id);
  }

  return (
    <div
      className="animate-in fade-in slide-in-from-bottom-4"
      style={{
        animationDuration: '0.45s',
        animationDelay: `${delay}ms`,
        animationFillMode: 'both',
      }}
    >
      <div className="relative">
        {/* Ambient accent glow when active */}
        {isFamilyActive && (
          <div
            className="pointer-events-none absolute inset-0 rounded-xl"
            style={{
              background: accent,
              opacity: 0.12,
              filter: 'blur(24px)',
              transform: 'scale(0.85)',
            }}
          />
        )}

        <div
          className="relative overflow-hidden rounded-xl"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            background: 'var(--card)',
            border: isFamilyActive
              ? `1.5px solid ${accent}`
              : hovered
                ? `1.5px solid ${accent}70`
                : '1.5px solid var(--border)',
            boxShadow: isFamilyActive
              ? `0 0 0 1px ${accent}14, 0 8px 32px ${accent}1a`
              : hovered
                ? '0 6px 22px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.06)'
                : '0 1px 5px rgba(0,0,0,0.05)',
            transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
            transition: 'transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease',
          }}
        >
          {/* Preview — click to apply */}
          <button
            onClick={() => onApply(variant.id)}
            className="block w-full focus-visible:outline-none"
            aria-label={`Apply ${family.name} ${mode} theme`}
          >
            <ThemePreview p={variant.preview} />
          </button>

          {/* Card footer */}
          <div className="space-y-2 px-3.5 py-3" style={{ borderTop: '1px solid var(--border)' }}>
            {/* Name row */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-baseline gap-2">
                <span
                  className="font-mono text-[10px] font-semibold tracking-[0.18em]"
                  style={{ color: accent, opacity: 0.55 }}
                >
                  {family.index}
                </span>
                <span
                  className="text-[15px] leading-none font-bold tracking-tight"
                  style={{ color: 'var(--foreground)' }}
                >
                  {family.name}
                </span>
              </div>

              {isFamilyActive && (
                <div
                  className="flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1"
                  style={{
                    background: `${accent}16`,
                    border: `1px solid ${accent}30`,
                  }}
                >
                  <div
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: accent, boxShadow: `0 0 4px ${accent}` }}
                  />
                  <span
                    className="text-[9px] font-bold tracking-[0.12em] uppercase"
                    style={{ color: accent }}
                  >
                    Active
                  </span>
                </div>
              )}
            </div>

            {/* Tagline */}
            <p className="text-[11px] leading-snug" style={{ color: 'var(--muted-foreground)' }}>
              {variant.tagline}
            </p>

            {/* Light / Dark mode toggle */}
            <div
              className="flex gap-1 rounded-lg p-0.5"
              style={{ background: 'var(--secondary)', border: '1px solid var(--border)' }}
              role="group"
              aria-label="Select theme mode"
            >
              {(['light', 'dark'] as const).map(m => {
                const v = m === 'light' ? family.light : family.dark;
                const isSelected = mode === m;

                return (
                  <button
                    key={m}
                    onClick={() => handleModeChange(m)}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-[11px] transition-all duration-150 focus-visible:outline-none"
                    style={{
                      background: isSelected ? accent : 'transparent',
                      color: isSelected ? v.preview.primaryFg : 'var(--muted-foreground)',
                      fontWeight: isSelected ? 600 : 500,
                    }}
                    aria-pressed={isSelected}
                  >
                    {m === 'light' ? <SunIcon /> : <MoonIcon />}
                    <span className="capitalize">{m}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
