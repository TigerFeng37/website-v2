import { useState } from "react";
import CaseStudy from "../../components/case-study/CaseStudy";
import { Points, Quote, Row, Section, Shot, Stats } from "../../components/case-study/blocks";
import GhostLineAnimation from "../../components/GhostLineAnimation";
import ArchiveMap from "../../components/ArchiveMap";
import appIcon from "../../assets/nysda/app-icon.png";
import screenMap from "../../assets/nysda/screens/map.webp";
import screenTransit from "../../assets/nysda/screens/transit.webp";
import screenDetail from "../../assets/nysda/screens/detail.webp";
import screenCollection from "../../assets/nysda/screens/collection.webp";
import screenTimeline from "../../assets/nysda/screens/timeline.webp";
import screenGlossary from "../../assets/nysda/screens/glossary.webp";

const REPO_URL = "https://github.com/TigerFeng37/nyc-subway-digital-archive";

// App Store-style screenshots from the repo's docs/screenshots/.
const SCREENS = [
  { src: screenMap, title: "The map", caption: "All 204 remnants on a live subway map, with the Explore sheet at peek height." },
  { src: screenTransit, title: "Transit layer", caption: "Zoom in and station dots, transfers and route bullets appear, as in Apple Maps' transit view." },
  { src: screenDetail, title: "Object page", caption: "City Hall: gallery, station-sign title, fact grid and how to see it legally." },
  { src: screenCollection, title: "Collections", caption: "Curated guides to ghost stations, shells and more, sorted A–Z or by distance." },
  { src: screenTimeline, title: "Timeline", caption: "Every place in the order it opened, going back to 1841." },
  { src: screenGlossary, title: "Glossary", caption: "84 transit terms and acronyms, from IRT to OMNY, with a jargon of the day." },
];

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

const HELVETICA = { fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' };

function Dataset() {
  // Hover/focus previews a category on the map; click or tap pins it.
  const [hoverCat, setHoverCat] = useState(null);
  const [pinnedCat, setPinnedCat] = useState(null);
  const activeCat = hoverCat || pinnedCat;

  return (
    <section className="cs-block wrap grid-12 items-start gap-y-10" data-reveal>
      <div className="col-span-12 overflow-hidden rounded-media md:sticky md:top-[calc(var(--header-h)+1.5rem)] md:col-span-7">
        <ArchiveMap active={activeCat} />
      </div>
      <div className="col-span-12 md:col-span-5">
        <h2 className="text-h3">Building the dataset</h2>
        <div className="cs-prose mt-5">
          <p>
            The places were researched from Joseph Brennan's Abandoned Stations, LTV Squad,
            Wikipedia, nycsubway.org and the New York Transit Museum, with every description written
            as an original summary. A Python pipeline merges the sources, removes duplicates,
            validates ids, coordinates and years, and drops broken image links.
          </p>
          <p>
            The line and station layers come from the MTA's open data, then get simplified to about
            100&nbsp;KB so the whole map ships inside the app.
          </p>
        </div>

        <h3 className="mt-10 text-h4">Places by category</h3>
        <p className="mt-1 text-fg-2">Point at a category to isolate it on the map; click to keep it.</p>
        <ul className="mt-4" onMouseLeave={() => setHoverCat(null)}>
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
                  className="rule grid w-full grid-cols-[minmax(0,10rem)_1fr_2.5rem] items-center gap-4 py-2.5 text-left"
                >
                  <span className={`transition-colors duration-base ${isActive ? "text-fg" : dimmed ? "text-fg-3" : "text-fg-2"}`}>
                    {c.label}
                  </span>
                  <span className="h-1.5 overflow-hidden rounded-full bg-fg/[0.07]">
                    <span
                      className="block h-full rounded-full transition-[background-color,opacity] duration-base"
                      style={{
                        width: `${(c.count / MAX_COUNT) * 100}%`,
                        backgroundColor: isActive ? "rgb(var(--accent))" : c.tint,
                        opacity: dimmed ? 0.35 : 1,
                      }}
                    />
                  </span>
                  <span className={`text-right tabular-nums ${isActive ? "text-fg" : "text-fg-2"}`}>{c.count}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function NycSubwayArchivePage() {
  return (
    <CaseStudy
      slug="nyc-subway-archive"
      hero={{
        alt: "Map of New York City subway lines in MTA colors, with the archive's 204 places marked as teal dots",
      }}
      facts={[
        { label: "Year", value: "2026" },
        { label: "Platform", value: "iOS 26 · SwiftUI" },
        { label: "Type", value: "Personal project" },
        { label: "Scope", value: ["Product & UI design", "iOS development", "Research & data pipeline"] },
      ]}
      links={[{ label: "Source", href: REPO_URL, text: "GitHub" }]}
    >
      <Stats items={STATS} />

      <Section title="The idea">
        <p>
          New York's subway is more than a century old, and most of its history is hiding in plain
          sight: a tiled platform flashing past the window, a stub of steel over a Brooklyn street, a
          station shell built for a line that never came. The knowledge exists, but it's spread
          across fan sites, forums and archives that were never designed to be read on a train.
        </p>
      </Section>
      <Section title="The approach">
        <p>
          NYSDA brings it together as a field guide. I treated each place the way a museum treats an
          object, with a clear title, the facts at a glance, the story, and practical directions for
          seeing it safely today. It's built natively in SwiftUI for iOS 26 so the map, sheet and
          glass controls feel like part of the system.
        </p>
      </Section>

      <figure className="cs-block cs-fig wrap" data-reveal>
        <div className="h-[240px] overflow-hidden rounded-media bg-black md:h-[340px]">
          <GhostLineAnimation />
        </div>
        <figcaption className="mt-3 text-fg-2 md:mt-4">
          Ghost stations on the 6, 1 and Q, lit for a moment as trains pass.
        </figcaption>
      </figure>

      <Section title="The app">
        <p>
          From the full map down to a single platform, plus a Learn section with a timeline and a
          glossary for reading the system's history.
        </p>
      </Section>

      <Row>
        {SCREENS.map((s) => (
          <Shot
            key={s.title}
            span={4}
            mobile={6}
            src={s.src}
            alt={`NYSDA app screen: ${s.title}. ${s.caption}`}
            aspectClass="aspect-[645/1398]"
            caption={
              <>
                <span className="block text-fg">{s.title}</span>
                <span className="hidden md:inline">{s.caption}</span>
              </>
            }
          />
        ))}
      </Row>

      <section className="cs-block wrap grid-12 items-center gap-y-8" data-reveal>
        <div className="col-span-12 md:col-span-4">
          <img
            src={appIcon}
            alt="NYSDA app icon"
            className="w-32 rounded-[22%] shadow-[0_20px_40px_-24px_rgb(0_0_0/0.5)] md:w-44"
          />
        </div>
        <div className="col-span-12 md:col-span-8 lg:col-span-7">
          <h2 className="text-h3">Identity</h2>
          <div className="cs-prose mt-5">
            <p>
              The mark sets the NYSDA wordmark in Helvetica on a black sign band, borrowing directly
              from the station signage it documents. Route bullets use the official MTA trunk-line
              colors.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-2" role="img" aria-label="MTA trunk-line route bullets">
            {ROUTES.map((r) => (
              <span
                key={r.s}
                aria-hidden
                className={`grid h-10 w-10 place-items-center rounded-full text-lg font-bold ${r.dark ? "text-black" : "text-white"}`}
                style={{ backgroundColor: r.c, ...HELVETICA }}
              >
                {r.s}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Points title="Design principles" items={PRINCIPLES} />

      <Dataset />

      <Quote>
        The goal was an archive you carry onto the train: the map tells you where to look, and the
        object page tells you what you're looking at.
      </Quote>

      <p className="cs-block wrap text-fg-2" data-reveal>
        Not affiliated with the MTA. Never enter tracks, tunnels or closed stations.
      </p>
    </CaseStudy>
  );
}

export default NycSubwayArchivePage;
