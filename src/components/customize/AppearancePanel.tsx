import { useChartStore } from '../../store/useChartStore';
import { ColorPicker } from './ColorPicker';

export function AppearancePanel() {
  const appearance = useChartStore((s) => s.appearance);
  const setAppearance = useChartStore((s) => s.setAppearance);
  const addAnnotation = useChartStore((s) => s.addAnnotation);
  const updateAnnotation = useChartStore((s) => s.updateAnnotation);
  const removeAnnotation = useChartStore((s) => s.removeAnnotation);
  const mapping = useChartStore((s) => s.mapping);

  const inputClass =
    'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-white text-text-primary';
  const fontOptions = [
    { value: 'source-sans-3', label: 'Source Sans 3' },
    { value: 'inter', label: 'Inter' },
    { value: 'ibm-plex-sans', label: 'IBM Plex Sans' },
    { value: 'work-sans', label: 'Work Sans' },
    { value: 'lato', label: 'Lato' },
    { value: 'nunito-sans', label: 'Nunito Sans' },
  ];
  const titleFontOptions = [
    { value: 'fraunces', label: 'Fraunces' },
    { value: 'merriweather', label: 'Merriweather' },
    { value: 'playfair-display', label: 'Playfair Display' },
    { value: 'source-sans-3', label: 'Source Sans 3' },
  ];

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
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">Body Font</label>
          <select
            className={inputClass}
            value={appearance.bodyFont}
            onChange={(e) => setAppearance({ bodyFont: e.target.value })}
          >
            {fontOptions.map((font) => (
              <option key={font.value} value={font.value}>
                {font.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">Title Font</label>
          <select
            className={inputClass}
            value={appearance.titleFont}
            onChange={(e) => setAppearance({ titleFont: e.target.value })}
          >
            {titleFontOptions.map((font) => (
              <option key={font.value} value={font.value}>
                {font.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">Y Axis Format</label>
          <select
            className={inputClass}
            value={appearance.yAxisFormat}
            onChange={(e) =>
              setAppearance({ yAxisFormat: e.target.value as typeof appearance.yAxisFormat })
            }
          >
            <option value="raw">Raw</option>
            <option value="thousands">Thousands (K)</option>
            <option value="millions">Millions (M)</option>
            <option value="billions">Billions (B)</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">Currency</label>
          <select
            className={inputClass}
            value={appearance.yAxisCurrency}
            onChange={(e) =>
              setAppearance({ yAxisCurrency: e.target.value as typeof appearance.yAxisCurrency })
            }
          >
            <option value="none">None</option>
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="JPY">JPY (¥)</option>
            <option value="GBP">GBP (£)</option>
            <option value="AUD">AUD (A$)</option>
            <option value="CAD">CAD (C$)</option>
            <option value="CHF">CHF</option>
            <option value="CNY">CNY (¥)</option>
            <option value="HKD">HKD (HK$)</option>
            <option value="SGD">SGD (S$)</option>
          </select>
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

      <div className="border-t border-amber-100 pt-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="text-sm font-semibold text-text-primary">Annotations</h4>
            <p className="text-xs text-text-secondary">Add text notes directly on the chart.</p>
          </div>
          <button
            onClick={() =>
              addAnnotation({
                id:
                  typeof crypto !== 'undefined' && 'randomUUID' in crypto
                    ? crypto.randomUUID()
                    : `anno_${Date.now()}`,
                text: 'New note',
                x: 50,
                y: 20,
                align: 'center',
                tone: 'default',
              })
            }
            className="px-3 py-1.5 text-xs font-medium rounded-md border border-amber-200 bg-amber-50 text-amber-900 hover:bg-amber-100"
          >
            Add annotation
          </button>
        </div>
        <div className="space-y-3">
          {appearance.annotations.length === 0 && (
            <p className="text-xs text-text-secondary">No annotations yet.</p>
          )}
          {appearance.annotations.map((annotation) => (
            <div key={annotation.id} className="rounded-lg border border-amber-100 bg-amber-50/40 p-3 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <input
                  type="text"
                  className={inputClass}
                  value={annotation.text}
                  onChange={(e) => updateAnnotation(annotation.id, { text: e.target.value })}
                />
                <button
                  onClick={() => removeAnnotation(annotation.id)}
                  className="text-xs text-rose-500 hover:text-rose-600 font-medium px-2"
                >
                  Remove
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-text-secondary mb-1">X (%)</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    className={inputClass}
                    value={annotation.x}
                    onChange={(e) => updateAnnotation(annotation.id, { x: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-text-secondary mb-1">Y (%)</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    className={inputClass}
                    value={annotation.y}
                    onChange={(e) => updateAnnotation(annotation.id, { y: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-text-secondary mb-1">Align</label>
                  <select
                    className={inputClass}
                    value={annotation.align}
                    onChange={(e) =>
                      updateAnnotation(annotation.id, { align: e.target.value as typeof annotation.align })
                    }
                  >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-text-secondary mb-1">Tone</label>
                  <select
                    className={inputClass}
                    value={annotation.tone}
                    onChange={(e) =>
                      updateAnnotation(annotation.id, { tone: e.target.value as typeof annotation.tone })
                    }
                  >
                    <option value="default">Default</option>
                    <option value="muted">Muted</option>
                    <option value="emphasis">Emphasis</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
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
