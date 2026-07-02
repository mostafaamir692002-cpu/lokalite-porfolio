/* ============================================================
   SCROLL — Lenis smooth scroll, anchor navigation,
   global scroll progress (top bar + space camera input)
   ============================================================ */
(function (MOS) {
  "use strict";

  MOS.register("scroll", function () {
    var lenis = null;

    if (MOS.hasLenis() && !MOS.REDUCE) {
      try {
        lenis = new window.Lenis({ duration: 1.15, smoothWheel: true, lerp: 0.1 });
        if (MOS.hasGSAP() && window.ScrollTrigger) {
          lenis.on("scroll", window.ScrollTrigger.update);
          window.gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
          window.gsap.ticker.lagSmoothing(0);
        } else {
          (function raf(time) { lenis.raf(time); requestAnimationFrame(raf); })(0);
        }
      } catch (e) { lenis = null; }
    }
    MOS.lenis = lenis;

    /* anchor smooth scroll */
    MOS.$$('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var id = a.getAttribute("href");
        if (id.length < 2) return;
        var el = document.querySelector(id);
        if (!el) return;
        e.preventDefault();
        if (lenis) { lenis.scrollTo(el, { offset: -80, duration: 1.2 }); }
        else { el.scrollIntoView({ behavior: MOS.REDUCE ? "auto" : "smooth", block: "start" }); }
      });
    });

    /* global scroll progress — feeds the progress bar AND the space camera */
    var prog = MOS.$("#scrollProgress");
    function updateProgress() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      MOS.state.scrollProgress = max > 0 ? MOS.clamp(window.scrollY / max, 0, 1) : 0;
      if (prog) prog.style.width = (MOS.state.scrollProgress * 100) + "%";
    }
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    /* dock scrollspy — highlight the section currently in view */
    if ("IntersectionObserver" in window) {
      var dockLinks = MOS.$$(".dock-links a");
      var byId = {};
      dockLinks.forEach(function (a) { byId[a.getAttribute("href")] = a; });
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          var link = byId["#" + en.target.id];
          dockLinks.forEach(function (a) { a.classList.toggle("active", a === link); });
        });
      }, { rootMargin: "-30% 0px -55% 0px" });
      ["modes", "work", "about", "systems", "contact", "top"].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) spy.observe(el);
      });
    }
  });
})(window.MOS = window.MOS || {});
