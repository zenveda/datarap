export const PALETTES = {
  default: ['#4C78A8', '#F58518', '#E45756', '#72B7B2', '#54A24B', '#EECA3B', '#B279A2', '#FF9DA6'],
  pastel: ['#A8D8EA', '#AA96DA', '#FCBAD3', '#FFFFD2', '#B5EAD7', '#C7CEEA', '#FFD3B6', '#DCEDC1'],
  bold: ['#E63946', '#457B9D', '#2A9D8F', '#E9C46A', '#F4A261', '#264653', '#606C38', '#BC6C25'],
  mono: ['#1a1a2e', '#16213e', '#0f3460', '#533483', '#e94560', '#393e46', '#00adb5', '#eeeeee'],
} as const;

export type PaletteName = keyof typeof PALETTES;

export function getColor(index: number, palette: PaletteName = 'default'): string {
  const colors = PALETTES[palette];
  return colors[index % colors.length];
}
