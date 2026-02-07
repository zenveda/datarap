import { useDataStore } from '../../store/useDataStore';

export function DataTable() {
  const parsedData = useDataStore((s) => s.parsedData);
  const updateCell = useDataStore((s) => s.updateCell);

  if (!parsedData) return null;

  const { columns, rows } = parsedData;
  const displayRows = rows.slice(0, 100);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-text-primary">
          Data Preview
        </p>
        <p className="text-xs text-text-secondary">
          {rows.length} row{rows.length !== 1 ? 's' : ''} &middot; {columns.length} column{columns.length !== 1 ? 's' : ''}
          {rows.length > 100 && ' (showing first 100)'}
        </p>
      </div>
      <div className="border border-border rounded-lg overflow-auto max-h-80">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 sticky top-0">
              {columns.map((col) => (
                <th
                  key={col.name}
                  className="px-3 py-2 text-left font-medium text-text-primary whitespace-nowrap border-b border-border"
                >
                  {col.name}
                  <span
                    className={`ml-2 text-[10px] px-1.5 py-0.5 rounded-full font-normal ${
                      col.type === 'number'
                        ? 'bg-blue-100 text-blue-700'
                        : col.type === 'date'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {col.type}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayRows.map((row, rowIdx) => (
              <tr key={rowIdx} className="hover:bg-gray-50 border-b border-border last:border-0">
                {columns.map((col) => (
                  <td
                    key={col.name}
                    className="px-3 py-1.5 text-text-primary whitespace-nowrap"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const newValue = e.currentTarget.textContent ?? '';
                      const parsed = col.type === 'number' ? Number(newValue) : newValue;
                      if (row[col.name] !== parsed) {
                        updateCell(rowIdx, col.name, isNaN(parsed as number) ? newValue : parsed);
                      }
                    }}
                  >
                    {row[col.name] != null ? String(row[col.name]) : ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
