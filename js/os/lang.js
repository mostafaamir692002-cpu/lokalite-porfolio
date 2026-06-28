/* ============================================================
   LANGUAGE — EN/AR switching with GSAP page transition,
   localStorage persistence, RTL sync
   ============================================================ */
(function (MOS) {
  "use strict";

  /* Arabic webfont is loaded only when Arabic is actually used (saves ~80KB for EN visitors). */
  var arabicFontLoaded = false;
  function ensureArabicFont() {
    if (arabicFontLoaded) return;
    arabicFontLoaded = true;
    var l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap";
    document.head.appendChild(l);
  }

  /* Polite screen-reader announcement on language change. */
  var liveRegion;
  function announce(msg) {
    if (!liveRegion) {
      liveRegion = document.createElement("div");
      liveRegion.setAttribute("role", "status");
      liveRegion.setAttribute("aria-live", "polite");
      liveRegion.setAttribute("aria-atomic", "true");
      liveRegion.style.cssText = "position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0";
      document.body.appendChild(liveRegion);
    }
    liveRegion.textContent = msg;
  }

  function applyLangChanges(lang) {
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    if (lang === "ar") ensureArabicFont();
    MOS.state.lang = lang;
    try { localStorage.setItem("lokalita-os-lang", lang); } catch (e) {}

    MOS.$$(".lang-switcher").forEach(function (s) {
      s.querySelectorAll("span").forEach(function (sp) {
        var isTarget = sp.getAttribute("data-lang") === lang;
        sp.classList.toggle("active", isTarget);
        sp.setAttribute("aria-checked", isTarget ? "true" : "false");
      });
    });

    /* resync the disciplines readout (modeAr visibility) */
    if (MOS.setMode) {
      var activeModeBtn = MOS.$(".mode.active");
      if (activeModeBtn) {
        var modeIdx = parseInt(activeModeBtn.getAttribute("data-mode"), 10);
        MOS.setMode(isNaN(modeIdx) ? 0 : modeIdx);
      }
    }
  }

  function switchLanguage(lang) {
    if (document.documentElement.getAttribute("lang") === lang) return;
    announce(lang === "ar" ? "تم تغيير اللغة إلى العربية" : "Language changed to English");

    function afterSwap() {
      if (MOS.carousel) { MOS.carousel.buildDots(); MOS.carousel.go(0); }
    }

    if (MOS.hasGSAP() && !MOS.REDUCE) {
      window.gsap.to(".shell", {
        opacity: 0, y: 12, duration: 0.35, ease: "power2.out",
        onComplete: function () {
          applyLangChanges(lang);
          afterSwap();
          window.gsap.to(".shell", { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" });
        }
      });
    } else {
      applyLangChanges(lang);
      afterSwap();
    }
  }

  MOS.register("lang", function () {
    var savedLang = "en";
    try { savedLang = localStorage.getItem("lokalita-os-lang") || "en"; } catch (e) {}
    applyLangChanges(savedLang);

    MOS.$$(".lang-switcher span").forEach(function (sp) {
      function triggerSwitch(e) {
        e.stopPropagation();
        switchLanguage(sp.getAttribute("data-lang"));
      }
      sp.addEventListener("click", triggerSwitch);
      sp.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          triggerSwitch(e);
        }
      });
    });
  });
})(window.MOS = window.MOS || {});
