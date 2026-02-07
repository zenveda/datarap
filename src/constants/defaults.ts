import type { ChartAppearance, AxisMapping } from '../types/chart';
import { PALETTES } from '../utils/colorPalettes';

export const DEFAULT_APPEARANCE: ChartAppearance = {
  title: '',
  subtitle: '',
  caption: '',
  colors: [...PALETTES.default],
  showLegend: true,
  legendPosition: 'bottom',
  showGrid: true,
  showTooltip: true,
  xAxisLabel: '',
  yAxisLabel: '',
  startFromZero: true,
  annotations: [],
  yAxisFormat: 'raw',
  yAxisCurrency: 'none',
  bodyFont: 'source-sans-3',
  titleFont: 'fraunces',
};

export const DEFAULT_MAPPING: AxisMapping = {
  xColumn: null,
  yColumns: [],
  groupColumn: null,
};
