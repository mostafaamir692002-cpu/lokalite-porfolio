# 10× Improvement Plan — Mostafa Amir Portfolio

> **Execution target:** Fable 5 (Anthropic) agent. This document is a deterministic, step-by-step runbook designed for **0% error / 0% hallucination** execution. Every instruction is explicit. Do **not** improvise content, copy, colors, or data. When a step says "verify," actually run the verification before continuing.

---

## Context — Why this change

The portfolio currently ships as **two standalone HTML files** with everything (markup, CSS, JS) inlined:

- `mostafa-amir-portfolio.html` — 805 lines, ~48 KB. Cyberpunk/futuristic theme. Uses Three.js (WebGL background), GSAP + ScrollTrigger, Lenis smooth scroll.
- `mostafa-amir-os-portfolio.html` — 2597 lines, ~128 KB. iOS/macOS "operating system" theme. Bilingual (EN/AR), light + dark mode. Uses GSAP + ScrollTrigger, Lenis.
- `mostafa-amir.jpg` — 292 KB unoptimized profile image.

Three independent audits found the **visual design is strong** but engineering, accessibility, SEO and performance have real gaps:

- **Structure:** no build tooling, no module separation, duplicated JS utilities, two competing versions, dead `#` links.
- **SEO:** no Open Graph, no Twitter cards, no canonical, no favicon, no `robots.txt`, no `sitemap.xml`, no JSON-LD structured data.
- **Performance:** 292 KB JPG (no WebP/AVIF, no responsive sizes), render-blocking inline CSS/JS, no SRI / `defer` on CDN scripts, no `dns-prefetch`, Three.js (~1.3 MB) loaded eagerly with 6000 particles.
- **A11y/UX:** broken heading hierarchy (h2→h4), no `:focus-visible` styles, failing contrast on `--faint` text (≈2.1:1), no skip link, 200+ `!important`, excessive inline styles, no z-index/radius/shadow token scale.

**Goal:** improve structure, design polish, UX, accessibility, SEO and performance ~10× **while the visual theme, brand identity, copy/content, and data remain byte-for-byte unchanged in meaning.**

### Decisions already made by the user (do not re-ask)
1. **Scope = BOTH files.** Apply improvements to cyberpunk *and* OS variants consistently.
2. **Architecture = split into modular files** with a **Vite** build, asset pipeline, and image optimization.
3. **Deploy target = Netlify.** Use a Netlify URL as the canonical base. A Netlify MCP server is available in this session (`mcp__d9d34e5f-...__netlify-*`) and may be used to read/create the site and confirm the final URL.

---

## NON-NEGOTIABLE RULES (read before every phase)

These are hard constraints. Violating any one is a failed task.

- **R1 — Never change the theme or visual identity.** All colors, gradients, fonts, spacing, animations, easing curves, and layouts must render identically. Token extraction (Phase 3) must use the *exact existing hex/rgba values* — copy them, do not "improve" or round them.
- **R2 — Never change content or copy.** Every word of visible text (EN and AR), every project name (AURUM, NEURAL FLOW, VITALIS, MERIDIAN, FORM & SIGNAL), every heading, tagline, and the Arabic line "هدوء، دقة، وتفكير بالأنظمة" stays exactly as-is.
- **R3 — Never change data.** Email address, social handles, project lists, role titles, dates — unchanged. Fixing a `href="#"` dead link to a real anchor that *already exists in the page* is allowed; inventing a new destination URL is **not** (leave `#` or use `AskUserQuestion`).
- **R4 — Heading hierarchy fixes change the TAG, never the TEXT.** When fixing `<h4>`→`<h3>`, keep the text and restyle via CSS so it looks identical. Verify visually.
- **R5 — Behavior parity.** After refactor, every animation, hover, cursor effect, theme toggle, language switch, and modal must work exactly as before. The split is mechanical, not a rewrite.
- **R6 — No new dependencies beyond those listed in Phase 1.** Pin exact versions.
- **R7 — Work only on branch `claude/project-analysis-optimization-vu9q3p`.** Create it from the current default branch if missing. Commit in logical phases. Push with `git push -u origin claude/project-analysis-optimization-vu9q3p` (retry on network error: 2s/4s/8s/16s backoff, max 4). **Do not open a PR unless the user explicitly asks.**
- **R8 — Verify after every phase.** Run the verification block. If it fails, fix before moving on. Never report a step done that was not verified.

---

## Target architecture (after refactor)

```
Portfolio_Mostafa_Amir/
├── package.json                 # NEW — scripts + pinned deps
├── vite.config.js               # NEW — multi-page build
├── netlify.toml                 # NEW — build cmd, publish dir, headers
├── .gitignore                   # NEW/EDIT — node_modules, dist
├── scripts/
│   └── optimize-images.mjs      # NEW — sharp: webp/avif + resized variants
├── public/                      # copied as-is to dist root
│   ├── robots.txt               # NEW
│   ├── sitemap.xml              # NEW
│   ├── site.webmanifest         # NEW
│   ├── favicon.svg              # NEW (monogram "MA", uses brand colors)
│   └── og-image.jpg             # NEW (1200×630, generated from profile + name)
├── index.html                   # = OS variant (canonical home, "/")
├── cyberpunk.html               # = cyberpunk variant ("/cyberpunk")
├── src/
│   ├── styles/
│   │   ├── tokens.css           # NEW — shared design tokens (exact existing values)
│   │   ├── base.css             # NEW — reset, :focus-visible, skip-link, sr-only
│   │   ├── os.css               # extracted from os-portfolio <style>
│   │   └── cyberpunk.css        # extracted from portfolio <style>
│   ├── scripts/
│   │   ├── lib/
│   │   │   ├── dom.js           # NEW — shared $, $$ helpers
│   │   │   └── math.js          # NEW — shared lerp, clamp
│   │   ├── os.js                # extracted from os-portfolio <script>
│   │   └── cyberpunk.js         # extracted from portfolio <script>
│   └── assets/
│       └── mostafa-amir.jpg     # moved from repo root (source of truth)
└── (original two html files DELETED after their content is migrated)
```

- **Canonical mapping:** OS variant → `index.html` (served at `/`). Cyberpunk variant → `cyberpunk.html` (served at `/cyberpunk`). This is the only "which is primary" decision; it changes routing, not content.
- Vendor libs (Three.js, GSAP, ScrollTrigger, Lenis) stay as CDN `<script>` tags but get `defer` + SRI + `crossorigin` (see Phase 5). Do **not** bundle them through Vite unless a CDN-failure fallback is requested.

---

## Phase 0 — Setup & safety net

1. `git checkout -b claude/project-analysis-optimization-vu9q3p` (or `git checkout` it if it exists). Confirm with `git status` and `git branch --show-current`.
2. Confirm Node ≥ 18 is available: `node -v`. If absent, stop and report.
3. **Capture baseline screenshots for regression comparison.** Open each original HTML file and screenshot hero + each section at 1440px and 390px widths (desktop + mobile). Save to a scratch dir (not committed). These are the visual ground truth for R1/R5 verification.

**Verify:** branch is correct; baseline screenshots exist.

---

## Phase 1 — Tooling scaffold (build never alters output)

Create the build layer **first**, but initially point it at copies of the *unmodified* HTML so you can prove the build reproduces the current sites byte-equivalent before any extraction.

1. **`package.json`** — pin these exact versions:
   - devDependencies: `vite@^5.4.0`, `sharp@^0.33.0`, `glob@^11.0.0`.
   - scripts: `"dev": "vite"`, `"build": "node scripts/optimize-images.mjs && vite build"`, `"preview": "vite preview"`, `"optimize:img": "node scripts/optimize-images.mjs"`.
2. **`vite.config.js`** — multi-page input:
   ```js
   import { resolve } from 'path';
   import { defineConfig } from 'vite';
   export default defineConfig({
     root: '.',
     build: {
       rollupOptions: {
         input: {
           main: resolve(__dirname, 'index.html'),
           cyberpunk: resolve(__dirname, 'cyberpunk.html'),
         },
       },
       outDir: 'dist',
       emptyOutDir: true,
     },
   });
   ```
3. **`netlify.toml`**:
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"
   [[headers]]
     for = "/assets/*"
     [headers.values]
       Cache-Control = "public, max-age=31536000, immutable"
   [[headers]]
     for = "/*.html"
     [headers.values]
       X-Content-Type-Options = "nosniff"
       Referrer-Policy = "strict-origin-when-cross-origin"
   ```
4. **`.gitignore`** — add `node_modules/`, `dist/`, `.DS_Store`.
5. Run `npm install`. Verify it completes and `node_modules` exists.

**Verify:** `npm install` succeeds; `npx vite --version` prints a 5.x version.

---

## Phase 2 — Mechanical refactor: split CSS & JS out (R1/R2/R5 critical)

Do this **one file at a time**, starting with the smaller cyberpunk file to de-risk. The operation is pure extraction — cut blocks, paste into new files, link them back. **No edits to CSS rules, selectors, or JS logic in this phase.**

### 2a. Cyberpunk file
1. Rename/copy `mostafa-amir-portfolio.html` → `cyberpunk.html`.
2. Cut the entire content **between** `<style>` and `</style>` → paste into `src/styles/cyberpunk.css`. Replace the inline block with `<link rel="stylesheet" href="/src/styles/cyberpunk.css">`.
3. Cut the entire inline `<script>` body (the ~337-line block, **not** the CDN `<script src=...>` tags) → paste into `src/scripts/cyberpunk.js`. Replace with `<script type="module" src="/src/scripts/cyberpunk.js"></script>` placed where the inline script was.
4. The shared utilities `$`, `$$`, `lerp`, `clamp` exist inline. Move them to `src/scripts/lib/dom.js` (`$`, `$$`) and `src/scripts/lib/math.js` (`lerp`, `clamp`) as named exports, and `import` them at the top of `cyberpunk.js`. Keep implementations identical.
5. Three.js/GSAP/Lenis are loaded as globals via CDN — in `cyberpunk.js` reference them as `window.THREE`, `window.gsap`, etc. (they already are). Ensure module load order: CDN tags first (with `defer`), module script after.

### 2b. OS file
Repeat 2a for `mostafa-amir-os-portfolio.html` → `index.html`, `src/styles/os.css`, `src/scripts/os.js`. Reuse the same `lib/dom.js` and `lib/math.js`.

### 2c. Cleanup
- Move `mostafa-amir.jpg` → `src/assets/mostafa-amir.jpg`. Update every reference (img `src`, CSS `url()`, JS) to the new path. Search for `mostafa-amir.jpg` across the repo to catch all usages.
- Delete the two original files only after the new pages render identically.

**Verify (R1/R5 — do not skip):**
- `npm run dev`, open both pages. Compare against Phase 0 baseline screenshots at 1440px and 390px. **Pixel-level parity required** for hero + every section.
- Exercise interactions: custom cursor, magnetic hover, scroll reveals, role rotator, terminal typing, WebGL background (cyberpunk), theme toggle + language switch + modals (OS).
- Open DevTools console — **zero new errors**.
- `npm run build` succeeds; `npm run preview` renders both pages identically.

---

## Phase 3 — Design tokens, accessibility & UX polish (theme-preserving)

Now make surgical improvements. Every value below is either a copy of an existing value or an additive enhancement that does not alter the look.

### 3a. `src/styles/tokens.css` (shared)
Extract the **existing** `:root` custom properties from both stylesheets into one shared token file, then `@import` it (or link it before the page CSS). Add **new** tokens for things currently hardcoded — using values already present in the code, just named:
- `--radius-sm/md/lg` ← the existing 14px / 22px / 26px.
- `--z-base/raised/nav/cursor/loader` ← map the existing chaotic values (0,1,2,5,55,6000,7000,8000,9000,9999) onto a named scale; replace usages. **Keep stacking order identical.**
- `--shadow-1/2/3` ← existing box-shadow recipes.
- **Contrast fix (R-compliant):** add `--text-tertiary` as a *new* token (≈`#706A8E`, ≥4.5:1 on `--bg`) and use it ONLY where the current `--faint` (#46446a, 2.1:1) is applied to **real informational text** (philosophy lines, card numbers). Leave `--faint` as-is for purely decorative elements. This improves legibility without changing the palette identity.

### 3b. `src/styles/base.css` (shared, new — additive only)
- CSS reset/normalize (box-sizing, margin reset) that does not visibly change current layout (verify).
- `:focus-visible { outline: 2px solid var(--cyan); outline-offset: 4px; }` — keyboard focus ring (currently missing). Ensure custom cursor does not suppress it.
- `.skip-link` (visually hidden until focused) → add `<a class="skip-link" href="#main">Skip to content</a>` as first child of `<body>` on both pages; ensure `<main>` has `id="main"`.
- `.sr-only` utility for any icon-only controls lacking labels.
- `@media (prefers-reduced-motion: reduce)` — confirm the existing rule still covers the externalized JS animations; gate GSAP timelines behind a `prefers-reduced-motion` check in JS.

### 3c. Heading hierarchy (R4)
Fix the h2→h4 skips in `cyberpunk.html` (lines ~295–439 region) so the document outline is h1→h2→h3 with no skipped levels. **Change tags only**, add CSS classes to preserve exact sizing/weight. Do the same audit on `index.html`. Verify visually that nothing moved.

### 3d. Inline-style extraction (OS variant)
The OS page has 30+ inline `style=""` attributes and 200+ `!important`. Move inline styles into `os.css` classes (mechanical; identical computed styles). Reduce `!important` only where it can be removed without changing the rendered result (verify each). If unsure, leave it. This is hygiene, not redesign.

### 3e. Forms/contact a11y
- Email CTA: ensure it is an `<a href="mailto:...">` with an accessible name. If there is an actual input/form, wrap in `<form>` with a `<label>` (visually hidden ok) and add `aria-live` feedback region. **Do not invent a backend** — keep existing behavior; only add labels/roles.

**Verify:**
- Re-compare against baseline screenshots — **no visual change** except sharper focus rings and slightly lighter tertiary text.
- Keyboard-only pass: Tab from top → skip link appears → all interactive elements reachable with visible focus.
- Run Lighthouse Accessibility (or axe) on both pages → target **≥ 95**. Confirm heading-order and contrast audits pass.

---

## Phase 4 — SEO

Add to **both** `<head>`s. Reuse existing `<title>`/`<description>` (already present — do not rewrite copy).

1. **Canonical + lang:** `<link rel="canonical" href="https://<NETLIFY_URL>/">` (and `/cyberpunk` on the other). `<html lang="en">` already set; for the OS page's Arabic blocks add `lang="ar" dir="rtl"` on those specific elements only.
2. **Open Graph:** `og:type=website`, `og:title`, `og:description` (reuse meta description text), `og:url`, `og:image` (→ `/og-image.jpg`, 1200×630), `og:image:width/height`, `og:site_name="Mostafa Amir"`.
3. **Twitter:** `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image`.
4. **Icons/manifest:** `<link rel="icon" href="/favicon.svg">`, `apple-touch-icon`, `<link rel="manifest" href="/site.webmanifest">`. The favicon must be a brand-colored "MA" monogram (uses existing palette — no new identity).
5. **JSON-LD** `Person` schema in a `<script type="application/ld+json">`: name "Mostafa Amir", jobTitle from existing role text (AI Systems Architect / Brand Builder / Creative Technologist), `sameAs` = the social URLs already in the page, `image` = og image, `url` = canonical. **Only use data already present in the files.**
6. **`public/robots.txt`** allowing all + `Sitemap:` line. **`public/sitemap.xml`** listing `/` and `/cyberpunk` with the Netlify base URL.
7. Confirm the Netlify URL via the Netlify MCP reader tool; if no site exists yet, use placeholder `https://mostafa-amir.netlify.app` and add a clearly-marked `<!-- TODO: replace base URL -->` note + list every file/line to swap.

**Verify:** view-source shows all tags; validate JSON-LD (no syntax errors); `sitemap.xml` is well-formed XML; Lighthouse **SEO ≥ 95** on both pages.

---

## Phase 5 — Performance

1. **Image pipeline (`scripts/optimize-images.mjs`):** use `sharp` to generate from `src/assets/mostafa-amir.jpg`: AVIF + WebP + JPEG fallback at widths 400/800/1200. Output to `src/assets/generated/` (or let Vite hash them). Replace `<img>` usages with `<picture>` (AVIF→WebP→JPG `srcset` + `sizes`) and add `loading="lazy"` + `decoding="async"` + explicit `width`/`height` to prevent CLS. Where the image is a CSS `background`, use `image-set()` with WebP/AVIF + fallback. **Target: 292 KB → < 60 KB delivered.**
2. **Generate `og-image.jpg`** (1200×630) via the same script (profile + name on brand background) — optimized JPEG/WebP.
3. **CDN scripts:** add `defer` to all vendor `<script src>` tags; add `crossorigin="anonymous"` + **SRI `integrity`** hashes (compute the real hashes for the pinned versions — do not fabricate; fetch and hash, or omit SRI with a note if offline). Add `<link rel="dns-prefetch">` + `<link rel="preconnect">` for `cdnjs.cloudflare.com` and `unpkg.com`.
4. **Three.js cost (cyberpunk):** keep visual identical but (a) lazy-init the WebGL scene after first paint / on `requestIdleCallback`, (b) reduce particle count on mobile/low-DPR and when `prefers-reduced-motion`, (c) cap DPR at 2. Desktop appearance unchanged.
5. **Fonts:** keep families/weights (identity), but verify `&display=swap` is present on both Google Fonts links (cyberpunk already has it; confirm OS link). Add `rel="preload"` for the single most-used weight if it measurably helps.
6. **CSS/JS:** Vite already minifies + hashes for cache-busting; ensure `assets/*` immutable caching via `netlify.toml` (Phase 1).

**Verify:**
- `npm run build` then Lighthouse (mobile preset) on `npm run preview` for both pages → **Performance ≥ 90**, CLS < 0.1, no render-blocking warnings for deferred scripts.
- Network panel: profile image transfers < 60 KB; correct AVIF/WebP served.
- Visual parity re-check vs. baseline (R1).

---

## Phase 6 — Docs, commit, push

1. Add a concise `README.md`: what the two pages are, dev/build/preview commands, image-optimize command, deploy notes (Netlify), and the canonical-URL TODO if a placeholder was used.
2. Commit per phase (suggested messages):
   - `chore: add Vite build, Netlify config, and tooling scaffold`
   - `refactor: extract inline CSS/JS into modular files (no behavior change)`
   - `feat(a11y): design tokens, focus-visible, skip link, heading hierarchy, contrast`
   - `feat(seo): Open Graph, Twitter, canonical, JSON-LD, favicon, robots, sitemap`
   - `perf: responsive AVIF/WebP images, deferred+SRI CDN scripts, lazy WebGL`
   - `docs: add README`
3. `git push -u origin claude/project-analysis-optimization-vu9q3p` (backoff retry on network errors). **No PR unless the user asks.**

---

## Final acceptance checklist (gate before declaring done)

- [ ] Both pages render pixel-identical to Phase 0 baselines at 1440px and 390px (R1).
- [ ] All copy/data unchanged, EN + AR (R2/R3). `git diff` shows no text content edits, only structural/markup/asset changes.
- [ ] All interactions work: cursor, magnetics, reveals, role rotator, terminal, WebGL, theme toggle, language switch, modals (R5).
- [ ] Lighthouse (mobile) on both pages: **Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.**
- [ ] Profile image delivered < 60 KB via `<picture>`/`image-set`; no CLS.
- [ ] Keyboard nav: skip link + visible focus everywhere.
- [ ] `npm run build` clean; `dist/` deploys on Netlify; canonical/OG/sitemap URLs resolve.
- [ ] Console: zero errors on both pages.

---

## Risk register (Fable 5: how to stay at 0% error)

| Risk | Guard |
|---|---|
| Extraction silently drops a rule/handler | Diff line counts; re-test every interaction against baseline (Phase 2 verify). |
| Token renaming reorders stacking/contrast | Map old→new 1:1; visual diff after each substitution. |
| Heading tag change resizes text | Move sizing into a class; screenshot compare (R4). |
| Inventing a URL for a dead `#` link | Forbidden (R3) — leave `#` or `AskUserQuestion`. |
| Fabricated SRI hash | Compute from the real CDN file; if unreachable, omit SRI + leave a TODO note. Never invent a hash. |
| Wrong canonical/OG base URL | Read it from Netlify MCP; else placeholder + explicit TODO list of files/lines. |
| AR text losing RTL/shaping after refactor | Keep `lang="ar" dir="rtl"` + Noto Sans Arabic; visually verify the AR line renders identically. |
| "Improving" a color/word | Forbidden (R1/R2). Copy exact values; content is frozen. |

---

## Source audit (reference for the executing agent)

### Current design identity — PRESERVE EXACTLY

**Cyberpunk (`mostafa-amir-portfolio.html`) `:root`:**
- `--bg:#050409`, `--bg-2:#0a0814`
- `--ink:#ECECF7`, `--muted:#8786A6`, `--faint:#46446a`
- `--purple:#7C3AED`, `--violet:#A855F7`, `--magenta:#E11D8F`, `--blue:#3B82F6`, `--cyan:#22D3EE`
- `--line:rgba(255,255,255,0.09)`, `--glass:rgba(255,255,255,0.035)`
- Fonts: `--display:'Space Grotesk'`, `--body:'Inter'`, `--mono:'JetBrains Mono'`
- Easing: `--ease:cubic-bezier(0.16,1,0.3,1)`

**OS (`mostafa-amir-os-portfolio.html`) `:root`:**
- Voids `--void-0:#060608`, `--void-1:#0a0a0e`, `--void-2:#0e0e14`
- Glass `--glass-1:#15151b`, `--glass-2:#1c1d25`, `--glass-3:#23242e`
- iOS accents `--blue:#0A84FF`, `--blue-soft:#5AA9FF`, `--green:#30D158`, `--cyan:#64D2FF`, `--purple:#BF5AF2`, `--orange:#FF9F0A`, `--pink:#FF6482`
- Light mode override block exists (lines ~54–281) — preserve both modes.
- Fonts: Archivo (display), Inter (body), JetBrains Mono (mono), Noto Sans Arabic (AR).
- `theme-color` meta = `#070709`.

### Sections (both variants share this content)
Hero → Identity → Work (5 projects) → Lab → Systems (SVG map) → Philosophy → Contact → Footer.

### Known issues mapped to phases
- Contrast fail on `--faint` text → Phase 3a.
- Missing `:focus-visible`, skip link → Phase 3b.
- Heading h2→h4 skips (cyberpunk ~lines 295–439) → Phase 3c.
- 30+ inline styles / 200+ `!important` (OS) → Phase 3d.
- No OG/Twitter/canonical/favicon/JSON-LD/robots/sitemap → Phase 4.
- 292 KB JPG, no responsive formats, render-blocking inline CSS/JS, no defer/SRI/dns-prefetch, eager Three.js (6000 particles) → Phase 5.
