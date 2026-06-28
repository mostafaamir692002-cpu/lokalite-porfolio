/* ============================================================
   THEME — dark/light switching. The space layer sleeps in
   light mode (GPU off, CSS aurora orbs take over).
   ============================================================ */
(function (MOS) {
  "use strict";

  function applyTheme(theme) {
    var light = theme === "light";
    document.body.classList.toggle("light-mode", light);
    try { localStorage.setItem("lokalita-os-theme", theme); } catch (e) {}
    /* sleep / wake the WebGL loop (canvas already fades via CSS) */
    var wireframe = document.body.classList.contains("mode-wireframe");
    MOS.space.setActive(!light && !wireframe);
  }

  function toggleTheme() {
    var isLight = document.body.classList.contains("light-mode");
    var nextTheme = isLight ? "dark" : "light";

    if (MOS.hasGSAP() && !MOS.REDUCE) {
      window.gsap.to(".shell", {
        opacity: 0, duration: 0.25, ease: "power2.out",
        onComplete: function () {
          applyTheme(nextTheme);
          window.gsap.to(".shell", { opacity: 1, duration: 0.35, ease: "power2.in" });
        }
      });
    } else {
      applyTheme(nextTheme);
    }
  }

  MOS.register("theme", function () {
    /* event delegation — one listener serves both toggles (status bar + dock) */
    document.addEventListener("click", function (e) {
      var btn = e.target.closest && e.target.closest(".theme-toggle");
      if (!btn) return;
      e.stopPropagation();
      toggleTheme();
    });
    document.addEventListener("keydown", function (e) {
      var btn = e.target.closest && e.target.closest(".theme-toggle");
      if (!btn) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleTheme();
      }
    });

    var savedTheme = "dark";
    try { savedTheme = localStorage.getItem("lokalita-os-theme") || "dark"; } catch (e) {}
    applyTheme(savedTheme);
  });
})(window.MOS = window.MOS || {});
