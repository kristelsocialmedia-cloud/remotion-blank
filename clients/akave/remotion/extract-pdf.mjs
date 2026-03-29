import { getDocument } from './node_modules/pdfjs-dist/legacy/build/pdf.mjs';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const pdfPath = resolve('Akave-brand-guide/Akave Cloud Brand Book (1).pdf');
const data = new Uint8Array(readFileSync(pdfPath));

const loadingTask = getDocument({ data, useSystemFonts: true, disableFontFace: true });
const pdf = await loadingTask.promise;
console.log('Total pages:', pdf.numPages);

let fullText = '';
for (let i = 1; i <= pdf.numPages; i++) {
  const page = await pdf.getPage(i);
  const content = await page.getTextContent();
  const pageText = content.items.map(item => item.str).join(' ');
  fullText += '\n=== PAGE ' + i + ' ===\n' + pageText + '\n';
}
console.log(fullText);
