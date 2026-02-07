import { icons } from 'lucide-react';
import type { ChartTypeDefinition } from '../../constants/chartTypes';

interface ChartTypeCardProps {
  chart: ChartTypeDefinition;
  isSelected: boolean;
  onSelect: () => void;
}

export function ChartTypeCard({ chart, isSelected, onSelect }: ChartTypeCardProps) {
  const IconComponent = icons[chart.icon as keyof typeof icons];

  return (
    <button
      onClick={onSelect}
      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all text-left ${
        isSelected
          ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
          : 'border-gray-200 hover:border-primary/40 hover:bg-gray-50'
      }`}
    >
      {IconComponent && (
        <IconComponent
          className={`w-8 h-8 ${isSelected ? 'text-primary' : 'text-gray-500'}`}
        />
      )}
      <div className="text-center">
        <p className={`text-sm font-medium ${isSelected ? 'text-primary' : 'text-text-primary'}`}>
          {chart.label}
        </p>
        <p className="text-xs text-text-secondary mt-0.5">{chart.description}</p>
      </div>
    </button>
  );
}
