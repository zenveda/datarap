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
  annotations: ChartAnnotation[];
  yAxisFormat: 'raw' | 'thousands' | 'millions' | 'billions';
  yAxisCurrency: 'none' | 'USD' | 'EUR' | 'JPY' | 'GBP' | 'AUD' | 'CAD' | 'CHF' | 'CNY' | 'HKD' | 'SGD';
  bodyFont: string;
  titleFont: string;
}

export interface ChartAnnotation {
  id: string;
  text: string;
  x: number;
  y: number;
  align: 'left' | 'center' | 'right';
  tone: 'default' | 'muted' | 'emphasis';
}

export interface ChartConfig {
  type: ChartType;
  mapping: AxisMapping;
  appearance: ChartAppearance;
}
