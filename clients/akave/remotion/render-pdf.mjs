import { getDocument } from './node_modules/pdfjs-dist/legacy/build/pdf.mjs';
import { createRequire } from 'module';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';

const require = createRequire(import.meta.url);
const { createCanvas, Image } = require('canvas');

// NodeCanvasFactory that pdfjs uses to create canvases and images
class NodeCanvasFactory {
  create(width, height) {
    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');
    return { canvas, context };
  }
  reset(canvasAndContext, width, height) {
    canvasAndContext.canvas.width = width;
    canvasAndContext.canvas.height = height;
  }
  destroy(canvasAndContext) {
    canvasAndContext.canvas.width = 0;
    canvasAndContext.canvas.height = 0;
  }
}

// NodeCMapReaderFactory stub
class NodeCMapReaderFactory {
  async fetch({ name }) {
    return { cMapData: new Uint8Array(), compressionType: 0 };
  }
}

// Override globalThis.Image for pdfjs
globalThis.Image = Image;
globalThis.document = { createElement: (tag) => { if (tag === 'canvas') return createCanvas(1,1); } };

const pdfPath = resolve('Akave-brand-guide/Akave Cloud Brand Book (1).pdf');
const data = new Uint8Array(readFileSync(pdfPath));
const outDir = resolve('pdf-pages');
mkdirSync(outDir, { recursive: true });

const canvasFactory = new NodeCanvasFactory();
const loadingTask = getDocument({
  data,
  useSystemFonts: true,
  canvasFactory,
});
const pdf = await loadingTask.promise;
console.log('Total pages:', pdf.numPages);

for (let i = 1; i <= pdf.numPages; i++) {
  try {
    const page = await pdf.getPage(i);
    const scale = 2.0;
    const viewport = page.getViewport({ scale });

    const canvasAndContext = canvasFactory.create(viewport.width, viewport.height);
    const { canvas, context } = canvasAndContext;

    await page.render({
      canvasContext: context,
      viewport,
      canvasFactory,
    }).promise;

    const outPath = resolve(outDir, `page-${String(i).padStart(2, '0')}.png`);
    writeFileSync(outPath, canvas.toBuffer('image/png'));
    console.log(`Rendered page ${i} -> ${outPath}`);
    page.cleanup();
  } catch(e) {
    console.error(`Error on page ${i}:`, e.message);
  }
}

console.log('Done!');
