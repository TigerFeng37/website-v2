import { useEffect, useRef } from "react";

/**
 * Decorative, seamlessly looping canvas animation for the NYSDA case study.
 *
 * Three real trunk lines run left/right. A train's light sweeps along each one,
 * and the abandoned stations it passes flicker into view with their name and
 * years of service, then fade back into the dark, like glimpsing a ghost
 * station from the train window. Station order and dates come from the app's
 * places.json.
 */

const LOOP = 18; // seconds; every train interval divides this, so the loop is seamless
const ACCENT = "114,234,224"; // #72EAE0

const TRACKS = [
  {
    route: "6",
    color: "#00933C",
    dir: 1,
    interval: 9,
    offset: 0,
    stops: [
      { x: 0.0, name: "23 ST" },
      { x: 0.1, name: "18 ST", ghost: "1904–1948" },
      { x: 0.2, name: "14 ST" },
      { x: 0.3, name: "ASTOR PL" },
      { x: 0.4, name: "BLEECKER ST" },
      { x: 0.5, name: "SPRING ST" },
      { x: 0.6, name: "CANAL ST" },
      { x: 0.72, name: "WORTH ST", ghost: "1904–1962" },
      { x: 0.84, name: "BROOKLYN BRIDGE" },
      { x: 0.96, name: "CITY HALL", ghost: "1904–1945" },
    ],
  },
  {
    route: "1",
    color: "#EE352E",
    dir: -1,
    interval: 6,
    offset: 2.5,
    stops: [
      { x: 0.04, name: "110 ST" },
      { x: 0.2, name: "103 ST" },
      { x: 0.36, name: "96 ST" },
      { x: 0.5, name: "91 ST", ghost: "1904–1959" },
      { x: 0.64, name: "86 ST" },
      { x: 0.8, name: "79 ST" },
      { x: 0.96, name: "72 ST" },
    ],
  },
  {
    route: "Q",
    color: "#FCCC0A",
    dark: true,
    dir: 1,
    interval: 9,
    offset: 5,
    stops: [
      { x: 0.08, name: "CANAL ST" },
      { x: 0.4, name: "MYRTLE AV", ghost: "1915–1956" },
      { x: 0.62, name: "DEKALB AV" },
      { x: 0.84, name: "ATLANTIC AV" },
    ],
  },
];

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const mod = (a, n) => ((a % n) + n) % n;

// Train head position along the track (0..1 is on screen; it enters/exits off-screen).
function headPos(track, t) {
  const p = mod(t - track.offset, track.interval) / track.interval;
  const u = -0.2 + p * 1.4;
  return track.dir === 1 ? u : 1 - u;
}

// How lit a ghost station is: a quick rise as the train arrives, a slow fade after.
function glowFor(track, stopX, t) {
  const head = headPos(track, t);
  const d = (head - stopX) * track.dir; // > 0 once the train has passed
  if (d < -0.05) return 0;
  if (d < 0) return 1 + d / 0.05;
  return Math.exp(-d / 0.16);
}

export function draw(ctx, w, h, t, reduced) {
  ctx.clearRect(0, 0, w, h);

  const padL = Math.max(56, w * 0.07);
  const padR = Math.max(24, w * 0.04);
  const span = w - padL - padR;
  const rowH = h / (TRACKS.length + 0.4);
  const small = w < 640;

  // NYCT sign band hairline
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.fillRect(0, Math.round(rowH * 0.18), w, 1);

  TRACKS.forEach((track, i) => {
    const y = Math.round(rowH * (i + 0.95));
    const X = (x) => padL + x * span;

    // Route bullet
    const r = Math.min(13, rowH * 0.16);
    ctx.fillStyle = track.color;
    ctx.beginPath();
    ctx.arc(padL * 0.45, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = track.dark ? "#000" : "#fff";
    ctx.font = `700 ${Math.round(r * 1.25)}px "Helvetica Neue", Helvetica, Arial, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(track.route, padL * 0.45, y + 1);

    // Track
    ctx.strokeStyle = track.color;
    ctx.globalAlpha = 0.28;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padL, y);
    ctx.lineTo(w, y);
    ctx.stroke();
    ctx.globalAlpha = 1;

    // Train: a light with a fading tail
    if (!reduced) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(padL - 2, y - 24, w, 48); // keep trains off the route bullet
      ctx.clip();
      const hx = X(headPos(track, t));
      const tail = span * 0.16;
      const tx = hx - tail * track.dir;
      const g = ctx.createLinearGradient(tx, 0, hx, 0);
      g.addColorStop(0, "rgba(255,255,255,0)");
      g.addColorStop(1, track.color);
      ctx.strokeStyle = g;
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(tx, y);
      ctx.lineTo(hx, y);
      ctx.stroke();
      // train head: solid dot in the line colour with a white core
      ctx.fillStyle = track.color;
      ctx.beginPath();
      ctx.arc(hx, y, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(hx, y, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Stations
    track.stops.forEach((s, j) => {
      const sx = X(s.x);
      if (!s.ghost) {
        ctx.fillStyle = "rgba(230,230,230,0.85)";
        ctx.beginPath();
        ctx.arc(sx, y, 2.6, 0, Math.PI * 2);
        ctx.fill();
        return;
      }
      let glow = reduced ? 0.7 : glowFor(track, s.x, t);
      // tiled-wall flicker while lit
      if (!reduced && glow > 0.05) {
        // whole-cycle frequencies, so the flicker also repeats exactly every LOOP
        const w1 = (2 * Math.PI * 135) / LOOP, w2 = (2 * Math.PI * 37) / LOOP;
        const f = 0.82 + 0.18 * Math.sin(t * w1 + j * 3.1) * Math.sin(t * w2 + i);
        glow *= f;
      }
      const a = 0.22 + 0.78 * glow;

      ctx.setLineDash([2.5, 2.5]);
      ctx.strokeStyle = `rgba(${ACCENT},${a})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(sx, y, 6, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      const la = clamp(glow * 1.6);
      if (la > 0.01) {
        ctx.textAlign = "center";
        ctx.textBaseline = "alphabetic";
        ctx.fillStyle = `rgba(255,255,255,${la})`;
        ctx.font = `700 ${small ? 11 : 13}px "Helvetica Neue", Helvetica, Arial, sans-serif`;
        ctx.fillText(s.name, sx, y - 16);
        ctx.textBaseline = "top";
        ctx.fillStyle = `rgba(${ACCENT},${la * 0.85})`;
        ctx.font = `400 ${small ? 11 : 12}px "Helvetica Neue", Helvetica, Arial, sans-serif`;
        ctx.fillText(s.ghost, sx, y + 14);
      }
    });
  });
}

function GhostLineAnimation({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, visible = true;
    const start = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width; h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduced || !visible) draw(ctx, w, h, 0, reduced);
    };

    const frame = (now) => {
      const t = mod((now - start) / 1000, LOOP);
      draw(ctx, w, h, t, false);
      raf = requestAnimationFrame(frame);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    if (reduced) return () => ro.disconnect();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(frame);
    });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`block w-full h-full ${className}`}
      role="img"
      aria-label="Animated subway diagram: trains on the 6, 1 and Q lines pass abandoned stations, which briefly light up with their names and years of service."
    />
  );
}

export default GhostLineAnimation;
