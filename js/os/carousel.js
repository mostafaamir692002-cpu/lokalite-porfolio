/* ============================================================
   WORK CAROUSEL — renders cards from MOS.data.PROJECTS
   (data-driven: edit js/data/projects.js, nothing else),
   arrows + dots + pointer drag, modal on click
   ============================================================ */
(function (MOS) {
  "use strict";

  MOS.register("carousel", function () {
    var track = MOS.$("#workTrack");
    var prevB = MOS.$("#prevBtn"), nextB = MOS.$("#nextBtn");
    var dotsWrap = MOS.$("#workDots");
    if (!track) return;

    track.innerHTML = MOS.data.PROJECTS.map(function (p) {
      function focusTags(list) {
        return list.slice(0, 3).map(function (m) { return "<span>" + m + "</span>"; }).join("");
      }
      var problemEn = p.problem_short ? p.problem_short.en : p.card.en;
      var problemAr = p.problem_short ? p.problem_short.ar : p.card.ar;
      var outcomeEn = p.outcome_short ? p.outcome_short.en : "";
      var outcomeAr = p.outcome_short ? p.outcome_short.ar : "";
      var _webp = /^assets\/.+\.jpe?g$/i.test(p.previewImage) ? p.previewImage.replace(/\.jpe?g$/i, ".webp") : "";

      return '<article class="work-card" data-project="' + p.id + '">' +
        '<div class="wc-vis" style="position:relative;overflow:hidden;">' +
          (_webp ? '<picture><source type="image/webp" srcset="' + _webp + '">' : '') +
          '<img src="' + p.previewImage + '" alt="' + p.title + '" loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0;opacity:0.75;transition:opacity .4s,transform .6s;">' +
          (_webp ? '</picture>' : '') +
          '<div style="position:absolute;inset:0;background:linear-gradient(to bottom,rgba(0,0,0,0.15) 0%,rgba(0,0,0,0.55) 100%);"></div>' +
          '<div style="position:absolute;top:12px;left:14px;right:14px;display:flex;justify-content:space-between;align-items:center;">' +
            '<span class="project-status-badge" style="font-size:8.5px;padding:3px 9px;border-radius:10px;letter-spacing:.12em;">● LIVE</span>' +
            '<span style="font-family:\'JetBrains Mono\';font-size:9px;color:rgba(255,255,255,.55);letter-spacing:.1em;">' + p.website.replace('https://', '') + '</span>' +
          '</div>' +
          '<div style="position:absolute;bottom:14px;left:14px;">' +
            '<div style="font-family:\'JetBrains Mono\';font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.6);margin-bottom:4px;">' +
              '<span class="lang-en">' + p.tag.en + '</span>' +
              '<span class="lang-ar" style="font-family:\'Noto Sans Arabic\';">' + p.tag.ar + '</span>' +
            '</div>' +
            '<h3 style="font-family:\'Archivo\';font-weight:900;font-size:22px;color:#fff;letter-spacing:-.01em;line-height:1;margin:0;">' + p.title + '</h3>' +
          '</div>' +
        '</div>' +
        '<div class="wc-body" style="padding:18px 20px 20px;">' +
          '<div class="wc-case-row">' +
            '<span class="wc-case-label lang-en">Problem</span>' +
            '<span class="wc-case-label lang-ar">المشكلة</span>' +
            '<p class="wc-case-text lang-en">' + problemEn + '</p>' +
            '<p class="wc-case-text lang-ar" style="font-family:\'Noto Sans Arabic\';direction:rtl;text-align:right;">' + problemAr + '</p>' +
          '</div>' +
          (outcomeEn ? '<div class="wc-case-row wc-outcome-row">' +
            '<span class="wc-case-label wc-outcome-label lang-en">Outcome</span>' +
            '<span class="wc-case-label wc-outcome-label lang-ar">النتيجة</span>' +
            '<p class="wc-case-text wc-outcome-text lang-en">' + outcomeEn + '</p>' +
            '<p class="wc-case-text wc-outcome-text lang-ar" style="font-family:\'Noto Sans Arabic\';direction:rtl;text-align:right;">' + outcomeAr + '</p>' +
          '</div>' : '') +
          '<div class="wc-meta lang-en">' + focusTags(p.focusTags ? p.focusTags.en : p.meta.en) + '</div>' +
          '<div class="wc-meta lang-ar">' + focusTags(p.focusTags ? p.focusTags.ar : p.meta.ar) + '</div>' +
          '<div class="wc-actions">' +
            '<a class="wc-btn-primary" href="' + p.website + '" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation();">' +
              '<span class="lang-en">Visit Website</span>' +
              '<span class="lang-ar">زيارة الموقع</span>' +
              '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><path d="M7 17L17 7M7 7h10v10"/></svg>' +
            '</a>' +
            '<button class="wc-btn-secondary wc-open-case">' +
              '<span class="lang-en">Case Study</span>' +
              '<span class="lang-ar">دراسة الحالة</span>' +
              '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><path d="M5 12h14M12 5l7 7-7 7"/></svg>' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</article>';
    }).join("");

    /* open project modal on case study click or card click */
    MOS.$$(".work-card", track).forEach(function (card) {
      /* Visit Website — explicit navigation to survive pointer-capture routing */
      var visitBtn = card.querySelector(".wc-btn-primary");
      if (visitBtn) {
        visitBtn.addEventListener("click", function (e) {
          e.stopPropagation();
          e.preventDefault();
          var url = visitBtn.getAttribute("href");
          if (url && url !== "#") window.open(url, "_blank", "noopener,noreferrer");
        });
        visitBtn.addEventListener("pointerup", function (e) {
          e.stopPropagation();
        });
      }

      var openBtn = card.querySelector(".wc-open-case");
      if (openBtn) {
        openBtn.addEventListener("click", function (e) {
          e.stopPropagation();
          MOS.modal.openProject(card.getAttribute("data-project"));
        });
      }
      card.addEventListener("click", function (e) {
        if (e.target.closest("a") || e.target.closest(".wc-btn-primary")) return;
        MOS.modal.openProject(card.getAttribute("data-project"));
      });
    });

    /* ---- carousel engine ---- */
    var idx = 0;
    function perView() { var w = window.innerWidth; return w <= 720 ? 1 : (w <= 1080 ? 2 : 3); }
    function maxIdx() { var n = track.children.length; return Math.max(0, n - perView()); }
    function step() {
      if (!track.children.length) return 0;
      var card = track.children[0];
      var style = getComputedStyle(track);
      var gap = parseFloat(style.columnGap || style.gap || "20") || 20;
      return card.getBoundingClientRect().width + gap;
    }
    function go(i) {
      idx = MOS.clamp(i, 0, maxIdx());
      track.style.transform = "translateX(" + (-idx * step()) + "px)";
      if (prevB) prevB.disabled = idx <= 0;
      if (nextB) nextB.disabled = idx >= maxIdx();
      syncDots();
    }
    function buildDots() {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = "";
      var pages = maxIdx() + 1;
      for (var k = 0; k < pages; k++) {
        (function (k) {
          var d = document.createElement("i");
          d.addEventListener("click", function () { go(k); });
          dotsWrap.appendChild(d);
        })(k);
      }
      syncDots();
    }
    function syncDots() {
      if (!dotsWrap) return;
      Array.prototype.forEach.call(dotsWrap.children, function (d, k) {
        d.classList.toggle("active", k === idx);
      });
    }
    if (nextB) nextB.addEventListener("click", function () { go(idx + 1); });
    if (prevB) prevB.addEventListener("click", function () { go(idx - 1); });
    buildDots(); go(0);

    var rtm;
    window.addEventListener("resize", function () {
      clearTimeout(rtm);
      rtm = setTimeout(function () {
        buildDots(); go(Math.min(idx, maxIdx()));
        if (MOS.hasGSAP() && window.ScrollTrigger) { try { window.ScrollTrigger.refresh(); } catch (e) {} }
      }, 200);
    });

    /* ---- pointer drag ---- */
    var wrap = MOS.$(".work-track-wrap");

    /* keyboard: Left/Right arrows navigate when the carousel region is focused */
    if (wrap) {
      wrap.setAttribute("tabindex", "0");
      wrap.setAttribute("role", "group");
      wrap.setAttribute("aria-label", "Work projects carousel");
      wrap.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight") { e.preventDefault(); go(idx + 1); }
        else if (e.key === "ArrowLeft") { e.preventDefault(); go(idx - 1); }
      });
    }

    if (wrap && window.PointerEvent) {
      var dragging = false, startX = 0, delta = 0, baseOffset = 0;
      wrap.addEventListener("pointerdown", function (e) {
        if (e.pointerType === "mouse" && e.button !== 0) return;
        /* don't hijack clicks on action buttons */
        if (e.target.closest(".wc-btn-primary") || e.target.closest(".wc-open-case") || e.target.closest("a") || e.target.closest("button")) return;
        dragging = true; startX = e.clientX; delta = 0;
        baseOffset = -idx * step();
        wrap.setPointerCapture(e.pointerId);
        track.style.transition = "none";
      });
      wrap.addEventListener("pointermove", function (e) {
        if (!dragging) return;
        delta = e.clientX - startX;
        if (Math.abs(delta) > 8) wrap.classList.add("is-dragging");
        track.style.transform = "translateX(" + (baseOffset + delta) + "px)";
      });
      function endDrag() {
        if (!dragging) return;
        dragging = false;
        track.style.transition = "";
        wrap.classList.remove("is-dragging");
        if (delta < -60) go(idx + 1);
        else if (delta > 60) go(idx - 1);
        else go(idx);
        delta = 0;
      }
      wrap.addEventListener("pointerup", endDrag);
      wrap.addEventListener("pointercancel", endDrag);
    }

    /* expose for lang switch re-layout */
    MOS.carousel = { go: go, buildDots: buildDots };

    /* ---- 3D tilt on cards (calm: ±3.5deg) ---- */
    if (!MOS.REDUCE && MOS.FINE) {
      var tiltCards = MOS.$$(".work-card", track);
      tiltCards.forEach(function (card) {
        /* cache the rect on enter (and lazily) instead of measuring every mousemove */
        card.addEventListener("mouseenter", function () { card._rect = card.getBoundingClientRect(); });
        card.addEventListener("mousemove", function (e) {
          var rect = card._rect || (card._rect = card.getBoundingClientRect());
          var dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
          var dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
          var rx = (dy * -3.5).toFixed(2), ry = (dx * 3.5).toFixed(2);
          if (MOS.hasGSAP()) {
            window.gsap.to(card, { rotateX: rx, rotateY: ry, transformPerspective: 600, ease: "power2.out", duration: 0.4 });
          } else {
            card.style.transform = "perspective(600px) rotateX(" + rx + "deg) rotateY(" + ry + "deg)";
          }
        });
        card.addEventListener("mouseleave", function () {
          card._rect = null;
          if (MOS.hasGSAP()) window.gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power2.out" });
          else card.style.transform = "none";
        });
      });
      /* a cached rect goes stale when the page scrolls or resizes */
      function invalidateTiltRects() { tiltCards.forEach(function (c) { c._rect = null; }); }
      window.addEventListener("scroll", invalidateTiltRects, { passive: true });
      window.addEventListener("resize", invalidateTiltRects, { passive: true });
    }
  });
})(window.MOS = window.MOS || {});
