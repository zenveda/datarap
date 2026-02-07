import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { ChartAppearance } from '../../types/chart';
import { ChartTooltip } from './ChartTooltip';

interface PieChartViewProps {
  data: { name: string; value: number }[];
  colors: string[];
  isDonut?: boolean;
  config: ChartAppearance;
}

export function PieChartView({ data, colors, isDonut, config }: PieChartViewProps) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={isDonut ? 70 : 0}
          outerRadius={140}
          paddingAngle={isDonut ? 3 : 1}
          dataKey="value"
          nameKey="name"
          label={({ name, percent }: { name?: string; percent?: number }) =>
            `${name ?? ''} ${((percent ?? 0) * 100).toFixed(0)}%`
          }
          labelLine={{ stroke: '#cbd5e1', strokeWidth: 1 }}
          stroke="none"
        >
          {data.map((_, i) => (
            <Cell key={i} fill={colors[i % colors.length]} />
          ))}
        </Pie>
        {config.showTooltip && <Tooltip content={<ChartTooltip />} />}
        {config.showLegend && (
          <Legend
            verticalAlign={config.legendPosition === 'top' ? 'top' : 'bottom'}
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 12, color: '#64748b', paddingTop: 8 }}
          />
        )}
      </PieChart>
    </ResponsiveContainer>
  );
}
