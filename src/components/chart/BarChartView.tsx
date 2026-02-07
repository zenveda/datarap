import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { ChartAppearance } from '../../types/chart';
import { ChartTooltip } from './ChartTooltip';

interface BarChartViewProps {
  data: Record<string, unknown>[];
  xKey: string;
  yKeys: string[];
  colors: string[];
  horizontal?: boolean;
  config: ChartAppearance;
}

export function BarChartView({ data, xKey, yKeys, colors, horizontal, config }: BarChartViewProps) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        layout={horizontal ? 'vertical' : 'horizontal'}
        margin={{ top: 8, right: 24, left: 8, bottom: config.xAxisLabel ? 24 : 8 }}
      >
        {config.showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={!horizontal} horizontal={horizontal || undefined} />}
        {horizontal ? (
          <>
            <XAxis
              type="number"
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              axisLine={{ stroke: '#e2e8f0' }}
              tickLine={false}
              label={config.yAxisLabel ? { value: config.yAxisLabel, position: 'insideBottom', offset: -15, style: { fontSize: 11, fill: '#64748b' } } : undefined}
            />
            <YAxis
              dataKey={xKey}
              type="category"
              width={110}
              tick={{ fontSize: 11, fill: '#475569' }}
              axisLine={false}
              tickLine={false}
            />
          </>
        ) : (
          <>
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
          </>
        )}
        {config.showTooltip && <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(148,163,184,0.08)' }} />}
        {config.showLegend && (
          <Legend
            verticalAlign={config.legendPosition === 'top' ? 'top' : 'bottom'}
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 12, color: '#64748b', paddingTop: 8 }}
          />
        )}
        {yKeys.map((key, i) => (
          <Bar
            key={key}
            dataKey={key}
            fill={colors[i % colors.length]}
            radius={horizontal ? [0, 4, 4, 0] : [4, 4, 0, 0]}
            maxBarSize={48}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
