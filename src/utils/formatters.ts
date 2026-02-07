import type { ChartAppearance } from '../types/chart';

const formatScale: Record<ChartAppearance['yAxisFormat'], { divisor: number; suffix: string }> = {
  raw: { divisor: 1, suffix: '' },
  thousands: { divisor: 1_000, suffix: 'K' },
  millions: { divisor: 1_000_000, suffix: 'M' },
  billions: { divisor: 1_000_000_000, suffix: 'B' },
};

export function formatAxisValue(value: number, appearance: ChartAppearance) {
  const { divisor, suffix } = formatScale[appearance.yAxisFormat] ?? formatScale.raw;
  const scaled = value / divisor;
  const decimals = appearance.yAxisFormat === 'raw' ? 0 : scaled < 10 ? 1 : 0;
  if (appearance.yAxisCurrency !== 'none') {
    const formatted = new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: appearance.yAxisCurrency,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(scaled);
    return `${formatted}${suffix}`;
  }

  return `${scaled.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}${suffix}`;
}
