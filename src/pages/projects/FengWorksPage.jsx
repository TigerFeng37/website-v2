import React, { useEffect, useState } from "react";
import CaseStudy from "../../components/case-study/CaseStudy";
import ProjectDetails from "../../components/case-study/ProjectDetails";
import logoAnim from "../../assets/feng-works/hero.mp4";
import demo1 from "../../assets/feng-works/demo1.webp";
import demo2 from "../../assets/feng-works/demo2.webp";
import demo3 from "../../assets/feng-works/demo3.webp";

function FengWorksPage() {
  const [HeroAnimation, setHeroAnimation] = useState(null);
  const [sceneKey, setSceneKey] = useState(0);

  useEffect(() => {
    import("../../three/HeroAnimation")
      .then((module) => setHeroAnimation(() => module.default))
      .catch((error) => console.warn("Failed to load HeroAnimation:", error));
  }, []);

  return (
    <CaseStudy
      slug="feng-works"
      intro="A minimalist identity for feng.works, a design practice built to craft meaningful experiences across every touchpoint."
    >
      <div className="mb-16 rounded-lg overflow-hidden bg-black animate-on-scroll image-fade stagger-2">
        <video
          className="w-full aspect-video object-cover"
          autoPlay
          muted
          playsInline
          aria-label="feng.works logo animation"
        >
          <source src={logoAnim} type="video/mp4" />
        </video>
      </div>

      <div className="mb-8 grid grid-cols-1 md:grid-cols-5 gap-4">
        <figure className="aspect-square md:aspect-auto md:col-span-2 bg-gray-900 rounded-lg overflow-hidden animate-on-scroll image-fade stagger-1">
          <img src={demo1} alt="feng.works identity application" className="w-full h-full object-cover" loading="lazy" decoding="async" />
        </figure>
        <div className="md:col-span-3 grid grid-rows-2 gap-4">
          <figure className="aspect-square md:aspect-[2/1] bg-gray-900 rounded-lg overflow-hidden animate-on-scroll image-fade stagger-2">
            <img src={demo2} alt="feng.works identity application" className="w-full h-full object-cover" loading="lazy" decoding="async" />
          </figure>
          <figure className="aspect-square md:aspect-[2/1] bg-gray-900 rounded-lg overflow-hidden animate-on-scroll image-fade stagger-3">
            <img src={demo3} alt="feng.works identity application" className="w-full h-full object-cover" loading="lazy" decoding="async" />
          </figure>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="animate-on-scroll text-slide">
          <h2 className="text-2xl font-medium mb-6">The Hexaspire</h2>
          <p className="text-lg text-gray-300">
            The brand's accent element is a polyhedron we call the Hexaspire. It
            appears across the website and other materials as a playful visual
            identifier, and you can play with it below.
          </p>
        </div>
      </div>

      <div data-reveal="video" className="relative mb-16 h-[75vh] rounded-lg overflow-hidden bg-black animate-on-scroll image-fade">
        {HeroAnimation && <HeroAnimation key={sceneKey} />}
        <span className="hidden md:block absolute top-4 left-4 text-sm text-white/70 pointer-events-none">
          Drag across the frame to interact.
        </span>
        <button
          type="button"
          onClick={() => setSceneKey((k) => k + 1)}
          className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-black/60 backdrop-blur px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-black/80 transition-colors"
        >
          <span aria-hidden>↺</span> Reset scene
        </button>
      </div>

      <ProjectDetails
        items={[
          { label: "Client", value: "Feng Works LLC" },
          { label: "Year", value: "2025" },
          { label: "Team", value: "Feng Works" },
          { label: "Scope", value: ["Visual identity", "Web design & development", "Print design", "Motion graphics"] },
        ]}
      />
    </CaseStudy>
  );
}

export default FengWorksPage;
