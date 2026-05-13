import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { dimensionalCompare } from '@/data/eda';

// ─────────────────────────────────────────────────────────────────────
// DAYOS · HAM × BCN dimensional compare
// HAM → ink solid · BCN → action-green solid
// Rounded 4px bars, hairline grid.
// ─────────────────────────────────────────────────────────────────────
const HAM_FILL = '#000000';
const BCN_FILL = '#d1ffca';

interface TooltipPayload {
  name: string;
  value: number;
  dataKey: string;
  color: string;
  payload: Record<string, number | string>;
}

function PaperTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        borderRadius: 12,
        padding: '10px 14px',
        boxShadow: '0 8px 32px -8px rgba(0, 0, 0, 0.12)',
        minWidth: 160,
      }}
    >
      <div
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 11,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#444444',
          marginBottom: 6,
          paddingBottom: 6,
          borderBottom: '1px solid rgba(0,0,0,0.06)',
        }}
      >
        {label}
      </div>
      {payload.map((p) => (
        <div
          key={p.dataKey}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 12,
            fontSize: 12,
            marginTop: 3,
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 500,
              color: '#000000',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              letterSpacing: '-0.01em',
            }}
          >
            <span
              aria-hidden
              style={{
                display: 'inline-block',
                width: 8,
                height: 8,
                borderRadius: 2,
                background: p.dataKey === 'ham' ? HAM_FILL : BCN_FILL,
              }}
            />
            {p.name}
          </span>
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontVariantNumeric: 'tabular-nums',
              color: '#000000',
              fontWeight: 500,
            }}
          >
            {typeof p.value === 'number' ? p.value.toLocaleString('es-CO') : p.value}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function DatasetCompareChart() {
  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between gap-3 mb-3">
        <span className="eyebrow-up">── COMPARACIÓN DIMENSIONAL</span>
        <span
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            letterSpacing: '0.1em',
            color: '#979797',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          HAM × BCN
        </span>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <BarChart
          data={dimensionalCompare}
          margin={{ top: 12, right: 16, left: 0, bottom: 0 }}
          barGap={6}
        >
          <CartesianGrid stroke="rgba(0,0,0,0.06)" vertical={false} strokeDasharray="0" />
          <XAxis
            dataKey="metric"
            axisLine={{ stroke: 'rgba(0,0,0,0.16)', strokeWidth: 1 }}
            tickLine={false}
            tick={{
              fill: '#000000',
              fontSize: 11,
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 500,
            }}
          />
          <YAxis
            axisLine={{ stroke: 'rgba(0,0,0,0.16)', strokeWidth: 1 }}
            tickLine={false}
            tick={{
              fill: '#444444',
              fontSize: 11,
              fontFamily: "'IBM Plex Mono', monospace",
            }}
            tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v.toString())}
          />
          <Tooltip cursor={{ fill: 'rgba(0,0,0,0.04)' }} content={<PaperTooltip />} />
          <Bar
            dataKey="ham"
            name="HAM10000"
            fill={HAM_FILL}
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="bcn"
            name="BCN20000"
            fill={BCN_FILL}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

      {/* Custom legend */}
      <div className="mt-3 flex items-center justify-center gap-4">
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '4px 10px',
            borderRadius: 9999,
            background: '#ffffff',
            border: '1px solid rgba(0,0,0,0.06)',
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            color: '#000000',
            letterSpacing: '0.05em',
          }}
        >
          <span
            aria-hidden
            style={{
              display: 'inline-block',
              width: 10,
              height: 10,
              borderRadius: 3,
              background: HAM_FILL,
            }}
          />
          HAM10000
        </span>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '4px 10px',
            borderRadius: 9999,
            background: '#ffffff',
            border: '1px solid rgba(0,0,0,0.06)',
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            color: '#000000',
            letterSpacing: '0.05em',
          }}
        >
          <span
            aria-hidden
            style={{
              display: 'inline-block',
              width: 10,
              height: 10,
              borderRadius: 3,
              background: BCN_FILL,
              border: '1px solid rgba(0,0,0,0.06)',
            }}
          />
          BCN20000
        </span>
      </div>
    </div>
  );
}
