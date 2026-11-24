import React from "react";
import CaseStudy from "../../components/case-study/CaseStudy";
import ProjectDetails from "../../components/case-study/ProjectDetails";
import logoAnim from "../../assets/eclair/logo-anim.mp4";
import conceptAnim from "../../assets/eclair/concept-anim.mp4";
import demo0 from "../../assets/eclair/demo-0.png";
import demo1 from "../../assets/eclair/demo-1.webp";
import demo3 from "../../assets/eclair/demo-3.webp";

function EclairPage() {
  return (
    <CaseStudy
      slug="eclair"
      intro="Eclair Labs is an interactive platform that helps social caregivers define performance goals within an incentive system."
    >
      <div className="mb-16 flex justify-center animate-on-scroll image-fade stagger-2">
        <video
          className="w-full md:w-1/2 aspect-video object-cover rounded-lg"
          autoPlay
          muted
          playsInline
          aria-label="Eclair Labs logo animation"
        >
          <source src={logoAnim} type="video/mp4" />
        </video>
      </div>

      <div className="flex justify-center mb-16 animate-on-scroll image-fade">
        <img
          src={demo0}
          alt="Eclair Labs logotype and brand mark"
          className="w-full md:w-[70%] md:aspect-video object-contain md:object-cover rounded-lg"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="mb-16 -mt-8 md:-mt-20 md:mx-8 animate-on-scroll image-fade stagger-2">
        <video
          className="w-full aspect-square md:aspect-[21/9] object-cover rounded-lg"
          autoPlay
          muted
          loop
          playsInline
          aria-label="Eclair Labs concept animation"
        >
          <source src={conceptAnim} type="video/mp4" />
        </video>
      </div>

      <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="animate-on-scroll text-slide">
          <h2 className="text-2xl font-medium mb-6">Brand philosophy</h2>
          <p className="text-lg text-gray-300">
            An éclair is a pastry, and the French word for lightning. Eclair Labs
            believes work engagement should feel the same way: fast and sweet.
          </p>
        </div>
      </div>

      <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="animate-on-scroll text-slide stagger-1">
          <h2 className="text-2xl font-medium mb-6">Design objective</h2>
          <p className="text-lg text-gray-300">
            We set out to build the Eclair Labs visual identity system: a cohesive
            brand aligned with the company's product and philosophy.
          </p>
        </div>
        <div className="animate-on-scroll text-slide stagger-2">
          <h2 className="text-2xl font-medium mb-6">Core concepts</h2>
          <p className="text-lg text-gray-300">
            To reflect the product's motivational side and the humanistic nature of
            care work, we broke Eclair's brand culture into modular components. That
            approach runs from the brand keywords through to the graphics themselves.
          </p>
        </div>
      </div>

      <div className="mb-16 space-y-6">
        {[
          { src: demo3, alt: "Eclair Labs brand graphics" },
          { src: demo1, alt: "Eclair Labs identity applications" },
        ].map((img) => (
          <figure key={img.src} className="aspect-square md:aspect-[16/10] rounded-lg overflow-hidden animate-on-scroll image-fade">
            <img src={img.src} alt={img.alt} className="w-full h-full object-cover" loading="lazy" decoding="async" />
          </figure>
        ))}
      </div>

      <ProjectDetails
        items={[
          { label: "Client", value: "Eclair Labs" },
          { label: "Year", value: "2022" },
          { label: "Team", value: "Fusor Design Labs" },
          { label: "Scope", value: ["Visual identity", "Typography"] },
        ]}
      />
    </CaseStudy>
  );
}

export default EclairPage;
