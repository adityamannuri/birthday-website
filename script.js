/* ==========================================================================
   A LITTLE UNIVERSE OF US
   A romantic, cinematic birthday experience.
   Vanilla JS + GSAP/ScrollTrigger + Three.js
   ========================================================================== */

(() => {
  "use strict";

  /* ==========================================================================
     DATA
     ========================================================================== */

  const photos = [
    {
      src: "images/photo01.jpg",
      thumb: "images/thumbs/photo01.jpg",
      w: 900,
      h: 1600,
      alt: "A couple smiling together in a portrait.",
      caption: "The smile that makes everything feel right.",
    },
    {
      src: "images/photo02.jpg",
      thumb: "images/thumbs/photo02.jpg",
      w: 848,
      h: 1507,
      alt: "A couple sharing a quiet moment in a classroom.",
      caption: "A quiet moment I never wanted to end.",
    },
    {
      src: "images/photo03.jpg",
      thumb: "images/thumbs/photo03.jpg",
      w: 1152,
      h: 1536,
      alt: "A couple standing together in a green forest.",
      caption: "Somewhere between the trees and you, time stood still.",
    },
    {
      src: "images/photo04.jpg",
      thumb: "images/thumbs/photo04.jpg",
      w: 1200,
      h: 1600,
      alt: "Two hands held together in the grass.",
      caption: "Your hand in mine — my favorite place to be.",
    },
    {
      src: "images/photo05.jpg",
      thumb: "images/thumbs/photo05.jpg",
      w: 706,
      h: 1254,
      alt: "A black-and-white photo of a couple in a classroom.",
      caption: "A moment that already feels like a memory.",
    },
    {
      src: "images/photo06.jpg",
      thumb: "images/thumbs/photo06.jpg",
      w: 451,
      h: 700,
      alt: "A close-up of a couple's traditional outfits.",
      caption: "The little details that make you, you.",
    },
    {
      src: "images/photo07.jpg",
      thumb: "images/thumbs/photo07.jpg",
      w: 900,
      h: 1600,
      alt: "A couple on a campus walkway.",
      caption: "That laugh. That look. That day.",
    },
    {
      src: "images/photo08.jpg",
      thumb: "images/thumbs/photo08.jpg",
      w: 1600,
      h: 900,
      alt: "A playful selfie of a couple in a classroom.",
      caption: "Ordinary days, extraordinary with you.",
    },
    {
      src: "images/photo09.jpg",
      thumb: "images/thumbs/photo09.jpg",
      w: 1600,
      h: 900,
      alt: "A couple taking a selfie together.",
      caption: "A selfie, a smile, a memory I keep.",
    },
    {
      src: "images/photo10.jpg",
      thumb: "images/thumbs/photo10.jpg",
      w: 900,
      h: 1600,
      alt: "A couple posing with colorful stickers.",
      caption: "You, being effortlessly you.",
    },
    {
      src: "images/photo11.jpg",
      thumb: "images/thumbs/photo11.jpg",
      w: 907,
      h: 1600,
      alt: "A playful selfie of a couple with a dog filter.",
      caption: "One of those little moments I'll always remember.",
    },
    {
      src: "images/photo12.jpg",
      thumb: "images/thumbs/photo12.jpg",
      w: 1600,
      h: 900,
      alt: "A couple taking a selfie in a bright room.",
      caption: "A smile I could look at forever.",
    },
    {
      src: "images/photo13.jpg",
      thumb: "images/thumbs/photo13.jpg",
      w: 1600,
      h: 900,
      alt: "A selfie of a couple surrounded by little hearts.",
      caption: "Just us, being us.",
    },
    {
      src: "images/photo14.jpg",
      thumb: "images/thumbs/photo14.jpg",
      w: 1600,
      h: 900,
      alt: "A couple smiling together in a classroom.",
      caption: "Another memory added to my heart.",
    },
    {
      src: "images/photo15.jpg",
      thumb: "images/thumbs/photo15.jpg",
      w: 1600,
      h: 900,
      alt: "A playful selfie of a couple with a dog filter.",
      caption: "Proof that happiness has a face.",
    },
    {
      src: "images/photo16.jpg",
      thumb: "images/thumbs/photo16.jpg",
      w: 1200,
      h: 1600,
      alt: "A hand holding two black hair ties.",
      caption: "The little things that hold a whole day inside them.",
    },
    {
      src: "images/photo17.jpg",
      thumb: "images/thumbs/photo17.jpg",
      w: 1200,
      h: 1600,
      alt: "A hand holding a small folded note.",
      caption: "A tiny piece of an ordinary day I want to keep.",
    },
    {
      src: "images/photo18.jpg",
      thumb: "images/thumbs/photo18.jpg",
      w: 1200,
      h: 1600,
      alt: "A hand holding a dried leaf.",
      caption: "Even the smallest things become precious with you.",
    },
    {
      src: "images/photo19.jpg",
      thumb: "images/thumbs/photo19.jpg",
      w: 1200,
      h: 1600,
      alt: "A hand holding a purple scrunchie.",
      caption: "Little keepsakes, big feelings.",
    },
    {
      src: "images/photo20.jpg",
      thumb: "images/thumbs/photo20.jpg",
      w: 1280,
      h: 720,
      alt: "A couple smiling together with sparkles on their faces.",
      caption: "And I'd choose this moment all over again.",
    },
  ];

  const timelineMemories = [
    {
      photo: 0,
      label: "Us",
      caption: "Where it all feels like home.",
    },
    {
      photo: 2,
      label: "A quiet escape",
      caption: "One of those little moments I'll always remember.",
    },
    {
      photo: 3,
      label: "Your hand in mine",
      caption: "A feeling I never want to let go of.",
    },
    {
      photo: 1,
      label: "Everyday magic",
      caption: "Just us, being us.",
    },
    {
      photo: 4,
      label: "Timeless",
      caption: "Another memory added to my heart.",
    },
    {
      photo: 19,
      label: "Us, always",
      caption: "And I'd choose it all over again.",
    },
  ];

  /* ==========================================================================
     STATE + UTILITIES
     ========================================================================== */

  const state = {
    introDone: false,
    introOpening: false,
    introScene: null,
    introTl: null,
    lightboxOpen: false,
    currentPhoto: 0,
    lastFocused: null,
    galleryTriggers: [],
    galleryFieldAnimated: false,
    heartScene: null,
    celebration: null,
    birthdayRevealed: false,
    videoStarted: false,
  };

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const isTouch = window.matchMedia("(hover: none)").matches;

  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) =>
    Array.from(context.querySelectorAll(selector));
  const pad = (n) => String(n).padStart(2, "0");
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const lerp = (a, b, t) => a + (b - a) * t;
  const rand = (min, max) => min + Math.random() * (max - min);

  function debounce(fn, wait = 200) {
    let timer = null;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), wait);
    };
  }

  function getColumnCount() {
    if (window.innerWidth <= 700) return 2;
    if (window.innerWidth <= 1080) return 3;
    return 4;
  }

  function makeIcon(id, className = "icon") {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    if (className) svg.setAttribute("class", className);
    const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttribute("href", `#${id}`);
    svg.appendChild(use);
    return svg;
  }

  function scrollToTarget(target) {
    const el = typeof target === "string" ? $(target) : target;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({
      top: Math.max(0, top),
      behavior: prefersReduced ? "auto" : "smooth",
    });
  }

  /* ==========================================================================
     BOOT
     ========================================================================== */

  function init() {
    document.documentElement.classList.remove("no-js");
    document.documentElement.classList.add("js");

    if (!window.gsap) {
      console.warn("GSAP was not found. Please check vendor/gsap.min.js.");
      return;
    }
    if (window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }

    const year = $("#year");
    if (year) year.textContent = new Date().getFullYear();

    document.body.classList.add("is-locked");

    buildHeroHearts();
    buildLetterDust();
    buildGallery();
    buildTimeline();
    buildPetals();
    buildFinaleStars();
    splitBirthdayTitle();

    initIntro();
    initMusic();
    initNavigation();
    initLightbox();
    initScrollAnimations();
    initHeartScene();
    initBirthday();
    initVideo();
    initCursor();
    initResize();

    window.addEventListener("load", () => {
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    });
  }

  /* ==========================================================================
     THREE.JS HELPERS
     ========================================================================== */

  function makeParticleTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.25, "rgba(255,235,235,0.95)");
    gradient.addColorStop(0.58, "rgba(255,190,200,0.32)");
    gradient.addColorStop(1, "rgba(255,190,200,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  function makeGlowTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    gradient.addColorStop(0, "rgba(255,255,255,0.85)");
    gradient.addColorStop(0.18, "rgba(255,210,220,0.45)");
    gradient.addColorStop(0.5, "rgba(255,150,175,0.12)");
    gradient.addColorStop(1, "rgba(255,150,175,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  function makeHeartGeometry(count, options = {}) {
    const scale = options.scale || 1;
    const thickness = options.thickness || 0.72;
    const palette = (
      options.palette || [0xff9db2, 0xf6c6d0, 0xd8b477, 0xffe0b0, 0xc23a5a]
    ).map((hex) => new THREE.Color(hex));

    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    let index = 0;
    let guard = 0;
    const maxGuard = count * 60;

    while (index < count && guard < maxGuard) {
      guard += 1;
      const x = rand(-1.34, 1.34);
      const y = rand(-1.34, 1.34);
      const a = x * x + y * y - 1;
      if (a * a * a - x * x * y * y * y > 0) continue;

      const radius = Math.hypot(x, y);
      const z =
        (Math.random() - 0.5) *
        thickness *
        (1 - Math.min(1, radius / 1.5)) *
        (0.7 + Math.random() * 0.3);

      positions[index * 3] = x * scale;
      positions[index * 3 + 1] = y * scale;
      positions[index * 3 + 2] = z * scale;

      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[index * 3] = color.r;
      colors[index * 3 + 1] = color.g;
      colors[index * 3 + 2] = color.b;

      index += 1;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions.subarray(0, index * 3), 3)
    );
    geometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors.subarray(0, index * 3), 3)
    );
    return geometry;
  }

  function makeParticleMaterial(texture, size, opacity = 0.95) {
    return new THREE.PointsMaterial({
      map: texture,
      size,
      sizeAttenuation: true,
      transparent: true,
      opacity,
      vertexColors: true,
      depthWrite: false,
      alphaTest: 0.01,
      blending: THREE.AdditiveBlending,
    });
  }

  function makeStarfield(count, texture, options = {}) {
    const positions = new Float32Array(count * 3);
    const radiusMin = options.radiusMin || 8;
    const radiusMax = options.radiusMax || 22;

    for (let i = 0; i < count; i += 1) {
      const radius = rand(radiusMin, radiusMax);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.72;
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const material = new THREE.PointsMaterial({
      map: texture,
      size: options.size || 0.035,
      sizeAttenuation: true,
      transparent: true,
      opacity: options.opacity || 0.7,
      color: options.color || 0xf6e3c5,
      depthWrite: false,
      alphaTest: 0.01,
      blending: THREE.AdditiveBlending,
    });

    return new THREE.Points(geometry, material);
  }

  function makeGlowSprite(texture, color, scale, opacity) {
    const material = new THREE.SpriteMaterial({
      map: texture,
      color,
      transparent: true,
      opacity,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(scale, scale, 1);
    return sprite;
  }

  /* ==========================================================================
     INTRO — THREE.JS PARTICLE HEART
     ========================================================================== */

  function initIntroScene() {
    if (!window.THREE) return null;
    const canvas = $("#intro-canvas");
    if (!canvas) return null;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
      });
    } catch (error) {
      return null;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.z = 6.2;

    const dpr = Math.min(
      window.devicePixelRatio || 1,
      window.innerWidth <= 700 ? 1.5 : 2
    );
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 0);
    if ("outputColorSpace" in renderer) {
      renderer.outputColorSpace = THREE.SRGBColorSpace;
    }

    const particleTexture = makeParticleTexture();
    const glowTexture = makeGlowTexture();

    const starLayerA = makeStarfield(window.innerWidth <= 700 ? 600 : 1200, particleTexture, {
      radiusMin: 10,
      radiusMax: 26,
      size: 0.035,
      opacity: 0.68,
      color: 0xf6e3c5,
    });
    const starLayerB = makeStarfield(window.innerWidth <= 700 ? 220 : 420, particleTexture, {
      radiusMin: 8,
      radiusMax: 20,
      size: 0.06,
      opacity: 0.4,
      color: 0xffb3c1,
    });
    scene.add(starLayerA, starLayerB);

    const heartGroup = new THREE.Group();
    heartGroup.position.y = 0.12;

    const heart = new THREE.Points(
      makeHeartGeometry(window.innerWidth <= 700 ? 2600 : 4600, {
        scale: 1.18,
        thickness: 0.9,
        palette: [0xff9db2, 0xf6c6d0, 0xd8b477, 0xffe0b0, 0xc23a5a],
      }),
      makeParticleMaterial(particleTexture, 0.045, 0.94)
    );
    heartGroup.add(heart);

    const glow = makeGlowSprite(glowTexture, 0xff6f8e, 4.4, 0.25);
    glow.position.z = -0.4;
    heartGroup.add(glow);

    const innerGlow = makeGlowSprite(glowTexture, 0xffc98b, 2.1, 0.13);
    innerGlow.position.z = -0.2;
    heartGroup.add(innerGlow);

    scene.add(heartGroup);

    const pointer = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    let raf = null;
    let visible = true;
    let disposed = false;
    const clock = new THREE.Clock();

    function onPointerMove(event) {
      target.x = (event.clientX / window.innerWidth - 0.5) * 0.5;
      target.y = (event.clientY / window.innerHeight - 0.5) * 0.4;
    }

    function resize() {
      const width = canvas.clientWidth || window.innerWidth;
      const height = canvas.clientHeight || window.innerHeight;
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    }

    function render() {
      if (disposed) return;
      raf = requestAnimationFrame(render);
      if (!visible) return;

      const time = clock.getElapsedTime();
      pointer.x = lerp(pointer.x, target.x, 0.035);
      pointer.y = lerp(pointer.y, target.y, 0.035);

      heartGroup.rotation.y = time * 0.16 + pointer.x * 0.7;
      heartGroup.rotation.x = Math.sin(time * 0.3) * 0.08 + pointer.y * 0.5;
      heartGroup.rotation.z = Math.sin(time * 0.22) * 0.035;
      heartGroup.scale.setScalar(1 + Math.sin(time * 1.25) * 0.026);

      starLayerA.rotation.y = time * 0.012;
      starLayerB.rotation.y = -time * 0.009;
      starLayerA.rotation.x = Math.sin(time * 0.05) * 0.05;

      camera.position.x = lerp(camera.position.x, pointer.x * 0.7, 0.04);
      camera.position.y = lerp(camera.position.y, -pointer.y * 0.5, 0.04);
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }

    function onVisibilityChange() {
      if (document.hidden) {
        visible = false;
      } else {
        visible = true;
        clock.getDelta();
      }
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    if (prefersReduced) {
      renderer.render(scene, camera);
    } else {
      render();
    }

    return {
      dispose() {
        if (disposed) return;
        disposed = true;
        visible = false;
        if (raf) cancelAnimationFrame(raf);
        window.removeEventListener("resize", resize);
        window.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("visibilitychange", onVisibilityChange);
        scene.traverse((object) => {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (object.material.map) object.material.map.dispose();
            object.material.dispose();
          }
        });
        particleTexture.dispose();
        glowTexture.dispose();
        renderer.dispose();
        canvas.style.display = "none";
      },
    };
  }

  /* ==========================================================================
     INTRO — UI / TRANSITION
     ========================================================================== */

  function initIntro() {
    const button = $("#open-heart");
    if (!button) return;

    state.introScene = initIntroScene();

    if (prefersReduced) {
      gsap.set(
        [
          "#intro-kicker",
          "#intro-line-1",
          "#intro-line-2",
          "#open-heart",
          "#intro-note",
        ],
        { autoAlpha: 1, y: 0 }
      );
    } else {
      state.introTl = gsap
        .timeline({ delay: 0.35 })
        .fromTo(
          "#intro-kicker",
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 1.1, ease: "power2.out" }
        )
        .fromTo(
          "#intro-line-1",
          { autoAlpha: 0, y: 34 },
          { autoAlpha: 1, y: 0, duration: 1.5, ease: "power3.out" },
          "-=0.55"
        )
        .fromTo(
          "#intro-line-2",
          { autoAlpha: 0, y: 22 },
          { autoAlpha: 1, y: 0, duration: 1.2, ease: "power3.out" },
          "-=0.82"
        )
        .fromTo(
          "#open-heart",
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" },
          "-=0.45"
        )
        .fromTo(
          "#intro-note",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 1 },
          "-=0.35"
        );

      setTimeout(() => {
        if (!state.introDone && !state.introOpening) {
          button.focus({ preventScroll: true });
        }
      }, 3300);
    }

    button.addEventListener("click", openHeart);
  }

  function openHeart() {
    if (state.introOpening || state.introDone) return;
    state.introOpening = true;

    if (state.introTl) state.introTl.kill();
    playMusic();

    const intro = $("#intro");
    const flash = $("#intro-flash");
    const timeline = gsap.timeline({
      onComplete: finishIntro,
    });

    if (prefersReduced) {
      timeline.to(intro, { autoAlpha: 0, duration: 0.35 }).add(revealSite);
      return;
    }

    timeline
      .to(flash, { opacity: 0.82, duration: 0.18, ease: "power2.in" })
      .to(flash, { opacity: 0, duration: 0.85, ease: "power2.out" }, "+=0.04")
      .to(
        ".intro-content",
        {
          autoAlpha: 0,
          y: -26,
          filter: "blur(10px)",
          duration: 0.9,
          ease: "power2.in",
        },
        "+=0.08"
      )
      .to(
        intro,
        { autoAlpha: 0, duration: 1.2, ease: "power2.inOut" },
        "-=0.35"
      )
      .add(revealSite, "-=0.85");
  }

  function revealSite() {
    const site = $("#site");
    const intro = $("#intro");
    const dock = $("#music-dock");

    site.removeAttribute("inert");
    site.setAttribute("aria-hidden", "false");
    intro.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-locked");
    if (dock) dock.classList.add("is-visible");

    state.introDone = true;
    state.introOpening = false;

    const heroItems = [
      ".hero-eyebrow",
      ".hero-title-top",
      ".hero-title-bottom",
      ".hero-sub",
      ".hero-btn",
      ".scroll-cue",
    ];

    if (prefersReduced) {
      gsap.set(heroItems, { autoAlpha: 1, y: 0 });
    } else {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to(".hero-bg", { opacity: 0.14, duration: 1.6 }, 0)
        .fromTo(
          ".hero-eyebrow",
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 1 },
          0.1
        )
        .fromTo(
          ".hero-title-top",
          { autoAlpha: 0, y: 42 },
          { autoAlpha: 1, y: 0, duration: 1.35 },
          0.2
        )
        .fromTo(
          ".hero-title-bottom",
          { autoAlpha: 0, y: 42 },
          { autoAlpha: 1, y: 0, duration: 1.35 },
          0.36
        )
        .fromTo(
          ".hero-sub",
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 1.1 },
          0.62
        )
        .fromTo(
          ".hero-btn",
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 1 },
          0.82
        )
        .fromTo(
          ".scroll-cue",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 1 },
          1
        );
    }

    const main = $("#main");
    if (main) {
      main.setAttribute("tabindex", "-1");
      main.focus({ preventScroll: true });
    }

    if (window.ScrollTrigger) {
      setTimeout(() => ScrollTrigger.refresh(), 350);
    }
  }

  function finishIntro() {
    const intro = $("#intro");
    if (intro) {
      intro.style.display = "none";
    }
    if (state.introScene) {
      state.introScene.dispose();
      state.introScene = null;
    }
  }

  /* ==========================================================================
     AMBIENT DECORATION BUILDERS
     ========================================================================== */

  function buildHeroHearts() {
    const container = $("#hero-hearts");
    if (!container) return;
    const count = isTouch ? 12 : 18;

    for (let i = 0; i < count; i += 1) {
      const heart = document.createElement("span");
      heart.className = "floating-heart";
      heart.style.setProperty("--x", `${rand(2, 96).toFixed(2)}%`);
      heart.style.setProperty("--size", `${rand(7, 20).toFixed(1)}px`);
      heart.style.setProperty("--dur", `${rand(15, 28).toFixed(1)}s`);
      heart.style.setProperty("--delay", `${rand(-24, 0).toFixed(1)}s`);
      heart.style.setProperty("--drift", `${rand(-60, 60).toFixed(1)}px`);
      heart.style.setProperty("--opacity", rand(0.14, 0.42).toFixed(2));
      heart.style.setProperty(
        "--color",
        Math.random() > 0.5
          ? "rgba(217, 138, 155, 0.55)"
          : "rgba(216, 180, 119, 0.42)"
      );
      heart.appendChild(makeIcon("icon-heart", ""));
      container.appendChild(heart);
    }
  }

  function buildLetterDust() {
    const container = $("#letter-dust");
    if (!container) return;
    const count = isTouch ? 9 : 14;

    for (let i = 0; i < count; i += 1) {
      const dust = document.createElement("span");
      dust.style.setProperty("--x", `${rand(4, 96).toFixed(2)}%`);
      dust.style.setProperty("--y", `${rand(12, 88).toFixed(2)}%`);
      dust.style.setProperty("--size", `${rand(1.5, 3.4).toFixed(1)}px`);
      dust.style.setProperty("--dur", `${rand(5, 10).toFixed(1)}s`);
      dust.style.setProperty("--delay", `${rand(-10, 0).toFixed(1)}s`);
      container.appendChild(dust);
    }
  }

  function buildPetals() {
    const container = $("#petals");
    if (!container) return;
    const count = isTouch ? 12 : 20;

    for (let i = 0; i < count; i += 1) {
      const petal = document.createElement("span");
      petal.className = "petal";
      petal.style.setProperty("--x", `${rand(0, 100).toFixed(2)}%`);
      petal.style.setProperty("--size", `${rand(7, 15).toFixed(1)}px`);
      petal.style.setProperty("--dur", `${rand(10, 19).toFixed(1)}s`);
      petal.style.setProperty("--delay", `${rand(-18, 0).toFixed(1)}s`);
      container.appendChild(petal);
    }
  }

  function buildFinaleStars() {
    const container = $("#finale-stars");
    if (!container) return;
    const count = isTouch ? 26 : 42;

    for (let i = 0; i < count; i += 1) {
      const star = document.createElement("span");
      star.className = "finale-star";
      star.style.setProperty("--x", `${rand(2, 98).toFixed(2)}%`);
      star.style.setProperty("--y", `${rand(4, 94).toFixed(2)}%`);
      star.style.setProperty("--size", `${rand(1, 2.6).toFixed(1)}px`);
      star.style.setProperty("--dur", `${rand(3, 8).toFixed(1)}s`);
      star.style.setProperty("--delay", `${rand(-8, 0).toFixed(1)}s`);
      star.style.setProperty("--star-opacity", rand(0.25, 0.8).toFixed(2));
      container.appendChild(star);
    }
  }

  /* ==========================================================================
     MUSIC
     ========================================================================== */

  function initMusic() {
    const audio = $("#bg-music");
    const dock = $("#music-dock");
    const toggle = $("#music-toggle");
    const mute = $("#mute-toggle");
    if (!audio || !dock || !toggle || !mute) return;

    audio.volume = 0;
    audio.muted = false;

    const update = () => {
      const playing = !audio.paused;
      dock.classList.toggle("is-playing", playing);
      dock.classList.toggle("is-muted", audio.muted);
      toggle.setAttribute("aria-pressed", String(playing));
      toggle.setAttribute(
        "aria-label",
        playing ? "Pause background music" : "Play background music"
      );
      mute.setAttribute("aria-pressed", String(audio.muted));
      mute.setAttribute(
        "aria-label",
        audio.muted ? "Unmute background music" : "Mute background music"
      );
    };

    toggle.addEventListener("click", () => {
      if (audio.paused) {
        playMusic();
      } else {
        audio.pause();
        update();
      }
    });

    mute.addEventListener("click", () => {
      audio.muted = !audio.muted;
      update();
    });

    audio.addEventListener("play", update);
    audio.addEventListener("pause", update);
    audio.addEventListener("volumechange", update);
    audio.addEventListener("error", () => {
      dock.classList.add("is-unavailable");
      console.warn("The background music could not be loaded.");
    });

    update();
  }

  function playMusic() {
    const audio = $("#bg-music");
    const dock = $("#music-dock");
    if (!audio) return;
    if (dock) dock.classList.add("is-visible");

    audio.volume = 0;
    const promise = audio.play();

    if (promise && typeof promise.then === "function") {
      promise
        .then(() => {
          gsap.to(audio, {
            volume: 0.55,
            duration: 2.6,
            ease: "power2.out",
            overwrite: true,
          });
        })
        .catch(() => {
          // Autoplay can be blocked by the browser; the user still has the
          // visible music controls to start it manually.
          if (dock) dock.classList.add("is-paused");
        });
    }
  }

  /* ==========================================================================
     CURSOR LIGHT + NAVIGATION
     ========================================================================== */

  function initCursor() {
    if (isTouch || prefersReduced) return;
    const light = $("#cursor-light");
    if (!light) return;
    let active = false;

    window.addEventListener(
      "pointermove",
      (event) => {
        if (!active) {
          active = true;
          light.style.opacity = "1";
        }
        light.style.setProperty("--mx", `${event.clientX}px`);
        light.style.setProperty("--my", `${event.clientY}px`);
      },
      { passive: true }
    );

    document.addEventListener("pointerleave", () => {
      active = false;
      light.style.opacity = "0";
    });
  }

  function initNavigation() {
    $$("[data-scroll]").forEach((link) => {
      link.addEventListener("click", (event) => {
        const href = link.getAttribute("href");
        if (href && href.startsWith("#")) {
          event.preventDefault();
          scrollToTarget(href);
        }
      });
    });

    const replay = $("#replay-btn");
    if (replay) {
      replay.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: prefersReduced ? "auto" : "smooth",
        });
      });
    }

    const topbar = $("#topbar");
    const progress = $("#scroll-progress");
    const sections = $$("main > section");
    const dots = $$(".section-dots a");
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;

      if (progress) {
        progress.style.transform = `scaleX(${
          max > 0 ? Math.min(1, y / max) : 0
        })`;
      }
      if (topbar) {
        topbar.classList.toggle("is-scrolled", y > 40);
      }

      const focusLine = window.innerHeight * 0.42;
      let activeId = sections[0] ? sections[0].id : "";
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= focusLine && rect.bottom > focusLine) {
          activeId = section.id;
        }
      });
      dots.forEach((dot) => {
        dot.classList.toggle(
          "is-active",
          dot.getAttribute("data-section") === activeId
        );
      });

      ticking = false;
    };

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      },
      { passive: true }
    );

    update();
  }

  /* ==========================================================================
     MEMORY GALLERY
     ========================================================================== */

  function buildGallery() {
    const field = $("#memory-field");
    if (!field) return;

    const columnCount = getColumnCount();
    const columns = [];
    const heights = [];

    for (let i = 0; i < columnCount; i += 1) {
      const column = document.createElement("div");
      column.className = "memory-column";
      columns.push(column);
      heights.push(0);
    }

    photos.forEach((photo, index) => {
      let target = 0;
      for (let i = 1; i < columnCount; i += 1) {
        if (heights[i] < heights[target]) target = i;
      }
      columns[target].appendChild(makeMemoryCard(photo, index));
      heights[target] += photo.h / photo.w;
    });

    field.replaceChildren(...columns);
    animateGalleryCards();
  }

  function makeMemoryCard(photo, index) {
    const narrow = window.innerWidth <= 700;
    const seedA = ((index * 73 + 19) % 101) / 101;
    const seedB = ((index * 41 + 7) % 97) / 97;
    const rotation = (seedA - 0.5) * (narrow ? 2.2 : 4.2);
    const depth = (seedB - 0.5) * (narrow ? 34 : 104);

    const card = document.createElement("button");
    card.type = "button";
    card.className = "memory-card";
    card.style.setProperty("--rot", `${rotation.toFixed(2)}deg`);
    card.style.setProperty("--z", `${depth.toFixed(1)}px`);
    card.setAttribute(
      "aria-label",
      `Open memory ${pad(index + 1)}: ${photo.caption}`
    );
    card.addEventListener("click", () => openLightbox(index));

    const reveal = document.createElement("span");
    reveal.className = "memory-reveal";

    const float = document.createElement("span");
    float.className = "memory-float";
    float.style.setProperty("--float-dur", `${(6.4 + (index % 5) * 0.7).toFixed(1)}s`);
    float.style.setProperty("--float-delay", `${(-(index % 7) * 0.9).toFixed(1)}s`);

    const frame = document.createElement("span");
    frame.className = "memory-frame";

    const image = document.createElement("img");
    image.className = "memory-img";
    image.src = photo.thumb;
    image.alt = photo.alt;
    image.width = photo.w;
    image.height = photo.h;
    image.loading = "lazy";
    image.decoding = "async";
    image.draggable = false;

    frame.appendChild(image);

    const meta = document.createElement("span");
    meta.className = "memory-meta";

    const number = document.createElement("span");
    number.className = "memory-num";
    number.textContent = pad(index + 1);

    const caption = document.createElement("span");
    caption.className = "memory-cap";
    caption.textContent = photo.caption;

    meta.append(number, caption);
    float.append(frame, meta);
    reveal.appendChild(float);
    card.appendChild(reveal);

    return card;
  }

  function animateGalleryCards() {
    state.galleryTriggers.forEach(({ tween, trigger }) => {
      if (tween) tween.kill();
      if (trigger) trigger.kill();
    });
    state.galleryTriggers = [];

    if (prefersReduced) return;

    $$(".memory-card").forEach((card, index) => {
      const reveal = card.querySelector(".memory-reveal");
      if (!reveal) return;

      const tween = gsap.from(reveal, {
        y: 34,
        autoAlpha: 0,
        duration: 0.9,
        delay: (index % 4) * 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 94%",
          once: true,
        },
      });

      state.galleryTriggers.push({
        tween,
        trigger: tween.scrollTrigger,
      });
    });
  }

  /* ==========================================================================
     LIGHTBOX
     ========================================================================== */

  function initLightbox() {
    const lightbox = $("#lightbox");
    if (!lightbox) return;

    const close = $("#lightbox-close");
    const previous = $("#lightbox-prev");
    const next = $("#lightbox-next");
    const figure = $("#lightbox-figure");

    if (close) close.addEventListener("click", closeLightbox);
    if (previous) previous.addEventListener("click", () => stepLightbox(-1));
    if (next) next.addEventListener("click", () => stepLightbox(1));

    $$("[data-lightbox-close]", lightbox).forEach((element) => {
      element.addEventListener("click", closeLightbox);
    });

    document.addEventListener("keydown", (event) => {
      if (!state.lightboxOpen) return;

      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        stepLightbox(-1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        stepLightbox(1);
      } else if (event.key === "Tab") {
        trapFocus(event, lightbox);
      }
    });

    if (!figure) return;

    let swipeStart = null;

    figure.addEventListener("pointerdown", (event) => {
      swipeStart = event.clientX;
    });

    figure.addEventListener("pointerup", (event) => {
      if (swipeStart === null) return;
      const distance = event.clientX - swipeStart;
      swipeStart = null;
      if (Math.abs(distance) > 55) {
        stepLightbox(distance > 0 ? -1 : 1);
      }
    });

    figure.addEventListener("pointercancel", () => {
      swipeStart = null;
    });
  }

  function trapFocus(event, container) {
    const focusable = $$(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      container
    ).filter((element) => !element.disabled && element.offsetParent !== null);

    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function openLightbox(index) {
    const lightbox = $("#lightbox");
    if (!lightbox) return;

    state.lastFocused = document.activeElement;
    state.lightboxOpen = true;
    state.currentPhoto = clamp(index, 0, photos.length - 1);

    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");

    const figure = $("#lightbox-figure");
    gsap.killTweensOf([lightbox, figure]);
    gsap.set(lightbox, { autoAlpha: 1 });

    if (!prefersReduced) {
      gsap.fromTo(
        lightbox,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.4, ease: "power2.out" }
      );
      if (figure) {
        gsap.fromTo(
          figure,
          { autoAlpha: 0, y: 18, scale: 0.94 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.75, ease: "power3.out" }
        );
      }
    }

    showPhoto(state.currentPhoto);

    const close = $("#lightbox-close");
    if (close) {
      setTimeout(() => close.focus({ preventScroll: true }), 80);
    }
  }

  function showPhoto(index) {
    const lightbox = $("#lightbox");
    const image = $("#lightbox-image");
    const number = $("#lightbox-number");
    const text = $("#lightbox-text");
    if (!lightbox || !image) return;

    state.currentPhoto = (index + photos.length) % photos.length;
    const photo = photos[state.currentPhoto];
    const token = (state.photoLoadToken = (state.photoLoadToken || 0) + 1);

    lightbox.classList.add("is-loading");
    image.classList.remove("is-loaded");
    image.width = photo.w;
    image.height = photo.h;
    image.alt = photo.alt;

    if (number) {
      number.textContent = `${pad(state.currentPhoto + 1)} / ${pad(
        photos.length
      )}`;
    }
    if (text) text.textContent = photo.caption;

    const onLoad = () => {
      if (token !== state.photoLoadToken) return;
      lightbox.classList.remove("is-loading");
      image.classList.add("is-loaded");
      if (!prefersReduced) {
        gsap.fromTo(
          image,
          { scale: 1.015 },
          { scale: 1, duration: 0.8, ease: "power3.out" }
        );
      }
    };

    image.onload = onLoad;
    image.onerror = () => {
      if (token !== state.photoLoadToken) return;
      lightbox.classList.remove("is-loading");
      image.classList.add("is-loaded");
    };

    image.src = photo.src;

    if (image.complete && image.naturalWidth > 0) {
      onLoad();
    }

    const preload = (target) => {
      const adjacent = photos[(target + photos.length) % photos.length];
      const preloader = new Image();
      preloader.src = adjacent.src;
    };
    preload(state.currentPhoto + 1);
    preload(state.currentPhoto - 1);
  }

  function stepLightbox(direction) {
    if (!state.lightboxOpen) return;
    const next = (state.currentPhoto + direction + photos.length) % photos.length;
    showPhoto(next);
  }

  function closeLightbox() {
    if (!state.lightboxOpen) return;
    state.lightboxOpen = false;

    const lightbox = $("#lightbox");
    const figure = $("#lightbox-figure");
    if (!lightbox) return;

    document.body.classList.remove("lightbox-open");
    lightbox.setAttribute("aria-hidden", "true");
    gsap.killTweensOf([lightbox, figure]);

    const finish = () => {
      lightbox.classList.remove("is-open", "is-loading");
      gsap.set(lightbox, { clearProps: "opacity,visibility" });
      if (figure) gsap.set(figure, { clearProps: "all" });
      if (state.lastFocused && typeof state.lastFocused.focus === "function") {
        state.lastFocused.focus({ preventScroll: true });
      }
    };

    if (prefersReduced) {
      finish();
      return;
    }

    if (figure) {
      gsap.to(figure, {
        autoAlpha: 0,
        y: 12,
        scale: 0.96,
        duration: 0.3,
        ease: "power2.in",
      });
    }

    gsap.to(lightbox, {
      autoAlpha: 0,
      duration: 0.35,
      ease: "power2.in",
      onComplete: finish,
    });
  }

  /* ==========================================================================
     TIMELINE
     ========================================================================== */

  function buildTimeline() {
    const track = $("#timeline-track");
    if (!track) return;

    $$(".timeline-item", track).forEach((item) => item.remove());

    timelineMemories.forEach((memory) => {
      const photo = photos[memory.photo];

      const item = document.createElement("article");
      item.className = "timeline-item";

      const dot = document.createElement("span");
      dot.className = "timeline-dot";
      dot.setAttribute("aria-hidden", "true");

      const card = document.createElement("div");
      card.className = "timeline-card";

      const photoButton = document.createElement("button");
      photoButton.type = "button";
      photoButton.className = "timeline-photo";
      photoButton.setAttribute("aria-label", `Open memory: ${memory.caption}`);
      photoButton.addEventListener("click", () => openLightbox(memory.photo));

      const image = document.createElement("img");
      image.src = photo.thumb;
      image.alt = photo.alt;
      image.width = photo.w;
      image.height = photo.h;
      image.loading = "lazy";
      image.decoding = "async";
      image.draggable = false;
      photoButton.appendChild(image);

      const copy = document.createElement("div");
      copy.className = "timeline-copy";

      const label = document.createElement("span");
      label.className = "timeline-label";
      label.textContent = memory.label;

      const caption = document.createElement("p");
      caption.className = "timeline-caption";
      caption.textContent = memory.caption;

      copy.append(label, caption);
      card.append(photoButton, copy);
      item.append(dot, card);
      track.appendChild(item);
    });
  }

  /* ==========================================================================
     3D PARTICLE HEART
     ========================================================================== */

  function initHeartScene() {
    if (!window.THREE) return null;

    const section = $("#heart");
    const canvas = $("#heart-canvas");
    if (!section || !canvas) return null;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
      });
    } catch (error) {
      return null;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
    let compact = window.innerWidth <= 900;
    camera.position.z = compact ? 6.6 : 5.7;

    const dpr = Math.min(
      window.devicePixelRatio || 1,
      compact ? 1.5 : 2
    );
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 0);
    if ("outputColorSpace" in renderer) {
      renderer.outputColorSpace = THREE.SRGBColorSpace;
    }

    const particleTexture = makeParticleTexture();
    const glowTexture = makeGlowTexture();

    const starLayerA = makeStarfield(
      compact ? 520 : 1150,
      particleTexture,
      {
        radiusMin: 10,
        radiusMax: 27,
        size: 0.035,
        opacity: 0.62,
        color: 0xf6e3c5,
      }
    );
    const starLayerB = makeStarfield(
      compact ? 180 : 380,
      particleTexture,
      {
        radiusMin: 8,
        radiusMax: 20,
        size: 0.062,
        opacity: 0.36,
        color: 0xffb3c1,
      }
    );
    scene.add(starLayerA, starLayerB);

    const heartGroup = new THREE.Group();
    let baseScale = compact ? 0.92 : 1.12;
    heartGroup.position.set(compact ? 0 : 1.28, compact ? 0.92 : 0.05, 0);
    heartGroup.scale.setScalar(baseScale);

    const heart = new THREE.Points(
      makeHeartGeometry(compact ? 3000 : 6200, {
        scale: 1.18,
        thickness: 0.95,
        palette: [
          0xff9db2,
          0xf6c6d0,
          0xd8b477,
          0xffe0b0,
          0xc23a5a,
          0xffd9a0,
        ],
      }),
      makeParticleMaterial(particleTexture, compact ? 0.06 : 0.05, 0.95)
    );
    heartGroup.add(heart);

    const sparkle = new THREE.Points(
      makeHeartGeometry(compact ? 320 : 720, {
        scale: 1.18,
        thickness: 0.95,
        palette: [0xffe0b0, 0xd8b477, 0xfff4d9],
      }),
      makeParticleMaterial(particleTexture, compact ? 0.095 : 0.08, 0.85)
    );
    heartGroup.add(sparkle);

    const glow = makeGlowSprite(glowTexture, 0xff6f8e, 5.2, 0.22);
    glow.position.z = -0.5;
    heartGroup.add(glow);

    const innerGlow = makeGlowSprite(glowTexture, 0xffc98b, 2.5, 0.12);
    innerGlow.position.z = -0.2;
    heartGroup.add(innerGlow);

    const orbitCount = compact ? 70 : 160;
    const orbitPositions = new Float32Array(orbitCount * 3);
    const orbitData = [];

    for (let i = 0; i < orbitCount; i += 1) {
      orbitData.push({
        radius: rand(1.7, 3.1),
        speed: rand(0.1, 0.32) * (Math.random() > 0.5 ? 1 : -1),
        phase: rand(0, Math.PI * 2),
        y: rand(-1.1, 1.2),
        squash: rand(0.4, 0.8),
        wobble: rand(0.1, 0.3),
      });
    }

    const orbitGeometry = new THREE.BufferGeometry();
    orbitGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(orbitPositions, 3)
    );

    const orbitMaterial = new THREE.PointsMaterial({
      map: particleTexture,
      size: compact ? 0.045 : 0.035,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.55,
      color: 0xf6dfae,
      depthWrite: false,
      alphaTest: 0.01,
      blending: THREE.AdditiveBlending,
    });

    const orbit = new THREE.Points(orbitGeometry, orbitMaterial);
    heartGroup.add(orbit);
    scene.add(heartGroup);

    const pointer = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const clock = new THREE.Clock();
    let raf = null;
    let visible = false;
    let disposed = false;

    function onPointerMove(event) {
      const rect = section.getBoundingClientRect();
      target.x = ((event.clientX - rect.left) / rect.width - 0.5) * 0.85;
      target.y = ((event.clientY - rect.top) / rect.height - 0.5) * 0.55;
    }

    function onPointerLeave() {
      target.x = 0;
      target.y = 0;
    }

    function updateOrbit(time) {
      const positions = orbitGeometry.attributes.position.array;
      for (let i = 0; i < orbitData.length; i += 1) {
        const data = orbitData[i];
        const angle = data.phase + time * data.speed;
        positions[i * 3] = Math.cos(angle) * data.radius;
        positions[i * 3 + 1] = data.y + Math.sin(angle * 1.7) * data.wobble;
        positions[i * 3 + 2] =
          Math.sin(angle) * data.radius * data.squash;
      }
      orbitGeometry.attributes.position.needsUpdate = true;
    }

    function resize() {
      const width = canvas.clientWidth || section.clientWidth;
      const height = canvas.clientHeight || section.clientHeight;
      if (!width || !height) return;

      compact = window.innerWidth <= 900;
      baseScale = compact ? 0.92 : 1.12;

      camera.aspect = width / height;
      camera.position.z = compact ? 6.6 : 5.7;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);

      heartGroup.position.set(
        compact ? 0 : 1.28,
        compact ? 0.92 : 0.05,
        0
      );
      heartGroup.scale.setScalar(baseScale);

      if (prefersReduced) {
        updateOrbit(0);
        renderer.render(scene, camera);
      }
    }

    function render() {
      raf = null;
      if (disposed) return;
      if (!visible || document.hidden) return;

      const time = clock.getElapsedTime();
      pointer.x = lerp(pointer.x, target.x, 0.04);
      pointer.y = lerp(pointer.y, target.y, 0.04);

      heartGroup.rotation.y =
        -0.15 + pointer.x * 0.9 + Math.sin(time * 0.22) * 0.12;
      heartGroup.rotation.x =
        pointer.y * 0.55 + Math.sin(time * 0.3) * 0.05;
      heartGroup.rotation.z = Math.sin(time * 0.18) * 0.04;
      heartGroup.position.y =
        (compact ? 0.92 : 0.05) + Math.sin(time * 0.8) * 0.045;
      heartGroup.scale.setScalar(
        baseScale * (1 + Math.sin(time * 1.1) * 0.02)
      );

      starLayerA.rotation.y = time * 0.01;
      starLayerB.rotation.y = -time * 0.008;
      updateOrbit(time);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(render);
    }

    function start() {
      if (raf || disposed) return;
      visible = true;
      clock.getDelta();
      raf = requestAnimationFrame(render);
    }

    function stop() {
      visible = false;
      if (raf) {
        cancelAnimationFrame(raf);
        raf = null;
      }
    }

    function onVisibilityChange() {
      if (document.hidden) {
        if (raf) {
          cancelAnimationFrame(raf);
          raf = null;
        }
      } else if (visible) {
        start();
      }
    }

    if (!isTouch && !prefersReduced) {
      section.addEventListener("pointermove", onPointerMove, {
        passive: true,
      });
      section.addEventListener("pointerleave", onPointerLeave);
    }

    document.addEventListener("visibilitychange", onVisibilityChange);
    resize();

    if (prefersReduced) {
      heartGroup.rotation.set(0.02, -0.15, 0);
      updateOrbit(0);
      renderer.render(scene, camera);
    } else if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting) {
            start();
          } else {
            stop();
          }
        },
        { rootMargin: "180px 0px" }
      );
      observer.observe(section);
    } else {
      start();
    }

    const sceneApi = {
      resize,
      start,
      stop,
      dispose() {
        disposed = true;
        stop();
        document.removeEventListener("visibilitychange", onVisibilityChange);
        section.removeEventListener("pointermove", onPointerMove);
        section.removeEventListener("pointerleave", onPointerLeave);
        scene.traverse((object) => {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (object.material.map) object.material.map.dispose();
            object.material.dispose();
          }
        });
        particleTexture.dispose();
        glowTexture.dispose();
        renderer.dispose();
      },
    };

    state.heartScene = sceneApi;
    return sceneApi;
  }

  /* ==========================================================================
     SCROLL ANIMATIONS
     ========================================================================== */

  function initScrollAnimations() {
    if (!window.ScrollTrigger) {
      gsap.set(".finale-line, .finale-script, .replay-btn", {
        autoAlpha: 1,
      });
      return;
    }

    if (prefersReduced) {
      gsap.set(".finale-line, .finale-script, .replay-btn", {
        autoAlpha: 1,
      });
      return;
    }

    $$(".section-head").forEach((head) => {
      gsap.from(Array.from(head.children), {
        y: 28,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: head,
          start: "top 84%",
          once: true,
        },
      });
    });

    gsap.from("#love-letter", {
      y: 70,
      autoAlpha: 0,
      duration: 1.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#love-letter",
        start: "top 84%",
        once: true,
      },
    });

    gsap.from("#love-letter > p", {
      y: 18,
      autoAlpha: 0,
      duration: 0.8,
      stagger: 0.09,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#love-letter",
        start: "top 76%",
        once: true,
      },
    });

    gsap.from(".letter-wax", {
      scale: 0,
      rotate: -50,
      duration: 1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: "#love-letter",
        start: "top 70%",
        once: true,
      },
    });

    gsap.from(".letter-footnote", {
      autoAlpha: 0,
      duration: 1,
      scrollTrigger: {
        trigger: ".letter-footnote",
        start: "top 94%",
        once: true,
      },
    });

    if (!state.galleryFieldAnimated) {
      state.galleryFieldAnimated = true;
      gsap.fromTo(
        "#memory-field",
        { y: 80, scale: 0.97 },
        {
          y: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "#memory-stage",
            start: "top bottom",
            end: "top 30%",
            scrub: 1,
          },
        }
      );
    }

    const stage = $("#memory-stage");
    const parallax = $("#memory-parallax");
    if (stage && parallax && !isTouch) {
      const rotateY = gsap.quickTo(parallax, "rotationY", {
        duration: 1.2,
        ease: "power3.out",
      });
      const rotateX = gsap.quickTo(parallax, "rotationX", {
        duration: 1.2,
        ease: "power3.out",
      });

      stage.addEventListener(
        "pointermove",
        (event) => {
          const rect = stage.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;
          rotateY(x * 5);
          rotateX(-y * 3.5);
        },
        { passive: true }
      );

      stage.addEventListener("pointerleave", () => {
        rotateY(0);
        rotateX(0);
      });
    }

    gsap.to("#timeline-progress", {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: "#timeline-track",
        start: "top 72%",
        end: "bottom 78%",
        scrub: 0.6,
      },
    });

    $$(".timeline-item").forEach((item, index) => {
      const offset = window.innerWidth <= 900 ? -26 : index % 2 === 0 ? -54 : 54;
      gsap.from(item, {
        x: offset,
        autoAlpha: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 88%",
          once: true,
        },
      });

      const dot = item.querySelector(".timeline-dot");
      if (dot) {
        gsap.from(dot, {
          autoAlpha: 0,
          duration: 0.7,
          scrollTrigger: {
            trigger: item,
            start: "top 88%",
            once: true,
          },
        });
      }
    });

    gsap.from("#motion-memory", {
      y: 50,
      autoAlpha: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#motion-memory",
        start: "top 86%",
        once: true,
      },
    });

    gsap.from(".heart-content > *", {
      y: 24,
      autoAlpha: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#heart",
        start: "top 62%",
        once: true,
      },
    });

    gsap.from(".favorite-frame", {
      y: 60,
      autoAlpha: 0,
      rotate: -3,
      duration: 1.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#favorite",
        start: "top 78%",
        once: true,
      },
    });

    gsap.from(".favorite-copy > *", {
      y: 24,
      autoAlpha: 0,
      duration: 0.9,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#favorite",
        start: "top 74%",
        once: true,
      },
    });

    gsap.fromTo(
      ".favorite-image",
      { scale: 1.02 },
      {
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: "#favorite",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      }
    );

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#finale",
          start: "top 68%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      })
      .fromTo(
        ".finale-heart",
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 1.1 },
        0
      )
      .fromTo(
        ".finale-line-1",
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.8 },
        0.2
      )
      .fromTo(
        ".finale-line-2",
        { autoAlpha: 0, y: 26 },
        { autoAlpha: 1, y: 0, duration: 1 },
        0.4
      )
      .fromTo(
        ".finale-line-3",
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.8 },
        0.65
      )
      .fromTo(
        ".finale-script",
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.9 },
        0.85
      )
      .fromTo(
        ".replay-btn",
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.8 },
        1.05
      )
      .fromTo(
        ".footer",
        { autoAlpha: 0 },
        { autoAlpha: 0.55, duration: 0.8 },
        1.2
      );
  }

  /* ==========================================================================
     BIRTHDAY REVEAL + CELEBRATION
     ========================================================================== */

  function splitBirthdayTitle() {
    const title = $("#birthday-title");
    if (!title) return;

    // Keep the phrase as one text node so the gradient background-clip
    // stays continuous across the whole title. The reveal still animates
    // the heading as a single cinematic element.
    const text = title.textContent.trim();
    title.setAttribute("aria-label", text);
    title.dataset.prepared = "true";
    title.textContent = text;
  }

  function createCelebration(canvas) {
    if (!canvas) {
      return { start() {}, stop() {}, resize() {} };
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return { start() {}, stop() {}, resize() {} };
    }

    const colors = [
      "#f6dfae",
      "#f3b6c2",
      "#e8c88c",
      "#ff9db2",
      "#fff4d9",
    ];

    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = null;
    let running = false;
    let endAt = 0;
    let lastBurst = 0;
    let particles = [];

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const nextWidth = Math.max(1, rect.width);
      const nextHeight = Math.max(1, rect.height);
      const nextDpr = Math.min(window.devicePixelRatio || 1, 2);

      if (
        nextWidth === width &&
        nextHeight === height &&
        nextDpr === dpr
      ) {
        return;
      }

      width = nextWidth;
      height = nextHeight;
      dpr = nextDpr;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, width, height);
    }

    function burst(x, y) {
      const count = window.innerWidth <= 700 ? 54 : 86;
      const color = colors[Math.floor(Math.random() * colors.length)];

      for (let i = 0; i < count; i += 1) {
        const angle = Math.random() * Math.PI * 2;
        const speed = rand(0.9, 5.2) * (0.55 + Math.random() * 0.45);
        const life = Math.round(rand(42, 86));

        particles.push({
          x,
          y,
          px: x,
          py: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life,
          maxLife: life,
          size: rand(0.7, 1.9),
          color,
        });
      }
    }

    function frame(now) {
      raf = null;

      if (!running && particles.length === 0) {
        context.clearRect(0, 0, width, height);
        return;
      }

      if (running && now >= endAt) running = false;

      if (running && now - lastBurst > 420) {
        lastBurst = now;
        burst(
          rand(width * 0.16, width * 0.84),
          rand(height * 0.14, height * 0.56)
        );
      }

      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "lighter";

      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const particle = particles[i];
        particle.px = particle.x;
        particle.py = particle.y;
        particle.vx *= 0.986;
        particle.vy = particle.vy * 0.986 + 0.026;
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 1;

        if (particle.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        const alpha = Math.max(0, particle.life / particle.maxLife);

        context.globalAlpha = alpha * 0.9;
        context.strokeStyle = particle.color;
        context.lineWidth = particle.size;
        context.beginPath();
        context.moveTo(particle.px, particle.py);
        context.lineTo(particle.x, particle.y);
        context.stroke();

        context.globalAlpha = alpha * 0.35;
        context.fillStyle = particle.color;
        context.beginPath();
        context.arc(
          particle.x,
          particle.y,
          particle.size * 1.7,
          0,
          Math.PI * 2
        );
        context.fill();
      }

      context.globalAlpha = 1;
      context.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(frame);
    }

    function start(duration = 6000) {
      if (prefersReduced) return;
      resize();
      if (!width || !height) return;

      running = true;
      endAt = performance.now() + duration;
      lastBurst = 0;
      burst(width * 0.5, height * 0.42);
      burst(width * 0.24, height * 0.32);
      burst(width * 0.76, height * 0.35);

      if (!raf) raf = requestAnimationFrame(frame);
    }

    function stop() {
      running = false;
      endAt = 0;
    }

    resize();

    return { start, stop, resize };
  }

  function initBirthday() {
    const section = $("#birthday");
    const reveal = $("#birthday-reveal");
    if (!section || !reveal) return;

    const cake = $(".cake-wrap");
    const sub = $(".birthday-sub");
    const wishButton = $("#wish-btn");
    const note = $("#wish-note");
    const title = $("#birthday-title");
    const letters = title ? $$(".letter", title) : [];
    const titleTargets = letters.length ? letters : [title].filter(Boolean);

    const celebration = createCelebration($("#celebration-canvas"));
    state.celebration = celebration;

    const revealBirthday = () => {
      if (state.birthdayRevealed) return;
      state.birthdayRevealed = true;
      section.classList.add("is-revealed");

      if (prefersReduced) {
        gsap.set(reveal, { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.set(reveal, { autoAlpha: 0, y: 28 });

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to(reveal, {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        })
        .from(
          cake,
          {
            scale: 0.55,
            autoAlpha: 0,
            y: 34,
            rotate: -4,
            duration: 1.35,
            ease: "back.out(1.5)",
          },
          "-=0.55"
        )
        .from(
          titleTargets,
          {
            autoAlpha: 0,
            y: 42,
            scale: 0.96,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.85"
        )
        .from(
          sub,
          { autoAlpha: 0, y: 18, duration: 0.8 },
          "-=0.45"
        )
        .from(
          wishButton,
          { autoAlpha: 0, y: 18, duration: 0.7 },
          "-=0.35"
        )
        .from(
          note,
          { autoAlpha: 0, duration: 0.7 },
          "-=0.35"
        );

      gsap.delayedCall(0.55, () => celebration.start(7000));
    };

    if (window.ScrollTrigger) {
      ScrollTrigger.create({
        trigger: section,
        start: "top 62%",
        once: true,
        onEnter: revealBirthday,
      });
    } else {
      revealBirthday();
    }

    if (wishButton) {
      wishButton.addEventListener("click", () => {
        if (!state.birthdayRevealed) return;

        celebration.start(4500);

        if (note) {
          note.textContent =
            "Wish sent to the universe. I hope it finds you. \u2728";
          note.classList.add("is-wished");
        }

        if (!prefersReduced) {
          if (cake) {
            gsap.fromTo(
              cake,
              { scale: 1 },
              {
                scale: 1.06,
                duration: 0.4,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut",
              }
            );
          }
          gsap.fromTo(
            wishButton,
            { scale: 1 },
            {
              scale: 0.97,
              duration: 0.15,
              yoyo: true,
              repeat: 1,
              ease: "power2.inOut",
            }
          );
        }
      });
    }
  }

  /* ==========================================================================
     VIDEO
     ========================================================================== */

  function initVideo() {
    const video = $("#memory-video");
    if (!video) return;

    const button = $("#video-play");
    const frame = video.closest(".motion-frame");

    video.controls = false;
    video.muted = true;
    video.loop = true;

    const play = () => {
      const promise = video.play();
      if (promise && typeof promise.catch === "function") {
        promise.catch(() => {});
      }
    };

    if (button) {
      button.addEventListener("click", play);
    }

    video.addEventListener("click", () => {
      if (video.paused) {
        play();
      } else {
        video.pause();
      }
    });

    video.addEventListener("play", () => {
      if (frame) frame.classList.add("is-playing");
    });

    video.addEventListener("pause", () => {
      if (frame) frame.classList.remove("is-playing");
    });

    video.addEventListener("ended", () => {
      if (frame) frame.classList.remove("is-playing");
    });
  }

  /* ==========================================================================
     RESIZE
     ========================================================================== */

  function initResize() {
    let lastColumns = getColumnCount();

    const onResize = debounce(() => {
      const nextColumns = getColumnCount();

      if (nextColumns !== lastColumns) {
        lastColumns = nextColumns;
        buildGallery();
      }

      if (state.heartScene) state.heartScene.resize();
      if (state.celebration) state.celebration.resize();
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    }, 250);

    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
  }

  /* ==========================================================================
     START
     ========================================================================== */

  document.addEventListener("DOMContentLoaded", init);
})();
