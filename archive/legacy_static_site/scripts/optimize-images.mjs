// Dev-only image optimizer. Run: npm run optimize:img
// - Project preview JPEGs: resize to 900px, re-encode (mozjpeg q80) + generate WebP.
// - Avatar (mostafa-amir.jpg): re-encode only (no resize) so OG image dims stay valid.
// Runtime is unaffected — the site still opens via file:// with no build.
import sharp from 'sharp';
import { readdir, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';

const DIR = 'assets';
const files = (await readdir(DIR)).filter((f) => /\.jpe?g$/i.test(f));

for (const f of files) {
  const src = path.join(DIR, f);
  const before = (await stat(src)).size;
  const isPreview = /_preview\.jpe?g$/i.test(f);

  const pipeline = sharp(src).rotate();
  if (isPreview) {
    pipeline.resize({ width: 900, height: 900, fit: 'inside', withoutEnlargement: true });
  }

  const jpgBuf = await pipeline.clone().jpeg({ quality: isPreview ? 80 : 82, progressive: true, mozjpeg: true }).toBuffer();
  await writeFile(src, jpgBuf);

  let webpNote = '';
  if (isPreview) {
    const webp = src.replace(/\.jpe?g$/i, '.webp');
    const webpBuf = await pipeline.clone().webp({ quality: 76 }).toBuffer();
    await writeFile(webp, webpBuf);
    webpNote = `  + ${path.basename(webp)} ${(webpBuf.length / 1024).toFixed(0)}KB`;
  }

  console.log(`${f}: ${(before / 1024).toFixed(0)}KB -> ${(jpgBuf.length / 1024).toFixed(0)}KB${webpNote}`);
}
