import { useWizardStore } from '../../store/useWizardStore';
import { Check } from 'lucide-react';

export function StepIndicator() {
  const steps = useWizardStore((s) => s.steps);
  const currentStep = useWizardStore((s) => s.currentStep);
  const goToStep = useWizardStore((s) => s.goToStep);

  return (
    <div className="flex items-center justify-center gap-0">
      {steps.map((step, i) => {
        const isCurrent = step.id === currentStep;
        const isComplete = step.isComplete;

        return (
          <div key={step.id} className="flex items-center">
            <button
              onClick={() => goToStep(step.id)}
              disabled={!step.isEnabled}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                isCurrent
                  ? 'bg-primary/10 text-primary'
                  : isComplete
                    ? 'text-green-600 hover:bg-green-50 cursor-pointer'
                    : step.isEnabled
                      ? 'text-text-secondary hover:bg-gray-100 cursor-pointer'
                      : 'text-gray-300 cursor-not-allowed'
              }`}
            >
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${
                  isCurrent
                    ? 'bg-primary text-white'
                    : isComplete
                      ? 'bg-green-500 text-white'
                      : step.isEnabled
                        ? 'bg-gray-200 text-gray-600'
                        : 'bg-gray-100 text-gray-400'
                }`}
              >
                {isComplete ? <Check className="w-4 h-4" /> : i + 1}
              </span>
              <span className="text-sm font-medium hidden sm:inline">{step.label}</span>
            </button>
            {i < steps.length - 1 && (
              <div
                className={`w-8 h-0.5 mx-1 ${
                  steps[i + 1].isEnabled ? 'bg-primary/30' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
