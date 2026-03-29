'use strict';
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

async function cropRegion(srcPath, outPath, x, y, w, h) {
  const img = await loadImage(srcPath);
  console.log('Image size:', img.width, 'x', img.height);
  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, x, y, w, h, 0, 0, w, h);
  fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
  console.log('Wrote', outPath);
}

const pagesDir = path.resolve(__dirname, 'pdf-pages');

async function main() {
  // First check dimensions
  const p7 = path.resolve(pagesDir, 'page-07.png');
  const img7 = await loadImage(p7);
  console.log('page-07 dimensions:', img7.width, 'x', img7.height);

  const p8 = path.resolve(pagesDir, 'page-08.png');
  const img8 = await loadImage(p8);
  console.log('page-08 dimensions:', img8.width, 'x', img8.height);

  // Crop the full right section of page 7 with all swatches
  // The swatches start around x=520 in a 1920-wide image
  await cropRegion(p7, path.resolve(pagesDir, 'p7-all-swatches.png'), 520, 130, 1380, 560);

  // Crop just the bottom half of page 7 where Sand/Dusk/Laterit labels appear
  await cropRegion(p7, path.resolve(pagesDir, 'p7-bottom.png'), 520, 390, 1380, 300);

  // Full shades page
  await cropRegion(p8, path.resolve(pagesDir, 'p8-full-shades.png'), 520, 130, 1380, 640);
}

main().catch(e => console.error(e));
