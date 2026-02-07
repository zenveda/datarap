import { useRef } from 'react';
import { ChartPreview } from '../chart/ChartPreview';
import { ExportPanel } from '../export/ExportPanel';
import { useWizardStore } from '../../store/useWizardStore';
import { useChartStore } from '../../store/useChartStore';
import { useDataStore } from '../../store/useDataStore';
import { RotateCcw } from 'lucide-react';

export function ExportStep() {
  const chartRef = useRef<HTMLDivElement>(null);
  const reset = useWizardStore((s) => s.reset);
  const resetConfig = useChartStore((s) => s.resetConfig);
  const clearData = useDataStore((s) => s.clearData);

  const handleStartOver = () => {
    reset();
    resetConfig();
    clearData();
  };

  return (
    <div className="space-y-6">
      <div className="max-w-3xl mx-auto">
        <ChartPreview ref={chartRef} />
      </div>
      <ExportPanel chartRef={chartRef} />
      <div className="text-center">
        <button
          onClick={handleStartOver}
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Start over
        </button>
      </div>
    </div>
  );
}
