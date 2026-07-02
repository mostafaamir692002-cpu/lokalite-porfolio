/* ============================================================
   MOS — global namespace + shared utilities & state
   Loaded first. Every module hangs off window.MOS.
   ============================================================ */
(function () {
  "use strict";

  var MOS = window.MOS = window.MOS || {};

  /* environment */
  MOS.REDUCE = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  MOS.FINE = window.matchMedia && window.matchMedia("(pointer: fine)").matches;
  MOS.MOBILE = window.matchMedia && window.matchMedia("(max-width: 720px)").matches;
  MOS.hasGSAP = function () { return typeof window.gsap !== "undefined"; };
  MOS.hasLenis = function () { return typeof window.Lenis !== "undefined"; };
  MOS.hasTHREE = function () { return typeof window.THREE !== "undefined"; };

  /* shared mutable state */
  MOS.state = {
    isAIActive: true,     // Brand Systems toggle → parallax + specular + space drift
    isAutoActive: true,   // AI Automation toggle → telemetry console
    scrollProgress: 0,    // 0..1, set by core/scroll.js, read by space/scene.js
    lang: "en"
  };

  /* DOM helpers */
  MOS.$  = function (s, el) { return (el || document).querySelector(s); };
  MOS.$$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
  MOS.pad = function (n) { return (n < 10 ? "0" : "") + n; };
  MOS.lerp = function (a, b, t) { return a + (b - a) * t; };
  MOS.clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };

  /* character scramble (hero name decode effect) */
  MOS.scrambleText = function (el, finalText, dur) {
    if (!el) return;
    if (MOS.REDUCE) { el.textContent = finalText; return; }
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&";
    var total = Math.max(24, Math.round(dur / 16));
    var f = 0;
    (function tick() {
      f++;
      var prog = f / total;
      var revealed = Math.floor(prog * finalText.length);
      var out = "";
      for (var i = 0; i < finalText.length; i++) {
        if (i < revealed || finalText[i] === " ") out += finalText[i];
        else out += chars[Math.floor(Math.random() * chars.length)];
      }
      el.textContent = out;
      if (prog < 1) requestAnimationFrame(tick);
      else el.textContent = finalText;
    })();
  };

  /* module registry — main.js executes in declared order */
  MOS.modules = {};
  MOS.register = function (name, initFn) { MOS.modules[name] = initFn; };
})();
