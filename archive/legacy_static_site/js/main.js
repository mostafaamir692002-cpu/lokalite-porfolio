/* ============================================================
   MAIN — boot order for Lokalita.OS V2.
   Each module registered itself via MOS.register();
   this file decides the sequence. Loaded last.
   ============================================================ */
(function (MOS) {
  "use strict";

  /* Critical path: structure, content, scroll, boot — must run before/at first paint. */
  var CRITICAL = [
    "space",          // WebGL world first — boot drives its convergence
    "scroll",         // Lenis + progress (space camera reads scrollProgress)
    "reveals",        // scroll-in system
    "widgets",        // clock / battery / weather
    "carousel",       // renders work cards from data (before lang sync)
    "modes",          // disciplines selector
    "modal",          // modal close bindings
    "controlCenter",  // toggles
    "menu",           // mobile burger (nav — keep responsive)
    "lang",           // restores saved language (after carousel render)
    "theme",          // restores saved theme (may sleep the space layer)
    "boot"            // last: starts the cinematic boot → heroIntro
  ];

  /* Non-critical enhancers: decorative/pointer-driven. Deferred to idle for faster TTI. */
  var DEFERRED = [
    "selMenu",        // hero name easter egg
    "interactions",   // parallax / specular / hero tilt
    "magnetic",       // magnetic button effect on CTAs
    "scrollDots",     // right-rail section indicator
    "cursor"          // custom cursor
  ];

  function runList(list) {
    list.forEach(function (name) {
      var init = MOS.modules[name];
      if (!init) return;
      try { init(); }
      catch (e) { console.warn("[MOS] module failed:", name, e); }
    });
  }

  function run() {
    runList(CRITICAL);
    var idle = window.requestIdleCallback || function (cb) { return setTimeout(cb, 1); };
    idle(function () { runList(DEFERRED); });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})(window.MOS = window.MOS || {});
