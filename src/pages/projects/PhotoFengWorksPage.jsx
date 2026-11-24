import React from "react";
import CaseStudy from "../../components/case-study/CaseStudy";
import ProjectDetails from "../../components/case-study/ProjectDetails";
import { photosByFengHero as heroImage } from "../../assets/photos-by-feng";
import mockupMobileDual from "../../assets/photos-by-feng/mockup-mobile-dual.webp";
import mockupLaptopLifestyle from "../../assets/photos-by-feng/mockup-laptop-lifestyle.jpeg";
import mockupMacbookGeometric from "../../assets/photos-by-feng/mockup-macbook-geometric.jpeg";
import mockupMacbookConcrete from "../../assets/photos-by-feng/mockup-macbook-concrete.jpeg";

const LIVE_URL = "https://photos.feng.works";

function PhotoFengWorksPage() {
  return (
    <CaseStudy
      slug="photos-by-feng"
      intro={
        <>
          The site started as a personal itch: I wanted to organize my street
          photography in a way that respected both{" "}
          <span className="text-gray-200">space</span> and{" "}
          <span className="text-gray-200">time</span>—not only a scroll of images,
          but a catalogue I could read by where I was standing and when the shutter
          fell.
        </>
      }
    >
      <div className="mb-16 rounded-lg overflow-hidden animate-on-scroll image-fade stagger-2">
        <div className="w-full aspect-[4/5] md:aspect-[16/9] bg-gray-900">
          <img
            src={heroImage}
            alt="Black and white street scene through a window, SUV and pedestrians, with the Photos by Feng mark centered"
            className="w-full h-full object-cover object-center"
            style={{ objectPosition: "50% 50%" }}
            loading="eager"
            decoding="async"
          />
        </div>
      </div>

      <div className="mb-10 flex flex-col gap-3 pb-8 -mt-8 sm:flex-row sm:items-center sm:justify-center">
        <a
          href={LIVE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-white/50 bg-[#72EAE0]/5 px-5 py-2.5 font-mono text-sm font-medium text-white hover:border-[#72EAE0] hover:bg-[#72EAE0]/10 transition-colors sm:text-base"
        >
          photos.feng.works
          <span className="text-xs opacity-90" aria-hidden>
            ↗
          </span>
        </a>
      </div>

      <div className="mb-16 max-w-3xl animate-on-scroll text-slide stagger-3">
        <h2 className="text-2xl font-medium mb-6">Conception</h2>
        <p className="text-lg text-gray-300 mb-6">
          Street work accumulates in two directions at once: routes through cities and
          seasons of light and mood. A typical portfolio flattens that into sequence or
          theme alone, and I kept bumping into the gap—images I remembered by corner or
          metro line, or by month, were hard to find in a single chronological ribbon.
          The conception was deliberately modest: build an index around{" "}
          <em>where</em> and <em>when</em> as equal inputs, then hang curation
          (collections, series) on top of that spine so the archive stays navigable as
          it grows.
        </p>
        <p className="text-lg text-gray-300">
          That is why the experience centers a map and a time-aware gallery view of
          the same corpus—two ways to browse one body of work—rather than treating
          location or date as buried metadata.
        </p>
      </div>

      <div className="mb-4 md:mb-8 rounded-lg md:rounded-3xl overflow-hidden animate-on-scroll image-fade stagger-2">
        <div className="w-full aspect-[3/5] md:aspect-[2/1] bg-gray-900">
          <img
            src={mockupMobileDual}
            alt="Two phones showing photos.feng.works: map view with pins and region filters, and gallery view with street photos and time travel scrubber"
            className="w-full h-full object-cover object-center"
            style={{ objectPosition: "50% 50%" }}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
      <p className="mb-16 text-sm text-gray-500">
        Mobile UI – map and gallery modes on{" "}
        <a
          href={LIVE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-[#72EAE0] underline-offset-2 hover:underline transition-colors"
        >
          photos.feng.works
        </a>
      </p>

      <div className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="animate-on-scroll text-slide stagger-3">
            <h2 className="text-2xl font-medium mb-6">What it is</h2>
            <p className="text-lg text-gray-300 mb-6">
              From that starting point,{" "}
              <a
                href={LIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 underline decoration-white/20 underline-offset-2 hover:text-[#72EAE0] hover:decoration-[#72EAE0]/60 transition-colors"
              >
                photos.feng.works
              </a>{" "}
              became an experimental
              catalogue: images are authored in Sanity Studio (capture time, optional
              location override, EXIF-backed GPS when available—geotags are added with
              Lightroom Classic, as the camera does not have an internal GPS module) and delivered to a
              lightweight Vite + React front end. Visitors can stay in a map-first mode
              to see where frames cluster, or switch to a gallery-first mode for
              sequential browsing—two mental models for the same dataset, kept in sync
              through one selection model and a shared preview layer.
            </p>
          </div>
          <div className="animate-on-scroll text-slide stagger-4">
            <h2 className="text-2xl font-medium mb-6">The challenge</h2>
            <p className="text-lg text-gray-300 mb-6">
              Most photo sites optimize for either editorial storytelling or a dense
              archive. I needed something in between for my own library: the credibility
              of a serious index (metadata, collections, chronology) without the coldness
              of a database admin panel. The UX question became how to surface{" "}
              <em>where</em> and <em>when</em> as first-class dimensions—alongside
              curatorial series such as Urbanscape and Silent Cadence—without
              overwhelming someone who just wants to wander the work.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="animate-on-scroll text-slide stagger-3">
            <h2 className="text-2xl font-medium mb-6">The solution</h2>
            <p className="text-lg text-gray-300 mb-6">
              I designed a split view model with explicit map / gallery toggles, a
              collection filter that works as both an overlay control on the map and
              an inline bar in the gallery, and a timeline scrubber whose granularity
              adapts to the active series (for example, day-level stepping where the
              narrative benefits from tighter rhythm). Dense map regions collapse into
              clusters; opening a cluster keeps context by letting people hop between
              nearby frames inside the preview layer instead of losing their place on
              the basemap.
            </p>
          </div>
          <div className="animate-on-scroll text-slide stagger-5">
            <h2 className="text-2xl font-medium mb-6">Motion and feedback</h2>
            <p className="text-lg text-gray-300 mb-6">
              Opening a photograph uses a thumbnail-to-hero transition so the UI
              acknowledges where the user&apos;s eye already is—reducing the
              &quot;teleport&quot; feeling common in lightbox patterns. On the map, a
              random geotagged frame action flies the viewport first, then opens the
              preview once the motion settles, which reads as intentional navigation
              rather than a hard cut. Typography and chrome stay restrained (mono
              labels, dark Carto basemap) so color and contrast stay with the
              photography itself.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
        <div className="rounded-lg overflow-hidden animate-on-scroll image-fade stagger-3 aspect-[3/2]">
          <img
            src={mockupLaptopLifestyle}
            alt="Laptop on a pedestal showing the street index map with photo markers"
            className="w-full h-full object-cover object-center"
            style={{ objectPosition: "50% 50%" }}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="rounded-lg overflow-hidden animate-on-scroll image-fade stagger-4 aspect-[3/2]">
          <img
            src={mockupMacbookGeometric}
            alt="MacBook showing the photos-by-feng sheet index: grid of black and white street photos with filters and timeline"
            className="w-full h-full object-cover object-center"
            style={{ objectPosition: "50% 50%" }}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16 text-sm text-gray-500">
        <p>Map-first navigation</p>
        <p>Gallery view</p>
      </div>

      <blockquote className="max-w-2xl mr-auto my-16 pl-6 md:pl-8 border-l-4 border-[#72EAE0]/60 text-gray-300 text-lg md:text-xl italic animate-on-scroll text-slide">
        The conception was never &quot;add a map&quot; for its own sake—it was to
        hold street work in the same two axes I already use to remember it. The
        product is the hand-off between map and gallery: if selection, time filtering,
        and preview stay aligned, the archive reads as one instrument with two
        lenses, not two disconnected apps.
      </blockquote>

      <div className="mb-4 md:mb-8 rounded-lg md:rounded-3xl overflow-hidden animate-on-scroll image-fade stagger-2">
        <div className="w-full aspect-[3/4] md:aspect-[16/10] bg-gray-900">
          <img
            src={mockupMacbookConcrete}
            alt="MacBook on concrete blocks showing Silent Cadence lightbox with photo, map pin, and capture metadata"
            className="w-full h-full object-cover object-center"
            style={{ objectPosition: "50% 50%" }}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
      <p className="mb-16 text-sm text-gray-500">
        Preview layer: frame, map context, and metadata together
      </p>

      <div className="mb-16">
        <div className="animate-on-scroll text-slide stagger-3">
          <h2 className="text-2xl font-medium mb-6">Systems and constraints</h2>
          <p className="text-lg text-gray-300 mb-6">
            Content flows from Sanity: street photos carry capture time, optional
            manual geopoints when EXIF is not enough, and series membership for
            collection filters. The front end is static-hosting friendly (for example
            Cloudflare Pages) with environment-driven project configuration, so the
            experience stays fast while the CMS remains the single source of truth.
            That split informed UI copy around loading and empty states—honest,
            operator-oriented language when the dataset is still growing—so the
            surface never pretends to be &quot;finished&quot; at the expense of clarity.
          </p>
        </div>
      </div>

      <ProjectDetails
        link={{ label: "Live", href: LIVE_URL }}
        items={[
          { label: "Client", value: "Personal" },
          { label: "Year", value: "2026" },
          { label: "Scope", value: ["Product UX", "Interaction design", "CMS", "Visual design"] },
          { label: "Stack", value: ["React · Vite · Tailwind", "Sanity CMS · Leaflet"] },
        ]}
      />
    </CaseStudy>
  );
}

export default PhotoFengWorksPage;
