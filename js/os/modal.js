/* ============================================================
   OS MODAL — project case windows + system diagnostics.
   All project content renders from MOS.data.PROJECTS.
   ============================================================ */
(function (MOS) {
  "use strict";

  var diagInterval = null;
  var lastFocused = null;

  /* ---- focus management (WCAG: trap focus inside the open window) ---- */
  function focusables(modal) {
    return Array.prototype.slice.call(modal.querySelectorAll(
      'a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])'
    )).filter(function (el) { return el.offsetParent !== null; });
  }
  function trapTab(e) {
    if (e.key !== "Tab") return;
    var modal = MOS.$("#osModal");
    if (!modal) return;
    var f = focusables(modal);
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  function activateModal() {
    var modal = MOS.$("#osModal");
    if (!modal) return;
    lastFocused = document.activeElement;
    modal.classList.add("is-active");
    document.body.classList.add("is-locked");
    document.removeEventListener("keydown", trapTab, true);
    document.addEventListener("keydown", trapTab, true);
    var f = focusables(modal);
    if (f.length) f[0].focus();
  }

  function isArabic() {
    return (document.documentElement.getAttribute("lang") || "en") === "ar";
  }

  function close() {
    if (diagInterval) { clearInterval(diagInterval); diagInterval = null; }
    var modal = MOS.$("#osModal");
    if (modal) modal.classList.remove("is-active");
    document.body.classList.remove("is-locked");
    document.removeEventListener("keydown", trapTab, true);
    if (lastFocused && lastFocused.focus) { try { lastFocused.focus(); } catch (e) {} lastFocused = null; }

    /* reset diagnostics CC toggle */
    var sysToggle = MOS.$('.toggle[data-c="sys"]');
    if (sysToggle && sysToggle.classList.contains("on")) {
      sysToggle.classList.remove("on");
      sysToggle.setAttribute("aria-pressed", "false");
      var st = sysToggle.querySelector(".st");
      if (st) {
        var stEn = st.querySelector(".lang-en");
        var stAr = st.querySelector(".lang-ar");
        if (stEn) stEn.textContent = "Standby";
        if (stAr) stAr.textContent = "استعداد";
      }
    }
  }

  function openProject(projectId) {
    var data = MOS.data.PROJECT_BY_ID[projectId];
    if (!data) return;
    var modal = MOS.$("#osModal"), pill = MOS.$("#modalPill"), body = MOS.$("#modalBody");
    if (!modal || !body || !pill) return;
    var isAr = isArabic();

    pill.textContent = "system://portfolio/project/" + projectId.toLowerCase().replace(/\s+/g, "-");

    var statBoxes = "";
    data.stats.forEach(function (s) {
      statBoxes += '<div class="modal-stat-box">' +
        '<div class="lbl">' + s.lbl + '</div>' +
        '<div class="val chrome-text">' + s.val + '</div>' +
        '<div class="desc">' + s.desc + '</div>' +
        '</div>';
    });

    var techsSpans = "";
    var focusSource = data.focusTags || data.techs;
    var techsList = isAr && focusSource.ar ? focusSource.ar : focusSource.en;
    techsList.forEach(function (t) { techsSpans += "<span>" + t + "</span>"; });

    var decisionsListHtml = "";
    var decList = isAr && data.decisions.ar ? data.decisions.ar : data.decisions.en;
    decList.forEach(function (d) {
      var parts = d.split(":");
      var title = parts[0];
      var desc = parts.slice(1).join(":");
      decisionsListHtml += '<li><b>' + title + '</b>' + desc + '</li>';
    });

    var backBtnText = isAr ? "ارجع للنظام" : "Back to System";
    var launchBtnText = isAr ? "زيارة الموقع الإلكتروني" : "Visit Live Website";
    var metricsTitle = isAr ? "// النتايج بالأرقام" : "// IMPACT METRICS";
    var tag = isAr ? data.tag.ar : data.tag.en;

    var _webp = /^assets\/.+\.jpe?g$/i.test(data.previewImage) ? data.previewImage.replace(/\.jpe?g$/i, ".webp") : "";
    body.innerHTML = '<div class="modal-case-hero">' +
      (_webp ? '<picture><source type="image/webp" srcset="' + _webp + '">' : '') +
      '<img src="' + data.previewImage + '" alt="' + data.title + ' website mockup" class="modal-preview-img" loading="lazy" decoding="async">' +
      (_webp ? '</picture>' : '') +
    '</div>' +
    '<div class="modal-header-hero">' +
      '<div class="modal-hero-glyph ' + data.glyphClass + '">' +
        '<span class="glyph chrome-text" style="font-size:74px;font-weight:900;font-family:\'Archivo\'">' + data.glyph + '</span>' +
      '</div>' +
      '<div class="modal-header-info">' +
        '<div class="project-status-badge">' + (isAr ? data.status.ar : data.status.en) + '</div>' +
        '<h2>' + data.title + '</h2>' +
        '<div class="tag">' + tag + '</div>' +
        '<a href="' + data.website + '" class="project-url-display" target="_blank" rel="noopener noreferrer">' + data.website.replace('https://', '') + '</a>' +
        '<div class="modal-focus-label" style="margin-top:14px;font-family:\'JetBrains Mono\';font-size:9px;color:var(--blue-soft);letter-spacing:.14em;text-transform:uppercase;margin-bottom:6px;">' + (isAr ? "محاور المشروع" : "FOCUS AREAS") + '</div>' +
        '<div class="techs" style="margin-top:0;">' + techsSpans + '</div>' +
      '</div>' +
    '</div>' +
    '<div class="modal-desc-grid">' +
      '<div class="modal-desc-col">' +
        '<div class="modal-section-title">' + (isAr ? "نظرة عامة على المشروع" : "1. Project Overview") + '</div>' +
        '<p>' + (isAr ? data.overview.ar : data.overview.en) + '</p>' +
        '<div class="modal-section-title">' + (isAr ? "سياق العمل التجاري" : "2. Business Context") + '</div>' +
        '<p>' + (isAr ? data.businessContext.ar : data.businessContext.en) + '</p>' +
        '<div class="modal-section-title">' + (isAr ? "المشكلة والاحتياج" : "3. The Problem") + '</div>' +
        '<p>' + (isAr ? data.problem.ar : data.problem.en) + '</p>' +
        '<div class="modal-section-title">' + (isAr ? "الحل ومخرجات المنتج" : "4. The Solution") + '</div>' +
        '<p>' + (isAr ? data.solution.ar : data.solution.en) + '</p>' +
        '<div class="modal-section-title">' + (isAr ? "هندسة العمليات وتدفق العمل" : "5. Workflow & Systems Design") + '</div>' +
        '<p>' + (isAr ? data.systemArchitecture.ar : data.systemArchitecture.en) + '</p>' +
      '</div>' +
      '<div class="modal-stats-col">' +
        '<div class="modal-section-title">' + (isAr ? "القرارات الرئيسية للمنتج" : "Key Decisions") + '</div>' +
        '<ul class="modal-decision-list">' + decisionsListHtml + '</ul>' +
        '<div class="modal-section-title">' + (isAr ? "النتائج والأثر الملموس" : "Outcome & Impact") + '</div>' +
        '<p>' + (isAr ? data.outcome.ar : data.outcome.en) + '</p>' +
        '<div style="margin-top: 15px;"><span style="font-family:\'JetBrains Mono\';font-size:11px;color:var(--blue-soft)">' + metricsTitle + '</span></div>' +
        statBoxes +
      '</div>' +
    '</div>' +
    '<div class="modal-footer">' +
      '<button class="modal-btn secondary" id="modalBackBtn">' + backBtnText + '</button>' +
      '<a href="' + data.website + '" class="modal-btn primary" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:6px;">' +
        '<span>' + launchBtnText + '</span>' +
        '<svg class="btn-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M7 7h10v10"/></svg>' +
      '</a>' +
    '</div>';

    MOS.$("#modalBackBtn").addEventListener("click", close);
    activateModal();
  }

  function openDiagnostics() {
    var modal = MOS.$("#osModal"), pill = MOS.$("#modalPill"), body = MOS.$("#modalBody");
    if (!modal || !body || !pill) return;
    var isAr = isArabic();

    pill.textContent = "system://os/diagnostics";

    var titleHtml = isAr ? "<h2>تشخيصات النظام Core v2.0</h2>" : "<h2>Mostafa.OS Core Diagnostic v2.0</h2>";
    var subtitleHtml = isAr ? '<div class="tag">تقرير التشخيص الذاتي</div>' : '<div class="tag">Diagnostics Report</div>';
    var spaceState = MOS.space.ready ? (isAr ? "شغّالة" : "Online") : (isAr ? "واقفة" : "Fallback");

    body.innerHTML = '<div class="diagnostics-panel">' +
      '<div class="modal-header-hero">' +
        '<div class="modal-hero-glyph metal" style="color:var(--cyan);background:rgba(100,212,255,0.1);border:1px solid var(--line);font-size:24px;font-weight:800;width:140px;height:140px;border-radius:20px;display:grid;place-items:center;">SYS</div>' +
        '<div class="modal-header-info">' +
          subtitleHtml + titleHtml +
          '<div class="techs">' +
            '<span>GSAP v3.12.5</span>' +
            '<span>Lenis v1.0.42</span>' +
            '<span>Three.js r128</span>' +
            '<span>ScrollTrigger</span>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="diag-grid">' +
        '<div class="diag-card">' +
          '<h5>' + (isAr ? "بيانات النظام الحية" : "SYSTEM RUNTIME") + '</h5>' +
          '<ul>' +
            '<li><b>' + (isAr ? "الحالة" : "Status") + ':</b> <span style="color:var(--green)">' + (isAr ? "شغّال ومتصل" : "Live & Online") + '</span></li>' +
            '<li><b>' + (isAr ? "طبقة الفضاء" : "Space Layer") + ':</b> <span>' + spaceState + '</span></li>' +
            '<li><b>' + (isAr ? "سرعة الاستجابة" : "Latency") + ':</b> <span id="diagPing">12ms</span></li>' +
            '<li><b>' + (isAr ? "معدل الإطارات" : "Frame Rate") + ':</b> <span id="diagFPS">60 FPS</span></li>' +
          '</ul>' +
        '</div>' +
        '<div class="diag-card">' +
          '<h5>' + (isAr ? "معايير واجهة الاستخدام" : "INTERFACE METRICS") + '</h5>' +
          '<ul>' +
            '<li><b>' + (isAr ? "محرك التمرير" : "Scroll Engine") + ':</b> Lenis Smooth Scroll</li>' +
            '<li><b>' + (isAr ? "تأثيرات الحركة" : "Motion Pref") + ':</b> ' + (MOS.REDUCE ? (isAr ? "حركة خفيفة" : "Reduced Motion") : (isAr ? "حركات غنية" : "Rich Animations")) + '</li>' +
            '<li><b>' + (isAr ? "شاشة العرض" : "Viewport") + ':</b> ' + window.innerWidth + "x" + window.innerHeight + '</li>' +
            '<li><b>' + (isAr ? "اللغة" : "Language") + ':</b> ' + (isAr ? "العربية" : "English") + '</li>' +
          '</ul>' +
        '</div>' +
      '</div>' +
      '<div class="modal-footer">' +
        '<button class="modal-btn secondary" id="modalBackBtn">' + (isAr ? "ارجع للنظام" : "Back to System") + '</button>' +
      '</div>' +
      '</div>';

    MOS.$("#modalBackBtn").addEventListener("click", close);
    activateModal();

    if (diagInterval) clearInterval(diagInterval);
    diagInterval = setInterval(function () {
      var pingEl = MOS.$("#diagPing");
      var fpsEl = MOS.$("#diagFPS");
      if (pingEl) pingEl.textContent = Math.round(10 + Math.random() * 8) + "ms";
      if (fpsEl) fpsEl.textContent = Math.round(58 + Math.random() * 2.5) + " FPS";
    }, 1000);
  }

  MOS.modal = { openProject: openProject, openDiagnostics: openDiagnostics, close: close };

  MOS.register("modal", function () {
    var closeBtn = MOS.$("#modalCloseBtn");
    var closeTxt = MOS.$("#modalCloseTxt");
    var modalBackdrop = MOS.$("#osModal");
    if (closeBtn) closeBtn.addEventListener("click", close);
    if (closeTxt) closeTxt.addEventListener("click", close);
    if (modalBackdrop) {
      modalBackdrop.addEventListener("click", function (e) {
        if (e.target === modalBackdrop) close();
      });
    }
    /* MOSTAFA.OS label opens system diagnostics */
    var osBrandLabel = MOS.$("#osBrandLabel");
    if (osBrandLabel) {
      osBrandLabel.addEventListener("click", function () {
        MOS.modal.openDiagnostics();
      });
    }

    /* Escape closes the window — basic OS manners */
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  });
})(window.MOS = window.MOS || {});
