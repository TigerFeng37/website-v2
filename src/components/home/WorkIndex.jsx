import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Media from "../Media";
import { useFinePointer, useReducedMotion } from "../../hooks/useMediaQuery";

/**
 * Floating preview that trails the pointer over the index. Each project's
 * media is mounted the first time it's hovered and kept, so moving back and
 * forth is instant without preloading every video on page load.
 */
function CursorPreview({ items, active }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(() => new Set());
  const reduced = useReducedMotion();

  useEffect(() => {
    if (active) setSeen((s) => (s.has(active) ? s : new Set(s).add(active)));
  }, [active]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let frame = 0;
    const ease = reduced ? 1 : 0.16;

    const tick = () => {
      x += (tx - x) * ease;
      y += (ty - y) * ease;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frame = Math.abs(tx - x) + Math.abs(ty - y) > 0.3 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!frame) frame = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [reduced]);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed left-0 top-0 z-40">
      <div
        className={`work-preview origin-bottom-left translate-x-8 -translate-y-[calc(100%+1.75rem)] transition-[opacity,transform] duration-base ease-out ${
          active ? "scale-100 opacity-100" : "scale-[0.92] opacity-0"
        }`}
      >
        {items
          .filter((p) => seen.has(p.slug))
          .map((p) => (
            <Media
              key={p.slug}
              src={p.thumb ?? p.hero}
              poster={p.poster}
              loop={p.loop}
              priority
              playing={active === p.slug}
              className={`!absolute inset-0 transition-opacity duration-base ${
                active === p.slug ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
      </div>
    </div>
  );
}

function WorkIndex({ items, pending = [] }) {
  const [active, setActive] = useState(null);
  const finePointer = useFinePointer();

  return (
    <div onMouseLeave={() => setActive(null)}>
      <div className="grid-12 hidden pb-4 text-fg-2 md:grid" aria-hidden>
        <span className="col-span-4">Project</span>
        <span className="col-span-4">Discipline</span>
        <span className="col-span-3">Client</span>
        <span className="col-span-1 text-right">Year</span>
      </div>

      <ul>
        {items.map((p, i) => {
          const dim = active && active !== p.slug;
          return (
            <li key={p.slug} className="rule index-row" style={{ "--i": i }}>
              <Link
                to={`/works/${p.slug}`}
                viewTransition
                onMouseEnter={() => setActive(p.slug)}
                onFocus={() => setActive(p.slug)}
                onBlur={() => setActive(null)}
                className="grid-12 items-baseline gap-y-1 py-5 md:py-6"
              >
                <span
                  className={`col-span-10 text-h3 transition-[color,transform] duration-base ease-out md:col-span-4 ${
                    dim ? "text-fg-3" : "text-fg"
                  } ${active === p.slug ? "md:translate-x-2" : ""}`}
                >
                  {p.title}
                  <span
                    aria-hidden
                    className={`caret caret-ghost transition-opacity duration-fast ${
                      active === p.slug ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </span>
                <span className={`col-span-4 hidden transition-colors duration-base md:block ${dim ? "text-fg-3" : "text-fg-2"}`}>
                  {p.disciplines.join(", ")}
                </span>
                <span className={`col-span-3 hidden transition-colors duration-base md:block ${dim ? "text-fg-3" : "text-fg-2"}`}>
                  {p.client}
                </span>
                <span className={`col-span-2 text-right tabular-nums transition-colors duration-base md:col-span-1 ${dim ? "text-fg-3" : "text-fg-2"}`}>
                  {p.year}
                </span>
                <span className="col-span-12 text-fg-2 md:hidden">{p.client}</span>
              </Link>
            </li>
          );
        })}

        {pending.map((p, i) => (
          <li
            key={`pending-${i}`}
            className="rule index-row"
            style={{ "--i": items.length + i }}
            aria-label={`${p.note}, in progress — not yet public`}
          >
            <div className="grid-12 items-baseline gap-y-1 py-5 text-fg-3 md:py-6">
              <span className="col-span-10 text-h3 md:col-span-4">{p.title}</span>
              <span className="col-span-4 hidden md:block">{p.disciplines.join(", ")}</span>
              <span className="col-span-3 hidden md:block">{p.note}</span>
              <span className="col-span-2 text-right md:col-span-1">Soon</span>
              <span className="col-span-12 md:hidden">{p.note}</span>
            </div>
          </li>
        ))}
      </ul>
      <div className="rule" />

      {finePointer ? <CursorPreview items={items} active={active} /> : null}
    </div>
  );
}

export default WorkIndex;
