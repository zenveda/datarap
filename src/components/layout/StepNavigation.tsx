import { useWizardStore } from '../../store/useWizardStore';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export function StepNavigation() {
  const currentStep = useWizardStore((s) => s.currentStep);
  const steps = useWizardStore((s) => s.steps);
  const goNext = useWizardStore((s) => s.goNext);
  const goBack = useWizardStore((s) => s.goBack);

  const currentIdx = steps.findIndex((s) => s.id === currentStep);
  const isFirst = currentIdx === 0;
  const isLast = currentIdx === steps.length - 1;
  const currentStepData = steps[currentIdx];
  const nextStepEnabled = currentIdx + 1 < steps.length && steps[currentIdx + 1].isEnabled;

  return (
    <div className="bg-surface border-t border-border">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <div>
          {!isFirst && (
            <button
              onClick={goBack}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          )}
        </div>
        <div>
          {!isLast && (
            <button
              onClick={goNext}
              disabled={!currentStepData.isComplete || !nextStepEnabled}
              className="flex items-center gap-2 px-5 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
