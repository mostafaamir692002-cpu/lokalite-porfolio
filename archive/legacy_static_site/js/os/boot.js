/* ============================================================
   BOOT — cinematic system boot.
   The space scene forms behind the boot mark (convergence is
   driven through MOS.space.setProgress) while the bar fills,
   then the glass UI rises in (heroIntro).
   ============================================================ */
(function (MOS) {
  "use strict";

  MOS.register("boot", function () {
    var boot = MOS.$("#boot");
    var bootBar = boot ? boot.querySelector(".boot-bar i") : null;
    var bootPct = boot ? boot.querySelector(".boot-pct") : null;
    var bootLabel = boot ? boot.querySelector(".boot-label") : null;

    function finishBoot() {
      if (!boot || boot.classList.contains("done")) return;
      boot.classList.add("done");
      document.body.classList.remove("is-locked");
      MOS.space.setProgress(1);
      if (MOS.heroIntro) MOS.heroIntro();
      if (MOS.hasGSAP() && window.ScrollTrigger) { try { window.ScrollTrigger.refresh(); } catch (e) {} }
    }

    document.body.classList.add("is-locked");

    if (MOS.REDUCE || !boot) {
      if (boot) boot.classList.add("done");
      document.body.classList.remove("is-locked");
      MOS.space.setProgress(1);
      setTimeout(function () { if (MOS.heroIntro) MOS.heroIntro(); }, 30);
    } else if (MOS.hasGSAP()) {
      var stages = ["Forming the system...", "Calibrating the glass...", "Ready."];
      var stageIdx = 0;
      var stageTimer = setInterval(function () {
        stageIdx++;
        if (stageIdx < stages.length && bootLabel) {
          window.gsap.fromTo(bootLabel, { opacity: 0, y: 4 }, { opacity: 1, y: 0, duration: .3 });
          bootLabel.textContent = stages[stageIdx];
        } else { clearInterval(stageTimer); }
      }, 800);

      var bootObj = { p: 0 };
      window.gsap.to(bootObj, {
        p: 100, duration: 2.4, ease: "power2.inOut",
        onUpdate: function () {
          var v = Math.round(bootObj.p);
          if (bootBar) bootBar.style.width = v + "%";
          if (bootPct) bootPct.textContent = v + "%";
          MOS.space.setProgress(bootObj.p / 100);   /* particles converge with the bar */
        },
        onComplete: function () { clearInterval(stageTimer); setTimeout(finishBoot, 350); }
      });
    } else {
      var p = 0;
      var bi = setInterval(function () {
        p += Math.random() * 16 + 6;
        if (p >= 100) { p = 100; clearInterval(bi); }
        if (bootBar) bootBar.style.width = p + "%";
        if (bootPct) bootPct.textContent = Math.floor(p) + "%";
        MOS.space.setProgress(p / 100);
        if (p >= 100) setTimeout(finishBoot, 360);
      }, 150);
    }

    /* safety: never trap the user */
    setTimeout(function () {
      if (boot && !boot.classList.contains("done")) finishBoot();
    }, 5000);
  });
})(window.MOS = window.MOS || {});
