import { useEffect, useRef, useState } from "react";
import CaseStudy from "../../components/case-study/CaseStudy";
import Media from "../../components/Media";
import { Points, Quote, Section, Stats } from "../../components/case-study/blocks";
import GhostLineAnimation from "../../components/GhostLineAnimation";
import ArchiveMap from "../../components/ArchiveMap";
import ProcessLine from "../../components/nysda/ProcessLine";
import appIcon from "../../assets/nysda/app-icon.png";
import screenMap from "../../assets/nysda/screens/map.webp";
import screenTransit from "../../assets/nysda/screens/transit.webp";
import screenDetail from "../../assets/nysda/screens/detail.webp";
import screenCollection from "../../assets/nysda/screens/collection.webp";
import screenTimeline from "../../assets/nysda/screens/timeline.webp";
import screenGlossary from "../../assets/nysda/screens/glossary.webp";

// Sources: the thesis board in Figma ("NYSDA", page "Display Board"), the app
// repo (README, AGENTS.md, places.json, Outreach/) and its profiling notes.
// Numbers below are counted from SubwayArchive/Resources/places.json.

const REPO_URL = "https://github.com/TigerFeng37/nyc-subway-digital-archive";

const STATS = [
  { value: "204", label: "Places mapped across all five boroughs" },
  { value: "160", label: "Can be seen legally: from a train, a platform or the street" },
  { value: "9", label: "Curated collections" },
  { value: "444", label: "Sources cited, one or more on every place" },
];

const CONTEXT = [
  { value: "1904", label: "The first IRT line opens. Its City Hall terminal closed in 1945, and riders on the 6 still glimpse it." },
  { value: "5+", label: "Separate archives hold the story. Each was built for experts; none was built for riders." },
  { value: "625 V", label: "On the third rail. Curiosity about the hidden system too often turns into trespass." },
];

const AUDIENCE = [
  {
    title: "The rider",
    body: "Commuters who pass the same tiled walls and stubs of steel every day. They notice them but have no way to find out what they are, in the minutes between two stops.",
  },
  {
    title: "The visitor",
    body: "People exploring the city by subway. They want the story behind what they're looking at, and a clear answer to whether, and how, they can see more.",
  },
  {
    title: "The historian",
    body: "Rail historians and enthusiasts who already know the sources. They judge the archive on accuracy and credit, and they are the people whose research it builds on.",
  },
];

const PROCESS = [
  {
    title: "Empathize",
    body: "Ride-alongs on lines with visible remnants; interviews with commuters, visitors and rail historians; an audit of existing archives.",
  },
  {
    title: "Define",
    body: "Riders notice the remnants but lack context. Sources are scattered and expert-first. Urban-exploration culture glamorizes trespass.",
  },
  {
    title: "Ideate",
    body: "Map-first browsing, “look out the window” cues, a collectible archive passport, and a safety-rated access level for every place.",
  },
  {
    title: "Prototype",
    body: "A native SwiftUI app: a MapKit archive map, place sheets, line, borough and era filters, and signage-style onboarding.",
  },
  {
    title: "Test",
    body: "Usability sessions with riders on legibility, filter depth and safety messaging. Findings loop back to ideation.",
  },
];

// Counts from places.json; tints from the app's Design/Theme.swift.
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

// The access level every place carries. Colors follow the thesis board.
const ACCESS = [
  { label: "Visible from the train", field: "s", keys: ["visible_from_train"], count: 84, tint: "#00933C" },
  { label: "Publicly accessible", field: "s", keys: ["publicly_accessible"], count: 76, tint: "#0039A6" },
  { label: "Not accessible", field: "s", keys: ["not_accessible"], count: 35, tint: "#A7A9AC" },
  { label: "Demolished", field: "s", keys: ["demolished"], count: 9, tint: "#4D4D4D" },
];

const SAFETY = [
  {
    title: "How to see it, legally",
    body: "Every place page names a safe vantage: a train window, an open platform, a museum or an official tour. Closed places are described, never given directions.",
  },
  {
    title: "Look out the window",
    body: "84 remnants can be spotted from a moving train, so discovery happens on the ride itself.",
  },
  {
    title: "Credit every source",
    body: "Photos load with their credit and a link back to the original. Descriptions are original summaries of the research, never copied text.",
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

const rem = () => parseFloat(getComputedStyle(document.documentElement).fontSize);
const headerHeight = () =>
  parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) * rem(); // --header-h is in rem

/**
 * The window.scrollY span over which the map steps through its groups.
 * Wide screens: the map is pinned under the header for as long as its column
 * lasts, so the span is exactly the time it stays pinned. Phones: it isn't
 * pinned, so the span runs from the map being 40% on screen at the bottom
 * until only 40% of it is left below the header.
 */
function scrollSpan(cell, pin) {
  const top = cell.getBoundingClientRect().top + window.scrollY;
  if (window.matchMedia("(min-width: 768px)").matches) {
    const from = top - (headerHeight() + 1.5 * rem());
    return { from, to: from + cell.offsetHeight - pin.offsetHeight };
  }
  const h = pin.offsetHeight;
  return { from: top - window.innerHeight + 0.4 * h, to: top - headerHeight() + 0.6 * h };
}

/** Which of `n` steps the map is on, and a way to scroll to any of them. */
function useScrollStep(cellRef, pinRef, n) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!cellRef.current || !pinRef.current) return;
      const { from, to } = scrollSpan(cellRef.current, pinRef.current);
      const progress = Math.min(1, Math.max(0, (window.scrollY - from) / (to - from)));
      setIndex(Math.min(n - 1, Math.floor(progress * n)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [cellRef, pinRef, n]);

  // Scroll so step i sits in the middle of its stretch.
  const jump = (i) => {
    const { from, to } = scrollSpan(cellRef.current, pinRef.current);
    window.scrollTo({ top: from + ((i + 0.5) / n) * (to - from), behavior: "smooth" });
  };

  return [index, jump];
}

/**
 * The archive map beside a list of groups. Scrolling steps the map through the
 * groups, isolating each one's places in turn; choosing a group scrolls to its
 * step.
 *
 * Wide screens: map on the left, pinned under the header until it has shown
 * every group, while the text and list scroll beside it. Phones: title and
 * text first, then the map in the normal flow (no pinning, so what comes next
 * stays in view as a cue to keep scrolling), with the list title, the current
 * group and a progress bar beneath it.
 */
function MapExplorer({ title, listTitle, groups, children }) {
  const max = Math.max(...groups.map((g) => g.count));
  const cell = useRef(null);
  const pin = useRef(null);
  const [index, jump] = useScrollStep(cell, pin, groups.length);
  const active = groups[index];

  return (
    <section className="cs-block wrap grid-12 items-start gap-y-10" data-reveal>
      <div ref={cell} className="order-2 col-span-12 md:order-none md:col-span-7 md:self-stretch">
        {/* sized so the whole map fits on screen below the header */}
        <div
          ref={pin}
          className="md:sticky md:top-[calc(var(--header-h)+1.5rem)] md:max-w-[calc((100svh-var(--header-h)-3rem)*0.8)]"
        >
          <div className="overflow-hidden rounded-media">
            <ArchiveMap active={active} labelClassName="hidden md:block" />
          </div>
          <div className="md:hidden">
            <div className="mt-4 flex items-baseline justify-between gap-4">
              <h3 className="text-h4">{listTitle}</h3>
              <p className="tabular-nums text-fg-2">
                {index + 1} / {groups.length}
              </p>
            </div>
            <p className="mt-1 text-fg" aria-live="polite">
              {active.label} <span className="ml-1 tabular-nums text-fg-2">{active.count}</span>
            </p>
            <div className="mt-3 flex gap-1.5">
              {groups.map((g, i) => (
                <button
                  key={g.label}
                  type="button"
                  onClick={() => jump(i)}
                  aria-label={`Show ${g.label}`}
                  aria-current={i === index}
                  className="flex-1 py-2"
                >
                  <span
                    className="block h-1 rounded-full transition-colors duration-base"
                    style={{ backgroundColor: i === index ? "rgb(var(--accent))" : "rgb(var(--fg) / 0.12)" }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* scroll length for the pinned map: at least 40% of a screen per group */}
        <div aria-hidden className="hidden md:block" style={{ height: `${groups.length * 40}svh` }} />
      </div>

      <div className="order-1 col-span-12 md:order-none md:col-span-5 md:self-stretch">
        <h2 className="text-h3">{title}</h2>
        <div className="cs-prose mt-5">{children}</div>

        {/* once the text has scrolled by, the list stays beside the pinned map */}
        <div className="hidden pt-10 md:sticky md:top-[calc(var(--header-h)-1rem)] md:block">
          <h3 className="text-h4">{listTitle}</h3>
          <p className="mt-1 text-fg-2">Scroll to step through them, or pick one.</p>
          <ul className="mt-4">
            {groups.map((g, i) => {
              const isActive = i === index;
              return (
                <li key={g.label}>
                  <button
                    type="button"
                    aria-current={isActive}
                    onClick={() => jump(i)}
                    className="rule grid w-full grid-cols-[minmax(0,10rem)_1fr_2.5rem] items-center gap-4 py-2.5 text-left"
                  >
                    <span className={`transition-colors duration-base ${isActive ? "text-fg" : "text-fg-3"}`}>{g.label}</span>
                    <span className="h-1.5 overflow-hidden rounded-full bg-fg/[0.07]">
                      <span
                        className="block h-full rounded-full transition-[background-color,opacity] duration-base"
                        style={{
                          width: `${(g.count / max) * 100}%`,
                          backgroundColor: isActive ? "rgb(var(--accent))" : g.tint,
                          opacity: isActive ? 1 : 0.35,
                        }}
                      />
                    </span>
                    <span className={`text-right tabular-nums ${isActive ? "text-fg" : "text-fg-2"}`}>{g.count}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

/**
 * Three phone screens. A row on the grid from md up; on phones, a sideways
 * scroller like the App Store's screenshots, so each screen stays big enough
 * to read and the next one peeks in from the edge.
 */
function Screens({ items }) {
  return (
    <div className="cs-block cs-fig" data-reveal>
      <div className="gallery-track md:mx-auto md:grid md:max-w-[var(--max)] md:grid-cols-12 md:items-start md:overflow-visible md:px-[var(--gutter)]">
        {items.map((s) => (
          <figure key={s.title} className="w-[62%] shrink-0 snap-start md:col-span-4 md:w-auto">
            <Media src={s.src} alt={s.alt} className="aspect-[645/1398]" />
            {s.caption ? <figcaption className="mt-3 text-fg-2 md:mt-4">{s.caption}</figcaption> : null}
          </figure>
        ))}
      </div>
    </div>
  );
}

function NycSubwayArchivePage() {
  return (
    <CaseStudy
      slug="nyc-subway-archive"
      lead="A field guide to what lies beneath: an iOS app for discovering the subway's hidden history safely, without leaving the train."
      hero={{
        label:
          "A white sign rule draws the NYSDA mark and four subway lines curve in green, yellow, blue and red; the mark then steps aside for the NYC Subway Digital Archive title, hung beneath the rule like station signage.",
      }}
      facts={[
        { label: "Year", value: "2026" },
        { label: "Role", value: "Designer and developer" },
        { label: "Platform", value: "iOS 26 · SwiftUI · MapKit" },
        { label: "Scope", value: ["User research", "Product design", "iOS development", "Data pipeline"] },
      ]}
      links={[{ label: "Source", href: REPO_URL, text: "GitHub" }]}
    >
      <Section title="Overview">
        <p>
          New York's subway is more than a century old, and much of its history is hiding in plain sight:
          a tiled platform flashing past the window, a stub of steel over a Brooklyn street, a station
          shell built for a line that never came.
        </p>
        <p>
          NYSDA, the NYC Subway Digital Archive is a native iOS app that puts those remnants on a map and treats each one like an object in a museum.{" "}
          <strong>The archive grew from the original 31 researched places to 204</strong>, each
          with its story, sources, photo credits and a legal way to see it.
        </p>
      </Section>

      <Stats items={STATS} />

      <Section title="The problem">
        <p>
          Riders see the remnants every day but have no way to read them. The history exists, but it is
          spread across fan sites, forums and archives written by experts for experts, none of them
          designed to be read between two stops.
        </p>
        <p>
          The culture that does celebrate these places mostly celebrates getting into them. Tunnels carry
          trains and a live third rail. <strong>An app that made people more curious had to make them
          safer at the same time.</strong>
        </p>
      </Section>

      <Stats items={CONTEXT} align="text" />

      <Quote>How might we turn an ordinary commute into an act of discovery, safely, without ever leaving the train?</Quote>

      <Points title="Three people on the same train" items={AUDIENCE} />

      <Section title="The tension">
        <p>
          Curiosity and safety pull in opposite directions. Hiding the closed places would make the
          archive dishonest and less interesting; describing how to reach them would make it dangerous.
          Every decision below keeps both: tell the full story of a place, and only ever point to where
          it can be seen legally.
        </p>
      </Section>

      <ProcessLine
        title="How I worked"
        intro="Five stops, ridden in order and then ridden again. Every round of testing sent the project back to ideation, the way a local train makes every stop."
        stops={PROCESS}
        loop="Iterate: test findings return to Ideate"
      />

      <Section title="The app is the map">
        <p>
          Riders already read the system as a map, so the map is the whole app. Every service is drawn in
          its MTA trunk color, and station dots, labels and route bullets appear as you zoom in, the way
          Apple Maps handles transit.
        </p>
        <p>
          Everything else lives in one Liquid Glass sheet that rides above the map at three heights: peek,
          half and full. <strong>The city never leaves the screen</strong>, so a place is always shown
          where it is.
        </p>
      </Section>

      <Screens
        items={[
          {
            title: "Map",
            src: screenMap,
            alt: "NYSDA map screen: subway lines across New York with the archive's places as pins, and the Explore sheet at peek height showing Today in the Archive.",
            caption: "The full map, with the Explore sheet at peek height.",
          },
          {
            title: "Transit layer",
            src: screenTransit,
            alt: "Zoomed-in map of lower Manhattan with station dots, transfer connectors, station names and route bullets along each line.",
            caption: "Zoom in and the transit layer fills in: stations, transfers and route bullets.",
          },
          {
            title: "Object page",
            src: screenDetail,
            alt: "Place page for City Hall: photo gallery of the tiled vault, a 6 route bullet, the station name, save, mark seen and directions buttons, and a fact grid with opened 1904, closed 1945 and access visible from the train.",
            caption: "City Hall's object page. Access sits in the fact grid, next to the dates.",
          },
        ]}
      />

      <Section title="An object page for every remnant">
        <p>
          Each place gets the treatment a museum gives an object: a station-sign title, a fact grid, a bar
          showing the years it was in service, the story, how to see it, nearby places, sources and image
          credits. The facts come first, so a rider with one stop to spare still learns what they just
          passed.
        </p>
      </Section>

      <MapExplorer title="Look, don't enter" listTitle="Places by access" groups={ACCESS}>
        <p>
          Every place carries an access level, and the app never sends anyone toward a closed one.{" "}
          <strong>35 places can't be visited and 9 no longer exist</strong>; their pages tell the story
          and stop there. The other 160 name a legal vantage: a train window, an open platform, the street
          or a museum.
        </p>
      </MapExplorer>

      <Points title="Safety by design" items={SAFETY} />

      <figure className="cs-block cs-fig wrap" data-reveal>
        <div className="h-[240px] overflow-hidden rounded-media bg-black md:h-[340px]">
          <GhostLineAnimation />
        </div>
        <figcaption className="mt-3 max-w-[56ch] text-fg-2 md:mt-4">
          Look out the window: ghost stations on the 6, 1 and Q light up for a moment as a train passes,
          the way they do from a real car.
        </figcaption>
      </figure>

      <Section title="Curated like a museum guide">
        <p>
          A map of 204 pins is a lot to take in. Collections group places into guided routes, such as
          Ghost Stations, From Your Window, Lost Elevateds and The 1904 Original, so a first visit has a
          place to start.
        </p>
        <p>
          A Learn section explains the system itself: a timeline of every place by the year it opened,
          going back to 1841, and a glossary of 84 terms and acronyms, from IRT to OMNY. Save places and
          mark the ones you've seen, and the Archive Passport tracks your progress by type and borough.
        </p>
      </Section>

      <Screens
        items={[
          {
            title: "Collections",
            src: screenCollection,
            alt: "The Ghost Stations collection: a black sign-band header, a short introduction and a list of 20 places, each with route bullets and years of service, sortable A to Z or by distance.",
            caption: "A collection, sortable A–Z or by distance.",
          },
          {
            title: "Timeline",
            src: screenTimeline,
            alt: "Timeline screen listing places by decade, starting in the 1840s with the Tremont station low platforms in 1841.",
            caption: "Every place in the order it opened.",
          },
          {
            title: "Glossary",
            src: screenGlossary,
            alt: "Glossary screen with 84 transit terms, a search field, topic filters and a Jargon of the Day card for Ghost Station.",
            caption: "84 terms, with a jargon of the day.",
          },
        ]}
      />

      <section className="cs-block wrap grid-12 items-center gap-y-8" data-reveal>
        <div className="col-span-12 md:col-span-4">
          <img
            src={appIcon}
            alt="NYSDA app icon: the NYSDA wordmark on a black sign band, with green, yellow, blue and grey tracks curving into the corner"
            className="w-32 rounded-[22%] shadow-[0_20px_40px_-24px_rgb(0_0_0/0.5)] md:w-44"
          />
        </div>
        <div className="col-span-12 md:col-span-8 lg:col-span-7">
          <h2 className="text-h3">Speaking the system's language</h2>
          <div className="cs-prose mt-5">
            <p>
              The app borrows its visual language from the stations it documents: Helvetica throughout,
              set tight and bold like signage; a black sign band with a thin white rule to title every
              place; and the official MTA trunk-line colors for route bullets, filters and map lines.
              The mark puts the NYSDA wordmark on that band, with four tracks curving into the corner.
            </p>
          </div>
          <div
            className="mt-6 max-w-sm rounded-sm bg-[#111] px-3 pb-3 pt-2 text-white"
            role="img"
            aria-label="A station sign band: thin white rule, J and Z route bullets, and the name Chambers St"
          >
            <span aria-hidden className="block h-[3px] bg-white" />
            <span aria-hidden className="mt-2 flex gap-1">
              {["J", "Z"].map((s) => (
                <span key={s} className="grid h-7 w-7 place-items-center rounded-full bg-[#996633] font-bold" style={HELVETICA}>
                  {s}
                </span>
              ))}
            </span>
            <span aria-hidden className="mt-1 block text-2xl font-bold tracking-tight" style={HELVETICA}>
              Chambers St
            </span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2" role="img" aria-label="MTA trunk-line route bullets">
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

      <MapExplorer title="From 31 places to 204" listTitle="Places by type" groups={CATEGORIES}>
        <p>
          The thesis board covered 31 places in Manhattan, Brooklyn and Queens. To reach every borough
          without losing accuracy, I treated the archive as data. Research from Joseph Brennan's Abandoned
          Stations, LTV Squad, nycsubway.org, Wikipedia and the New York Transit Museum lives in one file
          per source.
        </p>
        <p>
          A Python pipeline merges them, removes duplicates, checks every id, coordinate and year, and
          drops broken image links. Unit tests check the result again on every build. The subway lines and
          stations come from the MTA's open data, simplified to about 100&nbsp;KB so the whole map ships
          inside the app.
        </p>
      </MapExplorer>

      <Section title="Fast on a real phone">
        <p>
          A map of 204 places, hundreds of stations and two dozen lines has to keep up with a pinch. I
          profiled the app on an iPhone with Xcode's Time Profiler, and the first trace showed five
          main-thread hangs of 280 to 420 ms while zooming.
        </p>
        <p>
          Three changes fixed it. Places now compare by id, instead of field by field on every map update.
          Transfer connectors are built once and reused, instead of rebuilt on every update. And pins grow
          in whole-point steps as you zoom, which halved the work MapKit did to keep them in sync.{" "}
          <strong>The traces after that had no hangs.</strong>
        </p>
      </Section>

      {/* <Section title="Credit every source">
        <p>
          The archive stands on other people's research and photos: 343 images and 444 cited sources.
          Every photo is shown with its credit and a link back, and loads from its source instead of being
          copied into the app.
        </p>
        <p>
          Freely licensed images cover much of the archive, but 149 photos are still © their
          photographers. Before any public release, I drafted permission requests to LTV Squad and Joseph
          Brennan covering 141 of them, with the same terms for both: credit with a link, non-commercial
          use, and removal on request. The place data will be released under an open license, with their
          photos kept out of it.
        </p>
      </Section> */}

      <Section title="Outcome">
        <p>
          NYSDA runs as a native app on iPhone: 204 places across five boroughs, nine collections, a
          timeline and an 84-term glossary, with data checked by automated tests. The thesis board
          proposed the New York Transit Museum as a partner, and the permission requests are the first
          step toward a public release.
        </p>
      </Section>

      <Quote>
        The goal was an archive you carry onto the train: the map tells you where to look, and the object
        page tells you what you're looking at.
      </Quote>

      <Section title="What I took from it">
        <p>
          Designing for curiosity meant designing its limits too. The most important field on every page
          turned out to be the smallest one, how to see it, because it decides whether the app sends
          someone to a window or into a tunnel.
        </p>
      </Section>

      <p className="cs-block wrap text-fg-2" data-reveal>
        Not affiliated with the MTA. Never enter tracks, tunnels or closed stations.
      </p>
    </CaseStudy>
  );
}

export default NycSubwayArchivePage;
