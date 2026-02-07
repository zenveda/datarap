import { useDataStore } from '../../store/useDataStore';
import { useChartStore } from '../../store/useChartStore';

export function AxisMapper() {
  const parsedData = useDataStore((s) => s.parsedData);
  const chartType = useChartStore((s) => s.chartType);
  const mapping = useChartStore((s) => s.mapping);
  const setMapping = useChartStore((s) => s.setMapping);

  if (!parsedData) return null;

  const stringCols = parsedData.columns.filter((c) => c.type === 'string' || c.type === 'date');
  const numericCols = parsedData.columns.filter((c) => c.type === 'number');
  const allCols = parsedData.columns;

  const isScatter = chartType === 'scatter';
  const isPie = chartType === 'pie' || chartType === 'donut';

  const selectClass =
    'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-white text-text-primary';

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-text-primary">Data Mapping</h3>

      {isPie ? (
        <>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1">Category</label>
            <select
              className={selectClass}
              value={mapping.xColumn ?? ''}
              onChange={(e) => setMapping({ xColumn: e.target.value || null })}
            >
              <option value="">Select column...</option>
              {stringCols.map((c) => (
                <option key={c.name} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1">Value</label>
            <select
              className={selectClass}
              value={mapping.yColumns[0] ?? ''}
              onChange={(e) => setMapping({ yColumns: e.target.value ? [e.target.value] : [] })}
            >
              <option value="">Select column...</option>
              {numericCols.map((c) => (
                <option key={c.name} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
        </>
      ) : isScatter ? (
        <>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1">X Axis (numeric)</label>
            <select
              className={selectClass}
              value={mapping.xColumn ?? ''}
              onChange={(e) => setMapping({ xColumn: e.target.value || null })}
            >
              <option value="">Select column...</option>
              {numericCols.map((c) => (
                <option key={c.name} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1">Y Axis (numeric)</label>
            <select
              className={selectClass}
              value={mapping.yColumns[0] ?? ''}
              onChange={(e) => setMapping({ yColumns: e.target.value ? [e.target.value] : [] })}
            >
              <option value="">Select column...</option>
              {numericCols.map((c) => (
                <option key={c.name} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
        </>
      ) : (
        <>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1">X Axis</label>
            <select
              className={selectClass}
              value={mapping.xColumn ?? ''}
              onChange={(e) => setMapping({ xColumn: e.target.value || null })}
            >
              <option value="">Select column...</option>
              {allCols.map((c) => (
                <option key={c.name} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1">Y Axis</label>
            {mapping.yColumns.map((col, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <select
                  className={selectClass}
                  value={col}
                  onChange={(e) => {
                    const newY = [...mapping.yColumns];
                    newY[i] = e.target.value;
                    setMapping({ yColumns: newY.filter(Boolean) });
                  }}
                >
                  <option value="">Select column...</option>
                  {numericCols.map((c) => (
                    <option key={c.name} value={c.name}>{c.name}</option>
                  ))}
                </select>
                {mapping.yColumns.length > 1 && (
                  <button
                    onClick={() => setMapping({ yColumns: mapping.yColumns.filter((_, j) => j !== i) })}
                    className="px-2 text-red-500 hover:bg-red-50 rounded text-sm"
                  >
                    &times;
                  </button>
                )}
              </div>
            ))}
            {mapping.yColumns.length === 0 && (
              <select
                className={selectClass}
                value=""
                onChange={(e) => {
                  if (e.target.value) setMapping({ yColumns: [e.target.value] });
                }}
              >
                <option value="">Select column...</option>
                {numericCols.map((c) => (
                  <option key={c.name} value={c.name}>{c.name}</option>
                ))}
              </select>
            )}
            <button
              onClick={() => setMapping({ yColumns: [...mapping.yColumns, ''] })}
              className="text-xs text-primary hover:underline mt-1"
            >
              + Add another series
            </button>
          </div>
        </>
      )}
    </div>
  );
}
