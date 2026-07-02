/* ============================================================
   CONTROL CENTER — spring toggles wired to real system behavior:
   ai     → parallax + specular + space mouse-drift
   design → wireframe mode (also sleeps the space layer)
   auto   → telemetry console
   sys    → diagnostics modal
   ============================================================ */
(function (MOS) {
  "use strict";

  MOS.register("controlCenter", function () {

    MOS.$$(".toggle").forEach(function (t) {
      t.addEventListener("click", function () {
        var on = t.classList.toggle("on");
        t.setAttribute("aria-pressed", on ? "true" : "false");
        var st = t.querySelector(".st");
        if (st) {
          var stEn = st.querySelector(".lang-en");
          var stAr = st.querySelector(".lang-ar");
          if (stEn) stEn.textContent = on ? "Active" : "Standby";
          if (stAr) stAr.textContent = on ? "شغّال" : "استعداد";
        }
        if (MOS.hasGSAP() && !MOS.REDUCE) {
          window.gsap.fromTo(t, { scale: .93 }, { scale: 1, duration: .5, ease: "elastic.out(1,0.5)" });
          var ico = t.querySelector(".ico");
          if (ico && on) window.gsap.fromTo(ico, { rotate: -30 }, { rotate: 0, duration: .6, ease: "back.out(2)" });
        }

        var toggleType = t.getAttribute("data-c");
        if (toggleType === "ai") {
          MOS.state.isAIActive = on;
          if (!on) {
            MOS.$$("[data-px]").forEach(function (el) {
              if (MOS.hasGSAP()) window.gsap.to(el, { x: 0, y: 0, duration: .5 });
              else el.style.transform = "none";
            });
          }
        } else if (toggleType === "design") {
          document.body.classList.toggle("mode-wireframe", !on);
          /* wireframe strips the world — sleep the GPU when hidden */
          MOS.space.setActive(on && !document.body.classList.contains("light-mode"));
        } else if (toggleType === "auto") {
          MOS.state.isAutoActive = on;
          var consoleEl = MOS.$("#sysLogConsole");
          if (consoleEl) consoleEl.classList.toggle("is-active", on);
        } else if (toggleType === "sys") {
          if (on) { if (MOS.modal) MOS.modal.openDiagnostics(); }
          else { if (MOS.modal) MOS.modal.close(); }
        }
      });
    });

    /* telemetry console feed */
    var logLines = [
      "[Shopify API] Inventory synchronized",
      "[Meta Pixel] InitiateCheckout tracked",
      "[TikTok Pixel] AddToCart tracked",
      "[GA4 Analytics] ViewItem session active",
      "[CDN Edge] Cairo node status: 200 OK",
      "[Shopify API] Webhook dispatched to fulfillment",
      "[Checkout] Cart token generated successfully",
      "[Fulfillment] Tracking number generated",
      "[Shopify API] Order created successfully",
      "[GA4 Analytics] Purchase event recorded"
    ];
    setInterval(function () {
      if (!MOS.state.isAutoActive) return;
      var linesContainer = MOS.$("#sysLogLines");
      if (!linesContainer) return;
      var span = document.createElement("span");
      span.textContent = logLines[Math.floor(Math.random() * logLines.length)];
      linesContainer.appendChild(span);
      if (linesContainer.children.length > 5) {
        linesContainer.removeChild(linesContainer.firstChild);
      }
    }, 2000);
  });
})(window.MOS = window.MOS || {});
