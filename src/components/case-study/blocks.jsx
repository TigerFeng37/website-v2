import { useCallback, useEffect, useRef, useState } from "react";
import Media from "../Media";

/*
 * Building blocks for case-study bodies. Each block lays itself out on the
 * 12-column grid inside .wrap and marks itself `cs-block` (and `cs-fig` for
 * imagery) so .cs-flow can space ideas apart and keep runs of images tight.
 */

// Literal class strings so Tailwind can see them.
const SPAN = {
  3: "md:col-span-3",
  4: "md:col-span-4",
  5: "md:col-span-5",
  6: "md:col-span-6",
  7: "md:col-span-7",
  8: "md:col-span-8",
  12: "md:col-span-12",
};
const START = { 1: "", 3: "md:col-start-3", 4: "md:col-start-4", 5: "md:col-start-5" };
const MOBILE = { 6: "col-span-6", 12: "col-span-12" };

/** A heading on the left, prose on the right. */
export function Section({ title, children }) {
  return (
    <section className="cs-block wrap grid-12 gap-y-5" data-reveal>
      <h2 className="col-span-12 text-h3 md:col-span-4">{title}</h2>
      <div className="cs-prose col-span-12 md:col-span-8 lg:col-span-7">{children}</div>
    </section>
  );
}

function Caption({ children }) {
  return children ? <figcaption className="mt-3 max-w-[56ch] text-fg-2 md:mt-4">{children}</figcaption> : null;
}

/**
 * One image or video.
 * size: "wide" (full grid), "inset" (centered 8 cols), "text" (aligned to the
 * prose column), or "bleed" (edge to edge, no gutters).
 */
export function Figure({ size = "wide", caption, className = "", dark = false, ...media }) {
  if (size === "bleed") {
    return (
      <figure className="cs-block cs-fig" data-reveal>
        <Media rounded={false} {...media} className={media.aspectClass ?? ""} />
        {caption ? (
          <div className="wrap">
            <Caption>{caption}</Caption>
          </div>
        ) : null}
      </figure>
    );
  }
  const col = {
    wide: "col-span-12",
    inset: "col-span-12 md:col-span-8 md:col-start-3",
    text: "col-span-12 md:col-span-8 md:col-start-5",
  }[size];
  return (
    <figure className={`cs-block cs-fig wrap grid-12 ${className}`} data-reveal>
      <div className={`${col} ${dark ? "rounded-media bg-[#0c0d0e]" : ""}`}>
        <Media {...media} className={media.aspectClass ?? ""} />
        <Caption>{caption}</Caption>
      </div>
    </figure>
  );
}

/** Several images in one row. Each child is a <Shot span={…} />. */
export function Row({ children, align = "start" }) {
  return (
    <div className="cs-block cs-fig wrap" data-reveal>
      <div className={`grid-12 gap-y-gap ${align === "stretch" ? "items-stretch" : "items-start"}`}>{children}</div>
    </div>
  );
}

export function Shot({ span = 6, mobile = 12, start = 1, caption, aspectClass = "", ...media }) {
  return (
    <figure className={`${MOBILE[mobile]} ${SPAN[span]} ${START[start]}`}>
      <Media {...media} className={aspectClass} />
      <Caption>{caption}</Caption>
    </figure>
  );
}

/** One tall image beside two stacked ones; the tall one matches their height. */
export function Bento({ tall, stack, reverse = false }) {
  return (
    <div className="cs-block cs-fig wrap" data-reveal>
      <div className="grid-12 gap-y-gap">
        <figure className={`col-span-12 md:col-span-5 ${reverse ? "md:order-2" : ""}`}>
          <Media {...tall} className="aspect-[4/5] md:aspect-auto md:h-full" />
        </figure>
        <div className="col-span-12 grid gap-gap md:col-span-7">
          {stack.map((item) => (
            <Media key={item.src} {...item} className="aspect-[3/2]" />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * A sideways-scrolling run of images that starts on the grid and runs off the
 * right edge. Swipe, trackpad, keyboard or the arrow buttons.
 */
export function Gallery({ items, label, aspectClass = "aspect-video" }) {
  const track = useRef(null);
  const [index, setIndex] = useState(0);

  const onScroll = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const slides = [...el.children];
    const left = el.scrollLeft;
    let best = 0;
    slides.forEach((s, i) => {
      if (Math.abs(s.offsetLeft - slides[0].offsetLeft - left) < Math.abs(slides[best].offsetLeft - slides[0].offsetLeft - left)) best = i;
    });
    setIndex(best);
  }, []);

  useEffect(() => {
    const el = track.current;
    el?.addEventListener("scroll", onScroll, { passive: true });
    return () => el?.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const go = (i) => {
    const el = track.current;
    const slides = el?.children;
    if (!slides?.[i]) return;
    el.scrollTo({ left: slides[i].offsetLeft - slides[0].offsetLeft, behavior: "smooth" });
  };

  const button =
    "grid h-11 w-11 place-items-center rounded-full border border-line/20 text-fg transition-[border-color,opacity] duration-fast hover:border-fg/40 disabled:opacity-30 disabled:hover:border-line/20";

  return (
    <section className="cs-block cs-fig" aria-roledescription="carousel" aria-label={label} data-reveal>
      <div className="wrap mb-4 flex items-center justify-between md:mb-5">
        <p className="tabular-nums text-fg-2" aria-live="polite">
          {index + 1} / {items.length}
        </p>
        <div className="flex gap-2">
          <button type="button" className={button} onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous image">
            ←
          </button>
          <button
            type="button"
            className={button}
            onClick={() => go(index + 1)}
            disabled={index === items.length - 1}
            aria-label="Next image"
          >
            →
          </button>
        </div>
      </div>
      <div ref={track} className="gallery-track" tabIndex={0} aria-label={`${label}, scrollable`}>
        {items.map((item, i) => (
          <figure key={item.src} className="gallery-slide" aria-roledescription="slide" aria-label={`${i + 1} of ${items.length}`}>
            <Media src={item.src} alt={item.alt} poster={item.poster} className={item.aspectClass ?? aspectClass} fit={item.fit} />
            <Caption>{item.caption}</Caption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/** Big numbers. */
export function Stats({ items }) {
  return (
    <div className="cs-block wrap" data-reveal>
      <dl className="grid-12 gap-y-10">
        {items.map((s) => (
          <div key={s.label} className="rule col-span-6 pt-5 md:col-span-3">
            <dt className="sr-only">{s.label}</dt>
            <dd className="text-h1 tabular-nums">{s.value}</dd>
            <dd aria-hidden className="mt-2 text-fg-2">
              {s.label}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** A pull quote: set large, no decoration. */
export function Quote({ children }) {
  return (
    <figure className="cs-block wrap grid-12" data-reveal>
      <blockquote className="col-span-12 text-h3 text-fg md:col-span-9 md:col-start-4 lg:col-span-8 lg:col-start-5">
        <p className="max-w-[30ch] [text-indent:-0.45em]">“{children}”</p>
      </blockquote>
    </figure>
  );
}

/** Numbered principles or steps, two columns on wide screens. */
export function Points({ title, items }) {
  return (
    <section className="cs-block wrap grid-12 gap-y-8" data-reveal>
      <h2 className="col-span-12 text-h3 md:col-span-4">{title}</h2>
      <ol className="col-span-12 grid gap-x-gap gap-y-10 md:col-span-8 lg:grid-cols-2">
        {items.map((item, i) => (
          <li key={item.title} className="rule pt-5">
            <p className="tabular-nums text-fg-2">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="mt-2 text-h4 font-medium">{item.title}</h3>
            <p className="mt-3 text-fg-2">{item.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/** A recognition line that links out to the award listing. */
export function Award({ href, logo, title, detail }) {
  return (
    <div className="cs-block wrap" data-reveal>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group rule flex items-center gap-5 py-6 md:gap-6"
      >
        {logo ? <img src={logo} alt="" className="h-14 w-14 shrink-0 rounded-media object-cover" /> : null}
        <span className="flex-1">
          <span className="block text-h4">{title}</span>
          <span className="block text-fg-2">{detail}</span>
        </span>
        <span className="shrink-0 text-fg-2 transition-colors duration-fast group-hover:text-fg">
          View listing <span aria-hidden>↗</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </span>
      </a>
      <div className="rule" />
    </div>
  );
}
