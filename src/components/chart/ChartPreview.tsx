import { forwardRef } from 'react';
import { ChartRenderer } from './ChartRenderer';
import { AnnotationOverlay } from './AnnotationOverlay';
import { useChartStore } from '../../store/useChartStore';

export const ChartPreview = forwardRef<HTMLDivElement>(function ChartPreview(_, ref) {
  const appearance = useChartStore((s) => s.appearance);
  const fontMap: Record<string, string> = {
    'source-sans-3': "'Source Sans 3', 'IBM Plex Sans', system-ui, sans-serif",
    inter: "'Inter', system-ui, sans-serif",
    'ibm-plex-sans': "'IBM Plex Sans', system-ui, sans-serif",
    'work-sans': "'Work Sans', 'Inter', system-ui, sans-serif",
    lato: "'Lato', system-ui, sans-serif",
    'nunito-sans': "'Nunito Sans', system-ui, sans-serif",
    fraunces: "'Fraunces', 'Iowan Old Style', 'Palatino', serif",
    merriweather: "'Merriweather', 'Iowan Old Style', serif",
    'playfair-display': "'Playfair Display', 'Iowan Old Style', serif",
  };

  return (
    <div
      ref={ref}
      style={{
        ['--chart-font-sans' as string]: fontMap[appearance.bodyFont] ?? fontMap['source-sans-3'],
        ['--chart-font-display' as string]: fontMap[appearance.titleFont] ?? fontMap.fraunces,
      }}
      className="chart-root bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.9),_rgba(252,249,242,0.92)_55%,_rgba(249,244,233,0.95)_100%)] rounded-[28px] shadow-[0_18px_50px_rgba(88,71,42,0.14)] border border-amber-100 overflow-hidden"
    >
      <div className="px-7 pt-6 pb-2">
        {appearance.title && (
          <h2 className="text-[19px] font-semibold text-slate-900 leading-snug tracking-tight font-display">
            {appearance.title}
          </h2>
        )}
        {appearance.subtitle && (
          <p className="text-[13px] text-slate-500 mt-0.5 leading-snug">{appearance.subtitle}</p>
        )}
      </div>
      <div className="px-3 pb-2 relative">
        <ChartRenderer />
        <AnnotationOverlay />
      </div>
      {appearance.caption && (
        <div className="px-7 pb-5 pt-2">
          <p className="text-[11px] text-slate-400 border-t border-amber-100 pt-3">
            {appearance.caption}
          </p>
        </div>
      )}
      {!appearance.caption && <div className="pb-4" />}
    </div>
  );
});
