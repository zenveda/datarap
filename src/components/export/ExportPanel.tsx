import { useState } from 'react';
import { Download, Copy, Check } from 'lucide-react';
import { downloadChartAsPng, copyChartToClipboard } from '../../utils/exportImage';

interface ExportPanelProps {
  chartRef: React.RefObject<HTMLDivElement | null>;
}

export function ExportPanel({ chartRef }: ExportPanelProps) {
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);

  const handleDownload = async () => {
    if (!chartRef.current) return;
    setExporting(true);
    try {
      await downloadChartAsPng(chartRef.current);
    } catch (err) {
      console.error('Export failed:', err);
    }
    setExporting(false);
  };

  const handleCopy = async () => {
    if (!chartRef.current) return;
    try {
      await copyChartToClipboard(chartRef.current);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  return (
    <div className="flex items-center justify-center gap-3">
      <button
        onClick={handleDownload}
        disabled={exporting}
        className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-50"
      >
        <Download className="w-4 h-4" />
        {exporting ? 'Exporting...' : 'Download PNG'}
      </button>
      <button
        onClick={handleCopy}
        className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium border border-gray-300 text-text-primary rounded-lg hover:bg-gray-50 transition-colors"
      >
        {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
        {copied ? 'Copied!' : 'Copy to Clipboard'}
      </button>
    </div>
  );
}
