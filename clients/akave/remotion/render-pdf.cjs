'use strict';
const pdfjsLib = require('./node_modules/pdfjs-dist/legacy/build/pdf.js');
const { createCanvas, Image } = require('canvas');
const fs = require('fs');
const path = require('path');

// Patch globalThis so pdfjs can create Image objects
globalThis.Image = Image;

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
    canvasAndContext.canvas = null;
    canvasAndContext.context = null;
  }
}

class NodeImageDecodeFactory {
  async decode(data) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = Buffer.from(data);
    });
  }
}

const pdfPath = path.resolve(__dirname, 'Akave-brand-guide/Akave Cloud Brand Book (1).pdf');
const data = new Uint8Array(fs.readFileSync(pdfPath));
const outDir = path.resolve(__dirname, 'pdf-pages');
fs.mkdirSync(outDir, { recursive: true });

const canvasFactory = new NodeCanvasFactory();

const loadingTask = pdfjsLib.getDocument({
  data,
  canvasFactory,
  useSystemFonts: true,
  standardFontDataUrl: path.resolve(__dirname, 'node_modules/pdfjs-dist/standard_fonts/'),
});

async function main() {
  const pdf = await loadingTask.promise;
  console.log('Total pages:', pdf.numPages);

  for (let i = 1; i <= pdf.numPages; i++) {
    try {
      const page = await pdf.getPage(i);
      const scale = 2.0;
      const viewport = page.getViewport({ scale });

      const canvasAndCtx = canvasFactory.create(viewport.width, viewport.height);

      await page.render({
        canvasContext: canvasAndCtx.context,
        viewport,
        canvasFactory,
      }).promise;

      const outPath = path.resolve(outDir, `page-${String(i).padStart(2, '0')}.png`);
      fs.writeFileSync(outPath, canvasAndCtx.canvas.toBuffer('image/png'));
      console.log(`Rendered page ${i} -> ${outPath}`);
      page.cleanup();
    } catch(e) {
      console.error(`Error on page ${i}:`, e.message, e.stack);
    }
  }
  console.log('Done!');
}

main().catch(e => console.error('Fatal:', e));
