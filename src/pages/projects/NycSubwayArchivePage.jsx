import React, { useState } from "react";
import CaseStudy from "../../components/case-study/CaseStudy";
import ProjectDetails from "../../components/case-study/ProjectDetails";
import GhostLineAnimation from "../../components/GhostLineAnimation";
import mapHero from "../../assets/nysda/map-hero.svg";
import ArchiveMap from "../../components/ArchiveMap";
import appIcon from "../../assets/nysda/app-icon.png";
import screenMap from "../../assets/nysda/screens/map.webp";
import screenTransit from "../../assets/nysda/screens/transit.webp";
import screenDetail from "../../assets/nysda/screens/detail.webp";
import screenCollection from "../../assets/nysda/screens/collection.webp";
import screenTimeline from "../../assets/nysda/screens/timeline.webp";
import screenGlossary from "../../assets/nysda/screens/glossary.webp";

// App Store-style screenshots from the repo's docs/screenshots/.
const SCREENS = [
  {
    src: screenMap,
    title: "The map",
    caption: "All 204 remnants on a live subway map, with the Explore sheet at peek height.",
  },
  {
    src: screenTransit,
    title: "Transit layer",
    caption: "Zoom in and station dots, transfers and route bullets appear, as in Apple Maps' transit view.",
  },
  {
    src: screenDetail,
    title: "Object page",
    caption: "City Hall: gallery, station-sign title, fact grid and how to see it legally.",
  },
  {
    src: screenCollection,
    title: "Collections",
    caption: "Curated guides to ghost stations, shells and more, sorted A–Z or by distance.",
  },
  {
    src: screenTimeline,
    title: "Timeline",
    caption: "Every place in the order it opened, going back to 1841.",
  },
  {
    src: screenGlossary,
    title: "Glossary",
    caption: "84 transit terms and acronyms, from IRT to OMNY, with a jargon of the day.",
  },
];

const REPO_URL = "https://github.com/TigerFeng37/nyc-subway-digital-archive";

// Counts from SubwayArchive/Resources/places.json; tints from Design/Theme.swift.
const CATEGORIES = [
  { label: "Infrastructure", keys: ["infrastructure"], count: 75, tint: "#00933C" },
  { label: "Abandoned platforms", keys: ["abandoned_platform"], count: 26, tint: "#4D4D4D" },
  { label: "Architecture", keys: ["architecture"], count: 25, tint: "#0039A6" },
  { label: "Elevated remnants", keys: ["elevated_remnant"], count: 24, tint: "#996633" },
  { label: "Tunnels", keys: ["tunnel"], count: 22, tint: "#2E4057" },
  { label: "Abandoned stations", keys: ["abandoned_station"], count: 20, tint: "#1A1A1A" },
  { label: "Station shells", keys: ["station_shell"], count: 8, tint: "#808183" },
  { label: "Museums & artifacts", keys: ["museum", "artifact"], count: 4, tint: "#EE352E" },
];
const MAX_COUNT = CATEGORIES[0].count;

const STATS = [
  { value: "204", label: "Places mapped" },
  { value: "5", label: "Boroughs" },
  { value: "24", label: "Services drawn" },
  { value: "4", label: "Research sources merged" },
];

const PRINCIPLES = [
  {
    title: "Map-first",
    body: "The app is the map. Every service is drawn in its MTA trunk color, with station dots, labels and route bullets whose density follows the zoom level, the way Apple Maps handles transit. Everything else lives in one resizable sheet: peek, half, full.",
  },
  {
    title: "Museum-guide content",
    body: "Places are grouped into curated Collections, like a gallery audio guide. Each place gets an object page: gallery, station-sign title, fact grid, a service-lifespan bar, the story, how to see it today, nearby places and sources.",
  },
  {
    title: "Archive Passport",
    body: "Save places and mark the ones you've seen. Flighty-style personal stats track progress across ghost stations and boroughs, turning a reference app into something you go out and use.",
  },
  {
    title: "NYCT visual language",
    body: "Helvetica throughout, black station-sign bands with the thin white rule, and official trunk-line colors for route bullets. The app should feel like it belongs on a platform wall.",
  },
  {
    title: "Liquid Glass",
    body: "Floating map controls, filter chips, action buttons and the sheet itself use the iOS 26 glass materials, so the map always stays visible under the interface.",
  },
];

const ROUTES = [
  { s: "1", c: "#EE352E" },
  { s: "4", c: "#00933C" },
  { s: "7", c: "#B933AD" },
  { s: "A", c: "#0039A6" },
  { s: "B", c: "#FF6319" },
  { s: "G", c: "#6CBE45" },
  { s: "J", c: "#996633" },
  { s: "L", c: "#A7A9AC" },
  { s: "N", c: "#FCCC0A", dark: true },
  { s: "S", c: "#808183" },
];

function NycSubwayArchivePage() {
  // Category isolated on the dataset map: hover/focus previews, click/tap pins.
  const [hoverCat, setHoverCat] = useState(null);
  const [pinnedCat, setPinnedCat] = useState(null);
  const activeCat = hoverCat || pinnedCat;

  return (
    <CaseStudy slug="nyc-subway-archive">
      {/* Hero: rendered from the app's own line, station and place data */}
      <div className="mb-6 rounded-lg overflow-hidden border border-white/10 animate-on-scroll image-fade stagger-2">
        <div className="w-full aspect-video bg-[#111111]">
          <img
            src={mapHero}
            alt="Map of New York City subway lines in MTA colors, with the archive's 204 places marked as teal dots"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
      <p className="mb-16 text-sm text-gray-500 font-mono animate-on-scroll text-slide stagger-2">
        Rendered from the app's bundled datasets: MTA service lines, every
        station, and the archive's places in teal.
      </p>

      {/* Stats */}
      <div className="mb-16 grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`bg-gray-900 rounded-lg p-6 animate-on-scroll image-fade stagger-${i + 1}`}
          >
            <p className="text-4xl md:text-5xl font-medium text-[#72EAE0]">
              {s.value}
            </p>
            <p className="text-sm text-gray-400 mt-2 uppercase tracking-wide">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Intro */}
      <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="animate-on-scroll text-slide stagger-3">
          <h2 className="text-2xl font-medium mb-6">The idea</h2>
          <p className="text-lg text-gray-300 mb-6">
            New York's subway is more than a century old, and most of its
            history is hiding in plain sight: a tiled platform flashing past
            the window, a stub of steel over a Brooklyn street, a station shell
            built for a line that never came. The knowledge exists, but it's
            spread across fan sites, forums and archives that were never
            designed to be read on a train.
          </p>
        </div>
        <div className="animate-on-scroll text-slide stagger-4">
          <h2 className="text-2xl font-medium mb-6">The approach</h2>
          <p className="text-lg text-gray-300 mb-6">
            NYSDA brings it together as a field guide. I treated each place the
            way a museum treats an object, with a clear title, the facts at a
            glance, the story, and practical directions for seeing it safely
            today. It's built natively in SwiftUI for iOS 26 so the map,
            sheet and glass controls feel like part of the system.
          </p>
        </div>
      </div>

      {/* Ghost-line animation */}
      <div className="mb-16 animate-on-scroll image-fade">
        <div className="rounded-lg overflow-hidden border border-white/10 bg-black h-[220px] md:h-[300px]">
          <GhostLineAnimation />
        </div>
        <p className="mt-3 text-sm text-gray-500 font-mono">
          Ghost stations on the 6, 1 and Q, lit for a moment as trains pass.
        </p>
      </div>

      {/* Screens */}
      <div className="mb-16">
        <div className="mb-8 animate-on-scroll text-slide">
          <h2 className="text-2xl font-medium">The app</h2>
          <p className="text-gray-400 text-sm mt-1 max-w-2xl">
            From the full map down to a single platform, plus a Learn section
            with a timeline and a glossary for reading the system's history.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10 md:gap-x-6">
          {SCREENS.map((s, i) => (
            <figure
              key={s.title}
              className={`animate-on-scroll image-fade stagger-${(i % 3) + 1}`}
            >
              <div className="rounded-lg overflow-hidden border border-white/10 bg-black aspect-[645/1398]">
                <img
                  src={s.src}
                  alt={`NYSDA app screen: ${s.title}. ${s.caption}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption className="mt-3">
                <p className="text-base font-medium">{s.title}</p>
                <p className="text-sm text-gray-400 mt-1">{s.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Identity */}
      <div className="mb-16 bg-gray-900 rounded-lg p-6 md:p-10 grid grid-cols-1 md:grid-cols-[auto,1fr] gap-8 items-center animate-on-scroll image-fade">
        <img
          src={appIcon}
          alt="NYSDA app icon"
          className="w-32 h-32 md:w-40 md:h-40 rounded-[22%] border border-white/10"
        />
        <div>
          <h2 className="text-2xl font-medium mb-4">Identity</h2>
          <p className="text-lg text-gray-300 mb-6">
            The mark sets the NYSDA wordmark in Helvetica on a black sign band,
            borrowing directly from the station signage it documents. Route
            bullets use the official MTA trunk-line colors.
          </p>
          <div className="flex flex-wrap gap-2" aria-label="MTA trunk-line route bullets">
            {ROUTES.map((r) => (
              <span
                key={r.s}
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-base ${
                  r.dark ? "text-black" : "text-white"
                }`}
                style={{ backgroundColor: r.c, fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif" }}
              >
                {r.s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Principles */}
      <div className="mb-16">
        <h2 className="text-2xl font-medium mb-8 animate-on-scroll text-slide">Design principles</h2>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-6 gap-y-10">
          {PRINCIPLES.map((p, i) => (
            <div
              key={p.title}
              className={`border-t border-white/15 pt-5 animate-on-scroll text-slide stagger-${(i % 2) + 1}`}
            >
              <p className="font-mono text-sm text-[#72EAE0] mb-2">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="text-xl font-medium mb-3">{p.title}</h3>
              <p className="text-lg text-gray-300">{p.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Data */}
      <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="md:sticky md:top-24 rounded-lg overflow-hidden border border-white/10 animate-on-scroll image-fade">
          <ArchiveMap active={activeCat} />
        </div>
        <div className="animate-on-scroll text-slide stagger-2">
          <h2 className="text-2xl font-medium mb-6">Building the dataset</h2>
          <p className="text-lg text-gray-300 mb-6">
            The places were researched from Joseph Brennan's Abandoned
            Stations, LTV Squad, Wikipedia, nycsubway.org and the New York
            Transit Museum, with every description written as an original
            summary. A Python pipeline merges the sources, removes duplicates,
            validates ids, coordinates and years, and drops broken image links.
          </p>
          <p className="text-lg text-gray-300 mb-8">
            The line and station layers come from the MTA's open data, then
            get simplified to about 100&nbsp;KB so the whole map ships inside
            the app.
          </p>
          <h3 className="text-sm text-gray-400 mb-1 uppercase tracking-wide">Places by category</h3>
          <p className="text-xs text-gray-500 mb-4">
            Hover a category to isolate it on the map. Click or tap to keep it.
          </p>
          <ul className="space-y-1" onMouseLeave={() => setHoverCat(null)}>
            {CATEGORIES.map((c) => {
              const isActive = activeCat === c;
              const dimmed = activeCat && !isActive;
              return (
                <li key={c.label}>
                  <button
                    type="button"
                    aria-pressed={pinnedCat === c}
                    onMouseEnter={() => setHoverCat(c)}
                    onFocus={() => setHoverCat(c)}
                    onBlur={() => setHoverCat(null)}
                    onClick={() => setPinnedCat(pinnedCat === c ? null : c)}
                    className={`w-full grid grid-cols-[9.5rem,1fr,2rem] items-center gap-3 text-sm text-left py-1.5 px-2 -mx-2 rounded-md transition-colors duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#72EAE0] ${
                      isActive ? "bg-white/5" : ""
                    }`}
                  >
                    <span className={`transition-colors duration-300 ${isActive ? "text-white" : dimmed ? "text-gray-500" : "text-gray-300"}`}>
                      {c.label}
                    </span>
                    <span className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <span
                        className="block h-full rounded-full transition-colors duration-300"
                        style={{
                          width: `${(c.count / MAX_COUNT) * 100}%`,
                          backgroundColor: isActive ? "#72EAE0" : c.tint,
                          opacity: dimmed ? 0.4 : 1,
                          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.15)",
                        }}
                      />
                    </span>
                    <span className={`text-right font-mono ${isActive ? "text-[#72EAE0]" : "text-gray-400"}`}>{c.count}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <blockquote className="max-w-2xl mr-auto my-16 pl-6 md:pl-8 border-l-4 border-[#72EAE0]/60 text-gray-300 text-lg md:text-xl italic animate-on-scroll text-slide">
        The goal was an archive you carry onto the train: the map tells you
        where to look, and the object page tells you what you're looking at.
      </blockquote>

      <ProjectDetails
        link={{ label: "Source", href: REPO_URL }}
        items={[
          { label: "Project", value: "NYC Subway Digital Archive" },
          { label: "Year", value: "2026" },
          { label: "Platform", value: "iOS 26 · SwiftUI" },
          { label: "Scope", value: ["Product & UI design", "iOS development", "Research & data pipeline"] },
        ]}
        footnote="Not affiliated with the MTA. Never enter tracks, tunnels or closed stations."
      />
    </CaseStudy>
  );
}

export default NycSubwayArchivePage;
