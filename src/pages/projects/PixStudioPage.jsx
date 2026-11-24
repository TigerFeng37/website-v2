import React from "react";
import CaseStudy from "../../components/case-study/CaseStudy";
import ProjectDetails from "../../components/case-study/ProjectDetails";
import hero from "../../assets/pixstudio/hero.png";
import hero2 from "../../assets/pixstudio/hero-2.webp";
import demo1 from "../../assets/pixstudio/demo-1.webp";
import demo2 from "../../assets/pixstudio/demo-2.png";

function PixStudioPage() {
  return (
    <CaseStudy slug="pixstudio">
      <div className="mb-16 rounded-lg overflow-hidden animate-on-scroll image-fade stagger-2">
        <img
          src={hero}
          alt="PixStudio workspace"
          className="w-full aspect-video object-cover object-center"
        />
      </div>

      <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="animate-on-scroll text-slide">
          <h2 className="text-2xl font-medium mb-6">What PixStudio is</h2>
          <p className="text-lg text-gray-300">
            A browser-based creation suite that puts AI generation, inpainting and
            2D layout tools in one workspace, so storytellers without formal art
            training can frame, compose and render webtoon and manga pages.
          </p>
        </div>
      </div>

      <div className="mb-16 rounded-lg overflow-hidden animate-on-scroll image-fade">
        <img
          src={hero2}
          alt="PixStudio interface overview"
          className="w-full aspect-video object-contain md:object-cover object-center"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="animate-on-scroll text-slide stagger-1">
          <h2 className="text-2xl font-medium mb-6">The challenge</h2>
          <p className="text-lg text-gray-300">
            Manga creation has a high technical ceiling: perspective, anatomy and
            complex software like Clip Studio Paint. The goal was a new web tool
            that opened the process up, folding AI generation and 2D graphics into
            a frictionless creative flow for people with no formal art training.
          </p>
        </div>
        <div className="animate-on-scroll text-slide stagger-2">
          <h2 className="text-2xl font-medium mb-6">The solution</h2>
          <p className="text-lg text-gray-300">
            I refined the UI of a tool that bridges generative AI and storytelling.
            By reworking the layout and designing more intuitive controls, we turned
            a complex process into a drag-and-drop experience. The result was
            efficient enough that two industry-leading webtoon studios adopted it
            in their production pipelines.
          </p>
        </div>
      </div>

      <div className="mb-16 grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-12 border-t border-white/10 pt-8 animate-on-scroll text-slide">
        <h2 className="text-2xl font-medium">Key decision</h2>
        <p className="md:col-span-3 text-lg md:text-xl text-gray-300 leading-relaxed">
          The central UX problem was making AI feel like a brush rather than a black
          box. Inpainting and generation live directly in the workspace, and a
          contextual control panel adapts to the current mode (Framing or
          Rendering). That cut cognitive load and kept creators focused on the
          story, not the technology.
        </p>
      </div>

      <div className="mb-16 space-y-6">
        {[demo1, demo2].map((src, i) => (
          <figure key={src} className="rounded-lg overflow-hidden animate-on-scroll image-fade">
            <img
              src={src}
              alt={`PixStudio interface detail ${i + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </figure>
        ))}
      </div>

      <ProjectDetails
        items={[
          { label: "Client", value: "Mewtant" },
          { label: "Year", value: "2024" },
          { label: "Role", value: "Product design consultant" },
          { label: "Scope", value: ["UI/UX design", "Design system", "User testing"] },
        ]}
      />
    </CaseStudy>
  );
}

export default PixStudioPage;
