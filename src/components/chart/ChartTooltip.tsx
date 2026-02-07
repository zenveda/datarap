interface TooltipPayload {
  name: string;
  value: number;
  color: string;
  dataKey: string;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

export function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-[#fffaf0] text-slate-800 px-3 py-2 rounded-lg shadow-[0_12px_24px_rgba(88,71,42,0.18)] text-xs border border-amber-200">
      {label && <p className="font-semibold text-slate-600 mb-1.5 pb-1.5 border-b border-amber-100">{label}</p>}
      <div className="space-y-1">
        {payload.map((entry, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
            <span className="text-slate-500">{entry.name}:</span>
            <span className="font-semibold ml-auto tabular-nums">
              {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
