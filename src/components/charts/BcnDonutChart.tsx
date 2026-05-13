import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { bcn20000 } from '@/data/eda';

// MONO X7 · primary segment ink-black, secondary medium grey, fallback light grey
const MONO_FILLS = ['#292929', '#646464', '#b4b8b4'];

interface TooltipPayload {
  name: string;
  value: number;
  payload: { name: string; value: number; pct: number };
}

function MonoTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayload[] }) {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;
  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid #292929',
        borderRadius: 0,
        padding: '8px 10px',
        boxShadow: 'none',
      }}
    >
      <div
        style={{
          fontFamily: "'Oswald', Impact, sans-serif",
          fontSize: 11,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#292929',
          marginBottom: 4,
        }}
      >
        {p.name}
      </div>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          fontVariantNumeric: 'tabular-nums',
          color: '#000000',
        }}
      >
        {p.value.toLocaleString('es-CO')}
        <span style={{ color: '#646464', marginLeft: 6 }}>
          {p.pct.toFixed(1)}%
        </span>
      </div>
    </div>
  );
}

export default function BcnDonutChart() {
  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={bcn20000.binary}
            cx="50%"
            cy="50%"
            innerRadius={64}
            outerRadius={94}
            paddingAngle={0}
            dataKey="value"
            stroke="#ffffff"
            strokeWidth={1}
            cornerRadius={0}
          >
            {bcn20000.binary.map((_, i) => (
              <Cell
                key={i}
                fill={MONO_FILLS[i] ?? '#b4b8b4'}
                stroke="#ffffff"
                strokeWidth={1}
              />
            ))}
          </Pie>
          <Tooltip content={<MonoTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Center hole label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span
          style={{
            fontFamily: "'Bebas Neue', 'Oswald', Impact, sans-serif",
            fontSize: 32,
            lineHeight: 1,
            color: '#000000',
            letterSpacing: '0.02em',
          }}
        >
          {bcn20000.size.toLocaleString('es-CO')}
        </span>
        <span
          style={{
            fontFamily: "'Oswald', Impact, sans-serif",
            fontSize: 10,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#292929',
            marginTop: 4,
          }}
        >
          Imágenes
        </span>
      </div>

      {/* Legend with 1px ink leader chips */}
      <div className="mt-3 flex justify-center gap-5">
        {bcn20000.binary.map((b, i) => (
          <div key={b.name} className="flex items-center gap-2">
            <span
              aria-hidden
              className="block h-3 w-3 border border-[#292929]"
              style={{
                background: MONO_FILLS[i] ?? '#b4b8b4',
                borderRadius: 0,
              }}
            />
            <span
              style={{
                fontFamily: "'Oswald', Impact, sans-serif",
                fontSize: 11,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#292929',
              }}
            >
              {b.name}
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                fontVariantNumeric: 'tabular-nums',
                color: '#646464',
              }}
            >
              {b.pct.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
