import { useMemo } from 'react';
import { useDataStore } from '../../store/useDataStore';
import { useChartStore } from '../../store/useChartStore';
import { transformForCartesian, transformForPie, transformForScatter } from '../../utils/chartDataTransformer';
import { BarChartView } from './BarChartView';
import { LineChartView } from './LineChartView';
import { AreaChartView } from './AreaChartView';
import { PieChartView } from './PieChartView';
import { ScatterChartView } from './ScatterChartView';

export function ChartRenderer() {
  const parsedData = useDataStore((s) => s.parsedData);
  const chartType = useChartStore((s) => s.chartType);
  const mapping = useChartStore((s) => s.mapping);
  const appearance = useChartStore((s) => s.appearance);

  const chartElement = useMemo(() => {
    if (!parsedData || !chartType) return null;

    const xKey = mapping.xColumn;
    const yKeys = mapping.yColumns;

    if (!xKey && chartType !== 'scatter') return null;
    if (yKeys.length === 0) return null;

    switch (chartType) {
      case 'bar-vertical':
        return (
          <BarChartView
            data={transformForCartesian(parsedData, mapping)}
            xKey={xKey!}
            yKeys={yKeys}
            colors={appearance.colors}
            config={appearance}
          />
        );
      case 'bar-horizontal':
        return (
          <BarChartView
            data={transformForCartesian(parsedData, mapping)}
            xKey={xKey!}
            yKeys={yKeys}
            colors={appearance.colors}
            horizontal
            config={appearance}
          />
        );
      case 'line':
        return (
          <LineChartView
            data={transformForCartesian(parsedData, mapping)}
            xKey={xKey!}
            yKeys={yKeys}
            colors={appearance.colors}
            config={appearance}
          />
        );
      case 'area':
        return (
          <AreaChartView
            data={transformForCartesian(parsedData, mapping)}
            xKey={xKey!}
            yKeys={yKeys}
            colors={appearance.colors}
            config={appearance}
          />
        );
      case 'pie':
        return (
          <PieChartView
            data={transformForPie(parsedData, mapping)}
            colors={appearance.colors}
            config={appearance}
          />
        );
      case 'donut':
        return (
          <PieChartView
            data={transformForPie(parsedData, mapping)}
            colors={appearance.colors}
            isDonut
            config={appearance}
          />
        );
      case 'scatter':
        return (
          <ScatterChartView
            data={transformForScatter(parsedData, mapping)}
            colors={appearance.colors}
            config={appearance}
            xLabel={xKey ?? undefined}
            yLabel={yKeys[0]}
          />
        );
      default:
        return null;
    }
  }, [parsedData, chartType, mapping, appearance]);

  if (!chartElement) {
    return (
      <div className="flex items-center justify-center h-64 text-text-secondary text-sm">
        Select data mapping to see the chart preview
      </div>
    );
  }

  return chartElement;
}
