'use strict';
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

async function cropRegion(srcPath, outPath, x, y, w, h, scale = 2) {
  const img = await loadImage(srcPath);
  const canvas = createCanvas(w * scale, h * scale);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, x, y, w, h, 0, 0, w * scale, h * scale);
  fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
  console.log('Wrote', outPath);
}

const outDir = path.resolve(__dirname, 'pdf-pages');

async function main() {
  // Page 7 (color palette) - crop swatch labels area
  // Image is 1920x1280 (2x scale of the PDF page)
  // Crop just the swatches area
  const p7 = path.resolve(outDir, 'page-07.png');
  await cropRegion(p7, path.resolve(outDir, 'p7-swatches-top.png'), 260, 80, 1660, 580, 2);
  await cropRegion(p7, path.resolve(outDir, 'p7-sky.png'), 260, 80, 155, 200, 3);
  await cropRegion(p7, path.resolve(outDir, 'p7-mirage.png'), 400, 80, 155, 200, 3);
  await cropRegion(p7, path.resolve(outDir, 'p7-sand.png'), 540, 80, 155, 200, 3);
  await cropRegion(p7, path.resolve(outDir, 'p7-dusk.png'), 660, 80, 155, 200, 3);
  await cropRegion(p7, path.resolve(outDir, 'p7-laterit.png'), 800, 80, 155, 200, 3);

  // Page 8 (shades palette)
  const p8 = path.resolve(outDir, 'page-08.png');
  await cropRegion(p8, path.resolve(outDir, 'p8-shades.png'), 260, 70, 1660, 640, 2);
  // Row 1
  await cropRegion(p8, path.resolve(outDir, 'p8-r1c1.png'), 262, 70, 380, 165, 3);
  await cropRegion(p8, path.resolve(outDir, 'p8-r1c2.png'), 648, 70, 380, 165, 3);
  await cropRegion(p8, path.resolve(outDir, 'p8-r1c3.png'), 1032, 70, 380, 165, 3);
  await cropRegion(p8, path.resolve(outDir, 'p8-r1c4.png'), 1412, 70, 380, 165, 3);
  // Row 2
  await cropRegion(p8, path.resolve(outDir, 'p8-r2c1.png'), 262, 240, 380, 165, 3);
  await cropRegion(p8, path.resolve(outDir, 'p8-r2c2.png'), 648, 240, 380, 165, 3);
  await cropRegion(p8, path.resolve(outDir, 'p8-r2c3.png'), 1032, 240, 380, 165, 3);
  await cropRegion(p8, path.resolve(outDir, 'p8-r2c4.png'), 1412, 240, 380, 165, 3);
  // Row 3
  await cropRegion(p8, path.resolve(outDir, 'p8-r3c1.png'), 262, 410, 380, 165, 3);
  await cropRegion(p8, path.resolve(outDir, 'p8-r3c2.png'), 648, 410, 380, 165, 3);
  await cropRegion(p8, path.resolve(outDir, 'p8-r3c3.png'), 1032, 410, 380, 165, 3);
  await cropRegion(p8, path.resolve(outDir, 'p8-r3c4.png'), 1412, 410, 380, 165, 3);
}

main().catch(e => console.error(e));
