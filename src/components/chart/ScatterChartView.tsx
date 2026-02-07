import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { ChartAppearance } from '../../types/chart';
import { ChartTooltip } from './ChartTooltip';

interface ScatterChartViewProps {
  data: { x: number; y: number }[];
  colors: string[];
  config: ChartAppearance;
  xLabel?: string;
  yLabel?: string;
}

export function ScatterChartView({ data, colors, config, xLabel, yLabel }: ScatterChartViewProps) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart margin={{ top: 8, right: 24, left: 8, bottom: config.xAxisLabel ? 24 : 8 }}>
        {config.showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />}
        <XAxis
          type="number"
          dataKey="x"
          name={xLabel || 'X'}
          tick={{ fontSize: 11, fill: '#475569' }}
          axisLine={{ stroke: '#e2e8f0' }}
          tickLine={false}
          label={config.xAxisLabel ? { value: config.xAxisLabel, position: 'insideBottom', offset: -15, style: { fontSize: 11, fill: '#64748b' } } : undefined}
        />
        <YAxis
          type="number"
          dataKey="y"
          name={yLabel || 'Y'}
          tick={{ fontSize: 11, fill: '#94a3b8' }}
          axisLine={false}
          tickLine={false}
          label={config.yAxisLabel ? { value: config.yAxisLabel, angle: -90, position: 'insideLeft', style: { fontSize: 11, fill: '#64748b' } } : undefined}
        />
        {config.showTooltip && <Tooltip content={<ChartTooltip />} cursor={{ strokeDasharray: '3 3' }} />}
        <Scatter data={data} fill={colors[0]} fillOpacity={0.7} />
      </ScatterChart>
    </ResponsiveContainer>
  );
}
