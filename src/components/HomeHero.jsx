import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getProject, projects } from "../data/projects";
import { isIntroDone, onIntroDone } from "./introSignal";

/**
 * The reel: each line pairs a thing I make with the project that proves it.
 * Reads as "I make {make} {about}". Order here is the order it plays in.
 */
const REEL = [
  { make: "iOS apps", about: "about ghost stations.", slug: "nyc-subway-archive" },
  { make: "transit maps", about: "of Tokyo.", slug: "tokyo-trackmap" },
  { make: "typefaces", about: "for Aspecta.", slug: "aspecta" },
  { make: "creative tools", about: "for manga artists.", slug: "pixstudio" },
  { make: "identities", about: "for Academy Records.", slug: "academy-records" },
  { make: "websites", about: "in 70 minutes.", slug: "alt-site", note: "First Place — v0 × Contra Hackathon" },
  { make: "photographs", about: "of mountains.", slug: "apex", note: "A' Design Award winner" },
]
  .map((item) => ({ ...item, project: getProject(item.slug) }))
  .filter((item) => item.project);

const SLIDE_MS = 5200;
const PUBLISHED_COUNT = projects.filter((p) => !p.comingSoon).length;
const IN_PROGRESS_COUNT = projects.filter((p) => p.comingSoon).length;

const pad = (n) => String(n).padStart(2, "0");
const isVideoUrl = (url) => /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(String(url ?? ""));

/* ---------- small hooks ---------- */

function useIntroReady() {
  const [ready, setReady] = useState(isIntroDone);
  useEffect(() => {
    const unsubscribe = onIntroDone(() => setReady(true));
    const fallback = setTimeout(() => setReady(true), 3500); // never strand the hero
    return () => {
      unsubscribe();
      clearTimeout(fallback);
    };
  }, []);
  return ready;
}

function useInView(ref) {
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return inView;
}

function usePageVisible() {
  const [visible, setVisible] = useState(() => !document.hidden);
  useEffect(() => {
    const update = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  return visible;
}

function useReducedMotion() {
  const query = "(prefers-reduced-motion: reduce)";
  const [reduced, setReduced] = useState(() => window.matchMedia?.(query).matches ?? false);
  useEffect(() => {
    const mq = window.matchMedia?.(query);
    if (!mq) return;
    const update = () => setReduced(mq.matches);
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return reduced;
}

/** New York wall-clock time, re-rendered on the minute. */
function useNewYorkTime() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    let interval;
    const align = setTimeout(() => {
      setNow(new Date());
      interval = setInterval(() => setNow(new Date()), 60_000);
    }, 60_000 - (Date.now() % 60_000));
    return () => {
      clearTimeout(align);
      clearInterval(interval);
    };
  }, []);
  return now.toLocaleTimeString("en-US", {
    timeZone: "America/New_York",
    hour: "numeric",
    minute: "2-digit",
  });
}

/* ---------- pieces ---------- */

const chars = (text, baseDelay) =>
  [...text].map((c, i) => (
    <span key={i} className="hero-char" style={{ animationDelay: `${baseDelay + i * 22}ms` }}>
      {c === " " ? " " : c}
    </span>
  ));

/**
 * One headline line that rolls its characters up and out, and the next word up
 * and in. `turn` changes whenever the text does, which restarts both animations.
 */
function RollLine({ text, prevText, turn, delay = 0, className = "" }) {
  return (
    <span className={`hero-mask ${className}`}>
      {prevText != null && prevText !== text ? (
        <span key={`out-${turn}`} className="hero-roll-out">
          {chars(prevText, delay)}
        </span>
      ) : null}
      <span key={`in-${turn}`} className="hero-roll-in">
        {chars(text, delay)}
      </span>
    </span>
  );
}

/** A preview tile. Mounted a slide early so it's ready, faded in when active. */
function ReelMedia({ src, active, playing }) {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (active && playing) {
      video.play().catch(() => {});
      return;
    }
    // Let the outgoing tile finish its fade before freezing it.
    const t = setTimeout(() => video.pause(), active ? 0 : 700);
    return () => clearTimeout(t);
  }, [active, playing]);

  const className = `absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
    active ? "opacity-100" : "opacity-0"
  }`;

  return isVideoUrl(src) ? (
    <video ref={ref} src={src} muted loop playsInline preload="auto" aria-hidden className={className} />
  ) : (
    <img src={src} alt="" decoding="async" className={className} />
  );
}

/* ---------- hero ---------- */

function HomeHero() {
  const heroRef = useRef(null);
  const [Scene, setScene] = useState(null);
  const ready = useIntroReady();
  const inView = useInView(heroRef);
  const pageVisible = usePageVisible();
  const reducedMotion = useReducedMotion();
  const nyTime = useNewYorkTime();

  // index: current slide · prev: the slide rolling out · turn: bumps when the text changes
  // · cycle: bumps on every (re)start so the progress bar restarts even on the same slide.
  const [reel, setReel] = useState({ index: 0, prev: null, turn: 0, cycle: 0 });
  const [hovering, setHovering] = useState(false);
  const [userPaused, setUserPaused] = useState(null); // null → follow reduced-motion preference
  const [scatters, setScatters] = useState(0);

  // three.js downloads right away but mounts just after the headline has rolled in:
  // the shapes then swarm in from their scattered start, and the shader compile
  // doesn't stall the type animation.
  const [sceneMounted, setSceneMounted] = useState(false);
  useEffect(() => {
    import("../three/HeroAnimation")
      .then((module) => setScene(() => module.default))
      .catch((error) => console.warn("Failed to load HeroAnimation:", error));
  }, []);
  useEffect(() => {
    if (!ready) return;
    const t = setTimeout(() => setSceneMounted(true), 700);
    return () => clearTimeout(t);
  }, [ready]);
  const sceneShown = Boolean(Scene && sceneMounted);

  const goTo = useCallback((target) => {
    setReel((r) => {
      const index = (((typeof target === "function" ? target(r.index) : target) % REEL.length) + REEL.length) % REEL.length;
      if (index === r.index) return { ...r, cycle: r.cycle + 1 };
      return { index, prev: r.index, turn: r.turn + 1, cycle: r.cycle + 1 };
    });
  }, []);
  const next = useCallback(() => goTo((i) => i + 1), [goTo]);

  const paused = userPaused ?? reducedMotion;
  const running = ready && inView && pageVisible && !hovering && !paused;
  const intro = reel.turn === 0;

  const item = REEL[reel.index];
  const prevItem = reel.prev != null ? REEL[reel.prev] : null;
  const { project } = item;
  const nextIndex = (reel.index + 1) % REEL.length;
  const mounted = (i) => i === reel.index || i === reel.prev || i === nextIndex;

  const hoverHandlers = {
    onMouseEnter: () => setHovering(true),
    onMouseLeave: () => setHovering(false),
    onFocus: () => setHovering(true),
    onBlur: (e) => {
      if (!e.currentTarget.contains(e.relatedTarget)) setHovering(false);
    },
  };

  return (
    <section
      ref={heroRef}
      aria-label="Introduction"
      className="relative h-[100svh] min-h-[40rem] overflow-hidden bg-[#141618]"
    >
      {/* 3D cluster */}
      <div className="absolute inset-0 z-0 hero-scene">
        {sceneShown && (
          <Scene
            paused={!inView || !pageVisible}
            drift={!reducedMotion}
            onScatter={() => setScatters((n) => n + 1)}
          />
        )}
      </div>

      {/* Scrims keep the copy legible when shapes drift underneath it */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#141618] from-10% via-[#141618]/60 via-45% to-transparent to-75% md:hidden"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] hidden md:block bg-gradient-to-r from-[#141618]/90 from-15% via-[#141618]/50 via-45% to-transparent to-70%"
      />

      {/* Copy layer — transparent to the pointer except where it's interactive */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col px-4 pt-24 md:pt-28 pb-4">
        {/* Status row */}
        <div
          className={`flex items-center justify-between gap-4 font-mono text-[0.68rem] md:text-xs uppercase tracking-widest text-white/55 ${
            ready ? "hero-fade-up" : "opacity-0"
          }`}
          style={{ animationDelay: "650ms" }}
        >
          <span className="flex items-center gap-2 min-w-0">
            <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#72EAE0] opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#72EAE0]" />
            </span>
            <span className="truncate">
              <span className="hidden sm:inline">Now — </span>
              {IN_PROGRESS_COUNT} <span className="hidden sm:inline">stealth </span>projects in progress
            </span>
          </span>

          {/* One slot: an invitation to play, then the time in New York once they have. */}
          <span className="relative shrink-0 text-right">
            <span
              className={`flex items-center justify-end gap-2 transition-all duration-700 ${
                sceneShown && scatters === 0 ? "opacity-100" : "opacity-0 -translate-y-2"
              }`}
            >
              <span className="text-[#72EAE0]" aria-hidden>⊙</span>
              <span className="hidden [@media(hover:hover)]:inline">Stir the shapes · click to scatter</span>
              <span className="[@media(hover:hover)]:hidden">Tap to scatter</span>
            </span>
            <span
              className={`absolute inset-0 flex items-center justify-end tabular-nums transition-all duration-700 ${
                sceneShown && scatters === 0 ? "opacity-0 translate-y-2" : "opacity-100"
              }`}
            >
              {scatters > 1 ? `Scattered ×${scatters} · ` : ""}New York {nyTime}
            </span>
          </span>
        </div>

        <div className="flex-1" />

        {ready && (
          // Width + type size are paired: the longest line ("for Academy Records.") is
          // ~8.96em, so 66% of the row fits 6.6vw type and the full row fits 9.4vw.
          <div className="w-full md:max-w-[66%]">
            <p
              className="hero-fade-up font-mono text-[0.68rem] md:text-xs uppercase tracking-widest text-white/55 mb-4 md:mb-6"
              style={{ animationDelay: "120ms" }}
            >
              Yicheng Feng — Designer &amp; creative technologist
            </p>

            <h1 className="font-light tracking-[-0.035em] leading-[0.98] text-[clamp(2.2rem,min(9.4vw,10vh),6.6rem)] md:text-[clamp(2.4rem,min(6.6vw,10.5vh),7.25rem)]">
              <span className="sr-only">
                Yicheng Feng, designer and creative technologist in New York. I make iOS apps,
                transit maps, typefaces, creative tools, identities, websites and photographs.
              </span>
              <span aria-hidden className="block">
                <RollLine text="I make" turn="static" delay={200} className="text-white/45" />
                <RollLine
                  text={item.make}
                  prevText={prevItem?.make}
                  turn={reel.turn}
                  delay={intro ? 320 : 0}
                  className="text-[#72EAE0]"
                />
                <RollLine
                  text={item.about}
                  prevText={prevItem?.about}
                  turn={reel.turn}
                  delay={intro ? 440 : 90}
                  className="text-white"
                />
              </span>
            </h1>

            {/* Now showing: the project behind the current line */}
            <div
              className="pointer-events-auto mt-7 md:mt-10 w-full max-w-[36rem] hero-fade-up"
              style={{ animationDelay: "900ms" }}
              {...hoverHandlers}
            >
              <Link to={`/works/${project.slug}`} className="group flex items-center gap-4 md:gap-5">
                <span className="relative w-28 sm:w-36 md:w-44 aspect-[16/10] shrink-0 overflow-hidden rounded-md bg-black/50 ring-1 ring-white/10 transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                  {REEL.map((it, i) =>
                    mounted(i) ? (
                      <ReelMedia
                        key={it.slug}
                        src={it.project.hero}
                        active={i === reel.index}
                        playing={inView && pageVisible}
                      />
                    ) : null
                  )}
                </span>
                <span key={reel.index} className="flex min-w-0 flex-col hero-fade-up">
                  <span className="font-mono text-[0.68rem] uppercase tracking-widest text-white/45 tabular-nums">
                    Now showing · {pad(reel.index + 1)}/{pad(REEL.length)}
                  </span>
                  <span className="mt-1 text-base md:text-xl font-medium uppercase leading-tight">
                    {project.title}
                    <span
                      aria-hidden
                      className="ml-2 inline-block transition-all duration-300 ease-out group-hover:translate-x-2 group-hover:text-[#72EAE0]"
                    >
                      →
                    </span>
                  </span>
                  <span className="mt-0.5 text-xs md:text-sm font-light uppercase text-white/50 leading-snug line-clamp-2">
                    {item.note ?? project.disciplines.join(" · ")} · {project.year}
                  </span>
                </span>
              </Link>

              {/* Progress / jump-to controls */}
              <div className="mt-4 flex items-center gap-3">
                <div className="flex flex-1 gap-1.5" role="group" aria-label="Featured projects">
                  {REEL.map((it, i) => {
                    const isCurrent = i === reel.index;
                    return (
                      <button
                        key={it.slug}
                        type="button"
                        onClick={() => goTo(i)}
                        aria-label={`Show ${it.project.title}`}
                        aria-current={isCurrent ? "true" : undefined}
                        className="group/seg relative flex h-6 flex-1 items-center"
                      >
                        <span className="pointer-events-none absolute bottom-full left-0 mb-1 whitespace-nowrap font-mono text-[0.62rem] uppercase tracking-widest text-white/70 opacity-0 transition-opacity duration-200 group-hover/seg:opacity-100">
                          {it.project.title}
                        </span>
                        <span className="relative block h-[2px] w-full overflow-hidden rounded-full bg-white/15 transition-colors group-hover/seg:bg-white/35">
                          <span
                            key={isCurrent ? `run-${reel.cycle}` : "idle"}
                            className={`absolute inset-0 origin-left bg-[#72EAE0] ${
                              isCurrent ? "hero-progress" : i < reel.index ? "scale-x-100" : "scale-x-0"
                            }`}
                            style={
                              isCurrent
                                ? {
                                    animationDuration: `${SLIDE_MS}ms`,
                                    animationPlayState: running ? "running" : "paused",
                                  }
                                : undefined
                            }
                            onAnimationEnd={isCurrent ? next : undefined}
                          />
                        </span>
                      </button>
                    );
                  })}
                </div>
                <button
                  type="button"
                  onClick={() => setUserPaused(!paused)}
                  aria-label={paused ? "Play project reel" : "Pause project reel"}
                  className="flex h-6 w-6 items-center justify-center font-mono text-[0.7rem] text-white/55 transition-colors hover:text-[#72EAE0]"
                >
                  {paused ? "▶" : "❚❚"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer row */}
        <div
          className={`mt-6 md:mt-10 flex items-end justify-between gap-6 ${ready ? "hero-fade-up" : "opacity-0"}`}
          style={{ animationDelay: "1100ms" }}
        >
          <Link
            to="/about"
            className="pointer-events-auto hidden lg:flex flex-wrap items-center gap-x-3 gap-y-1 pb-2 font-mono text-xs uppercase tracking-widest text-white/45 transition-colors hover:text-white"
          >
            <span>2× A&apos; Design Award</span>
            <span className="text-[#72EAE0]" aria-hidden>⊙</span>
            <span>1st Place, v0 × Contra Hackathon</span>
            <span className="text-[#72EAE0]" aria-hidden>⊙</span>
            <span>3× Hackathon Best Design</span>
            <span aria-hidden>→</span>
          </Link>

          <a
            href="#works"
            className="pointer-events-auto group ml-auto flex items-end gap-3"
            aria-label={`Scroll to selected work — ${PUBLISHED_COUNT} projects`}
          >
            <span className="mb-2 font-mono text-[0.68rem] md:text-xs uppercase tracking-widest text-white/55 transition-colors group-hover:text-white">
              {PUBLISHED_COUNT} projects below
            </span>
            <span className="hero-bob text-[#72EAE0] text-[3.25rem] md:text-[8vh] font-light leading-[0.8]" aria-hidden>
              ↓
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default HomeHero;
