import type { ReactNode } from 'react';
import { StepIndicator } from './StepIndicator';
import { StepNavigation } from './StepNavigation';
import { BarChart3 } from 'lucide-react';

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="bg-surface border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-3">
          <BarChart3 className="w-7 h-7 text-primary" />
          <h1 className="text-xl font-bold text-text-primary">DataRap</h1>
        </div>
      </header>
      <div className="max-w-6xl mx-auto w-full px-4 pt-6">
        <StepIndicator />
      </div>
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">
        {children}
      </main>
      <StepNavigation />
    </div>
  );
}
