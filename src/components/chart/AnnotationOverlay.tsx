import { useChartStore } from '../../store/useChartStore';

const toneClasses: Record<string, string> = {
  default: 'text-slate-700',
  muted: 'text-slate-500',
  emphasis: 'text-slate-900 font-semibold',
};

export function AnnotationOverlay() {
  const annotations = useChartStore((s) => s.appearance.annotations);

  if (!annotations.length) {
    return <div className="pointer-events-none absolute inset-0" aria-hidden="true" />;
  }

  return (
    <div className="pointer-events-none absolute inset-0">
      {annotations.map((annotation) => {
        const alignClass =
          annotation.align === 'center'
            ? 'text-center -translate-x-1/2'
            : annotation.align === 'right'
              ? 'text-right -translate-x-full'
              : '';
        return (
          <div
            key={annotation.id}
            className={`absolute max-w-[200px] text-xs leading-snug ${alignClass} ${toneClasses[annotation.tone] ?? toneClasses.default}`}
            style={{ left: `${annotation.x}%`, top: `${annotation.y}%` }}
          >
            <span className="inline-flex bg-white/70 backdrop-blur-[1px] px-2 py-1 rounded-md shadow-[0_1px_4px_rgba(15,23,42,0.08)] border border-amber-100">
              {annotation.text}
            </span>
          </div>
        );
      })}
    </div>
  );
}
