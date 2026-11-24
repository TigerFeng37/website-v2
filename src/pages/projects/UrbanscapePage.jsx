import React from "react";
import CaseStudy from "../../components/case-study/CaseStudy";
import ProjectDetails from "../../components/case-study/ProjectDetails";
import logoAnim from "../../assets/urbanscape/us-logo.mp4";
import demo1 from "../../assets/urbanscape/demo1.webp";
import demo2 from "../../assets/urbanscape/demo2.png";
import demo3 from "../../assets/urbanscape/demo3.png";
import demo4 from "../../assets/urbanscape/demo4.png";
import demo5 from "../../assets/urbanscape/demo5.png";

const PLATES = [
  { src: demo4, alt: "Urbanscape identity application" },
  { src: demo5, alt: "Urbanscape identity application" },
  { src: demo2, alt: "Urbanscape website design" },
  { src: demo3, alt: "Urbanscape website design" },
  { src: demo1, alt: "Urbanscape brand overview", aspect: "aspect-video" },
];

function UrbanscapePage() {
  return (
    <CaseStudy
      slug="urbanscape"
      intro="Urbanscape showcases the art of everyday life through photography, and brings those moments online for everyone."
    >
      <div className="mb-16 rounded-lg overflow-hidden bg-black animate-on-scroll image-fade stagger-2">
        <video
          className="w-full h-[50vh] object-cover"
          autoPlay
          muted
          playsInline
          aria-label="Urbanscape logo animation"
        >
          <source src={logoAnim} type="video/mp4" />
        </video>
      </div>

      <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="animate-on-scroll text-slide">
          <h2 className="text-2xl font-medium mb-6">Design concept</h2>
          <p className="text-lg text-gray-300">
            The caret, humble in its form, marks what is missing. In proofreading
            it asks for words; here it asks for beauty. It stands as a quiet plea
            to restore grace to the overlooked, and to thread aesthetics into the
            fabric of everyday life.
          </p>
        </div>
      </div>

      <div className="mb-16 space-y-4">
        {PLATES.map((plate) => (
          <figure
            key={plate.src}
            className={`rounded-lg md:rounded-3xl overflow-hidden animate-on-scroll image-fade ${plate.aspect ?? ""}`}
          >
            <img
              src={plate.src}
              alt={plate.alt}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </figure>
        ))}
      </div>

      <ProjectDetails
        items={[
          { label: "Client", value: "Urbanscape" },
          { label: "Year", value: "2025", note: "Work in progress" },
          { label: "Team", value: "Feng Works" },
          { label: "Scope", value: ["Visual identity", "Web design", "Photography"] },
        ]}
      />
    </CaseStudy>
  );
}

export default UrbanscapePage;
