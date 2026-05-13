import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell, LabelList } from 'recharts';
import { ham10000 } from '@/data/eda';

// ─────────────────────────────────────────────────────────────────────
// DAYOS · HAM10000 distribution by class
// Highlight nevus (dominant) in action-green to emphasize imbalance.
// Rest of the bars descend through an ink → ash → fog ramp.
// ─────────────────────────────────────────────────────────────────────
const ACCENT = '#d1ffca';
const INK_RAMP = ['#000000', '#2f2f2f', '#444444', '#5a5a5a', '#7a7a7a', '#979797'];

interface TooltipPayload {
  payload: { label: string; count: number; pct: number; code: string };
  value: number;
}

function PaperTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayload[] }) {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;
  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        borderRadius: 12,
        padding: '10px 14px',
        boxShadow: '0 8px 32px -8px rgba(0, 0, 0, 0.12)',
      }}
    >
      <div
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 11,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#444444',
          marginBottom: 4,
        }}
      >
        {p.label}
      </div>
      <div
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 14,
          fontVariantNumeric: 'tabular-nums',
          color: '#000000',
          fontWeight: 500,
        }}
      >
        {p.count.toLocaleString('es-CO')}
        <span style={{ color: '#979797', marginLeft: 8, fontWeight: 400 }}>
          {p.pct.toFixed(1)}%
        </span>
      </div>
    </div>
  );
}

export default function HamClassChart() {
  // Sort ascending so the largest (nevus) sits at the top
  const sorted = [...ham10000.classes].sort((a, b) => a.count - b.count);

  // Build a fill map: nevus → accent green, rest → ramp by descending rank
  const fillByLabel = new Map<string, string>();
  const desc = [...ham10000.classes].sort((a, b) => b.count - a.count);
  desc.forEach((row, idx) => {
    if (row.code === 'nv') fillByLabel.set(row.label, ACCENT);
    else fillByLabel.set(row.label, INK_RAMP[Math.min(idx - 1, INK_RAMP.length - 1)] ?? '#979797');
  });

  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between gap-3 mb-3">
        <span className="eyebrow-up">── DISTRIBUCIÓN POR CLASE</span>
        <span
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            letterSpacing: '0.1em',
            color: '#979797',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          n · {ham10000.size.toLocaleString('es-CO')}
        </span>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart
          data={sorted}
          layout="vertical"
          margin={{ top: 4, right: 56, left: 4, bottom: 4 }}
          barCategoryGap={6}
        >
          <XAxis
            type="number"
            tickFormatter={(v) => v.toLocaleString('es-CO')}
            axisLine={{ stroke: 'rgba(0,0,0,0.16)', strokeWidth: 1 }}
            tickLine={false}
            tick={{
              fill: '#444444',
              fontSize: 11,
              fontFamily: "'IBM Plex Mono', monospace",
            }}
          />
          <YAxis
            dataKey="label"
            type="category"
            width={150}
            axisLine={{ stroke: 'rgba(0,0,0,0.16)', strokeWidth: 1 }}
            tickLine={false}
            tick={{
              fill: '#000000',
              fontSize: 12,
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 500,
            }}
          />
          <Tooltip cursor={{ fill: 'rgba(0,0,0,0.04)' }} content={<PaperTooltip />} />
          <Bar dataKey="count" radius={[4, 4, 4, 4]} stroke="none">
            {sorted.map((row, i) => (
              <Cell key={i} fill={fillByLabel.get(row.label) ?? '#979797'} />
            ))}
            <LabelList
              dataKey="pct"
              position="right"
              formatter={(v: number) => `${v.toFixed(1)}%`}
              style={{
                fill: '#444444',
                fontSize: 11,
                fontFamily: "'IBM Plex Mono', monospace",
                fontVariantNumeric: 'tabular-nums',
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-3 flex items-center gap-3 flex-wrap">
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            letterSpacing: '0.05em',
            color: '#444444',
          }}
        >
          <span
            aria-hidden
            style={{
              display: 'inline-block',
              width: 12,
              height: 12,
              background: ACCENT,
              borderRadius: 3,
              border: '1px solid rgba(0,0,0,0.06)',
            }}
          />
          nevus · clase ancla
        </span>
        <span style={{ width: 1, height: 12, background: 'rgba(0,0,0,0.12)' }} />
        <span
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            color: '#979797',
          }}
        >
          ramp ink · clases minoritarias
        </span>
      </div>
    </div>
  );
}
