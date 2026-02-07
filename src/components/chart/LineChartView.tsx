import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { ChartAppearance } from '../../types/chart';
import { ChartTooltip } from './ChartTooltip';

interface LineChartViewProps {
  data: Record<string, unknown>[];
  xKey: string;
  yKeys: string[];
  colors: string[];
  config: ChartAppearance;
}

export function LineChartView({ data, xKey, yKeys, colors, config }: LineChartViewProps) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 8, right: 24, left: 8, bottom: config.xAxisLabel ? 24 : 8 }}>
        {config.showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />}
        <XAxis
          dataKey={xKey}
          tick={{ fontSize: 11, fill: '#475569' }}
          axisLine={{ stroke: '#e2e8f0' }}
          tickLine={false}
          label={config.xAxisLabel ? { value: config.xAxisLabel, position: 'insideBottom', offset: -15, style: { fontSize: 11, fill: '#64748b' } } : undefined}
        />
        <YAxis
          domain={config.startFromZero ? [0, 'auto'] : ['auto', 'auto']}
          tick={{ fontSize: 11, fill: '#94a3b8' }}
          axisLine={false}
          tickLine={false}
          label={config.yAxisLabel ? { value: config.yAxisLabel, angle: -90, position: 'insideLeft', style: { fontSize: 11, fill: '#64748b' } } : undefined}
        />
        {config.showTooltip && <Tooltip content={<ChartTooltip />} />}
        {config.showLegend && (
          <Legend
            verticalAlign={config.legendPosition === 'top' ? 'top' : 'bottom'}
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 12, color: '#64748b', paddingTop: 8 }}
          />
        )}
        {yKeys.map((key, i) => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            stroke={colors[i % colors.length]}
            strokeWidth={2.5}
            dot={{ r: 3, fill: '#fff', strokeWidth: 2 }}
            activeDot={{ r: 5, strokeWidth: 0 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
