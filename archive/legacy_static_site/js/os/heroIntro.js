/* ============================================================
   HERO INTRO — loader-gated entrance timeline, name scramble,
   iOS text-selection easter egg
   ============================================================ */
(function (MOS) {
  "use strict";

  function playSelection() {
    if (MOS.REDUCE) return;
    var menu = MOS.$("#selMenu");
    var target = MOS.$("#nameTarget");
    if (!menu || !target) return;
    target.classList.add("selected");
    if (MOS.hasGSAP()) { window.gsap.fromTo(menu, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: .4, ease: "back.out(2)" }); }
    else { menu.style.opacity = 1; }
    setTimeout(function () {
      if (MOS.hasGSAP()) { window.gsap.to(menu, { opacity: 0, y: 6, duration: .4 }); } else { menu.style.opacity = 0; }
      setTimeout(function () { target.classList.remove("selected"); }, 400);
    }, 2600);
  }

  MOS.heroIntro = function () {
    if (MOS.heroIntro._done) return;
    MOS.heroIntro._done = true;
    var dock = MOS.$("#dock");

    function revealFallback() {
      MOS.$$(".word-i").forEach(function (w) { w.style.transform = "none"; });
      MOS.$$(".hero-eyebrow,.hero-sub,.hero-manifesto,.hero-cta-row").forEach(function (e) { e.style.opacity = "1"; });
      if (dock) { dock.style.opacity = "1"; dock.style.transform = "none"; }
      MOS.fillBars(document);
    }

    if (MOS.REDUCE || !MOS.hasGSAP()) { revealFallback(); return; }

    try {
      var tl = window.gsap.timeline();
      if (dock) tl.to(dock, { opacity: 1, y: 0, duration: .7, ease: "power3.out" }, 0);
      tl.to(".hero-eyebrow", { opacity: 1, duration: .6 }, 0.1)
        .from(".monogram-disc", { scale: .6, opacity: 0, duration: .9, ease: "back.out(1.6)" }, 0.15)
        .to(".hero-title .word-i", { y: "0%", duration: 1, ease: "power4.out", stagger: .12 }, 0.3)
        .to(".hero-sub", { opacity: 1, duration: .7 }, 0.7)
        .to(".hero-manifesto", { opacity: 1, duration: .6 }, 0.9)
        .fromTo(".hero-cta-row", { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: .5 }, 1.05)
        .call(function () {
          MOS.$$(".hero-title .word-i").forEach(function (w, i) {
            var txt = w.textContent;
            setTimeout(function () { MOS.scrambleText(w, txt, 850); }, i * 200);
          });
        }, [], 1.4);
      MOS.fillBars(document);
      setTimeout(playSelection, 1800);
    } catch (e) {
      console.warn("heroIntro timeline failed, falling back", e);
      revealFallback();
    }
  };

  MOS.register("selMenu", function () {
    var menu = MOS.$("#selMenu");
    var target = MOS.$("#nameTarget");
    if (!menu || !target) return;
    target.addEventListener("click", function () {
      target.classList.add("selected");
      if (MOS.hasGSAP()) { window.gsap.fromTo(menu, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: .35, ease: "back.out(2)" }); }
      else menu.style.opacity = 1;
    });
    menu.querySelectorAll("button").forEach(function (b) {
      b.addEventListener("click", function (e) {
        e.stopPropagation();
        if (MOS.hasGSAP()) { window.gsap.to(menu, { opacity: 0, y: 6, duration: .3 }); } else menu.style.opacity = 0;
        setTimeout(function () { target.classList.remove("selected"); }, 300);
      });
    });
  });
})(window.MOS = window.MOS || {});
