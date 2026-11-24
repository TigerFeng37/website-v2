import { useEffect } from "react";

/**
 * Marks every `[data-reveal]` element inside `rootRef` with `data-shown` the
 * first time it enters the viewport; the CSS in index.css does the motion.
 * Siblings can stagger by setting `--i` inline.
 *
 * `deps` re-scans when the content changes (e.g. a filter swaps the list).
 */
export default function useReveal(rootRef, deps = []) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = [...root.querySelectorAll("[data-reveal]:not([data-shown])")];
    if (!els.length) return;

    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.setAttribute("data-shown", ""));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-shown", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rootRef, ...deps]);
}
