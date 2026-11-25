import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Media from "../Media";
import { getProject } from "../../data/projects";
import useMediaQuery, { useFinePointer, useReducedMotion } from "../../hooks/useMediaQuery";
import { useResolvedTheme } from "../../lib/theme";

/**
 * The reel: each line pairs a thing I make with the project that proves it.
 * Reads as "I make {make} {about}". Order here is the order it plays in.
 */
const REEL = [
  { make: "transit maps", about: "of Tokyo", slug: "tokyo-trackmap" },
  { make: "iOS apps", about: "about ghost stations", slug: "nyc-subway-archive" },
  { make: "typefaces", about: "for Web3 startups", slug: "aspecta" },
  { make: "creative tools", about: "for manga artists", slug: "pixstudio" },
  { make: "identities", about: "for record shops", slug: "academy-records" },
  { make: "websites", about: "in 70 minutes", slug: "alt-site" },
  { make: "photographs", about: "of mountains", slug: "apex" },
]
  .map((item) => ({ ...item, project: getProject(item.slug) }))
  .filter((item) => item.project);

const SLIDE_MS = 4600;
// three.js mounts once the headline has risen in, so shader compile never stalls it.
const SCENE_DELAY_MS = 650;

// Landscape: a fixed distance. Portrait: back off until the view is ~5.3
// world units wide, so a phone sees the whole cluster, not two pieces of it.
// (0.3078 = 2·tan(fov/2) for the 17.5° camera.)
const heroDistance = (aspect) => (aspect >= 1 ? 20 : Math.min(5.3 / aspect / 0.3078, 46));

/* ---------- small hooks ---------- */

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

/* ---------- pieces ---------- */

const chars = (text, baseDelay, step = 18) =>
  [...text].map((c, i) => (
    <span key={i} className="hero-char" style={{ "--d": `${baseDelay + i * step}ms` }}>
      {c === " " ? " " : c}
    </span>
  ));

/**
 * One headline line that rolls its characters up and out, and the next phrase
 * up and in. `turn` changes whenever the text does, which restarts both.
 */
function RollLine({ text, prevText, turn, delay = 0, className = "", children }) {
  return (
    <span className={`hero-mask ${className}`}>
      {prevText != null && prevText !== text ? (
        // The old phrase leaves all at once, so no late letter is still in
        // the way when the new phrase starts rising behind it.
        <span key={`out-${turn}`} className="hero-roll-out">
          {chars(prevText, delay, 0)}
        </span>
      ) : null}
      <span key={`in-${turn}`} className="hero-roll-in">
        {chars(text, delay)}
      </span>
      {children}
    </span>
  );
}

/* ---------- hero ---------- */

function Hero() {
  const heroRef = useRef(null);
  const inView = useInView(heroRef);
  const pageVisible = usePageVisible();
  const reduced = useReducedMotion();
  const finePointer = useFinePointer();
  const small = useMediaQuery("(max-width: 767px)");
  const theme = useResolvedTheme();

  const [scene, setScene] = useState(null); // { Hexaspires, PALETTES }
  const [sceneMounted, setSceneMounted] = useState(false);
  const [scattered, setScattered] = useState(false);

  useEffect(() => {
    // ~1MB of three.js + physics: not worth it on a metered connection.
    if (navigator.connection?.saveData) return;
    import("../../three/Hexaspires")
      .then((m) => setScene({ Hexaspires: m.default, PALETTES: m.PALETTES }))
      .catch((error) => console.warn("Failed to load the Hexaspires:", error));
    const t = setTimeout(() => setSceneMounted(true), SCENE_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  // index: current line · prev: the line rolling out · turn: bumps when the text changes
  // · cycle: bumps on every (re)start so the progress bar restarts even on the same line.
  const [reel, setReel] = useState({ index: 0, prev: null, turn: 0, cycle: 0 });
  const [hovering, setHovering] = useState(false);
  const [userPaused, setUserPaused] = useState(null); // null → follow reduced-motion preference

  const goTo = useCallback((target) => {
    setReel((r) => {
      const raw = typeof target === "function" ? target(r.index) : target;
      const index = ((raw % REEL.length) + REEL.length) % REEL.length;
      if (index === r.index) return { ...r, cycle: r.cycle + 1 };
      return { index, prev: r.index, turn: r.turn + 1, cycle: r.cycle + 1 };
    });
  }, []);
  const next = useCallback(() => goTo((i) => i + 1), [goTo]);

  const paused = userPaused ?? reduced;
  const running = inView && pageVisible && !hovering && !paused;
  const intro = reel.turn === 0;

  const item = REEL[reel.index];
  const prevItem = reel.prev != null ? REEL[reel.prev] : null;
  const { project } = item;
  const nextIndex = (reel.index + 1) % REEL.length;
  const mounted = (i) => i === reel.index || i === reel.prev || i === nextIndex;

  const hover = {
    onMouseEnter: () => setHovering(true),
    onMouseLeave: () => setHovering(false),
  };

  const { Hexaspires, PALETTES } = scene ?? {};

  return (
    <section
      ref={heroRef}
      aria-labelledby="hero-title"
      className="hero relative isolate flex h-[84svh] min-h-[34rem] md:h-[100svh] md:min-h-[36rem] flex-col overflow-hidden"
    >
      {/* The Hexaspires: stir them with the pointer, click to scatter. */}
      <div className="hero-scene absolute inset-0 -z-20" aria-hidden>
        {Hexaspires && sceneMounted ? (
          <Hexaspires
            palette={PALETTES[theme]}
            paused={!inView || !pageVisible}
            drift={!reduced}
            eventSource={heroRef}
            lite={small || !finePointer}
            distance={heroDistance}
            gather={(w, h) => (w > h ? [w * 0.08, h * 0.06] : [0, h * 0.24])}
            scatter={small ? 0.5 : 1}
            onScatter={() => setScattered(true)}
          />
        ) : null}
      </div>
      {/* Keeps the copy legible when a shape drifts underneath it. */}
      <div aria-hidden className="hero-scrim pointer-events-none absolute inset-0 -z-10" />

      <div className="wrap pointer-events-none flex flex-1 flex-col justify-end pb-[clamp(1.5rem,5vh,3.5rem)] pt-header">
        <h1 id="hero-title" className="hero-title font-medium">
          <span className="sr-only">
            Yicheng Feng, designer and creative technologist. I make transit maps, iOS apps,
            typefaces, creative tools, identities, websites and photographs.
          </span>
          <span aria-hidden className="block">
            <span className={`block whitespace-nowrap ${theme === "light" ? "text-fg-3" : "text-fg-2"}`}>
              {"I make".split(" ").map((w, i) => (
                <Fragment key={w}>
                  <span className="hero-word" style={{ "--i": i }}>
                    {w}
                  </span>{" "}
                </Fragment>
              ))}
              {/* The project behind the line, playing inline like a word. */}
              <Link
                to={`/works/${project.slug}`}
                viewTransition
                tabIndex={-1}
                className="hero-pill hero-word pointer-events-auto border border-2 border-white/30"
                style={{ "--i": 2 }}
                {...hover}
              >
                {REEL.map((it, i) =>
                  mounted(i) ? (
                    <Media
                      key={it.slug}
                      src={it.project.thumb ?? it.project.hero}
                      poster={it.project.poster}
                      loop={it.project.loop}
                      priority
                      playing={i === reel.index && inView && pageVisible}
                      className={`!absolute inset-0 !rounded-none transition-opacity duration-slow ${
                        i === reel.index ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  ) : null
                )}
              </Link>
            </span>
            <RollLine text={item.make} prevText={prevItem?.make} turn={reel.turn} delay={intro ? 160 : 0} />
            <RollLine
              text={item.about}
              prevText={prevItem?.about}
              turn={reel.turn}
              delay={intro ? 260 : 70}
            >
              <span className="caret caret-blink" />
            </RollLine>
          </span>
        </h1>

        <div className="grid-12 mt-8 items-end gap-y-6 md:mt-12">
          <p className="hero-fact col-span-12 max-w-[34ch] text-fg-2 md:col-span-5 lg:col-span-4" style={{ "--i": 0 }}>
            <span className="text-fg">Feng Works / Yicheng Feng</span> is designer and creative technologist based in New York City.
          </p>

          {/* Now showing: the project behind the current line. */}
          <div
            className="hero-fact pointer-events-auto col-span-12 md:col-span-5 md:col-start-7 lg:col-span-4 lg:col-start-6"
            style={{ "--i": 1 }}
            {...hover}
          >
            <div className="flex items-baseline justify-between gap-6">
              <Link to={`/works/${project.slug}`} viewTransition className="group min-w-0">
                <span className="block text-fg-2">Now showing</span>
                <span key={reel.index} className="hero-swap text-fg">
                  {project.title}
                  <span
                    aria-hidden
                    className="caret caret-ghost opacity-0 transition-opacity duration-fast group-hover:opacity-100 group-focus-visible:opacity-100"
                  />
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setUserPaused(!paused)}
                className="shrink-0 text-fg-2 transition-colors duration-fast hover:text-fg"
              >
                {paused ? "Play" : "Pause"}
              </button>
            </div>
            <div className="mt-3 flex gap-1.5" role="group" aria-label="Featured projects">
              {REEL.map((it, i) => {
                const current = i === reel.index;
                return (
                  <button
                    key={it.slug}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Show ${it.project.title}`}
                    aria-current={current ? "true" : undefined}
                    className="group/seg flex h-5 flex-1 items-center"
                  >
                    <span className="relative block h-px w-full overflow-hidden bg-line/20 transition-colors group-hover/seg:bg-line/50">
                      <span
                        key={current ? `run-${reel.cycle}` : "idle"}
                        className={`absolute inset-0 origin-left bg-fg ${
                          current ? "hero-progress" : i < reel.index ? "scale-x-100" : "scale-x-0"
                        }`}
                        style={
                          current
                            ? { "--slide": `${SLIDE_MS}ms`, animationPlayState: running ? "running" : "paused" }
                            : undefined
                        }
                        onAnimationEnd={current ? next : undefined}
                      />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <p
            className={`hero-fact col-span-12 hidden text-right text-fg-2 transition-opacity duration-slow lg:col-span-2 lg:col-start-11 lg:block ${
              Hexaspires && !scattered ? "" : "!opacity-0"
            }`}
            style={{ "--i": 2 }}
            aria-hidden
          >
            {finePointer ? "Click to scatter" : "Tap to scatter"}
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
