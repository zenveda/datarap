import { AppShell } from './components/layout/AppShell';
import { UploadStep } from './components/steps/UploadStep';
import { ChartTypeStep } from './components/steps/ChartTypeStep';
import { CustomizeStep } from './components/steps/CustomizeStep';
import { ExportStep } from './components/steps/ExportStep';
import { useWizardStore } from './store/useWizardStore';

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

  return <AppShell>{renderStep()}</AppShell>;
}

export default App;
