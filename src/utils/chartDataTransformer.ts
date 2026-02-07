import type { ParsedData } from '../types/data';
import type { AxisMapping } from '../types/chart';

export function transformForCartesian(
  data: ParsedData,
  mapping: AxisMapping
): Record<string, unknown>[] {
  return data.rows.map((row) => {
    const result: Record<string, unknown> = {};
    if (mapping.xColumn) result[mapping.xColumn] = row[mapping.xColumn];
    mapping.yColumns.forEach((col) => {
      result[col] = Number(row[col]) || 0;
    });
    return result;
  });
}

export function transformForPie(
  data: ParsedData,
  mapping: AxisMapping
): { name: string; value: number }[] {
  const categoryCol = mapping.xColumn;
  const valueCol = mapping.yColumns[0];
  if (!categoryCol || !valueCol) return [];

  return data.rows.map((row) => ({
    name: String(row[categoryCol] ?? ''),
    value: Number(row[valueCol]) || 0,
  }));
}

export function transformForScatter(
  data: ParsedData,
  mapping: AxisMapping
): { x: number; y: number }[] {
  const xCol = mapping.xColumn;
  const yCol = mapping.yColumns[0];
  if (!xCol || !yCol) return [];

  return data.rows
    .map((row) => ({
      x: Number(row[xCol]) || 0,
      y: Number(row[yCol]) || 0,
    }))
    .filter((p) => !isNaN(p.x) && !isNaN(p.y));
}
