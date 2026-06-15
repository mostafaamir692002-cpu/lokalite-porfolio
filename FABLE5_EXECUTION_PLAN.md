# Fable 5 Execution Plan — Mostafa.OS Portfolio V2 (×10 Upgrade)

> **Execution target:** Fable 5 (Anthropic). This is a deterministic, file:line-grounded runbook engineered for **0% error / 0% hallucination**. Every instruction is explicit and verified against the real codebase. Do **not** invent values, copy, colors, or data. Where a step says "verify," run the verification before continuing.

---

## Context — why this plan exists

`Mostafa.OS — Portfolio V2 · "Glass OS in Space"` is a **static, no-build, `file://`-compatible** site: vanilla JS organized as namespaced scripts (`window.MOS`), plain CSS, Three.js + GSAP + Lenis from CDNs. It merges an iOS glass UI with a WebGL space background. Bilingual EN/AR, dark/light/wireframe themes.

Total: **710 HTML + 2,114 CSS (13 files) + 2,144 JS (14 files) ≈ 4,968 lines.** Very lean and well-architected.

**Already completed in the current session (do NOT redo):**
- ✅ Repo consolidated to `Portfolio_Mostafa_Amir` / `main`; duplicate `start_server.command` + 2 unused preview images removed.
- ✅ SEO: fixed broken favicon (`assets/favicon.svg`), absolute OG/Twitter, canonical, JSON-LD Person, `site.webmanifest`, `robots.txt`, `sitemap.xml`.
- ✅ Images: previews → WebP via `<picture>` (carousel + modal), JPEGs re-encoded; assets 1.2 MB → 544 KB. Script: `scripts/optimize-images.mjs` (`npm run optimize:img`).
- ✅ A11y: skip link, heading hierarchy fixed (h1→h2→h3, no h4 skips), `:focus-visible` confirmed.
- ✅ `netlify.toml` with caching + security headers.

**This plan covers what remains to reach a genuine ×10**, grounded in two fresh audits (design/UX + performance/architecture).

### Verified strengths — DO NOT "fix" these
Performance guards in `js/space/scene.js` and `js/core/utils.js` are **real and correct** (audited line-by-line): DPR cap 1.5 mobile / 2 desktop (`scene.js:35`), particle budget 2200/3600/5200 by device (`scene.js:81`), render loop pauses on hidden tab (`scene.js:167–174`), reduced-motion renders one static frame (`scene.js:216–217`), light/wireframe sleep the GPU (`base.css:25–26`). Event listeners are passive/RAF-debounced; `setInterval`s are cleared. Leave all of this intact.

---

## NON-NEGOTIABLE RULES (read before every phase)

- **R1 — Never change theme/visual identity.** Colors, gradients, fonts, spacing, radii, animations, easing must render identically. Token extraction copies the *exact existing values* — never re-pick a color.
- **R2 — Never change content/copy.** Every EN + AR string, project name, metric, and the bilingual project data in `js/data/projects.js` / `js/data/modes.js` stays byte-identical.
- **R3 — Never change data.** Email, socials (`wa.me/201118630150`, `instagram.com/mosstafa_amir/`, `linkedin.com/in/mostafa-amir-767772346/`), project list, URLs — unchanged.
- **R4 — Preserve the `file://` dev experience.** Source files must still open by double-clicking `index.html` with no server. Any build step is **additive and optional** (produces `dist/` for production only); it must never become required for local viewing.
- **R5 — Behavior parity.** Boot sequence, WebGL scene, dock, control center, carousel drag/tilt, modals, theme toggle, language switch must work exactly as before.
- **R6 — Verify after every phase** (serve + smoke test + visual compare). Never report a step done that wasn't verified.
- **R7 — Work on branch `claude/project-analysis-optimization-vu9q3p`** (or a fresh feature branch); push with `git push -u origin <branch>` (retry on network error 2s/4s/8s/16s). **No PR unless the user asks.** Deploy only when the user authorizes.
- **R8 — Pin exact dependency versions.** Add only the dev tools listed in Phase 1.

---

## Architecture decision — two tracks

The single biggest remaining win is **bundling + minification**: production loads **27 separate unminified files** (13 CSS + 14 JS). Fixing this requires a build step, which tensions with the no-build philosophy (R4). Resolution:

- **Recommended = Track B (additive build):** keep all source files exactly as-is (still `file://`-openable for dev), and add an **optional esbuild + lightningcss pipeline** that emits minified, hashed bundles to `dist/` for the Netlify production deploy. Source stays the source of truth; `dist/` is generated. This unlocks the full ×10 without sacrificing R4.
- **Fallback = Track A (no build):** if the user rejects any build tooling, skip Phase 1 + the bundling parts of Phase 2; apply Phases 3–6 only (WebGL throttle, deferred anims, lazy fonts, token cleanup, a11y). Realistic gain ≈ ×3–4.

**Default to Track B unless the user says otherwise.**

---

## Phase 0 — Setup & baseline

1. Confirm branch (R7); `node -v` ≥ 18.
2. Capture **baseline** for regression: `python3 -m http.server 8080`, screenshot hero + every section at 1440px and 390px, dark + light + Arabic. Save to a scratch dir (not committed). These are the R1/R5 ground truth.
3. Record baseline metrics: run Lighthouse (mobile) on the served site for Performance / Accessibility / Best-Practices / SEO. Note request count (should be ~27 + CDN + fonts).

**Verify:** baseline screenshots + Lighthouse scores recorded.

---

## Phase 1 — Additive build pipeline (Track B) → `dist/`

Goal: minified, bundled, cache-busted output for production; source untouched.

1. **`package.json`** — add devDeps (pin): `esbuild@^0.24.0`, `lightningcss-cli@^1.27.0`, `glob@^11.0.0`. Add scripts:
   - `"build": "node scripts/build.mjs"`
   - keep existing `"optimize:img"`.
2. **`scripts/build.mjs`** (new):
   - Clean `dist/`. Copy static passthrough: `assets/`, `robots.txt`, `sitemap.xml`, `site.webmanifest`, `netlify.toml`, `archive/`.
   - **JS:** bundle the 14 app scripts **in the existing load order** (see `index.html` bottom: `utils → projects → modes(data) → scene → scroll → reveals → widgets → heroIntro → modal → carousel → modes(os) → controlCenter → interactions → lang → theme → boot → main`) into `dist/js/app.[hash].js`, `--minify --target=es2018`. They are namespaced (not ES modules) — concatenate via esbuild `--bundle` only if you first wrap them as a virtual entry that imports nothing; simplest correct approach: esbuild with `stdin` concatenation OR list them as `inject`. **Safest:** concatenate file contents in order, then `esbuild --minify` the single string. This preserves the global `window.MOS` pattern exactly.
   - **CSS:** concatenate the 13 CSS in `index.html` order into one string, minify with `lightningcss --minify --targets ">= 0.25%"` → `dist/css/app.[hash].css`.
   - **HTML:** read `index.html`, replace the 13 `<link rel=stylesheet>` with one hashed `<link>`, replace the 14 `<script>` app tags with one hashed `<script defer>`, keep the 4 CDN tags. Write `dist/index.html`.
3. **`netlify.toml`** — change `publish = "."` → `publish = "dist"`, `command = "npm run build"`. Keep header rules but update globs to the hashed paths (or keep `/assets/*`, `/css/*`, `/js/*` — hashed files live under those). Because filenames are now hashed, **bump css/js `Cache-Control` to `max-age=31536000, immutable`**.
4. **`.gitignore`** — add `dist/`.

**Verify:** `npm run build` produces `dist/`; `npx http-server dist` (or `python3 -m http.server` in `dist`) renders **pixel-identical** to baseline; console clean; request count drops from ~27 to ~3 (1 CSS + 1 JS + CDN). Also confirm root `index.html` still opens via `file://` unchanged (R4).

---

## Phase 2 — Loading optimizations

Apply to source `index.html` (and they flow into `dist/` via build).

1. **SRI on CDN scripts** (`index.html` CDN `<script>` tags): add real `integrity="sha384-…"` + `crossorigin="anonymous"`. **Compute hashes from the actual pinned CDN files** (`curl … | openssl dgst -sha384 -binary | openssl base64 -A`). If a URL is unreachable in the sandbox, omit SRI for that one and leave a `<!-- TODO SRI -->` note — **never fabricate a hash.**
2. **Font preload** (`index.html` `<head>`): preload the two most-used weights (Archivo 900, Inter 400) via `<link rel="preload" as="font" type="font/woff2" crossorigin>` using the exact Google Fonts file URLs. Keep `&display=swap`.
3. **Lazy Arabic font:** Noto Sans Arabic (~80 KB) only matters when AR is active. Move it out of the main Google Fonts `<link>` into a separate stylesheet injected by `js/os/lang.js` on first switch to Arabic (and on load if persisted lang == "ar"). Pattern: create `<link rel="stylesheet" href="…Noto+Sans+Arabic…">` once, guarded by a flag. Default EN load drops ~80 KB.
4. **Critical CSS (Track B only):** inline `tokens.css + base.css + materials.css + boot.css` (the above-the-fold/boot-critical layer) into a `<style>` in `dist/index.html` `<head>`, and load the rest as the hashed bundle. Done in `build.mjs`. Verify no FOUC.

**Verify:** view-source shows SRI/preload; AR font loads only after switching to Arabic (Network panel); Lighthouse "render-blocking" warning reduced.

---

## Phase 3 — WebGL frame budget (biggest runtime/battery win)

In `js/space/scene.js` — **keep visuals identical**, reduce wasted frames.

1. **Frame-rate cap in the render loop** (`loop()` around `scene.js:207–214`): clamp to 60 fps on desktop, 30 fps on mobile (`MOS.MOBILE`). Use an accumulator (`if (now - last >= frameTime) { render(); last = now; }`) inside the existing RAF — do **not** add a second RAF. Desktop appearance unchanged; mobile GPU/battery drops sharply.
2. **Scroll LOD (optional, conservative):** during active Lenis scroll, lower the particle `uSize`/opacity slightly or skip every other frame; restore on scroll idle. Only if it remains visually imperceptible vs. baseline — otherwise skip.
3. **Carousel rect caching** (`js/os/carousel.js:192–201`): the per-card `getBoundingClientRect()` runs on every `mousemove`. Cache the rect on `mouseenter`, invalidate on `scroll`/`resize`. Behavior identical, fewer layout reads.

**Verify:** scene looks identical (compare to baseline video/screens); DevTools Performance shows ~30 fps on a mobile-emulated profile; no jank on carousel tilt.

---

## Phase 4 — Defer non-critical interactions

Improve TTI without changing behavior.

1. In `js/main.js` boot order: gate non-essential enhancers (parallax/specular in `js/os/interactions.js`, magnetic effects) behind `requestIdleCallback` (fallback `setTimeout(…,1)`), so the boot/hero paint isn't contended. Keep ordering deterministic; do not defer anything the boot timeline depends on (`boot.js`, `scene.js` init, `scroll.js`).

**Verify:** boot sequence + hero entrance unchanged; first interaction available sooner (Lighthouse TBT/TTI improved); console clean.

---

## Phase 5 — Design-token hygiene (no visual change)

Replace hardcoded values with **existing** tokens from `css/tokens.css` (copy exact values; if a token doesn't exist, add one using the *current* literal value, then reference it). All 1:1, verify visually.

- `css/modal.css:74` `.modal-btn.primary` gradient `#1c8cff,#0a6fe0` → `var(--blue)` / a new `--blue-deep:#0a6fe0` token. Fixes light-mode clash.
- `css/materials.css:25` `.metal` `#262833,#191a22,#101117` → new `--metal-1/2/3` tokens.
- `css/hero.css:103` monogram conic-gradient → `--gradient-monogram` token.
- `css/sections.css:63–68` `.wc-1..6::before` hardcoded `#0c0d12` → `var(--void-2)`.
- **Dedupe `.dock-cta`:** defined twice (`css/chrome.css:58–67` and `css/sections.css:136`) with slightly different gradients. Keep one canonical definition; remove the duplicate. Verify the dock CTA looks identical after.

**Verify:** screenshot-diff dark + light — **zero** visual change.

---

## Phase 6 — Accessibility to full WCAG AA

All additive; preserve visuals/behavior.

1. **Modal focus management** (`js/os/modal.js`): on open (after `is-active` added ~line 121) move focus to the first focusable in the modal and **trap Tab** within it; restore focus to the trigger on close. Esc-close already exists (~line 210). Add `inert` (or `aria-hidden`) to `.shell` while a modal is open so background isn't reachable.
2. **Carousel keyboard nav** (`js/os/carousel.js`): the prev/next buttons exist with `aria-label`; add Left/Right arrow-key handling (when carousel region focused) calling the existing `go()`/nav functions.
3. **Body-text contrast:** `--ink-2` (#8b909e on dark glass ≈ 4.1:1) is borderline for small text. Switch *body* text on glass to `--ink-1`; reserve `--ink-2` for genuinely secondary helper text. Affected: `.mode` inactive label (`sections.css:12`), `.wc-meta span` (`sections.css:74`), `.profile-meta .row` (`hero.css:61`). Verify ratios ≥ 4.5:1; **do not change the token hex values themselves** (R1) — only which token the body text uses.
4. **RTL correctness** (`js/os/lang.js`, after the `lang` attr set ~line 9): also set `document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr")`. CSS already handles direction; this makes the semantics explicit.
5. **Language-change announcement:** add an `aria-live="polite"` visually-hidden `.sr-only` region; on switch, set its text (EN: "Language changed to Arabic", etc.).
6. **Responsive gaps** (`css/responsive.css`): add a `@media (max-width:450px)` step (hero title size / dock padding) to cover the 381–479px range; optionally add a `@media (min-width:1440px)` note confirming the intentional 1180px `.shell` max-width (no layout break on 4K).
7. **Star rating label** (`index.html` ~431/444/457): change `aria-label="5 stars"` → `aria-label="5 out of 5 stars"`.

**Verify:** keyboard-only pass (Tab into modal → trapped → Esc restores focus; arrows move carousel); axe/Lighthouse Accessibility ≥ 95; AR toggle sets `dir="rtl"` and announces; screenshots unchanged.

---

## Phase 7 — Verify end-to-end & deploy

1. `npm run build` → serve `dist/` → full regression vs. Phase 0 baseline (dark/light/AR, 1440 + 390).
2. Lighthouse (mobile) on `dist/`: target **Performance ≥ 90, Accessibility ≥ 95, Best-Practices ≥ 95, SEO ≥ 95**; request count ≈ 3 + CDN + fonts.
3. Commit per phase (suggested): `build:`, `perf(loading):`, `perf(webgl):`, `perf(tti):`, `refactor(tokens):`, `a11y:`. Push to the branch.
4. **Deploy** only on user authorization: Netlify site `portfolio-mostafa-amir` (siteId `eaed6044-7fc6-4c73-a1cd-6a1635d45d1d`), publish `dist/`. Prefer connecting the GitHub repo for continuous deploy (`main` → build → `dist`). The manual MCP `deploy-site` requires the user to approve the tool permission.

---

## Acceptance checklist (gate before "done")

- [ ] Source still opens via `file://` (double-click `index.html`) unchanged (R4).
- [ ] `dist/` renders pixel-identical to baseline in dark/light/AR at 1440 + 390 (R1/R5).
- [ ] All copy/data identical — `git diff` shows only structural/markup/perf/a11y changes, no text edits (R2/R3).
- [ ] Boot, WebGL, dock, control center, carousel (drag+tilt), modals, theme, language all work.
- [ ] Lighthouse mobile: Perf ≥ 90, A11y ≥ 95, BP ≥ 95, SEO ≥ 95; requests ≈ 3 + CDN + fonts.
- [ ] Modal traps focus; carousel keyboard-navigable; AR sets `dir="rtl"` + announces.
- [ ] Console: zero errors; no SRI/render-block warnings for handled resources.

---

## Risk register (how Fable 5 stays at 0% error)

| Risk | Guard |
|---|---|
| Bundling reorders scripts → `MOS` undefined | Concatenate in the **exact** `index.html` order; smoke-test boot after build. |
| Build becomes required for dev | `dist/` is additive; source `file://` path must still work — verify every phase (R4). |
| Minifier breaks ES5-ish namespaced code | `--target=es2018`, no module transform; diff runtime behavior vs. baseline. |
| Token swap shifts a color | Copy exact literals into tokens; screenshot-diff dark+light (Phase 5). |
| Fabricated SRI hash | Compute from the real CDN file; if unreachable, omit + TODO. Never invent. |
| WebGL throttle changes look | Desktop stays 60 fps; compare scene to baseline; back out LOD if perceptible. |
| Focus trap breaks existing Esc/close | Keep existing handlers; add trap on top; keyboard-test open→trap→Esc→restore. |
| Changing `--ink-2` hex globally | Forbidden — only switch *which token* body text references (R1). |
| Editing AR/EN strings while touching lang.js | Only add `dir`/aria-live; never touch copy (R2). |

---

## Source map — key files & audited findings

- `index.html` — head SEO (done), CSS links (13, lines ~65–77), script tags (14 app + 4 CDN, lines ~684–707), star labels (~431/444/457).
- `js/main.js` (44) — boot orchestrator (defer point for Phase 4).
- `js/core/utils.js` (59) — `MOS.REDUCE/FINE/MOBILE`, `hasTHREE/GSAP/Lenis` (env flags; reuse, don't duplicate).
- `js/space/scene.js` (226) — particle/DPR/pause/reduced-motion guards verified; add frame cap in `loop()` (~207–214).
- `js/os/carousel.js` (210) — `<picture>`/WebP done; rect cache (~192–201); add keyboard nav.
- `js/os/modal.js` (220) — Esc close (~210); add focus trap + `inert` (~121).
- `js/os/lang.js` — sets `lang` (~9); add `dir` + aria-live.
- `css/tokens.css` (84) — token source of truth (dark/light/wireframe).
- `css/modal.css:74`, `css/materials.css:25`, `css/hero.css:103`, `css/sections.css:63–68` — hardcoded → tokens.
- `css/chrome.css:58` vs `css/sections.css:136` — duplicate `.dock-cta`.
- `css/responsive.css` (142) — add 450px step; 1180px `.shell` max-width is intentional.
- `netlify.toml` — caching/headers (done); switch publish→`dist` for Track B.
