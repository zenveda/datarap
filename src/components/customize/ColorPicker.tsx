import { PALETTES } from '../../utils/colorPalettes';

interface ColorPickerProps {
  colors: string[];
  seriesNames: string[];
  onChange: (colors: string[]) => void;
}

const SWATCH_COLORS = PALETTES.default;

export function ColorPicker({ colors, seriesNames, onChange }: ColorPickerProps) {
  return (
    <div className="space-y-3">
      <h4 className="text-xs font-medium text-text-secondary">Series Colors</h4>
      {seriesNames.map((name, i) => (
        <div key={i} className="flex items-center gap-3">
          <span className="text-xs text-text-primary min-w-[80px] truncate">{name}</span>
          <div className="flex gap-1">
            {SWATCH_COLORS.map((color) => (
              <button
                key={color}
                onClick={() => {
                  const newColors = [...colors];
                  newColors[i] = color;
                  onChange(newColors);
                }}
                className={`w-5 h-5 rounded-full border-2 transition-transform ${
                  colors[i] === color ? 'border-gray-800 scale-125' : 'border-transparent hover:scale-110'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
