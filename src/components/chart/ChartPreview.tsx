import { forwardRef } from 'react';
import { ChartRenderer } from './ChartRenderer';
import { AnnotationOverlay } from './AnnotationOverlay';
import { useChartStore } from '../../store/useChartStore';

export const ChartPreview = forwardRef<HTMLDivElement>(function ChartPreview(_, ref) {
  const appearance = useChartStore((s) => s.appearance);

  return (
    <div
      ref={ref}
      className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04),0_6px_24px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden"
    >
      <div className="px-7 pt-6 pb-2">
        {appearance.title && (
          <h2 className="text-[17px] font-bold text-gray-900 leading-snug tracking-tight">
            {appearance.title}
          </h2>
        )}
        {appearance.subtitle && (
          <p className="text-[13px] text-gray-500 mt-0.5 leading-snug">{appearance.subtitle}</p>
        )}
      </div>
      <div className="px-3 relative">
        <ChartRenderer />
        <AnnotationOverlay />
      </div>
      {appearance.caption && (
        <div className="px-7 pb-5 pt-2">
          <p className="text-[11px] text-gray-400 border-t border-gray-100 pt-3">
            {appearance.caption}
          </p>
        </div>
      )}
      {!appearance.caption && <div className="pb-4" />}
    </div>
  );
});
