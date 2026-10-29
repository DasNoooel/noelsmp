/* NoelSMP.net – gemeinsames Script: Theme, Menü, Pixel-Icons, IP, Status, Szene, Countdown */
(function () {
  "use strict";
  var root = document.documentElement;

  /* ---------- Theme ---------- */
  var tbtn = document.getElementById("themeBtn");
  function themeSync() {
    var dark = root.getAttribute("data-theme") === "dark";
    if (tbtn) { tbtn.textContent = dark ? "☀" : "☾"; tbtn.setAttribute("aria-label", dark ? "Helles Design einschalten" : "Dunkles Design einschalten"); }
  }
  if (tbtn) tbtn.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("noelsmp-theme", next); } catch (e) {}
    themeSync();
    drawScene();
  });
  themeSync();

  /* ---------- Menü (Handy) ---------- */
  var nav = document.querySelector(".nav"), burger = document.getElementById("burger");
  if (burger && nav) burger.addEventListener("click", function () {
    var o = nav.classList.toggle("open");
    burger.setAttribute("aria-expanded", o ? "true" : "false");
  });

  /* ---------- Pixel-Icons (selbst gezeichnet, 8x8) ---------- */
  var PAL = { y: "#ffd93a", Y: "#c99a00", o: "#ff7a1a", O: "#b5470a", k: "#1d0f45", g: "#4caf3a", G: "#2f7a28", r: "#e0443a", R: "#8f1f1a",
    w: "#b07a43", W: "#7a4e25", s: "#e6eef7", S: "#9db3c9", b: "#38c6ea", B: "#1c52a5", p: "#ff69b4", P: "#c23d8a", v: "#9b59b6", V: "#5e2f78", t: "#3a3744", T: "#6d6a78", e: "#3ddc4f", h: "#ffffff" };
  var PATHS = {
    coin: '<circle cx="12" cy="12" r="9"/><path d="M12 7v10M9.5 9.5h4a1.5 1.5 0 0 1 0 3h-3a1.5 1.5 0 0 0 0 3h4"/>',
    sword: '<path d="M14.5 17.5 3 6V3h3l11.5 11.5M13 19l6-6M16 16l4 4M19 21l2-2"/>',
    house: '<path d="M3 11l9-8 9 8M5 10v10h14V10M10 20v-6h4v6"/>',
    star: '<path d="M12 2l3 6.5 7 .9-5.2 4.8 1.4 7L12 17.8 5.8 21.2l1.4-7L2 9.4l7-.9z"/>',
    pumpkin: '<path d="M12 6c-5 0-9 3-9 7s4 7 9 7 9-3 9-7-4-7-9-7zM12 6c0-2 1-3 3-3M9 12l1 1M15 12l-1 1M9 16c2 1.5 4 1.5 6 0"/>',
    heart: '<path d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z"/>',
    chest: '<path d="M3 8h18v11H3zM3 8l2-4h14l2 4M3 13h18M11 12h2v3h-2z"/>',
    skull: '<path d="M12 3a8 8 0 0 0-5 14v3h10v-3A8 8 0 0 0 12 3zM9 12h.01M15 12h.01M10 20v-2M14 20v-2"/>',
    gift: '<path d="M3 9h18v4H3zM5 13v8h14v-8M12 9v12M12 9c-2 0-4-1-4-3s3-2 4 3zM12 9c2 0 4-1 4-3s-3-2-4 3z"/>',
    crown: '<path d="M3 18h18M4 18L3 7l5 4 4-6 4 6 5-4-1 11"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>',
    bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
    book: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-5-5"/>',
    map: '<path d="M12 21s7-6 7-12a7 7 0 0 0-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
    discord: '<path d="M4 5h16v11H9l-5 4z"/>',
    play: '<path d="M7 4l13 8-13 8z"/>',
    megaphone: '<path d="M3 11v3a1 1 0 0 0 1 1h3l6 4V6L7 10H4a1 1 0 0 0-1 1zM17 9a4 4 0 0 1 0 6M20 6.5a8 8 0 0 1 0 11"/>'
  };
  function icon(name, size) {
    var p = PATHS[name]; if (!p) return "";
    var svg = '<svg class="px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"' + (size <= 24 ? ' width="' + size + '" height="' + size + '"' : '') + '>' + p + '</svg>';
    return size <= 24 ? svg : '<span class="ico" style="width:' + size + 'px;height:' + size + 'px">' + svg + '</span>';
  }
  window.NoelIcon = icon;
  document.querySelectorAll("[data-px]").forEach(function (el) {
    el.insertAdjacentHTML("afterbegin", icon(el.getAttribute("data-px"), parseInt(el.getAttribute("data-s") || "32", 10)));
  });

  /* ---------- IP kopieren ---------- */
  var toast = document.getElementById("toast");
  function copyIP() {
    function ok(good) {
      if (!toast) return;
      toast.textContent = good ? "IP kopiert: noelsmp.net" : "Die IP lautet: noelsmp.net";
      toast.classList.add("show"); clearTimeout(copyIP.t);
      copyIP.t = setTimeout(function () { toast.classList.remove("show"); }, 2400);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText("noelsmp.net").then(function () { ok(true); }, function () { ok(false); });
    else ok(false);
  }
  document.querySelectorAll("[data-copy-ip]").forEach(function (b) { b.addEventListener("click", copyIP); });
  window.NoelCopy = function (text) {
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).catch(function () {});
    if (toast) { toast.textContent = "Kopiert: " + text; toast.classList.add("show"); clearTimeout(copyIP.t); copyIP.t = setTimeout(function () { toast.classList.remove("show"); }, 1800); }
  };

  /* ---------- Server-Status & Discord ---------- */
  function countTo(el, to) {
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { el.textContent = to; return; }
    var from = parseInt(el.textContent, 10) || 0, t0 = performance.now(), dur = 900;
    (function step(t) { var k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3); el.textContent = Math.round(from + (to - from) * e); if (k < 1) requestAnimationFrame(step); })(t0);
  }
  var led = document.getElementById("led"), st = document.getElementById("statusText");
  var pN = document.getElementById("pCount"), pS = document.getElementById("pSub"), pLed = document.getElementById("pLed");
  var dN = document.getElementById("dCount"), dS = document.getElementById("dSub");
  if (led || pN) {
    var load = function () {
      fetch("https://api.mcsrvstat.us/3/noelsmp.net").then(function (r) { return r.json(); }).then(function (d) {
        if (d && d.online) {
          var n = (d.players && d.players.online) || 0, mx = (d.players && d.players.max) || 0;
          if (led) { led.className = "led on"; st.textContent = n === 0 ? "Server online, gerade noch leer" : n === 1 ? "1 Spieler online" : n + " Spieler online"; }
          if (pN) { countTo(pN, n); if (pLed) pLed.className = "led on"; }
        } else {
          if (led) { led.className = "led off"; st.textContent = "Server gerade offline"; }
          if (pN) { pN.textContent = "0"; }
        }
      }).catch(function () { if (led) { led.className = "led"; st.textContent = "Status nicht abrufbar"; } if (pN) { pN.textContent = "–"; } });
    };
    load(); setInterval(load, 60000);
  }
  if (dN) {
    var loadD = function () {
      fetch("https://discord.com/api/v9/invites/QF6ErUhh6e?with_counts=true").then(function (r) { return r.json(); }).then(function (d) {
        var m = d.approximate_member_count, o = d.approximate_presence_count;
        if (typeof m !== "number") throw 0;
        countTo(dN, typeof o === "number" ? o : m); if (dS) dS.textContent = m + " Mitglieder";
      }).catch(function () { dN.textContent = "–"; });
    };
    loadD(); setInterval(loadD, 300000);
  }

  /* ---------- Countdown ---------- */
  var cd = document.getElementById("countdown");
  if (cd) {
    var START = new Date(cd.getAttribute("data-start")).getTime();
    var END = START + 24 * 3600 * 1000;
    var box = document.getElementById("eventBox"), live = document.getElementById("eventLive");
    var tick = function () {
      var now = Date.now(), left = START - now;
      if (now > END + 3 * 24 * 3600 * 1000 && box) { box.parentElement.style.display = "none"; return; }
      if (left <= 0) {
        cd.style.display = "none";
        if (live) live.textContent = now < END ? "Das Event läuft jetzt! Schau mit /quests rein." : "Das Event ist vorbei. Danke fürs Mitmachen!";
        return;
      }
      var s = Math.floor(left / 1000);
      var v = { d: Math.floor(s / 86400), h: Math.floor(s % 86400 / 3600), m: Math.floor(s % 3600 / 60), s: s % 60 };
      for (var k in v) { var e = cd.querySelector('[data-u="' + k + '"]'); if (e) { var tx = String(v[k]).padStart(2, "0"); if (e.textContent !== tx) { e.textContent = tx; if (k === "s") { e.classList.remove("tick"); void e.offsetWidth; e.classList.add("tick"); } } } }
    };
    tick(); setInterval(tick, 1000);
  }

  /* ---------- Pixel-Landschaft ---------- */
  var scene = document.getElementById("scene");
  var layers = [];
  function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function drawScene() {
    if (!scene) return;
    var dark = root.getAttribute("data-theme") === "dark";
    var P = 6, w = Math.ceil(scene.clientWidth * 1.04 / P), h = Math.ceil(scene.clientHeight / P);
    if (!layers.length) {
      ["sky", "far", "mid", "near"].forEach(function (n) { var c = document.createElement("canvas"); c.dataset.l = n; scene.appendChild(c); layers.push(c); });
    }
    layers.forEach(function (c) { c.width = w; c.height = h; });
    var R = rng(2026);
    var ctx = layers[0].getContext("2d");
    var bands = dark ? ["#0a0524", "#120830", "#1d0f45", "#2d1659", "#4a1f66", "#7a2d5a", "#b0442e"] : ["#46b0fb", "#62c0ff", "#86d2ff", "#a9e1ff", "#cdf0ff", "#e8f8ff"];
    var skyH = Math.ceil(h * 0.86 / bands.length);
    bands.forEach(function (c, i) { ctx.fillStyle = c; ctx.fillRect(0, i * skyH, w, skyH + 1); });
    ctx.fillStyle = bands[bands.length - 1]; ctx.fillRect(0, bands.length * skyH, w, h);
    var i, x, y;
    if (dark) {
      for (i = 0; i < w * h / 260; i++) { x = Math.floor(R() * w); y = Math.floor(R() * h * 0.55); ctx.fillStyle = R() > .8 ? "#ffe9a8" : "#d9d3ff"; ctx.fillRect(x, y, 1, 1); }
      var mx = Math.floor(w * 0.82), my = Math.floor(h * 0.16);
      ctx.fillStyle = "#fff3c4"; ctx.fillRect(mx, my, 9, 9); ctx.fillStyle = "#f0dc8f"; ctx.fillRect(mx + 2, my + 2, 2, 2); ctx.fillRect(mx + 5, my + 5, 2, 2);
      ctx.fillStyle = "rgba(255,243,196,.10)"; ctx.fillRect(mx - 3, my - 3, 15, 15);
    } else {
      var sx = Math.floor(w * 0.82), sy = Math.floor(h * 0.14);
      ctx.fillStyle = "#fff2a0"; ctx.fillRect(sx - 2, sy - 2, 13, 13); ctx.fillStyle = "#ffd93a"; ctx.fillRect(sx, sy, 9, 9);
    }
    for (i = 0; i < Math.max(4, w / 40); i++) {
      var cx = Math.floor(R() * w), cy = Math.floor(R() * h * 0.38) + 2, cw = 8 + Math.floor(R() * 10);
      ctx.fillStyle = dark ? "rgba(70,40,120,.55)" : "rgba(255,255,255,.9)";
      ctx.fillRect(cx, cy, cw, 2); ctx.fillRect(cx + 2, cy - 2, cw - 6, 2); ctx.fillRect(cx + 4, cy + 2, cw - 8, 1);
    }
    function hills(canvas, base, amp, f1, f2, top, body, step) {
      var g = canvas.getContext("2d"), ph = R() * 6, ph2 = R() * 6, hs = [];
      for (var xx = 0; xx < w; xx++) {
        var yy = Math.round((base * h + amp * (Math.sin(xx * f1 + ph) * 0.65 + Math.sin(xx * f2 + ph2) * 0.35)) / step) * step;
        hs.push(yy); g.fillStyle = body; g.fillRect(xx, yy, 1, h - yy); g.fillStyle = top; g.fillRect(xx, yy, 1, 1);
      }
      return hs;
    }
    function tree(g, tx, ty, leaf, trunk) {
      g.fillStyle = trunk; g.fillRect(tx, ty - 7, 2, 7);
      g.fillStyle = leaf; g.fillRect(tx - 3, ty - 12, 8, 5); g.fillRect(tx - 2, ty - 15, 6, 3);
    }
    var far = hills(layers[1], 0.66, h * 0.05, 0.035, 0.09, dark ? "#3a2a7a" : "#9ad98e", dark ? "#241659" : "#7fc97a", 2);
    var mid = hills(layers[2], 0.76, h * 0.06, 0.05, 0.13, dark ? "#2d6b3a" : "#6dc257", dark ? "#16103a" : "#5fb04a", 2);
    var g2 = layers[2].getContext("2d");
    for (x = 6; x < w - 6; x += 9 + Math.floor(R() * 13)) {
      var autumn = R() > 0.55;
      tree(g2, x, mid[x], autumn ? (dark ? "#b4531a" : "#e0861e") : (dark ? "#1f5a2c" : "#3e8a30"), dark ? "#2a1a10" : "#7a4e25");
    }
    var near = hills(layers[3], 0.88, h * 0.035, 0.07, 0.17, dark ? "#3f9a45" : "#5fb04a", dark ? "#1b1240" : "#3e8a30", 2);
    var g3 = layers[3].getContext("2d");
    g3.fillStyle = dark ? "#2a1a10" : "#8a5a35"; g3.fillRect(0, Math.floor(h * 0.97), w, h);
    for (i = 0; i < Math.max(4, w / 30); i++) {
      x = 4 + Math.floor(R() * (w - 10)); y = near[x];
      g3.fillStyle = "#4caf3a"; g3.fillRect(x + 2, y - 5, 1, 1);
      g3.fillStyle = "#ff7a1a"; g3.fillRect(x, y - 4, 5, 4); g3.fillStyle = "#b5470a"; g3.fillRect(x + 2, y - 4, 1, 4);
      g3.fillStyle = dark ? "#ffe27a" : "#1d0f45"; g3.fillRect(x + 1, y - 3, 1, 1); g3.fillRect(x + 4 - 1, y - 3, 1, 1);
    }
  }
  if (scene) {
    drawScene();
    var rt; window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(drawScene, 150); });
    var move = function (e) {
      var rx = ((e.clientX || 0) / window.innerWidth - .5);
      var sy = Math.min(window.scrollY, 600);
      layers.forEach(function (c, i) { var k = [0, 6, 14, 26][i]; c.style.transform = "translate(" + (-rx * k) + "px," + (sy * [0, .04, .1, .18][i]) + "px)"; });
    };
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) { window.addEventListener("mousemove", move, { passive: true }); window.addEventListener("scroll", function () { move({ clientX: window.innerWidth / 2 }); }, { passive: true }); }
  }

  /* ---------- Bewegung: Einblenden, Spotlight, Fortschritt ---------- */
  (function () {
    var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    var bar = document.createElement("div"); bar.className = "progress"; document.body.appendChild(bar);
    var navEl = document.querySelector(".nav"), tick = false;
    function onScroll() {
      if (tick) return; tick = true;
      requestAnimationFrame(function () {
        var h = document.documentElement.scrollHeight - innerHeight;
        bar.style.transform = "scaleX(" + (h > 0 ? Math.min(1, scrollY / h) : 0) + ")";
        if (navEl) navEl.classList.toggle("stuck", scrollY > 20);
        tick = false;
      });
    }
    addEventListener("scroll", onScroll, { passive: true }); onScroll();
    var SPOT = ".tile,.panel,.cmd,.rank,.news-card,.soc,.step";
    document.addEventListener("pointermove", function (e) {
      var t = e.target.closest && e.target.closest(SPOT); if (!t) return;
      var r = t.getBoundingClientRect();
      t.style.setProperty("--mx", (e.clientX - r.left) + "px"); t.style.setProperty("--my", (e.clientY - r.top) + "px");
    }, { passive: true });
    if (reduce || !("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: .08, rootMargin: "0px 0px -6% 0px" });
    function watch(root) {
      root.querySelectorAll(".sec h2,.sec .lead,.tile,.step,.soc,.news-card,.event-box,.rank,.cmd-group,details.rule,.table-wrap,.page-head,.panel:not(.step):not(.soc)").forEach(function (el, i) {
        if (el.classList.contains("rv")) return;
        el.classList.add("rv"); el.style.setProperty("--d", Math.min((i % 6) * .06, .3) + "s"); io.observe(el);
      });
    }
    watch(document);
    new MutationObserver(function (m) { m.forEach(function (x) { x.addedNodes.forEach(function (n) { if (n.nodeType === 1) { if (n.matches && n.matches(".news-card,.cmd-group")) { n.classList.add("rv"); io.observe(n); } else watch(n); } }); }); }).observe(document.body, { childList: true, subtree: true });
  })();

  /* ---------- Magnetische Knöpfe, Neigung, Klick-Welle ---------- */
  (function () {
    if (matchMedia("(hover: none)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.addEventListener("pointerdown", ripple); return;
    }
    var MAG = ".btn,.join,.cta-bar,.icon-btn", TILT = ".tile,.rank,.news-card,.soc,.step";
    document.addEventListener("pointermove", function (e) {
      var m = e.target.closest && e.target.closest(MAG + ",.chip");
      if (m) {
        var r = m.getBoundingClientRect(), dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        m.style.setProperty("--mx", (e.clientX - r.left) + "px"); m.style.setProperty("--my", (e.clientY - r.top) + "px");
        if (m.matches(MAG)) { var k = m.matches(".join") ? .04 : .22; m.style.setProperty("--tx", Math.max(-9, Math.min(9, dx * k)) + "px"); m.style.setProperty("--ty", Math.max(-7, Math.min(7, dy * k * 1.4)) + "px"); }
      }
      var t = e.target.closest && e.target.closest(TILT);
      if (t) {
        var b = t.getBoundingClientRect(), px = (e.clientX - b.left) / b.width, py = (e.clientY - b.top) / b.height;
        t.style.setProperty("--rx", ((.5 - py) * 5).toFixed(2) + "deg"); t.style.setProperty("--ry", ((px - .5) * 6).toFixed(2) + "deg");
      }
    }, { passive: true });
    document.addEventListener("pointerout", function (e) {
      var m = e.target.closest && e.target.closest(MAG), t = e.target.closest && e.target.closest(TILT);
      if (m && !m.contains(e.relatedTarget)) { m.style.setProperty("--tx", "0px"); m.style.setProperty("--ty", "0px"); }
      if (t && !t.contains(e.relatedTarget)) { t.style.setProperty("--rx", "0deg"); t.style.setProperty("--ry", "0deg"); }
    });
    document.addEventListener("pointerdown", ripple);
  })();
  function ripple(e) {
    var b = e.target.closest && e.target.closest(".btn,.join,.cta-bar"); if (!b) return;
    var r = b.getBoundingClientRect(), d = Math.max(r.width, r.height) * 2, s = document.createElement("span");
    s.className = "rip"; s.style.cssText = "width:" + d + "px;height:" + d + "px;left:" + (e.clientX - r.left - d / 2) + "px;top:" + (e.clientY - r.top - d / 2) + "px";
    if (getComputedStyle(b).position === "static") b.style.position = "relative";
    b.appendChild(s); setTimeout(function () { s.remove(); }, 750);
  }
})();
