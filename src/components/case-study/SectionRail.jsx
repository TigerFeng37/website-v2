import { useEffect, useRef, useState } from "react";

// Where on screen "reading" happens: a section counts as reached once its
// heading passes this fraction of the viewport height.
const ANCHOR = 0.35;

// How far through a section (0–1) the caret stays a dot before it stretches
// into a pill reaching the next section's dot.
const SNAP = 0.4;

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/**
 * A ruler in the right margin of a case study (wide screens only).
 *
 * One dot per section, evenly spaced. The caret sits as a dot on the section
 * you're in, stretches into a pill reaching the next dot once you're partway
 * through, and gathers into that dot when you get there. Labels stay hidden
 * until you point at (or tab into) the ruler.
 *
 * Sections are found in the DOM: anything marked `data-toc="Label"`, plus every
 * h2 in the case-study body.
 */
function SectionRail({ rootRef, slug }) {
  const railRef = useRef(null);
  const [items, setItems] = useState([]);
  const [active, setActive] = useState(0);
  const [shown, setShown] = useState(false);

  // Collect sections and give each one an id to link to.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = [...root.querySelectorAll("[data-toc], .cs-flow h2")];
    setItems(
      els.map((el) => {
        const label = el.dataset.toc || el.textContent.trim();
        if (!el.id) {
          const base = slugify(label) || "section";
          let id = base;
          for (let k = 2; document.getElementById(id); k++) id = `${base}-${k}`;
          el.id = id;
        }
        return { id: el.id, label, el };
      })
    );
  }, [rootRef, slug]);

  // Follow the scroll.
  useEffect(() => {
    const rail = railRef.current;
    const n = items.length;
    if (!rail || n < 2) return;
    let tops = [];
    let frame = 0;
    let last = -1;
    let shape = [-1, -1];
    let stepAt = -Infinity;

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const y = window.scrollY + vh * ANCHOR;
      let v = 0;
      for (let i = 0; i < n; i++) {
        if (y < tops[i]) break;
        v = i === n - 1 ? i : i + Math.min(1, (y - tops[i]) / (tops[i + 1] - tops[i]));
      }
      const idx = Math.min(n - 1, Math.floor(v + 0.001));
      if (idx !== last) {
        last = idx;
        setActive(idx);
      }

      // The caret rests as a dot on the section you're in. Once you're SNAP of
      // the way through, it stretches into a pill reaching the next dot; on
      // entering that section it gathers back into a dot there.
      const a = idx;
      const b = idx < n - 1 && v - idx >= SNAP ? idx + 1 : idx;
      if (a !== shape[0] || b !== shape[1]) {
        if (shape[0] !== -1) {
          // Skipping sections, or changing again before the last change has
          // settled (fast scrolling), slides the caret as one piece so it
          // never stretches across more than two dots.
          const now = performance.now();
          const far = Math.max(Math.abs(a - shape[0]), Math.abs(b - shape[1])) > 1;
          const rigid = far || now - stepAt < 420;
          stepAt = now;
          rail.dataset.dir = rigid ? "jump" : a + b > shape[0] + shape[1] ? "down" : "up";
        }
        shape = [a, b];
        rail.style.setProperty("--a", (a / (n - 1)).toFixed(4));
        rail.style.setProperty("--b", (b / (n - 1)).toFixed(4));
      }
      const footer = document.getElementById("contact");
      setShown(
        window.scrollY > vh * 0.4 && (!footer || footer.getBoundingClientRect().top > vh * 0.6)
      );
    };

    const measure = () => {
      const vh = window.innerHeight;
      // The last sections may sit too close to the bottom to ever reach the
      // anchor line; cap them at the furthest point the anchor can travel.
      const reach = document.documentElement.scrollHeight - vh + vh * ANCHOR;
      tops = items.map(({ el }, i) =>
        i === 0 ? 0 : Math.min(el.getBoundingClientRect().top + window.scrollY, reach)
      );
      for (let i = 1; i < n; i++) tops[i] = Math.max(tops[i], tops[i - 1] + 1);
      update();
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const resize = new ResizeObserver(measure);
    resize.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    measure();
    return () => {
      resize.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(frame);
    };
  }, [items]);

  const go = (e, i) => {
    e.preventDefault();
    const { el } = items[i];
    const top = i === 0 ? 0 : el.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.2;
    window.scrollTo({ top });
    el.setAttribute("tabindex", "-1");
    el.focus({ preventScroll: true });
  };

  // Size the hover panel to the longest label.
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const widest = Math.max(0, ...[...rail.querySelectorAll(".section-rail-label")].map((l) => l.offsetWidth));
    rail.style.setProperty("--panel-w", `${Math.ceil(widest)}px`);
  }, [items]);

  if (items.length < 2) return null;
  const n = items.length;

  return (
    <nav
      ref={railRef}
      aria-label="Sections"
      className="section-rail"
      data-shown={shown || undefined}
    >
      <span aria-hidden className="section-rail-panel" />
      <ol>
        {items.map((item, i) => (
          <li key={item.id} style={{ "--k": i / (n - 1) }}>
            <a
              href={`#${item.id}`}
              onClick={(e) => go(e, i)}
              aria-current={i === active ? "location" : undefined}
              data-passed={i < active || undefined}
            >
              <span aria-hidden className="section-rail-tick" />
              <span className="section-rail-label">{item.label}</span>
            </a>
          </li>
        ))}
      </ol>
      <span aria-hidden className="section-rail-caret" />
    </nav>
  );
}

export default SectionRail;
