import { useChartStore } from '../../store/useChartStore';
import { ColorPicker } from './ColorPicker';

export function AppearancePanel() {
  const appearance = useChartStore((s) => s.appearance);
  const setAppearance = useChartStore((s) => s.setAppearance);
  const mapping = useChartStore((s) => s.mapping);

  const inputClass =
    'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-white text-text-primary';

  return (
    <div className="space-y-5">
      <h3 className="text-sm font-semibold text-text-primary">Appearance</h3>

      <div>
        <label className="block text-xs font-medium text-text-secondary mb-1">Title</label>
        <input
          type="text"
          className={inputClass}
          placeholder="Chart title"
          value={appearance.title}
          onChange={(e) => setAppearance({ title: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-text-secondary mb-1">Subtitle</label>
        <input
          type="text"
          className={inputClass}
          placeholder="Optional subtitle"
          value={appearance.subtitle}
          onChange={(e) => setAppearance({ subtitle: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-text-secondary mb-1">Caption / Source</label>
        <input
          type="text"
          className={inputClass}
          placeholder="Source: ..."
          value={appearance.caption}
          onChange={(e) => setAppearance({ caption: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">X Axis Label</label>
          <input
            type="text"
            className={inputClass}
            value={appearance.xAxisLabel}
            onChange={(e) => setAppearance({ xAxisLabel: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">Y Axis Label</label>
          <input
            type="text"
            className={inputClass}
            value={appearance.yAxisLabel}
            onChange={(e) => setAppearance({ yAxisLabel: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-3">
        <Toggle
          label="Show Grid"
          checked={appearance.showGrid}
          onChange={(v) => setAppearance({ showGrid: v })}
        />
        <Toggle
          label="Show Tooltip"
          checked={appearance.showTooltip}
          onChange={(v) => setAppearance({ showTooltip: v })}
        />
        <Toggle
          label="Start Y at Zero"
          checked={appearance.startFromZero}
          onChange={(v) => setAppearance({ startFromZero: v })}
        />
        <Toggle
          label="Show Legend"
          checked={appearance.showLegend}
          onChange={(v) => setAppearance({ showLegend: v })}
        />
      </div>

      {appearance.showLegend && (
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">Legend Position</label>
          <div className="flex gap-2">
            {(['top', 'bottom', 'left', 'right'] as const).map((pos) => (
              <button
                key={pos}
                onClick={() => setAppearance({ legendPosition: pos })}
                className={`px-3 py-1 text-xs rounded-md border transition-colors ${
                  appearance.legendPosition === pos
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-gray-300 text-text-secondary hover:bg-gray-50'
                }`}
              >
                {pos.charAt(0).toUpperCase() + pos.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}

      {mapping.yColumns.length > 0 && (
        <ColorPicker
          colors={appearance.colors}
          seriesNames={mapping.yColumns}
          onChange={(colors) => setAppearance({ colors })}
        />
      )}
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between cursor-pointer">
      <span className="text-xs font-medium text-text-secondary">{label}</span>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative w-9 h-5 rounded-full transition-colors ${
          checked ? 'bg-primary' : 'bg-gray-300'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
            checked ? 'translate-x-4' : 'translate-x-0'
          }`}
        />
      </button>
    </label>
  );
}
