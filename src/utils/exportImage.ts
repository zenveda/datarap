import { toPng, toBlob } from 'html-to-image';

export async function downloadChartAsPng(
  element: HTMLElement,
  filename: string = 'datarap-chart.png'
): Promise<void> {
  await document.fonts.ready;
  const dataUrl = await toPng(element, {
    cacheBust: true,
    pixelRatio: 2,
    backgroundColor: '#ffffff',
  });

  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
}

export async function copyChartToClipboard(element: HTMLElement): Promise<void> {
  await document.fonts.ready;
  const blob = await toBlob(element, {
    cacheBust: true,
    pixelRatio: 2,
    backgroundColor: '#ffffff',
  });
  if (!blob) throw new Error('Failed to create image blob');

  await navigator.clipboard.write([
    new ClipboardItem({ 'image/png': blob }),
  ]);
}
