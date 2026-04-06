import type { Preview } from './types';

const NAV_ITEMS = [
  { w: '88%', active: true },
  { w: '76%', active: false },
  { w: '82%', active: false },
  { w: '66%', active: false },
  { w: '72%', active: false },
] as const;

const BAR_HEIGHTS = [0.38, 0.62, 0.48, 0.88, 0.58, 0.76, 1.0] as const;

export function ThemePreview({ p }: { p: Preview }) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', height: 130, background: p.bg }}>
      {/* Browser chrome */}
      <div
        style={{
          height: 27,
          background: p.card,
          borderBottom: `1px solid ${p.border}`,
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 10,
          paddingRight: 10,
          gap: 6,
        }}
      >
        <div style={{ display: 'flex', gap: 4.5, flexShrink: 0 }}>
          {['#ff5f56', '#ffbd2e', '#27c93f'].map(c => (
            <span
              key={c}
              style={{
                width: 7.5,
                height: 7.5,
                borderRadius: '50%',
                background: c,
                display: 'block',
              }}
            />
          ))}
        </div>
        <div
          style={{
            height: 10,
            borderRadius: 100,
            background: p.inputBg,
            marginLeft: 6,
            width: 88,
            flexShrink: 0,
          }}
        />
        <div style={{ display: 'flex', gap: 4, marginLeft: 'auto' }}>
          <div
            style={{ width: 20, height: 10, borderRadius: 4, background: p.primary, opacity: 0.58 }}
          />
          <div
            style={{ width: 14, height: 10, borderRadius: 4, background: p.inputBg, opacity: 0.8 }}
          />
        </div>
      </div>

      {/* App layout */}
      <div style={{ display: 'flex', height: 'calc(100% - 27px)' }}>
        {/* Sidebar */}
        <div
          style={{
            width: 52,
            background: p.sidebar,
            borderRight: `1px solid ${p.border}`,
            padding: '10px 8px',
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            flexShrink: 0,
          }}
        >
          {/* Brand mark */}
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: 6,
              background: p.primary,
              marginBottom: 8,
              opacity: 0.9,
            }}
          />
          {NAV_ITEMS.map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                padding: '3px 5px',
                borderRadius: 5,
                background: item.active ? `${p.primary}20` : 'transparent',
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 2,
                  flexShrink: 0,
                  background: item.active ? p.primary : p.sidebarStrip,
                  opacity: item.active ? 0.95 : 0.52,
                }}
              />
              <div
                style={{
                  height: 5,
                  borderRadius: 2,
                  background: item.active ? p.primary : p.sidebarStrip,
                  width: item.w,
                  opacity: item.active ? 0.72 : 0.38,
                }}
              />
            </div>
          ))}
          {/* User avatar */}
          <div style={{ marginTop: 'auto', paddingTop: 4 }}>
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: '50%',
                background: p.sidebarStrip,
                border: `1.5px solid ${p.border}`,
                opacity: 0.6,
              }}
            />
          </div>
        </div>

        {/* Main content */}
        <div
          style={{
            flex: 1,
            padding: '11px 13px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          {/* Page title */}
          <div>
            <div
              style={{
                height: 9,
                borderRadius: 4,
                background: p.text,
                width: '50%',
                marginBottom: 4,
                opacity: 0.85,
              }}
            />
            <div
              style={{
                height: 4,
                borderRadius: 2,
                background: p.muted,
                width: '74%',
                opacity: 0.44,
              }}
            />
          </div>

          {/* Stat cards */}
          <div style={{ display: 'flex', gap: 5 }}>
            {[true, false, false].map((isPrimary, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  borderRadius: 6,
                  padding: '6px 7px',
                  background: p.card,
                  border: `1px solid ${p.border}`,
                }}
              >
                <div
                  style={{
                    height: 4,
                    borderRadius: 2,
                    background: isPrimary ? p.primary : p.muted,
                    width: isPrimary ? '68%' : '50%',
                    opacity: isPrimary ? 0.82 : 0.36,
                    marginBottom: 3,
                  }}
                />
                <div
                  style={{
                    height: 3,
                    borderRadius: 2,
                    background: p.textDim,
                    width: '85%',
                    opacity: 0.36,
                    marginBottom: 5,
                  }}
                />
                {/* Bar chart */}
                <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: 14 }}>
                  {BAR_HEIGHTS.map((h, j) => (
                    <div
                      key={j}
                      style={{
                        flex: 1,
                        borderRadius: 2,
                        background: isPrimary ? p.primary : p.textDim,
                        height: `${h * 100}%`,
                        opacity: isPrimary ? 0.68 : 0.26,
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* single table row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '3px 6px',
              borderRadius: 4,
              background: p.card,
              border: `1px solid ${p.border}`,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: p.primary,
                opacity: 0.72,
                flexShrink: 0,
              }}
            />
            <div
              style={{ height: 4, borderRadius: 2, background: p.text, width: '44%', opacity: 0.3 }}
            />
            <div
              style={{
                height: 4,
                borderRadius: 2,
                background: p.primary,
                width: '14%',
                marginLeft: 'auto',
                opacity: 0.48,
              }}
            />
          </div>
        </div>
      </div>

      {/* Palette fingerprint strip */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 4,
          display: 'flex',
        }}
      >
        {[p.bg, p.sidebar, p.primary, p.card, p.muted, p.border].map((c, i) => (
          <div key={i} style={{ flex: 1, background: c }} />
        ))}
      </div>
    </div>
  );
}
