import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell, LabelList } from 'recharts';
import { ham10000 } from '@/data/eda';

const COLORS = ['#0173b2', '#de8f05', '#029e73', '#d55e00', '#cc78bc', '#ca9161', '#fbafe4'];

export default function HamClassChart() {
  const data = [...ham10000.classes].sort((a, b) => a.count - b.count);
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 4, right: 60, left: 4, bottom: 4 }}
      >
        <XAxis
          type="number"
          tickFormatter={(v) => v.toLocaleString('es-CO')}
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#777b86', fontSize: 10 }}
        />
        <YAxis
          dataKey="label"
          type="category"
          width={150}
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#17191c', fontSize: 11 }}
        />
        <Tooltip
          cursor={{ fill: '#f7f7f8' }}
          contentStyle={{
            background: '#17191c',
            border: 'none',
            borderRadius: 8,
            color: '#fff',
            fontSize: 12,
          }}
          formatter={(value: number, _name, props) => [
            `${value.toLocaleString('es-CO')} (${props.payload.pct.toFixed(1)} %)`,
            'Imágenes',
          ]}
        />
        <Bar dataKey="count" radius={[0, 6, 6, 0]}>
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
          <LabelList
            dataKey="pct"
            position="right"
            formatter={(v: number) => `${v.toFixed(1)} %`}
            style={{ fill: '#17191c', fontSize: 10, fontWeight: 600 }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
