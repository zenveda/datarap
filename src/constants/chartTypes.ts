import type { ChartType } from '../types/chart';

export interface ChartTypeDefinition {
  type: ChartType;
  label: string;
  description: string;
  icon: string;
}

export const CHART_TYPES: ChartTypeDefinition[] = [
  {
    type: 'bar-vertical',
    label: 'Bar (Vertical)',
    description: 'Compare values across categories',
    icon: 'BarChart3',
  },
  {
    type: 'bar-horizontal',
    label: 'Bar (Horizontal)',
    description: 'Compare values with long labels',
    icon: 'BarChartHorizontal',
  },
  {
    type: 'line',
    label: 'Line',
    description: 'Show trends over time',
    icon: 'TrendingUp',
  },
  {
    type: 'area',
    label: 'Area',
    description: 'Show volume trends over time',
    icon: 'AreaChart',
  },
  {
    type: 'pie',
    label: 'Pie',
    description: 'Show parts of a whole',
    icon: 'PieChart',
  },
  {
    type: 'donut',
    label: 'Donut',
    description: 'Show parts of a whole (with center)',
    icon: 'CircleDot',
  },
  {
    type: 'scatter',
    label: 'Scatter',
    description: 'Show correlation between variables',
    icon: 'ScatterChart',
  },
];
