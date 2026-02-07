import { create } from 'zustand';
import type { ParsedData, ColumnMeta } from '../types/data';

interface DataState {
  parsedData: ParsedData | null;
  isLoading: boolean;
  parseError: string | null;
  setData: (data: ParsedData) => void;
  updateCell: (rowIndex: number, columnName: string, value: string | number) => void;
  clearData: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  getNumericColumns: () => ColumnMeta[];
  getStringColumns: () => ColumnMeta[];
}

export const useDataStore = create<DataState>((set, get) => ({
  parsedData: null,
  isLoading: false,
  parseError: null,

  setData: (data) => set({ parsedData: data, parseError: null, isLoading: false }),

  updateCell: (rowIndex, columnName, value) => {
    const { parsedData } = get();
    if (!parsedData) return;
    const newRows = [...parsedData.rows];
    newRows[rowIndex] = { ...newRows[rowIndex], [columnName]: value };
    set({ parsedData: { ...parsedData, rows: newRows } });
  },

  clearData: () => set({ parsedData: null, parseError: null, isLoading: false }),

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ parseError: error, isLoading: false }),

  getNumericColumns: () => {
    const { parsedData } = get();
    if (!parsedData) return [];
    return parsedData.columns.filter((c) => c.type === 'number');
  },

  getStringColumns: () => {
    const { parsedData } = get();
    if (!parsedData) return [];
    return parsedData.columns.filter((c) => c.type === 'string' || c.type === 'date');
  },
}));
