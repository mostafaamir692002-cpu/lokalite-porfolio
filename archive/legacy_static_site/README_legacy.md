# Mostafa.OS — Portfolio V2 · "Glass OS in Space"

دمج النسختين: **iOS Glassy** (واجهة نظام التشغيل الزجاجية) + **Animation Space** (عالم WebGL السينمائي).
المبدأ المعماري: *الزجاج هو الواجهة، والفضاء هو العالم اللي الواجهة عايشة فيه.*

The glass OS is the interface; the WebGL nebula is the world it lives in.
Boot sequence = the hook: particles converge and the core forms while the system boots, then the glass UI rises.

---

## Run

يفتح مباشرة — افتح `index.html` بدبل كليك. لا يوجد build step.
(للتطوير المريح: `npx serve` أو أي static server.)

**ملحوظة:** الصورة الشخصية موجودة ومفعلة بالفعل في `assets/mostafa-amir.jpg`.

## Architecture

```
.
├── index.html              ← markup only (no styles, no logic, no project content)
├── assets/
│   └── mostafa-amir.jpg    ← Professional avatar image
├── css/                    ← load order = cascade order
│   ├── tokens.css          ← design tokens (dark + light + wireframe variables)
│   ├── base.css            ← reset, background stack, reveal system, cursor, progress
│   ├── materials.css       ← .glass / .metal / .chrome-text / switchers
│   ├── boot.css            ← cinematic boot overlay
│   ├── chrome.css          ← status bar, dock, mobile menu
│   ├── hero.css            ← OS dashboard window
│   ├── sections.css        ← disciplines, work, about, systems, contact, footer
│   ├── modal.css           ← OS modal + telemetry console + diagnostics
│   ├── theme-light.css     ← light mode component overrides
│   ├── wireframe.css       ← wireframe mode overrides
│   ├── rtl.css             ← bilingual visibility + RTL adjustments
│   └── responsive.css      ← all breakpoints
├── js/
│   ├── core/
│   │   ├── utils.js        ← MOS namespace, env flags, shared state, helpers
│   │   ├── scroll.js       ← Lenis, anchors, scroll progress (feeds space camera)
│   │   └── reveals.js      ← scroll reveals, bar fills, counters
│   ├── data/               ← ✏️ EDIT CONTENT HERE — nothing else needs to change
│   │   ├── projects.js     ← project cards + case modals (bilingual)
│   │   └── modes.js        ← disciplines copy + meters (bilingual)
│   ├── space/
│   │   └── scene.js        ← WebGL nebula + icosahedron (aurora palette)
│   └── os/
│       ├── boot.js         ← boot timeline → drives particle convergence
│       ├── heroIntro.js    ← entrance timeline + name scramble + sel-menu
│       ├── widgets.js      ← clock, battery, weather (cached)
│       ├── controlCenter.js← toggles wired to real behavior
│       ├── modal.js        ← project / diagnostics OS windows
│       ├── carousel.js     ← data-driven work cards + drag + tilt
│       ├── modes.js        ← disciplines selector
│       ├── interactions.js ← parallax, specular, cursor, mobile menu
│       ├── lang.js         ← EN/AR switching (persisted)
│       └── theme.js        ← dark/light (persisted; space sleeps in light)
│   └── main.js             ← module boot order (single orchestrator)
└── archive/                ← Legacy single-file draft versions
```

## System decisions

- **Palette:** iOS blue leads the UI; violet/cyan exist only in the space layer (aurora) —
  the Apple-glass identity stays intact.
- **Performance:** DPR capped (1.5 mobile / 2 desktop), particle budget per device,
  render loop pauses on hidden tab, light mode and wireframe mode sleep the GPU entirely,
  `prefers-reduced-motion` renders a single static frame.
- **Why namespaced scripts instead of ES modules:** ES modules are blocked on `file://`.
  This structure opens by double-click and still keeps one-file-one-responsibility.
  Migrating to Next.js later = move `js/data/*` to TS files and components 1:1.
- **Arabic register:** refined Egyptian colloquial (عامية بيضاء راقية) across all UI
  copy and project content — premium tone, not slang.
- **Photo:** A generated professional avatar is placed at `assets/mostafa-amir.jpg` and it appears automatically
  in the dock, avatar, hero monogram, and about section (MA monogram is the fallback).

