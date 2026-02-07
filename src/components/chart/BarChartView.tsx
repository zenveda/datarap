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
import { formatAxisValue } from '../../utils/formatters';

function wrapOrTruncateTick(value: string, maxChars = 14, maxLines = 2) {
  if (!value) return [];
  const words = value.split(' ');
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    if ((current + ' ' + word).trim().length <= maxChars) {
      current = (current + ' ' + word).trim();
    } else {
      if (current) lines.push(current);
      current = word;
      if (lines.length === maxLines - 1) break;
    }
  }
  if (current && lines.length < maxLines) lines.push(current);

  const usedText = lines.join(' ');
  if (usedText.length < value.length) {
    const last = lines[lines.length - 1] ?? '';
    lines[lines.length - 1] = last.length > maxChars - 1 ? `${last.slice(0, maxChars - 1)}…` : `${last}…`;
  }

  return lines;
}

function WrappedXAxisTick({ x, y, payload }: any) {
  const lines = wrapOrTruncateTick(String(payload.value));
  const lineHeight = 12;
  return (
    <g transform={`translate(${x},${y})`}>
      {lines.map((line, index) => (
        <text
          key={line}
          x={0}
          y={14 + index * lineHeight}
          textAnchor="middle"
          fill="#6b7280"
          fontSize={11}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

interface BarChartViewProps {
  data: Record<string, unknown>[];
  xKey: string;
  yKeys: string[];
  colors: string[];
  horizontal?: boolean;
  config: ChartAppearance;
}

export function BarChartView({ data, xKey, yKeys, colors, horizontal, config }: BarChartViewProps) {
  const gridStroke = '#efe6d7';
  const axisStroke = '#e6dcc8';
  const tickColor = '#6b7280';
  const mutedTick = '#9ca3af';
  const labelColor = '#7c6f63';
  const legendBottomOffset = config.showLegend && config.legendPosition === 'bottom' ? 24 : 0;
  const xAxisBottom = config.xAxisLabel ? 32 : 20;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        layout={horizontal ? 'vertical' : 'horizontal'}
        margin={{
          top: 8,
          right: 24,
          left: 8,
          bottom: horizontal ? 8 : xAxisBottom + legendBottomOffset,
        }}
      >
        {config.showGrid && (
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={gridStroke}
            vertical={!horizontal}
            horizontal={horizontal || undefined}
          />
        )}
        {horizontal ? (
          <>
            <XAxis
              type="number"
              tick={{ fontSize: 11, fill: mutedTick }}
              axisLine={{ stroke: axisStroke }}
              tickLine={false}
              tickFormatter={(value) => formatAxisValue(Number(value), config)}
              label={
                config.yAxisLabel
                  ? {
                      value: config.yAxisLabel,
                      position: 'insideBottom',
                      offset: -15,
                      style: { fontSize: 11, fill: labelColor },
                    }
                  : undefined
              }
            />
            <YAxis
              dataKey={xKey}
              type="category"
              width={110}
              tick={{ fontSize: 11, fill: tickColor }}
              axisLine={false}
              tickLine={false}
            />
          </>
        ) : (
          <>
            <XAxis
              dataKey={xKey}
              tick={<WrappedXAxisTick />}
              axisLine={{ stroke: axisStroke }}
              tickLine={false}
              interval={0}
              height={78}
              tickMargin={12}
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
          </>
        )}
        {config.showTooltip && (
          <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(234, 223, 205, 0.4)' }} />
        )}
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
