export interface ColumnMeta {
  name: string;
  type: 'string' | 'number' | 'date';
  index: number;
}

export interface ParsedData {
  columns: ColumnMeta[];
  rows: Record<string, string | number>[];
  rawCsv: string;
}
