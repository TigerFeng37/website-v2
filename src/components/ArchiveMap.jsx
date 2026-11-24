import React, { useMemo } from "react";
import baseMap from "../assets/nysda/map-base.svg";
import data from "../assets/nysda/places.json";

/**
 * The archive's 204 places over a static basemap (land, MTA lines, stations).
 * `active` is a category group ({ label, keys }) or null. When set, its places
 * are highlighted and everything else steps back.
 */
function ArchiveMap({ active }) {
  const keys = active ? new Set(active.keys) : null;

  // Draw highlighted dots last so they sit on top.
  const ordered = useMemo(() => {
    if (!keys) return data.places;
    return [...data.places].sort((a, b) => keys.has(a.c) - keys.has(b.c));
  }, [active]); // eslint-disable-line react-hooks/exhaustive-deps

  const count = keys ? data.places.filter((p) => keys.has(p.c)).length : data.places.length;

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
          const on = !keys || keys.has(p.c);
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
                transition: "opacity 400ms ease, transform 400ms cubic-bezier(.2,.8,.2,1), fill 400ms ease",
              }}
            >
              <title>{p.n}</title>
            </circle>
          );
        })}
      </svg>
      <div className="absolute left-4 top-4 font-mono text-xs md:text-sm pointer-events-none">
        <span className="text-white">{active ? active.label : "All places"}</span>
        <span className="text-[#72EAE0] ml-2">{count}</span>
      </div>
    </div>
  );
}

export default ArchiveMap;
