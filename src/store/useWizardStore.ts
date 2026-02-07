import { create } from 'zustand';
import type { WizardStepId, WizardStep } from '../types/wizard';

const STEP_ORDER: WizardStepId[] = ['upload', 'chart-type', 'customize', 'export'];

const initialSteps: WizardStep[] = [
  { id: 'upload', label: 'Upload', description: 'Upload your CSV data', isComplete: false, isEnabled: true },
  { id: 'chart-type', label: 'Chart Type', description: 'Choose a visualization', isComplete: false, isEnabled: false },
  { id: 'customize', label: 'Customize', description: 'Configure your chart', isComplete: false, isEnabled: false },
  { id: 'export', label: 'Export', description: 'Download your chart', isComplete: false, isEnabled: false },
];

interface WizardState {
  currentStep: WizardStepId;
  steps: WizardStep[];
  goToStep: (stepId: WizardStepId) => void;
  goNext: () => void;
  goBack: () => void;
  markStepComplete: (stepId: WizardStepId) => void;
  reset: () => void;
}

export const useWizardStore = create<WizardState>((set, get) => ({
  currentStep: 'upload',
  steps: initialSteps.map((s) => ({ ...s })),

  goToStep: (stepId) => {
    const step = get().steps.find((s) => s.id === stepId);
    if (step?.isEnabled) {
      set({ currentStep: stepId });
    }
  },

  goNext: () => {
    const { currentStep } = get();
    const idx = STEP_ORDER.indexOf(currentStep);
    if (idx < STEP_ORDER.length - 1) {
      set({ currentStep: STEP_ORDER[idx + 1] });
    }
  },

  goBack: () => {
    const { currentStep } = get();
    const idx = STEP_ORDER.indexOf(currentStep);
    if (idx > 0) {
      set({ currentStep: STEP_ORDER[idx - 1] });
    }
  },

  markStepComplete: (stepId) => {
    set((state) => {
      const steps = state.steps.map((s) => ({ ...s }));
      const idx = steps.findIndex((s) => s.id === stepId);
      if (idx !== -1) {
        steps[idx].isComplete = true;
        if (idx + 1 < steps.length) {
          steps[idx + 1].isEnabled = true;
        }
      }
      return { steps };
    });
  },

  reset: () =>
    set({
      currentStep: 'upload',
      steps: initialSteps.map((s) => ({ ...s })),
    }),
}));
