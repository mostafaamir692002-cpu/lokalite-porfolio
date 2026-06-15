// Additive production build for Mostafa.OS V2.
// Source stays file:// friendly; this emits a minified, bundled dist/ for Netlify.
// - All CSS (in <head> order) -> minified -> inlined into <style> (one less request, no render-block).
// - All app JS (in load order) -> concatenated (each file is a self-contained IIFE) -> minified -> dist/js/app.[hash].js.
// - CDN <script> tags + JSON-LD are preserved as-is.
import { readFile, writeFile, rm, mkdir, cp } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { transform as esbuildTransform } from 'esbuild';
import { transform as lcTransform } from 'lightningcss';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const hash = (buf) => createHash('sha256').update(buf).digest('hex').slice(0, 10);

const html = await readFile('index.html', 'utf8');

// 1) Collect ordered CSS hrefs and app JS srcs straight from index.html (robust to future edits).
const cssHrefs = [...html.matchAll(/<link rel="stylesheet" href="(css\/[^"]+)">/g)].map((m) => m[1]);
const jsSrcs = [...html.matchAll(/<script defer src="(js\/[^"]+)"><\/script>/g)].map((m) => m[1]);
if (!cssHrefs.length || !jsSrcs.length) throw new Error('build: could not find css/js tags in index.html');

// 2) Clean dist + copy static passthrough.
await rm(DIST, { recursive: true, force: true });
await mkdir(path.join(DIST, 'js'), { recursive: true });
for (const item of ['assets', 'archive', 'robots.txt', 'sitemap.xml', 'site.webmanifest']) {
  await cp(item, path.join(DIST, item), { recursive: true });
}

// 3) CSS: concat in order -> minify -> inline.
let cssRaw = '';
for (const href of cssHrefs) cssRaw += '\n' + (await readFile(href, 'utf8'));
const { code: cssBuf } = lcTransform({ filename: 'app.css', code: Buffer.from(cssRaw), minify: true });
const cssMin = cssBuf.toString();

// 4) JS: concat in order (files are independent IIFEs) -> minify -> hashed file.
let jsRaw = '';
for (const src of jsSrcs) jsRaw += '\n;\n' + (await readFile(src, 'utf8'));
const { code: jsMin } = await esbuildTransform(jsRaw, { minify: true, target: 'es2018', legalComments: 'none' });
const jsName = `js/app.${hash(jsMin)}.js`;
await writeFile(path.join(DIST, jsName), jsMin);

// 5) Rewrite HTML: replace first CSS link with inline <style>, drop the rest; drop app <script> tags,
//    inject the single hashed bundle before </body> (after the CDN libs, preserving execution order).
let first = true;
let out = html.replace(/[ \t]*<link rel="stylesheet" href="css\/[^"]+">\n?/g, () => {
  if (first) { first = false; return `<style>${cssMin}</style>\n`; }
  return '';
});
out = out.replace(/[ \t]*<script defer src="js\/[^"]+"><\/script>\n?/g, '');
out = out.replace('</body>', `<script defer src="${jsName}"></script>\n</body>`);

await writeFile(path.join(DIST, 'index.html'), out);

const kb = (n) => (n / 1024).toFixed(1) + 'KB';
console.log(`build OK -> dist/`);
console.log(`  CSS inlined: ${cssHrefs.length} files -> ${kb(cssMin.length)}`);
console.log(`  JS bundled:  ${jsSrcs.length} files -> ${kb(jsMin.length)} (${jsName})`);
console.log(`  requests: ~${cssHrefs.length + jsSrcs.length} app files -> 1 (JS) + inline CSS`);
