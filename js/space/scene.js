/* ============================================================
   SPACE — the living wallpaper behind the glass OS.
   Particle nebula + morphing wireframe icosahedron (Three.js),
   recolored to the iOS aurora palette (blue leads, violet/cyan
   as atmosphere).

   Boot integration: uProgress 0→1 — particles converge from
   scatter and the core forms while the boot bar fills.
   Performance: DPR cap, mobile particle budget, tab-visibility
   pause, light-mode/wireframe sleep, reduced-motion static frame.
   ============================================================ */
(function (MOS) {
  "use strict";

  var api = {
    setProgress: function () {},
    setActive: function () {},
    ready: false
  };
  MOS.space = api;

  MOS.register("space", function () {
    if (!MOS.hasTHREE()) return;             // graceful: CSS orbs still give atmosphere
    var host = MOS.$("#space");
    if (!host) return;

    var THREE = window.THREE;
    var isMobile = MOS.MOBILE;

    var renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true, powerPreference: "high-performance" });
    } catch (e) { return; }

    var DPR = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(DPR);
    host.appendChild(renderer.domElement);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 6.5);

    var group = new THREE.Group();
    scene.add(group);

    /* ---- morphing icosahedron (the "core") ---- */
    var icoGeo = new THREE.IcosahedronGeometry(1.7, isMobile ? 2 : 3);
    var morphMat = new THREE.ShaderMaterial({
      wireframe: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: {
        uTime:   { value: 0 },
        uColorA: { value: new THREE.Color("#FF9F0A") },   /* orange-soft */
        uColorB: { value: new THREE.Color("#F59E0B") },   /* amber */
        uMix:    { value: 0 }                              /* scroll → orange-deep accent */
      },
      vertexShader: [
        "uniform float uTime; varying float vD;",
        "float ns(vec3 p){return sin(p.x*1.6+uTime)*0.5+sin(p.y*1.8+uTime*1.1)*0.5+sin(p.z*1.4+uTime*0.9)*0.5;}",
        "void main(){ float d=ns(position*1.1)*0.22; vD=d; vec3 p=position+normal*d;",
        "  gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}"
      ].join("\n"),
      fragmentShader: [
        "uniform vec3 uColorA; uniform vec3 uColorB; uniform float uMix; varying float vD;",
        "void main(){ float t=clamp(vD*1.8+0.5,0.0,1.0); vec3 c=mix(uColorA,uColorB,t);",
        "  c=mix(c,vec3(0.918,0.345,0.047),uMix*0.5);",   /* #EA580C orange drift on scroll */
        "  gl_FragColor=vec4(c,0.38);}"
      ].join("\n")
    });
    var ico = new THREE.Mesh(icoGeo, morphMat);
    group.add(ico);

    /* faint solid core inside the wireframe */
    var core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.55, 1),
      new THREE.MeshBasicMaterial({ color: new THREE.Color("#0A1128"), transparent: true, opacity: 0.3 })
    );
    group.add(core);

    /* ---- particle nebula (converges on boot) ---- */
    var COUNT = isMobile ? 1500 : (MOS.FINE ? 5200 : 3600);
    var pos = new Float32Array(COUNT * 3);
    var col = new Float32Array(COUNT * 3);
    var scl = new Float32Array(COUNT);
    /* aurora distribution: orange leads (60%), white/light grey (25%), deep orange sparks (15%) */
    var cA = new THREE.Color("#FF9F0A"), cB = new THREE.Color("#E5E7EB"), cC = new THREE.Color("#F97316");
    for (var i = 0; i < COUNT; i++) {
      var r = 3 + Math.pow(Math.random(), 0.6) * 9;
      var th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
      pos[i * 3]     = r * Math.sin(ph) * Math.cos(th);
      pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.7;
      pos[i * 3 + 2] = r * Math.cos(ph);
      var m = Math.random();
      var c = m < 0.6 ? cA : (m < 0.85 ? cB : cC);
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
      scl[i] = Math.random() * 1.6 + 0.3;
    }
    var pg = new THREE.BufferGeometry();
    pg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    pg.setAttribute("aColor", new THREE.BufferAttribute(col, 3));
    pg.setAttribute("aScale", new THREE.BufferAttribute(scl, 1));
    var pMat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: {
        uTime:     { value: 0 },
        uSize:     { value: isMobile ? 30 : 40 },
        uPr:       { value: DPR },
        uProgress: { value: 0 }   /* 0 = scattered (boot start) → 1 = settled nebula */
      },
      vertexShader: [
        "attribute float aScale; attribute vec3 aColor;",
        "uniform float uTime; uniform float uSize; uniform float uPr; uniform float uProgress;",
        "varying vec3 vC; varying float vA;",
        "void main(){",
        "  vec3 p=position;",
        "  p*=mix(2.4,1.0,uProgress);",                       /* convergence */
        "  p.y+=sin(uTime*0.3+position.x*0.4)*0.35;",
        "  p.x+=cos(uTime*0.22+position.z*0.4)*0.35;",
        "  vec4 mv=modelViewMatrix*vec4(p,1.0);",
        "  gl_Position=projectionMatrix*mv;",
        "  gl_PointSize=uSize*aScale*uPr*(1.0/-mv.z);",
        "  vC=aColor; vA=mix(0.25,1.0,uProgress);}"
      ].join("\n"),
      fragmentShader: [
        "varying vec3 vC; varying float vA;",
        "void main(){ float d=distance(gl_PointCoord,vec2(0.5)); float s=smoothstep(0.5,0.0,d); s=pow(s,1.6);",
        "  gl_FragColor=vec4(vC,s*0.85*vA);}"
      ].join("\n")
    });
    group.add(new THREE.Points(pg, pMat));

    /* ---- interaction state ---- */
    var tmx = 0, tmy = 0, mxv = 0, myv = 0;
    window.addEventListener("mousemove", function (e) {
      tmx = (e.clientX / window.innerWidth - 0.5);
      tmy = (e.clientY / window.innerHeight - 0.5);
    }, { passive: true });
    if (isMobile) {
      window.addEventListener("deviceorientation", function (e) {
        if (e.gamma != null) {
          tmx = MOS.clamp(e.gamma / 45, -1, 1) * 0.5;
          tmy = MOS.clamp(e.beta / 90, -1, 1) * 0.5;
        }
      }, true);
    }
    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }, 150);
    });

    /* ---- boot convergence + lifecycle ---- */
    var bootProg = MOS.REDUCE ? 1 : 0;
    var active = true;       /* false = sleeping (light mode / wireframe / hidden tab) */
    var rafId = null;

    api.setProgress = function (v) { bootProg = MOS.clamp(v, 0, 1); };
    api.setActive = function (on) {
      active = !!on;
      if (active && rafId === null && !MOS.REDUCE) loop();
    };

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) { stop(); }
      else if (active && !MOS.REDUCE) loop();
    });

    function stop() {
      if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
    }

    var clock = new THREE.Clock();
    function render() {
      var t = clock.getElapsedTime();
      var sp = MOS.state.scrollProgress;
      var eased = bootProg * bootProg * (3 - 2 * bootProg);   /* smoothstep on boot progress */

      morphMat.uniforms.uTime.value = t;
      pMat.uniforms.uTime.value = t;
      pMat.uniforms.uProgress.value = eased;

      /* mouse drift respects the Brand Systems toggle */
      var drift = MOS.state.isAIActive ? 1 : 0;
      mxv = MOS.lerp(mxv, tmx * drift, 0.05);
      myv = MOS.lerp(myv, tmy * drift, 0.05);

      group.rotation.y = t * 0.04 + mxv * 0.6;
      group.rotation.x = myv * 0.4 + sp * 0.6;
      ico.rotation.y = -t * 0.08; ico.rotation.z = t * 0.03;
      core.rotation.y = t * 0.06;

      /* cinematic scroll shifts + boot formation scale */
      camera.position.z = 6.5 + sp * 3.2;
      camera.position.y = sp * -1.2;
      morphMat.uniforms.uMix.value = Math.sin(sp * Math.PI);
      var sc = (0.25 + 0.75 * eased) * (1 + sp * 0.25);
      ico.scale.setScalar(sc); core.scale.setScalar(sc);

      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    }

    /* Frame budget: cap at 60fps desktop / 30fps mobile. Animation is time-based
       (clock.getElapsedTime), so fewer frames never changes motion speed — it only
       saves GPU/battery (notably on 120Hz and mobile). 60Hz desktop looks identical. */
    var FRAME_MS = MOS.MOBILE ? 1000 / 30 : 1000 / 60;
    var lastFrame = 0;
    function loop() {
      render();
      lastFrame = performance.now();
      rafId = requestAnimationFrame(function frame(now) {
        if (now - lastFrame >= FRAME_MS) {
          render();
          lastFrame = now - ((now - lastFrame) % FRAME_MS);
        }
        if (active && !document.hidden) rafId = requestAnimationFrame(frame);
        else rafId = null;
      });
    }

    if (MOS.REDUCE) {
      render();                 /* single static frame */
    } else {
      loop();
    }

    host.classList.add("is-ready");
    api.ready = true;
  });
})(window.MOS = window.MOS || {});
