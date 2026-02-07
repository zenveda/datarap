import Papa from 'papaparse';
import type { ParsedData } from '../types/data';
import { detectColumnType } from './columnTypeDetector';

export function parseCsvString(csvText: string): ParsedData {
  const result = Papa.parse(csvText, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  });

  if (result.errors.length > 0 && result.data.length === 0) {
    throw new Error(`CSV parse error: ${result.errors[0].message}`);
  }

  const columnNames = result.meta.fields ?? [];
  if (columnNames.length === 0) {
    throw new Error('No columns found in CSV data');
  }

  const rows = result.data as Record<string, string | number>[];
  const columns = columnNames.map((name, index) => ({
    name,
    type: detectColumnType(rows, name),
    index,
  }));

  return { columns, rows, rawCsv: csvText };
}

export function parseCsvFile(file: File): Promise<ParsedData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        resolve(parseCsvString(text));
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}
