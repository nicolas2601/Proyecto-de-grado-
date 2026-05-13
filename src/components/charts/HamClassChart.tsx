import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell, LabelList } from 'recharts';
import { ham10000 } from '@/data/eda';

// MONO X7 monochrome ramp · largest class gets max-contrast black, smaller classes fade through ink → grey
// Order: descending by count → assign ink-black (#000) only to dominant class (nv), then #292929 → #646464 → #b4b8b4
const MONO_RAMP = ['#000000', '#292929', '#3d3d3d', '#525252', '#646464', '#8a8a8a', '#b4b8b4'];

interface TooltipPayload {
  payload: { label: string; count: number; pct: number };
  value: number;
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
        {p.label}
      </div>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          fontVariantNumeric: 'tabular-nums',
          color: '#000000',
        }}
      >
        {p.count.toLocaleString('es-CO')}
        <span style={{ color: '#646464', marginLeft: 6 }}>
          {p.pct.toFixed(1)}%
        </span>
      </div>
    </div>
  );
}

export default function HamClassChart() {
  // Sort ascending for vertical bar chart (largest visible at top would be confusing · keep ascending bottom→top)
  const sorted = [...ham10000.classes].sort((a, b) => a.count - b.count);
  // Map each row to a fill based on its rank in DESCENDING order (largest = MONO_RAMP[0] = #000)
  const rankByCount = new Map(
    [...ham10000.classes]
      .sort((a, b) => b.count - a.count)
      .map((row, idx) => [row.label, MONO_RAMP[Math.min(idx, MONO_RAMP.length - 1)]])
  );

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-[#292929]">
        <span
          aria-hidden
          className="block h-px w-6 bg-[#292929]"
        />
        <span
          style={{
            fontFamily: "'Oswald', Impact, sans-serif",
            fontSize: 11,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#292929',
          }}
        >
          Distribución por clase
        </span>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart
          data={sorted}
          layout="vertical"
          margin={{ top: 4, right: 64, left: 4, bottom: 4 }}
        >
          <XAxis
            type="number"
            tickFormatter={(v) => v.toLocaleString('es-CO')}
            axisLine={{ stroke: '#292929', strokeWidth: 1 }}
            tickLine={false}
            tick={{
              fill: '#292929',
              fontSize: 11,
              fontFamily: "'JetBrains Mono', monospace",
            }}
          />
          <YAxis
            dataKey="label"
            type="category"
            width={150}
            axisLine={{ stroke: '#292929', strokeWidth: 1 }}
            tickLine={false}
            tick={{
              fill: '#292929',
              fontSize: 11,
              fontFamily: "'Oswald', Impact, sans-serif",
              letterSpacing: '0.1em',
            }}
          />
          <Tooltip cursor={{ fill: '#e6e6e6' }} content={<MonoTooltip />} />
          <Bar dataKey="count" radius={0} stroke="#292929" strokeWidth={1}>
            {sorted.map((row, i) => (
              <Cell key={i} fill={rankByCount.get(row.label) ?? '#646464'} />
            ))}
            <LabelList
              dataKey="pct"
              position="right"
              formatter={(v: number) => `${v.toFixed(1)}%`}
              style={{
                fill: '#292929',
                fontSize: 11,
                fontFamily: "'JetBrains Mono', monospace",
                fontVariantNumeric: 'tabular-nums',
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
