/* ============================================================
   REVEALS — scroll-in reveal system, progress-bar fills,
   number counters
   ============================================================ */
(function (MOS) {
  "use strict";

  /* exported: heroIntro also calls fillBars */
  MOS.fillBars = function (scope) {
    (scope || document).querySelectorAll("[data-bar]").forEach(function (b) {
      if (b.dataset._done) return;
      b.dataset._done = "1";
      var v = b.getAttribute("data-bar");
      requestAnimationFrame(function () { b.style.width = v + "%"; });
    });
  };

  MOS.register("reveals", function () {
    var reveals = MOS.$$("[data-reveal]");
    function revealAll() { reveals.forEach(function (el) { el.classList.add("in"); }); }

    function bindBars() {
      if ("IntersectionObserver" in window) {
        var io2 = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            if (en.isIntersecting) { MOS.fillBars(en.target); io2.unobserve(en.target); }
          });
        }, { threshold: 0.2 });
        MOS.$$(".w-stat").forEach(function (s) { io2.observe(s); });
      } else { MOS.fillBars(document); }
    }

    if (MOS.REDUCE) {
      revealAll();
      MOS.fillBars(document);
    } else if (MOS.hasGSAP() && window.ScrollTrigger) {
      window.ScrollTrigger.batch("[data-reveal]", {
        start: "top 86%",
        onEnter: function (els) { els.forEach(function (el) { el.classList.add("in"); }); }
      });
      bindBars();
    } else if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
        });
      }, { threshold: 0.14 });
      reveals.forEach(function (el) { io.observe(el); });
      bindBars();
    } else {
      revealAll();
    }
    /* safety: force-reveal if anything is still hidden */
    setTimeout(revealAll, 4600);

    /* counters */
    function animateCounter(el) {
      if (MOS.REDUCE || el.dataset._counted) return;
      el.dataset._counted = "1";
      var target = parseInt(el.getAttribute("data-count") || "0", 10);
      var suffix = el.getAttribute("data-suffix") || "";
      var duration = 1400;
      var start = null;
      (function tick(ts) {
        if (!start) start = ts;
        var prog = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - prog, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (prog < 1) requestAnimationFrame(tick);
      })(performance.now());
    }
    if ("IntersectionObserver" in window) {
      var counterObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.querySelectorAll("[data-count]").forEach(animateCounter);
            counterObs.unobserve(en.target);
          }
        });
      }, { threshold: 0.3 });
      MOS.$$(".w-stat").forEach(function (s) { counterObs.observe(s); });
    }
  });
})(window.MOS = window.MOS || {});
