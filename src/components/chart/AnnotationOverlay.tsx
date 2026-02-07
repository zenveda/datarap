import { useRef, useState } from 'react';
import { useChartStore } from '../../store/useChartStore';

const toneClasses: Record<string, string> = {
  default: 'text-slate-700',
  muted: 'text-slate-500',
  emphasis: 'text-slate-900 font-semibold',
};

export function AnnotationOverlay() {
  const annotations = useChartStore((s) => s.appearance.annotations);
  const updateAnnotation = useChartStore((s) => s.updateAnnotation);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

  const updatePositionFromEvent = (id: string, event: PointerEvent | React.PointerEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const xPct = ((event.clientX - rect.left) / rect.width) * 100;
    const yPct = ((event.clientY - rect.top) / rect.height) * 100;
    updateAnnotation(id, {
      x: clamp(Number(xPct.toFixed(2)), 0, 100),
      y: clamp(Number(yPct.toFixed(2)), 0, 100),
    });
  };

  if (!annotations.length) {
    return <div className="pointer-events-none absolute inset-0" aria-hidden="true" />;
  }

  return (
    <div ref={containerRef} className="absolute inset-0">
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
            {editingId === annotation.id ? (
              <input
                className="pointer-events-auto w-44 text-xs bg-white/90 border border-amber-200 rounded-md px-2 py-1 shadow-[0_1px_4px_rgba(15,23,42,0.08)]"
                value={annotation.text}
                autoFocus
                onChange={(event) => updateAnnotation(annotation.id, { text: event.target.value })}
                onBlur={() => setEditingId(null)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    setEditingId(null);
                  }
                  if (event.key === 'Escape') {
                    event.preventDefault();
                    setEditingId(null);
                  }
                }}
              />
            ) : (
              <button
                type="button"
                className={`pointer-events-auto inline-flex bg-white/80 backdrop-blur-[1px] px-2 py-1 rounded-md shadow-[0_1px_4px_rgba(15,23,42,0.08)] border border-amber-100 cursor-grab ${
                  draggingId === annotation.id ? 'cursor-grabbing' : ''
                }`}
                onDoubleClick={() => setEditingId(annotation.id)}
                onPointerDown={(event) => {
                  (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
                  setDraggingId(annotation.id);
                  updatePositionFromEvent(annotation.id, event);
                }}
                onPointerMove={(event) => {
                  if (draggingId !== annotation.id) return;
                  updatePositionFromEvent(annotation.id, event);
                }}
                onPointerUp={(event) => {
                  if (draggingId !== annotation.id) return;
                  updatePositionFromEvent(annotation.id, event);
                  setDraggingId(null);
                }}
                onPointerCancel={() => setDraggingId(null)}
              >
                {annotation.text}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
