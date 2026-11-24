import React from "react";
import CaseStudy from "../../components/case-study/CaseStudy";
import ProjectDetails from "../../components/case-study/ProjectDetails";
import Carousel from "../../components/case-study/Carousel";
import heroAnim from "../../assets/trackmap/ttp-hero.mp4";
import tm1 from "../../assets/trackmap/TM-1.webp";
import tm2 from "../../assets/trackmap/TM-2.webp";
import tm3 from "../../assets/trackmap/TM-3.webp";
import tm4 from "../../assets/trackmap/TM-4.webp";
import demo5 from "../../assets/trackmap/demo5.png";
import demo6 from "../../assets/trackmap/demo6.webp";
import demo7 from "../../assets/trackmap/demo7.webp";
import demo8 from "../../assets/trackmap/demo8.webp";

const SLIDES = [
  { src: tm4, caption: "Tokyo Station area" },
  { src: tm1, caption: "Shimbashi Station area" },
  { src: tm2, caption: "Ueno Station area, with elevation breakdowns" },
  { src: tm3, caption: "Shinagawa Station area" },
].map((s) => ({ ...s, alt: `Tokyo Trackmap detail: ${s.caption}` }));

function TokyoTrackmapPage() {
  return (
    <CaseStudy slug="tokyo-trackmap">
      <div className="mb-16 rounded-lg overflow-hidden bg-black animate-on-scroll image-fade stagger-2">
        <video
          className="w-full aspect-video md:h-[50vh] object-cover"
          autoPlay
          muted
          playsInline
          aria-label="Tokyo Trackmap identity animation"
        >
          <source src={heroAnim} type="video/mp4" />
        </video>
      </div>

      <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="animate-on-scroll text-slide">
          <h2 className="text-2xl font-medium mb-6">Concept</h2>
          <p className="text-lg text-gray-300">
            Tokyo Trackmap is an experimental mapping project that visualizes
            Tokyo's dense railway system. It aims to document the network in a
            geographically accurate way while keeping a simple, easy-to-read visual
            language.
          </p>
        </div>
      </div>

      <Carousel
        slides={SLIDES}
        label="Tokyo Trackmap station-area details"
        aspect="aspect-square md:aspect-video"
        showCaptions
        className="mb-16 animate-on-scroll image-fade"
      />

      <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="animate-on-scroll text-slide stagger-1">
          <h2 className="text-2xl font-medium mb-6">Methodology</h2>
          <p className="text-lg text-gray-300">
            The project started from GIS data of Tokyo's rail network, referenced
            against OpenRailwayMap. Lines and stations were then transcribed into a
            single large Figma file, with every line color-coded and every station
            labeled.
          </p>
        </div>
        <div className="animate-on-scroll text-slide stagger-2">
          <h2 className="text-2xl font-medium mb-6">Communication</h2>
          <p className="text-lg text-gray-300">
            Colors come directly from each rail line's identifier palette, and
            station labels combine the station symbol, number and name. The map is
            labeled bilingually in English and Japanese.
          </p>
        </div>
      </div>

      <figure className="mb-16 rounded-lg overflow-hidden animate-on-scroll image-fade">
        <img src={demo5} alt="Tokyo Trackmap overview" className="w-full" loading="lazy" decoding="async" />
      </figure>

      <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="animate-on-scroll text-slide stagger-1">
          <h2 className="text-2xl font-medium mb-6">Visual identity</h2>
          <p className="text-lg text-gray-300">
            The identity is drawn from railway tracks and switches{" "}
            <span className="text-gray-500">
              (the mechanism that moves rails to guide a train from one track to
              another)
            </span>
            . They are the foundation of every line and one of the most common
            elements on the map.
          </p>
        </div>
        <div className="animate-on-scroll text-slide stagger-2 md:pt-14">
          <p className="text-lg text-gray-300">
            Because track elements underpin the whole map, they give the identity
            a great deal of flexibility and room to extend in different design
            directions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {[demo7, demo8].map((src) => (
          <figure key={src} className="rounded-lg overflow-hidden aspect-[3/2] animate-on-scroll image-fade">
            <img src={src} alt="Tokyo Trackmap identity application" className="w-full h-full object-cover" loading="lazy" decoding="async" />
          </figure>
        ))}
      </div>
      <figure className="mb-16 rounded-lg overflow-hidden animate-on-scroll image-fade">
        <img src={demo6} alt="Tokyo Trackmap identity system" className="w-full" loading="lazy" decoding="async" />
      </figure>

      <ProjectDetails
        items={[
          { label: "Client", value: "Personal initiative" },
          { label: "Year", value: "2023", note: "Work in progress" },
          { label: "Team", value: "Feng Works" },
          { label: "Scope", value: ["Cartography", "Visual identity", "Web design"] },
        ]}
      />
    </CaseStudy>
  );
}

export default TokyoTrackmapPage;
