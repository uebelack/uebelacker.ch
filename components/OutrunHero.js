import React, { useEffect, useRef } from 'react';

/*
  ╔══════════════════════════════════════════════════════════════╗
  ║   O U T R U N   H O R I Z O N                                 ║
  ╚══════════════════════════════════════════════════════════════╝

  The hero's background: a sliced sun on the horizon, three ranges of mesas in
  flat silhouette, a starfield, and a perspective grid running toward the
  viewer. Same scene — and the same palette — as the 01-outrun-horizon
  wallpaper in davconf.

  Why canvas and not CSS: the grid has to be in real perspective and has to
  move continuously toward the camera. A CSS `rotateX` grid (which is what the
  footer uses) is convincing while it is still, but animating it means
  scrolling a flat background through a 3D transform, and the apparent speed
  then goes wrong near the horizon. Projecting the lines properly is a dozen
  lines of arithmetic and it looks right.

  What keeps it cheap:
    · the sun is rendered to an offscreen canvas once per resize, because the
      gaps are punched with destination-out and nothing about it animates;
    · the mesas are a seeded silhouette, also regenerated only on resize;
    · the grid's two colours are two positional gradients created on resize,
      not per line — a canvas gradient is in canvas space, so one gradient
      spanning the ground gives every line the alpha for the depth it is at;
    · the loop stops entirely when the hero scrolls out of view, and never
      starts under prefers-reduced-motion (one static frame is drawn instead).
*/

const SKY_TOP = '#0a0518';
const SKY_MID = '#1a1033';
const SKY_HORIZON = '#2f1d52';

const MESA_LAYERS = [
  // Farthest first: lightest and lowest, dissolving into the lavender haze.
  { color: '#3b3163', amp: 0.055, lift: 0.004, step: 0.055, seed: 11 },
  { color: '#241b3a', amp: 0.082, lift: 0.0, step: 0.043, seed: 29 },
  { color: '#120a25', amp: 0.095, lift: -0.006, step: 0.032, seed: 47 },
];

// Deterministic noise, so the skyline is the same shape before and after a
// window resize instead of re-rolling itself every time.
function seeded(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function buildMesas(layer, width, height) {
  const rand = seeded(layer.seed);
  const points = [];
  const stepPx = Math.max(18, width * layer.step);
  const amp = height * layer.amp;

  for (let x = -stepPx; x <= width + stepPx; x += stepPx) {
    // Two octaves: a broad swell plus a sharp ridge, which is what makes the
    // profile read as jagged mesas rather than as rolling hills.
    const broad = rand() * 0.55 + 0.2;
    const ridge = rand() * 0.45;
    points.push({ x, y: -(broad + ridge) * amp });
  }
  return points;
}

// The sun, pre-rendered: a sunset ramp clipped to a disc, with widening gaps
// erased out of it so the night sky shows straight through.
function buildSun(radius, dpr) {
  const size = Math.ceil(radius * 2 * dpr);
  const sun = document.createElement('canvas');
  sun.width = size;
  sun.height = size;

  const ctx = sun.getContext('2d');
  if (!ctx) return sun;
  ctx.scale(dpr, dpr);

  const r = radius;
  ctx.save();
  ctx.beginPath();
  ctx.arc(r, r, r, 0, Math.PI * 2);
  ctx.clip();

  // Gold crown, magenta body, coral base — the ramp from the wallpaper brief.
  const ramp = ctx.createLinearGradient(0, 0, 0, r * 2);
  ramp.addColorStop(0, '#fff59d');
  ramp.addColorStop(0.1, '#fede5d');
  ramp.addColorStop(0.34, '#ff7edb');
  ramp.addColorStop(0.62, '#f92aad');
  ramp.addColorStop(1, '#fe4450');
  ctx.fillStyle = ramp;
  ctx.fillRect(0, 0, r * 2, r * 2);
  ctx.restore();

  // Five gaps, each thicker than the one above it. They are placed in the band
  // from -0.34r to +0.30r because the disc sits 0.62r above the horizon — any
  // lower and the slices would be behind the mesas, which is where the first
  // attempt at this put them.
  ctx.globalCompositeOperation = 'destination-out';
  for (let i = 0; i < 5; i += 1) {
    const y = r + r * (-0.34 + i * 0.16);
    const thickness = r * (0.022 + i * 0.028);
    ctx.fillRect(0, y, r * 2, thickness);
  }
  ctx.globalCompositeOperation = 'source-over';

  return sun;
}

export default function OutrunHero() {
  const hostRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return undefined;

    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Everything derived from the current size lives here and is rebuilt by
    // layout() rather than recomputed per frame.
    const scene = {
      w: 0,
      h: 0,
      dpr: 1,
      horizon: 0,
      stars: [],
      mesas: [],
      sun: null,
      sunRadius: 0,
      skyGradient: null,
      groundGradient: null,
      rayGradient: null,
      ringGradient: null,
      focal: 1,
      zNear: 1,
    };

    const layout = () => {
      const rect = host.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      // Capped at 2: beyond that the extra pixels are invisible and the fill
      // cost of the ground gradient stops being free.
      const dpr = Math.min(2, window.devicePixelRatio || 1);

      scene.w = w;
      scene.h = h;
      scene.dpr = dpr;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // The horizon sits low, so the grid gets the bottom third and the sun
      // still clears the headline that sits over it.
      scene.horizon = Math.round(h * 0.66);
      const ground = Math.max(1, h - scene.horizon);

      scene.skyGradient = ctx.createLinearGradient(0, 0, 0, scene.horizon);
      scene.skyGradient.addColorStop(0, SKY_TOP);
      scene.skyGradient.addColorStop(0.55, SKY_MID);
      scene.skyGradient.addColorStop(1, SKY_HORIZON);

      scene.groundGradient = ctx.createLinearGradient(0, scene.horizon, 0, h);
      scene.groundGradient.addColorStop(0, '#2a1a4a');
      scene.groundGradient.addColorStop(0.35, '#150d2b');
      scene.groundGradient.addColorStop(1, '#0a0518');

      // One gradient per grid colour, spanning the ground. Because a canvas
      // gradient is positioned in canvas space, a line stroked with it picks
      // up the alpha belonging to its own depth — brightest at the horizon,
      // gone by the time it reaches the camera.
      scene.ringGradient = ctx.createLinearGradient(0, scene.horizon, 0, h);
      scene.ringGradient.addColorStop(0, 'rgba(249, 42, 173, 0.9)');
      scene.ringGradient.addColorStop(0.18, 'rgba(249, 42, 173, 0.5)');
      scene.ringGradient.addColorStop(1, 'rgba(249, 42, 173, 0.04)');

      scene.rayGradient = ctx.createLinearGradient(0, scene.horizon, 0, h);
      scene.rayGradient.addColorStop(0, 'rgba(0, 240, 255, 0)');
      scene.rayGradient.addColorStop(0.06, 'rgba(0, 240, 255, 0.42)');
      scene.rayGradient.addColorStop(0.5, 'rgba(0, 240, 255, 0.22)');
      scene.rayGradient.addColorStop(1, 'rgba(0, 240, 255, 0.05)');

      // Wide on purpose: the terminal window in front of the scene is 580px,
      // so a narrower disc would hide every slice behind it. The height term
      // keeps the crown clear of the header on short, wide windows. On a phone
      // the terminal is nearly full-bleed, so the disc takes a much larger
      // share of the width — otherwise it disappears behind the panel entirely
      // and the hero loses its one landmark.
      const widthShare = w < 768 ? 0.5 : 0.3;
      scene.sunRadius = Math.min(w * widthShare, h * 0.44);
      scene.sun = buildSun(scene.sunRadius, dpr);

      scene.mesas = MESA_LAYERS.map((layer) => ({
        layer,
        points: buildMesas(layer, w, scene.horizon),
      }));

      // Star count scales with area so a wide monitor is not emptier than a
      // phone, but is capped so a 4K window does not pay for 1200 of them.
      const count = Math.min(220, Math.round((w * scene.horizon) / 5200));
      const rand = seeded(7);
      scene.stars = Array.from({ length: count }, () => ({
        x: rand() * w,
        // Squared, to crowd the stars toward the top where the sky is darkest.
        y: rand() * rand() * scene.horizon * 0.95,
        r: rand() < 0.88 ? 0.7 : 1.4,
        phase: rand() * Math.PI * 2,
        speed: 0.6 + rand() * 1.8,
      }));

      scene.focal = w * 0.85;
      scene.zNear = scene.focal / ground;
    };

    const draw = (time) => {
      const {
        w, h, horizon, sun, sunRadius, focal, zNear,
      } = scene;
      const t = time / 1000;

      // ── Sky ──────────────────────────────────────────────────────────────
      ctx.fillStyle = scene.skyGradient;
      ctx.fillRect(0, 0, w, horizon);

      // ── Stars ────────────────────────────────────────────────────────────
      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < scene.stars.length; i += 1) {
        const s = scene.stars[i];
        const twinkle = 0.35 + 0.65 * Math.abs(Math.sin(t * s.speed + s.phase));
        ctx.globalAlpha = twinkle * 0.9;
        ctx.fillRect(s.x, s.y, s.r, s.r);
      }
      ctx.globalAlpha = 1;

      // ── Sun ──────────────────────────────────────────────────────────────
      const sunCx = w / 2;
      const sunCy = horizon - sunRadius * 0.46;

      // Bloom first, so the disc sits inside its own halo.
      const bloom = ctx.createRadialGradient(sunCx, sunCy, sunRadius * 0.8, sunCx, sunCy, sunRadius * 2.1);
      bloom.addColorStop(0, 'rgba(249, 42, 173, 0.34)');
      bloom.addColorStop(0.45, 'rgba(249, 42, 173, 0.12)');
      bloom.addColorStop(1, 'rgba(249, 42, 173, 0)');
      ctx.fillStyle = bloom;
      ctx.fillRect(sunCx - sunRadius * 2.2, sunCy - sunRadius * 2.2, sunRadius * 4.4, sunRadius * 4.4);

      if (sun) {
        ctx.drawImage(sun, sunCx - sunRadius, sunCy - sunRadius, sunRadius * 2, sunRadius * 2);
      }

      // ── Mesas ────────────────────────────────────────────────────────────
      for (let i = 0; i < scene.mesas.length; i += 1) {
        const { layer, points } = scene.mesas[i];
        const base = horizon + h * layer.lift;
        ctx.fillStyle = layer.color;
        ctx.beginPath();
        ctx.moveTo(points[0].x, base + points[0].y);
        for (let p = 1; p < points.length; p += 1) {
          ctx.lineTo(points[p].x, base + points[p].y);
        }
        ctx.lineTo(points[points.length - 1].x, base + 2);
        ctx.lineTo(points[0].x, base + 2);
        ctx.closePath();
        ctx.fill();
      }

      // ── Ground ───────────────────────────────────────────────────────────
      ctx.fillStyle = scene.groundGradient;
      ctx.fillRect(0, horizon, w, h - horizon);

      // ── Grid ─────────────────────────────────────────────────────────────
      // Lines of constant depth, marching toward the camera. `offset` runs
      // 1 → 0 so every Z shrinks; when it wraps, line k lands exactly where
      // line k+1 was, which is what makes the motion seamless.
      const SPEED = 0.32;
      const offset = reduceMotion ? 1 : 1 - ((t * SPEED) % 1);

      ctx.strokeStyle = scene.ringGradient;
      ctx.lineCap = 'butt';
      for (let k = 0; k <= 26; k += 1) {
        const z = (k + offset) * zNear;
        const y = horizon + focal / z;
        if (y > h + 2) continue;
        // Nearer lines are thicker, which is the other half of the depth cue.
        ctx.lineWidth = Math.min(2.4, 0.6 + (y - horizon) / (h - horizon) * 2);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Lines of constant X: straight rays out of the vanishing point.
      const halfWorld = (w * zNear) / (2 * focal);
      const rays = 15;
      const dx = (halfWorld * 2.4) / rays;
      ctx.strokeStyle = scene.rayGradient;
      ctx.lineWidth = 1;
      for (let i = -rays; i <= rays; i += 1) {
        const endX = sunCx + (i * dx * focal) / zNear;
        ctx.beginPath();
        ctx.moveTo(sunCx, horizon);
        ctx.lineTo(endX, h);
        ctx.stroke();
      }

      // ── Horizon ──────────────────────────────────────────────────────────
      // The bright seam where the grid meets the sky, plus its bloom. Drawn
      // last so it sits over both.
      const seam = ctx.createLinearGradient(0, horizon - 18, 0, horizon + 18);
      seam.addColorStop(0, 'rgba(0, 240, 255, 0)');
      seam.addColorStop(0.5, 'rgba(139, 255, 245, 0.55)');
      seam.addColorStop(1, 'rgba(0, 240, 255, 0)');
      ctx.fillStyle = seam;
      ctx.fillRect(0, horizon - 18, w, 36);

      ctx.fillStyle = 'rgba(214, 245, 255, 0.75)';
      ctx.fillRect(0, horizon - 0.5, w, 1.2);
    };

    let frame = 0;
    let running = false;

    const loop = (time) => {
      draw(time);
      frame = window.requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduceMotion) return;
      running = true;
      frame = window.requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      window.cancelAnimationFrame(frame);
    };

    layout();
    draw(0);

    const resizeObserver = new ResizeObserver(() => {
      layout();
      draw(performance.now());
    });
    resizeObserver.observe(host);

    // No reason to animate a horizon nobody is looking at.
    const visibility = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    visibility.observe(host);

    const onVisibilityChange = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      stop();
      resizeObserver.disconnect();
      visibility.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return (
    <div ref={hostRef} className="hero__scene" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
