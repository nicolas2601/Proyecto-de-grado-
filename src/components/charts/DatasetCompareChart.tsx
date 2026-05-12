import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import { dimensionalCompare } from '@/data/eda';

export default function DatasetCompareChart() {
  // Normalize values for visualization since metrics have very different scales
  // We'll show the actual numeric tooltip but bars use log-ish scaling
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart
        data={dimensionalCompare}
        margin={{ top: 12, right: 16, left: 0, bottom: 0 }}
        barGap={4}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e7" vertical={false} />
        <XAxis
          dataKey="metric"
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#4c4c4c', fontSize: 10 }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#777b86', fontSize: 10 }}
          tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v.toString())}
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
        />
        <Legend
          wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
          iconType="square"
        />
        <Bar dataKey="ham" name="HAM10000" fill="#0173b2" radius={[4, 4, 0, 0]} />
        <Bar dataKey="bcn" name="BCN20000" fill="#de8f05" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
