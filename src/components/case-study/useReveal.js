import { useEffect, useLayoutEffect } from "react";

/**
 * Pick an entrance style from what the block actually contains, so pages
 * don't have to tag every element. An explicit `data-reveal` always wins.
 * Each type has its own motion in index.css ("Scroll reveals").
 */
export function classifyReveal(el) {
  if (el.dataset.reveal) return el.dataset.reveal;
  const has = (sel) => el.matches(sel) || el.querySelector(sel);

  if (el.matches("blockquote")) return "quote";
  if (el.querySelector("h1")) return "title";
  if (el.classList.contains("w-screen")) return "bleed";
  if (has('[aria-roledescription="carousel"]')) return "carousel";
  if (has("video, canvas")) return "video";
  if (has("dl") || el.matches("a")) return "card";
  const hasText = el.querySelector("h2, h3, p, figcaption") || el.matches("p");
  if (has("img") && !hasText) return "image";
  // Tinted panels (stats tiles, identity block) read as cards.
  if ([...el.classList].some((c) => c.startsWith("bg-gray"))) return "card";
  if (has("img")) return "image";
  return "text";
}

/**
 * Adds `.animate-in` to every `.animate-on-scroll` element inside `rootRef`
 * the first time it enters the viewport.
 */
export default function useReveal(rootRef) {
  // Tag before paint so each block starts from its own hidden state.
  useLayoutEffect(() => {
    rootRef.current
      ?.querySelectorAll(".animate-on-scroll")
      .forEach((el) => (el.dataset.reveal = classifyReveal(el)));
  }, [rootRef]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = root.querySelectorAll(".animate-on-scroll");

    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("animate-in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [rootRef]);
}
