import { useState, useEffect } from 'react';
import { AxisMapper } from '../customize/AxisMapper';
import { AppearancePanel } from '../customize/AppearancePanel';
import { ChartPreview } from '../chart/ChartPreview';
import { useChartStore } from '../../store/useChartStore';
import { useWizardStore } from '../../store/useWizardStore';

type Tab = 'mapping' | 'appearance';

export function CustomizeStep() {
  const [activeTab, setActiveTab] = useState<Tab>('mapping');
  const mapping = useChartStore((s) => s.mapping);
  const markStepComplete = useWizardStore((s) => s.markStepComplete);

  useEffect(() => {
    if (mapping.yColumns.length > 0 && mapping.yColumns[0] !== '') {
      markStepComplete('customize');
    }
  }, [mapping, markStepComplete]);

  return (
    <div className="grid lg:grid-cols-[340px_1fr] gap-6">
      <div className="space-y-4">
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab('mapping')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'mapping'
                ? 'border-primary text-primary'
                : 'border-transparent text-text-secondary hover:text-text-primary'
            }`}
          >
            Data Mapping
          </button>
          <button
            onClick={() => setActiveTab('appearance')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'appearance'
                ? 'border-primary text-primary'
                : 'border-transparent text-text-secondary hover:text-text-primary'
            }`}
          >
            Appearance
          </button>
        </div>
        <div className="bg-white rounded-xl border border-border p-4">
          {activeTab === 'mapping' ? <AxisMapper /> : <AppearancePanel />}
        </div>
      </div>
      <div className="sticky top-6">
        <p className="text-sm font-medium text-text-secondary mb-3">Live Preview</p>
        <ChartPreview />
      </div>
    </div>
  );
}
