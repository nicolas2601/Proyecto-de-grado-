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

// MONO X7 · HAM solid ink, BCN diagonal hatch pattern (1px ink lines on white)
const HAM_FILL = '#292929';
const BCN_FILL = 'url(#bcnHatch)';

interface TooltipPayload {
  name: string;
  value: number;
  dataKey: string;
  color: string;
  payload: Record<string, number | string>;
}

function MonoTooltip({
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
        border: '1px solid #292929',
        borderRadius: 0,
        padding: '8px 10px',
        boxShadow: 'none',
        minWidth: 140,
      }}
    >
      <div
        style={{
          fontFamily: "'Oswald', Impact, sans-serif",
          fontSize: 11,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#292929',
          marginBottom: 6,
          paddingBottom: 4,
          borderBottom: '1px solid #e6e6e6',
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
            fontSize: 11,
          }}
        >
          <span
            style={{
              fontFamily: "'Oswald', Impact, sans-serif",
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#646464',
            }}
          >
            {p.name}
          </span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontVariantNumeric: 'tabular-nums',
              color: '#000000',
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
      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={dimensionalCompare}
          margin={{ top: 12, right: 16, left: 0, bottom: 0 }}
          barGap={4}
        >
          {/* Hatch pattern definition for BCN bars */}
          <defs>
            <pattern
              id="bcnHatch"
              patternUnits="userSpaceOnUse"
              width="6"
              height="6"
              patternTransform="rotate(45)"
            >
              <rect width="6" height="6" fill="#ffffff" />
              <line x1="0" y1="0" x2="0" y2="6" stroke="#292929" strokeWidth="1" />
            </pattern>
          </defs>

          <CartesianGrid stroke="#e6e6e6" vertical={false} strokeDasharray="0" />
          <XAxis
            dataKey="metric"
            axisLine={{ stroke: '#292929', strokeWidth: 1 }}
            tickLine={false}
            tick={{
              fill: '#292929',
              fontSize: 11,
              fontFamily: "'Oswald', Impact, sans-serif",
              letterSpacing: '0.1em',
            }}
          />
          <YAxis
            axisLine={{ stroke: '#292929', strokeWidth: 1 }}
            tickLine={false}
            tick={{
              fill: '#292929',
              fontSize: 11,
              fontFamily: "'JetBrains Mono', monospace",
            }}
            tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v.toString())}
          />
          <Tooltip cursor={{ fill: '#e6e6e6' }} content={<MonoTooltip />} />
          <Bar
            dataKey="ham"
            name="HAM10000"
            fill={HAM_FILL}
            stroke="#292929"
            strokeWidth={1}
            radius={0}
          />
          <Bar
            dataKey="bcn"
            name="BCN20000"
            fill={BCN_FILL}
            stroke="#292929"
            strokeWidth={1}
            radius={0}
          />
        </BarChart>
      </ResponsiveContainer>

      {/* Custom legend · solid HAM chip + hatched BCN chip, separated by 1px ink vertical rule */}
      <div className="mt-3 flex items-center justify-center gap-4">
        <span className="inline-flex items-center gap-2">
          <span
            aria-hidden
            className="block h-3 w-4 border border-[#292929]"
            style={{ background: '#292929', borderRadius: 0 }}
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
            HAM10000
          </span>
        </span>
        <span aria-hidden className="block h-4 w-px bg-[#292929]" />
        <span className="inline-flex items-center gap-2">
          <span
            aria-hidden
            className="relative block h-3 w-4 border border-[#292929]"
            style={{ borderRadius: 0 }}
          >
            <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="legendBcnHatch"
                  patternUnits="userSpaceOnUse"
                  width="4"
                  height="4"
                  patternTransform="rotate(45)"
                >
                  <line x1="0" y1="0" x2="0" y2="4" stroke="#292929" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#legendBcnHatch)" />
            </svg>
          </span>
          <span
            style={{
              fontFamily: "'Oswald', Impact, sans-serif",
              fontSize: 11,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#292929',
            }}
          >
            BCN20000
          </span>
        </span>
      </div>
    </div>
  );
}
