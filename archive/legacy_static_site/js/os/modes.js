/* ============================================================
   DISCIPLINES — operating-mode selector (renders from
   MOS.data.MODES, bilingual-aware)
   ============================================================ */
(function (MOS) {
  "use strict";

  function renderMeters(arr) {
    var modeMeters = MOS.$("#modeMeters");
    if (!modeMeters) return;
    modeMeters.innerHTML = "";
    arr.forEach(function (row) {
      var wrap = document.createElement("div");
      wrap.className = "meter";
      wrap.innerHTML = '<div class="row"><span>' + row[0] + '</span><b>' + row[1] + '</b></div><div class="bar"><i></i></div>';
      modeMeters.appendChild(wrap);
      var bar = wrap.querySelector("i");
      requestAnimationFrame(function () { setTimeout(function () { bar.style.width = row[1] + "%"; }, 40); });
    });
  }

  function setMode(i) {
    var m = MOS.data.MODES[i];
    if (!m) return;
    var isAr = (document.documentElement.getAttribute("lang") || "en") === "ar";
    var modeTitle = MOS.$("#modeTitle"), modeDesc = MOS.$("#modeDesc"), modeAr = MOS.$("#modeAr");
    if (modeTitle) modeTitle.textContent = isAr && m.arT ? m.arT : m.t;
    if (modeDesc) { modeDesc.textContent = m.d; modeDesc.style.display = isAr ? "none" : "block"; }
    if (modeAr) { modeAr.textContent = m.ar; modeAr.style.display = isAr ? "block" : "none"; }
    renderMeters(m.m);
    if (MOS.hasGSAP() && !MOS.REDUCE) {
      window.gsap.fromTo("#modeTitle, #modeDesc, #modeAr", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .5, stagger: .05, ease: "power2.out" });
    }
  }

  MOS.setMode = setMode;

  MOS.register("modes", function () {
    MOS.$$(".mode").forEach(function (btn) {
      btn.addEventListener("click", function () {
        MOS.$$(".mode").forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        setMode(parseInt(btn.getAttribute("data-mode"), 10));
      });
    });
    renderMeters(MOS.data.MODES[0].m);
    setMode(0);
  });
})(window.MOS = window.MOS || {});
