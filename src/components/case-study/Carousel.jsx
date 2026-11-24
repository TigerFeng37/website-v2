import { useCallback, useEffect, useRef, useState } from "react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/**
 * Cross-fading image carousel used across case studies.
 *
 * slides: [{ src, alt, caption? }]
 * Autoplays (paused on hover, focus, hidden tab and reduced-motion), supports
 * swipe, horizontal trackpad scroll and arrow keys.
 */
function Carousel({
  slides,
  label,
  aspect = "aspect-[21/9]",
  imgClassName = "object-cover object-center",
  interval = 4000,
  showCaptions = false,
  className = "",
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef(null);
  const touchStart = useRef(null);
  const wheelLock = useRef(0);
  const count = slides.length;

  const go = useCallback((i) => setIndex(((i % count) + count) % count), [count]);
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);

  // Autoplay; restarts whenever the slide changes so manual input resets the timer.
  useEffect(() => {
    if (paused || count < 2 || prefersReducedMotion()) return;
    const id = setTimeout(() => {
      if (!document.hidden) next();
    }, interval);
    return () => clearTimeout(id);
  }, [index, paused, count, interval, next]);

  // Horizontal trackpad / shift-wheel navigation, throttled to one slide per gesture.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e) => {
      const dx = e.shiftKey ? e.deltaY : e.deltaX;
      if (Math.abs(dx) < 15 || Math.abs(dx) < Math.abs(e.shiftKey ? 0 : e.deltaY) * 2) return;
      e.preventDefault();
      const now = Date.now();
      if (now - wheelLock.current < 600) return;
      wheelLock.current = now;
      dx > 0 ? next() : prev();
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [next, prev]);

  const onTouchStart = (e) => {
    if (e.touches.length === 1) touchStart.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStart.current == null) return;
    const dx = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 50) (dx > 0 ? next : prev)();
    touchStart.current = null;
  };
  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  return (
    <div className={className}>
      <div
        ref={containerRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        className={`${aspect} w-full relative rounded-lg overflow-hidden bg-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#72EAE0]`}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onKeyDown={onKeyDown}
      >
        {slides.map((slide, i) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            aria-hidden={i !== index}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            className={`absolute inset-0 w-full h-full ${imgClassName} transition-opacity duration-1000 ease-in-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show slide ${i + 1} of ${count}`}
              aria-current={i === index}
              className="py-3 group/dot"
            >
              <span
                className={`block h-[0.15rem] w-8 shadow-[0_0_3px_rgba(0,0,0,0.7)] transition-colors duration-300 ${
                  i === index ? "bg-white" : "bg-white/30 group-hover/dot:bg-white/60"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {showCaptions ? (
        <p className="mt-4 text-center text-gray-400 min-h-[1.75rem]" aria-live="polite">
          <span className="font-mono text-sm text-gray-500 mr-3">
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
          {slides[index].caption}
        </p>
      ) : null}
    </div>
  );
}

export default Carousel;
