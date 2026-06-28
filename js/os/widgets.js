/* ============================================================
   WIDGETS — live clock, real battery (with graceful mock),
   Cairo weather (sessionStorage cache, 30-min TTL)
   ============================================================ */
(function (MOS) {
  "use strict";

  MOS.register("widgets", function () {

    /* ---- live clock ---- */
    function tick() {
      var d = new Date();
      var h = d.getHours(), m = d.getMinutes();
      var hh = h % 12; if (hh === 0) hh = 12;
      var t = hh + ":" + MOS.pad(m);
      var sb = MOS.$("#sbTime");
      var wt = MOS.$("#wTime");
      var wd = MOS.$("#wDate");
      if (sb) sb.textContent = t;
      if (wt) wt.textContent = t;
      if (wd) {
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var mon = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        wd.textContent = days[d.getDay()] + ", " + mon[d.getMonth()] + " " + d.getDate();
      }
    }
    tick(); setInterval(tick, 10000);

    /* ---- battery ---- */
    var bar = MOS.$(".batt i");
    function setBatteryUI(level) {
      if (!bar) return;
      var pct = Math.round(level * 100);
      bar.style.width = pct + "%";
      if (level < 0.2) bar.style.background = "var(--pink)";
      else if (level < 0.5) bar.style.background = "var(--orange)";
      else bar.style.background = "var(--green)";
    }
    function runFallbackBattery() {
      var mockLevel = 0.88;
      setBatteryUI(mockLevel);
      setInterval(function () {
        mockLevel = Math.max(0.05, mockLevel - 0.01);
        setBatteryUI(mockLevel);
      }, 300000);
    }
    if (navigator.getBattery) {
      navigator.getBattery().then(function (battery) {
        function updateBattery() { setBatteryUI(battery.level); }
        updateBattery();
        battery.addEventListener("levelchange", updateBattery);
        battery.addEventListener("chargingchange", updateBattery);
      }).catch(runFallbackBattery);
    } else {
      runFallbackBattery();
    }

    /* ---- win-pill status cycling ---- */
    var pill = MOS.$("#winPill");
    var pillText = MOS.$("#winPillText");
    var pillMessages = [
      "lokalita.com · live",
      "shopify ecommerce · cairo",
      "build · launch · grow"
    ];
    var pillIdx = 0;
    function cyclePill() {
      if (!pillText) return;
      pillIdx = (pillIdx + 1) % pillMessages.length;
      var next = pillMessages[pillIdx];
      if (MOS.hasGSAP()) {
        window.gsap.to(pillText, { opacity: 0, y: -6, duration: .22, ease: "power2.in", onComplete: function () {
          pillText.textContent = next;
          window.gsap.fromTo(pillText, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: .28, ease: "power2.out" });
        }});
      } else {
        pillText.textContent = next;
      }
    }
    setInterval(cyclePill, 3500);
  });
})(window.MOS = window.MOS || {});
