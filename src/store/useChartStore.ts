import { create } from 'zustand';
import type { ChartType, AxisMapping, ChartAppearance } from '../types/chart';
import { DEFAULT_APPEARANCE, DEFAULT_MAPPING } from '../constants/defaults';

interface ChartState {
  chartType: ChartType | null;
  mapping: AxisMapping;
  appearance: ChartAppearance;
  setChartType: (type: ChartType) => void;
  setMapping: (mapping: Partial<AxisMapping>) => void;
  setAppearance: (appearance: Partial<ChartAppearance>) => void;
  resetConfig: () => void;
}

export const useChartStore = create<ChartState>((set) => ({
  chartType: null,
  mapping: { ...DEFAULT_MAPPING },
  appearance: { ...DEFAULT_APPEARANCE },

  setChartType: (type) =>
    set({
      chartType: type,
      mapping: { ...DEFAULT_MAPPING },
    }),

  setMapping: (mapping) =>
    set((state) => ({
      mapping: { ...state.mapping, ...mapping },
    })),

  setAppearance: (appearance) =>
    set((state) => ({
      appearance: { ...state.appearance, ...appearance },
    })),

  resetConfig: () =>
    set({
      chartType: null,
      mapping: { ...DEFAULT_MAPPING },
      appearance: { ...DEFAULT_APPEARANCE },
    }),
}));
