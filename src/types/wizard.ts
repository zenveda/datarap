export type WizardStepId = 'upload' | 'chart-type' | 'customize' | 'export';

export interface WizardStep {
  id: WizardStepId;
  label: string;
  description: string;
  isComplete: boolean;
  isEnabled: boolean;
}
