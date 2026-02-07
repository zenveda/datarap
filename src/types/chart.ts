export type ChartType =
  | 'bar-vertical'
  | 'bar-horizontal'
  | 'line'
  | 'area'
  | 'pie'
  | 'donut'
  | 'scatter';

export interface AxisMapping {
  xColumn: string | null;
  yColumns: string[];
  groupColumn: string | null;
}

export interface ChartAppearance {
  title: string;
  subtitle: string;
  caption: string;
  colors: string[];
  showLegend: boolean;
  legendPosition: 'top' | 'bottom' | 'left' | 'right';
  showGrid: boolean;
  showTooltip: boolean;
  xAxisLabel: string;
  yAxisLabel: string;
  startFromZero: boolean;
}

export interface ChartConfig {
  type: ChartType;
  mapping: AxisMapping;
  appearance: ChartAppearance;
}
