import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { ChartAppearance } from '../../types/chart';
import { ChartTooltip } from './ChartTooltip';

interface AreaChartViewProps {
  data: Record<string, unknown>[];
  xKey: string;
  yKeys: string[];
  colors: string[];
  config: ChartAppearance;
}

export function AreaChartView({ data, xKey, yKeys, colors, config }: AreaChartViewProps) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={data} margin={{ top: 8, right: 24, left: 8, bottom: config.xAxisLabel ? 24 : 8 }}>
        <defs>
          {yKeys.map((key, i) => (
            <linearGradient key={key} id={`gradient-${key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colors[i % colors.length]} stopOpacity={0.3} />
              <stop offset="95%" stopColor={colors[i % colors.length]} stopOpacity={0.02} />
            </linearGradient>
          ))}
        </defs>
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
          <Area
            key={key}
            type="monotone"
            dataKey={key}
            stroke={colors[i % colors.length]}
            fill={`url(#gradient-${key})`}
            strokeWidth={2.5}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}
