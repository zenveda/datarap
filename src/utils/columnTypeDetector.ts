export function detectColumnType(
  rows: Record<string, unknown>[],
  columnName: string
): 'string' | 'number' | 'date' {
  const sampleSize = Math.min(rows.length, 20);
  let numericCount = 0;
  let dateCount = 0;
  let nonEmpty = 0;

  for (let i = 0; i < sampleSize; i++) {
    const value = rows[i][columnName];
    if (value == null || value === '') continue;
    nonEmpty++;

    if (typeof value === 'number' || (!isNaN(Number(value)) && String(value).trim() !== '')) {
      numericCount++;
    } else if (!isNaN(Date.parse(String(value)))) {
      dateCount++;
    }
  }

  if (nonEmpty === 0) return 'string';
  const threshold = nonEmpty * 0.7;
  if (numericCount >= threshold) return 'number';
  if (dateCount >= threshold) return 'date';
  return 'string';
}
