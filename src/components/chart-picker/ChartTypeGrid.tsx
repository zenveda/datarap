import { CHART_TYPES } from '../../constants/chartTypes';
import { useChartStore } from '../../store/useChartStore';
import { ChartTypeCard } from './ChartTypeCard';

export function ChartTypeGrid() {
  const chartType = useChartStore((s) => s.chartType);
  const setChartType = useChartStore((s) => s.setChartType);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {CHART_TYPES.map((chart) => (
        <ChartTypeCard
          key={chart.type}
          chart={chart}
          isSelected={chartType === chart.type}
          onSelect={() => setChartType(chart.type)}
        />
      ))}
    </div>
  );
}
