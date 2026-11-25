import CaseStudy from "../../components/case-study/CaseStudy";
import { Figure, Quote, Row, Section, Shot } from "../../components/case-study/blocks";
import mockupMobileDual from "../../assets/photos-by-feng/mockup-mobile-dual.webp";
import mockupLaptopLifestyle from "../../assets/photos-by-feng/mockup-laptop-lifestyle.jpeg";
import mockupMacbookGeometric from "../../assets/photos-by-feng/mockup-macbook-geometric.jpeg";
import mockupMacbookConcrete from "../../assets/photos-by-feng/mockup-macbook-concrete.jpeg";

const LIVE_URL = "https://photos.feng.works";

function PhotoFengWorksPage() {
  return (
    <CaseStudy
      slug="photos-by-feng"
      hero={{
        label:
          "A dot drops onto a row of index ticks; the tallest tick bends into the Photos by Feng mark, a twisted four-point star drawn in white line, which settles above the wordmark as \u201cstreet photography index, archival \u00b7 experimental\u201d types on.",
      }}
      facts={[
        { label: "Client", value: "Personal" },
        { label: "Year", value: "2026" },
        { label: "Scope", value: ["Product UX", "Interaction design", "CMS", "Visual design"] },
        { label: "Stack", value: ["React · Vite · Tailwind", "Sanity CMS · Leaflet"] },
      ]}
      links={[{ label: "Live", href: LIVE_URL }]}
    >
      <Section title="Origin">
        <p>
          The site started as a personal itch: I wanted to organize my street photography in a way
          that respected both <strong>space</strong> and <strong>time</strong> — not only a scroll of
          images, but a catalogue I could read by where I was standing and when the shutter fell.
        </p>
      </Section>

      <Section title="Conception">
        <p>
          Street work accumulates in two directions at once: routes through cities and seasons of
          light and mood. A typical portfolio flattens that into sequence or theme alone, and I kept
          bumping into the gap — images I remembered by corner or metro line, or by month, were hard
          to find in a single chronological ribbon. The conception was deliberately modest: build an
          index around <em>where</em> and <em>when</em> as equal inputs, then hang curation
          (collections, series) on top of that spine so the archive stays navigable as it grows.
        </p>
        <p>
          That is why the experience centers a map and a time-aware gallery view of the same
          corpus — two ways to browse one body of work — rather than treating location or date as
          buried metadata.
        </p>
      </Section>

      <Figure
        src={mockupMobileDual}
        alt="Two phones showing photos.feng.works: map view with pins and region filters, and gallery view with street photos and time travel scrubber"
        aspectClass="aspect-[4/5] md:aspect-video"
        caption="Mobile: map and gallery modes over the same archive."
      />

      <Section title="What it is">
        <p>
          From that starting point,{" "}
          <a href={LIVE_URL} target="_blank" rel="noopener noreferrer" className="link">
            photos.feng.works
          </a>{" "}
          became an experimental catalogue: images are authored in Sanity Studio (capture time,
          optional location override, EXIF-backed GPS when available — geotags are added with
          Lightroom Classic, as the camera does not have an internal GPS module) and delivered to a
          lightweight Vite + React front end. Visitors can stay in a map-first mode to see where
          frames cluster, or switch to a gallery-first mode for sequential browsing — two mental
          models for the same dataset, kept in sync through one selection model and a shared preview
          layer.
        </p>
      </Section>

      <Section title="The challenge">
        <p>
          Most photo sites optimize for either editorial storytelling or a dense archive. I needed
          something in between for my own library: the credibility of a serious index (metadata,
          collections, chronology) without the coldness of a database admin panel. The UX question
          became how to surface <em>where</em> and <em>when</em> as first-class dimensions —
          alongside curatorial series such as Urbanscape and Silent Cadence — without overwhelming
          someone who just wants to wander the work.
        </p>
      </Section>

      <Section title="The solution">
        <p>
          I designed a split view model with explicit map / gallery toggles, a collection filter that
          works as both an overlay control on the map and an inline bar in the gallery, and a
          timeline scrubber whose granularity adapts to the active series (for example, day-level
          stepping where the narrative benefits from tighter rhythm). Dense map regions collapse into
          clusters; opening a cluster keeps context by letting people hop between nearby frames
          inside the preview layer instead of losing their place on the basemap.
        </p>
      </Section>

      <Section title="Motion and feedback">
        <p>
          Opening a photograph uses a thumbnail-to-hero transition so the UI acknowledges where the
          user's eye already is — reducing the "teleport" feeling common in lightbox patterns. On
          the map, a random geotagged frame action flies the viewport first, then opens the preview
          once the motion settles, which reads as intentional navigation rather than a hard cut.
          Typography and chrome stay restrained (mono labels, dark Carto basemap) so color and
          contrast stay with the photography itself.
        </p>
      </Section>

      <Row>
        <Shot
          span={6}
          src={mockupLaptopLifestyle}
          alt="Laptop on a pedestal showing the street index map with photo markers"
          aspectClass="aspect-[4/3]"
          caption="Map-first navigation"
        />
        <Shot
          span={6}
          src={mockupMacbookGeometric}
          alt="MacBook showing the photos-by-feng sheet index: grid of black and white street photos with filters and timeline"
          aspectClass="aspect-[4/3]"
          caption="Gallery view"
        />
      </Row>

      <Quote>
        The product is the hand-off between map and gallery: if selection, time filtering, and
        preview stay aligned, the archive reads as one instrument with two lenses, not two
        disconnected apps.
      </Quote>

      <Figure
        src={mockupMacbookConcrete}
        alt="MacBook on concrete blocks showing Silent Cadence lightbox with photo, map pin, and capture metadata"
        aspectClass="aspect-[4/3] md:aspect-[16/10]"
        caption="Preview layer: frame, map context and metadata together."
      />

      <Section title="Systems and constraints">
        <p>
          Content flows from Sanity: street photos carry capture time, optional manual geopoints when
          EXIF is not enough, and series membership for collection filters. The front end is
          static-hosting friendly (for example Cloudflare Pages) with environment-driven project
          configuration, so the experience stays fast while the CMS remains the single source of
          truth. That split informed UI copy around loading and empty states — honest,
          operator-oriented language when the dataset is still growing — so the surface never
          pretends to be "finished" at the expense of clarity.
        </p>
      </Section>
    </CaseStudy>
  );
}

export default PhotoFengWorksPage;
