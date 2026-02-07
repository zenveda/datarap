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
import { formatAxisValue } from '../../utils/formatters';

interface ScatterChartViewProps {
  data: { x: number; y: number }[];
  colors: string[];
  config: ChartAppearance;
  xLabel?: string;
  yLabel?: string;
}

export function ScatterChartView({ data, colors, config, xLabel, yLabel }: ScatterChartViewProps) {
  const gridStroke = '#efe6d7';
  const axisStroke = '#e6dcc8';
  const tickColor = '#6b7280';
  const mutedTick = '#9ca3af';
  const labelColor = '#7c6f63';
  const legendBottomOffset = config.showLegend && config.legendPosition === 'bottom' ? 24 : 0;
  const xAxisBottom = config.xAxisLabel ? 24 : 12;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart
        margin={{ top: 8, right: 24, left: 8, bottom: xAxisBottom + legendBottomOffset }}
      >
        {config.showGrid && <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />}
        <XAxis
          type="number"
          dataKey="x"
          name={xLabel || 'X'}
          tick={{ fontSize: 11, fill: tickColor }}
          axisLine={{ stroke: axisStroke }}
          tickLine={false}
          label={
            config.xAxisLabel
              ? {
                  value: config.xAxisLabel,
                  position: 'insideBottom',
                  offset: -15,
                  style: { fontSize: 11, fill: labelColor },
                }
              : undefined
          }
        />
        <YAxis
          type="number"
          dataKey="y"
          name={yLabel || 'Y'}
          tick={{ fontSize: 11, fill: mutedTick }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => formatAxisValue(Number(value), config)}
          label={
            config.yAxisLabel
              ? {
                  value: config.yAxisLabel,
                  angle: -90,
                  position: 'insideLeft',
                  style: { fontSize: 11, fill: labelColor },
                }
              : undefined
          }
        />
        {config.showTooltip && (
          <Tooltip content={<ChartTooltip />} cursor={{ strokeDasharray: '3 3', stroke: '#e8dcc9' }} />
        )}
        <Scatter data={data} fill={colors[0]} fillOpacity={0.7} />
      </ScatterChart>
    </ResponsiveContainer>
  );
}
