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
import { formatAxisValue } from '../../utils/formatters';

interface LineChartViewProps {
  data: Record<string, unknown>[];
  xKey: string;
  yKeys: string[];
  colors: string[];
  config: ChartAppearance;
}

export function LineChartView({ data, xKey, yKeys, colors, config }: LineChartViewProps) {
  const gridStroke = '#efe6d7';
  const axisStroke = '#e6dcc8';
  const tickColor = '#6b7280';
  const mutedTick = '#9ca3af';
  const labelColor = '#7c6f63';
  const legendBottomOffset = config.showLegend && config.legendPosition === 'bottom' ? 24 : 0;
  const xAxisBottom = config.xAxisLabel ? 24 : 12;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{ top: 8, right: 24, left: 8, bottom: xAxisBottom + legendBottomOffset }}
      >
        {config.showGrid && <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />}
        <XAxis
          dataKey={xKey}
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
          domain={config.startFromZero ? [0, 'auto'] : ['auto', 'auto']}
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
        {config.showTooltip && <Tooltip content={<ChartTooltip />} />}
        {config.showLegend && (
          <Legend
            verticalAlign={config.legendPosition === 'top' ? 'top' : 'bottom'}
            iconType="circle"
            iconSize={8}
            height={config.legendPosition === 'bottom' ? 26 : undefined}
            wrapperStyle={{
              fontSize: 12,
              color: '#7c6f63',
              paddingTop: config.legendPosition === 'bottom' ? 10 : 6,
            }}
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
