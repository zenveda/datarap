import { useState } from 'react';
import { ClipboardPaste } from 'lucide-react';

interface CsvPasteAreaProps {
  onPaste: (csvText: string) => void;
}

export function CsvPasteArea({ onPaste }: CsvPasteAreaProps) {
  const [text, setText] = useState('');

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-medium text-text-primary">
        <ClipboardPaste className="w-4 h-4" />
        Paste CSV data
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={`name,value,category\nApples,50,Fruit\nOranges,30,Fruit\nCarrots,20,Vegetable`}
        className="w-full h-40 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none bg-white text-text-primary placeholder:text-gray-400"
      />
      <button
        onClick={() => {
          if (text.trim()) onPaste(text);
        }}
        disabled={!text.trim()}
        className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Parse Data
      </button>
    </div>
  );
}
