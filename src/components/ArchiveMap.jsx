import { useMemo } from "react";
import baseMap from "../assets/nysda/map-base.svg";
import data from "../assets/nysda/places.json";

/**
 * The archive's 204 places over a static basemap (land, MTA lines, stations).
 * `active` is a group ({ label, keys, field }) or null: `field` is "c" for
 * category (the default) or "s" for access status. When set, its places are
 * highlighted and everything else steps back. The corner shows the group's
 * name and count; `labelClassName` can hide it (e.g. on phones).
 */
function ArchiveMap({ active, labelClassName = "" }) {
  const keys = active ? new Set(active.keys) : null;
  const field = active?.field ?? "c";
  const isIn = (p) => keys.has(p[field]);

  // Draw highlighted dots last so they sit on top.
  const ordered = useMemo(() => {
    if (!keys) return data.places;
    return [...data.places].sort((a, b) => isIn(a) - isIn(b));
  }, [active]); // eslint-disable-line react-hooks/exhaustive-deps

  const count = keys ? data.places.filter(isIn).length : data.places.length;

  return (
    <div
      className="relative w-full bg-[#0c0d0e]"
      style={{ aspectRatio: `${data.w} / ${data.h}` }}
    >
      <img
        src={baseMap}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full transition-opacity duration-500"
        style={{ opacity: keys ? 0.35 : 1 }}
      />
      <svg
        viewBox={`0 0 ${data.w} ${data.h}`}
        className="absolute inset-0 w-full h-full"
        role="img"
        aria-label={
          active
            ? `Map showing the ${count} places in ${active.label}`
            : `Map of all ${count} places in the archive`
        }
      >
        {ordered.map((p) => {
          const on = !keys || isIn(p);
          const lit = keys && on;
          return (
            <circle
              key={p.n + p.x + p.y}
              cx={p.x}
              cy={p.y}
              r={6}
              fill={on ? "#72EAE0" : "#5f6b6e"}
              stroke="#0c0d0e"
              strokeWidth={2}
              style={{
                opacity: on ? 1 : 0.12,
                transform: `scale(${lit ? 1.6 : 1})`,
                transformBox: "fill-box",
                transformOrigin: "center",
                transition:
                  "opacity 400ms ease, transform 400ms cubic-bezier(.2,.8,.2,1), fill 400ms ease",
              }}
            >
              <title>{p.n}</title>
            </circle>
          );
        })}
      </svg>
      <div
        className={`pointer-events-none absolute left-4 top-3 text-white md:left-5 md:top-4 ${labelClassName}`}
      >
        {active ? active.label : "All places"}
        <span className="ml-2 tabular-nums text-white/60">{count}</span>
      </div>
    </div>
  );
}

export default ArchiveMap;
