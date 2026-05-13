import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { bcn20000 } from '@/data/eda';

// ─────────────────────────────────────────────────────────────────────
// DAYOS · BCN20000 binary donut
// Benigno → ink solid · Maligno → ash gray · Indeterminado → action green
// ─────────────────────────────────────────────────────────────────────
const FILLS: Record<string, string> = {
  Benigno: '#000000',
  Maligno: '#444444',
  Indeterminado: '#d1ffca',
};

interface TooltipPayload {
  name: string;
  value: number;
  payload: { name: string; value: number; pct: number };
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
        {p.name}
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
        {p.value.toLocaleString('es-CO')}
        <span style={{ color: '#979797', marginLeft: 8, fontWeight: 400 }}>
          {p.pct.toFixed(1)}%
        </span>
      </div>
    </div>
  );
}

export default function BcnDonutChart() {
  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between gap-3 mb-3">
        <span className="eyebrow-up">── DISTRIBUCIÓN BINARIA</span>
        <span
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            letterSpacing: '0.1em',
            color: '#979797',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          n · {bcn20000.size.toLocaleString('es-CO')}
        </span>
      </div>

      <div className="relative" style={{ width: '100%', minHeight: 240 }}>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={bcn20000.binary}
              cx="50%"
              cy="50%"
              innerRadius={72}
              outerRadius={104}
              paddingAngle={2}
              dataKey="value"
              stroke="#e5e7eb"
              strokeWidth={2}
              cornerRadius={6}
            >
              {bcn20000.binary.map((entry, i) => (
                <Cell
                  key={i}
                  fill={FILLS[entry.name] ?? '#979797'}
                  stroke="#e5e7eb"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip content={<PaperTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center hole label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 40,
              lineHeight: 0.9,
              color: '#000000',
              letterSpacing: '-0.02em',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {bcn20000.size.toLocaleString('es-CO')}
          </span>
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 10,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#444444',
              marginTop: 4,
            }}
          >
            imágenes
          </span>
        </div>
      </div>

      {/* Legend chips */}
      <div className="mt-3 grid grid-cols-3 gap-2">
        {bcn20000.binary.map((b) => (
          <div
            key={b.name}
            style={{
              padding: '8px 10px',
              background: '#ffffff',
              borderRadius: 12,
              border: '1px solid rgba(0,0,0,0.06)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span
              aria-hidden
              style={{
                display: 'inline-block',
                width: 10,
                height: 10,
                borderRadius: 3,
                background: FILLS[b.name] ?? '#979797',
              }}
            />
            <div style={{ minWidth: 0, flex: 1 }}>
              <p
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: 11,
                  fontWeight: 500,
                  color: '#000000',
                  lineHeight: 1.2,
                  letterSpacing: '-0.01em',
                }}
              >
                {b.name}
              </p>
              <p
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 10,
                  color: '#979797',
                  fontVariantNumeric: 'tabular-nums',
                  marginTop: 1,
                }}
              >
                {b.pct.toFixed(1)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
