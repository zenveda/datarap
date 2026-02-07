import { Suspense, lazy } from 'react';
import { AppShell } from './components/layout/AppShell';
import { useWizardStore } from './store/useWizardStore';

const UploadStep = lazy(() =>
  import('./components/steps/UploadStep').then((module) => ({
    default: module.UploadStep,
  })),
);
const ChartTypeStep = lazy(() =>
  import('./components/steps/ChartTypeStep').then((module) => ({
    default: module.ChartTypeStep,
  })),
);
const CustomizeStep = lazy(() =>
  import('./components/steps/CustomizeStep').then((module) => ({
    default: module.CustomizeStep,
  })),
);
const ExportStep = lazy(() =>
  import('./components/steps/ExportStep').then((module) => ({
    default: module.ExportStep,
  })),
);

function App() {
  const currentStep = useWizardStore((s) => s.currentStep);

  const renderStep = () => {
    switch (currentStep) {
      case 'upload':
        return <UploadStep />;
      case 'chart-type':
        return <ChartTypeStep />;
      case 'customize':
        return <CustomizeStep />;
      case 'export':
        return <ExportStep />;
    }
  };

  return (
    <AppShell>
      <Suspense fallback={<div className="px-7 py-6 text-sm text-gray-500">Loading…</div>}>
        {renderStep()}
      </Suspense>
    </AppShell>
  );
}

export default App;
