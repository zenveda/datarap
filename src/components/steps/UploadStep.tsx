import { useCallback } from 'react';
import { FileDropZone } from '../upload/FileDropZone';
import { CsvPasteArea } from '../upload/CsvPasteArea';
import { DataTable } from '../upload/DataTable';
import { useDataStore } from '../../store/useDataStore';
import { useWizardStore } from '../../store/useWizardStore';
import { parseCsvString } from '../../utils/csvParser';
import { Trash2 } from 'lucide-react';

export function UploadStep() {
  const parsedData = useDataStore((s) => s.parsedData);
  const setData = useDataStore((s) => s.setData);
  const setError = useDataStore((s) => s.setError);
  const parseError = useDataStore((s) => s.parseError);
  const clearData = useDataStore((s) => s.clearData);
  const markStepComplete = useWizardStore((s) => s.markStepComplete);

  const handleCsvText = useCallback(
    (csvText: string) => {
      try {
        const data = parseCsvString(csvText);
        setData(data);
        markStepComplete('upload');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to parse CSV');
      }
    },
    [setData, setError, markStepComplete]
  );

  return (
    <div className="space-y-6">
      {!parsedData && (
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <FileDropZone onFileLoaded={handleCsvText} />
          </div>
          <div>
            <CsvPasteArea onPaste={handleCsvText} />
          </div>
        </div>
      )}

      {parseError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
          {parseError}
        </div>
      )}

      {parsedData && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={clearData}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear data
            </button>
          </div>
          <DataTable />
        </div>
      )}
    </div>
  );
}
