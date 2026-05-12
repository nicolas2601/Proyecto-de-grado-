import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { bcn20000 } from '@/data/eda';

const COLORS = ['#029e73', '#d55e00', '#949494'];

export default function BcnDonutChart() {
  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={bcn20000.binary}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={92}
            paddingAngle={2}
            dataKey="value"
            stroke="#ffffff"
            strokeWidth={2}
          >
            {bcn20000.binary.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: '#17191c',
              border: 'none',
              borderRadius: 8,
              color: '#fff',
              fontSize: 12,
            }}
            formatter={(value: number, name) => [
              `${value.toLocaleString('es-CO')}`,
              name,
            ]}
          />
        </PieChart>
      </ResponsiveContainer>
      {/* Center label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="font-display text-2xl text-ink">
          {bcn20000.size.toLocaleString('es-CO')}
        </span>
        <span className="text-[10px] text-muted-stone italic">imágenes</span>
      </div>

      {/* Legend */}
      <div className="mt-2 flex justify-center gap-3 text-[10px]">
        {bcn20000.binary.map((b, i) => (
          <div key={b.name} className="flex items-center gap-1.5">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: COLORS[i] }}
            />
            <span className="text-ink/80">{b.name}</span>
            <span className="text-light-steel">{b.pct.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
