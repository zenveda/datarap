import { useEffect } from 'react';
import { ChartTypeGrid } from '../chart-picker/ChartTypeGrid';
import { ChartPreview } from '../chart/ChartPreview';
import { useChartStore } from '../../store/useChartStore';
import { useDataStore } from '../../store/useDataStore';
import { useWizardStore } from '../../store/useWizardStore';

export function ChartTypeStep() {
  const chartType = useChartStore((s) => s.chartType);
  const setMapping = useChartStore((s) => s.setMapping);
  const parsedData = useDataStore((s) => s.parsedData);
  const markStepComplete = useWizardStore((s) => s.markStepComplete);

  // Auto-map axes when chart type changes
  useEffect(() => {
    if (!chartType || !parsedData) return;

    const stringCols = parsedData.columns.filter((c) => c.type === 'string' || c.type === 'date');
    const numericCols = parsedData.columns.filter((c) => c.type === 'number');

    const firstString = stringCols[0]?.name ?? null;
    const firstNumeric = numericCols[0]?.name;

    if (chartType === 'scatter') {
      const secondNumeric = numericCols[1]?.name;
      if (firstNumeric && secondNumeric) {
        setMapping({ xColumn: firstNumeric, yColumns: [secondNumeric] });
      }
    } else if (firstString && firstNumeric) {
      setMapping({ xColumn: firstString, yColumns: [firstNumeric] });
    }

    markStepComplete('chart-type');
  }, [chartType, parsedData, setMapping, markStepComplete]);

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-text-primary">Choose a chart type</h2>
        <ChartTypeGrid />
      </div>
      <div>
        {chartType && (
          <div className="sticky top-6">
            <p className="text-sm font-medium text-text-secondary mb-3">Preview</p>
            <ChartPreview />
          </div>
        )}
      </div>
    </div>
  );
}
