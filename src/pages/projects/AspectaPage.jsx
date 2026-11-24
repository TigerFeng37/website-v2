import React from "react";
import CaseStudy from "../../components/case-study/CaseStudy";
import ProjectDetails from "../../components/case-study/ProjectDetails";
import Carousel from "../../components/case-study/Carousel";
import logoAnim from "../../assets/aspecta/logo-anim.mp4";
import gridAnimWebm from "../../assets/aspecta/grid-anim.webm";
import gridAnimMp4 from "../../assets/aspecta/grid-anim.mp4";
import font1 from "../../assets/aspecta/font-1.webp";
import font2 from "../../assets/aspecta/font-2.webp";
import font3 from "../../assets/aspecta/font-3.webp";
import font4 from "../../assets/aspecta/font-4.webp";
import render1 from "../../assets/aspecta/render1.webp";
import render2 from "../../assets/aspecta/render2.webp";
import render3 from "../../assets/aspecta/render3.webp";
import demo1 from "../../assets/aspecta/demo1.webp";
import demo2 from "../../assets/aspecta/demo2.webp";
import demo3 from "../../assets/aspecta/demo3.webp";
import demo4 from "../../assets/aspecta/demo4.png";

const FONT_SPECIMENS = [font1, font2, font3, font4];
const RENDERS = [render1, render2, render3].map((src, i) => ({
  src,
  alt: `Aspecta concept render ${i + 1}`,
}));

function AspectaPage() {
  return (
    <CaseStudy slug="aspecta">
      <div className="mb-16 rounded-lg overflow-hidden bg-black animate-on-scroll image-fade stagger-2">
        <video
          className="w-full aspect-video object-cover"
          autoPlay
          muted
          playsInline
          aria-label="Aspecta logo animation"
        >
          <source src={logoAnim} type="video/mp4" />
        </video>
      </div>

      <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="animate-on-scroll text-slide">
          <h2 className="text-2xl font-medium mb-6">Brand philosophy</h2>
          <p className="text-lg text-gray-300">
            Aspecta's brand is built on proportion and visual harmony. The name
            itself points to both aspect ratios and the idea of seeing things from
            different perspectives.
          </p>
        </div>
      </div>

      {/* Full-bleed grid animation */}
      <div className="w-screen ml-[calc(50%-50vw)] mb-16 animate-on-scroll image-fade">
        <video
          className="w-full aspect-square md:aspect-video object-cover"
          autoPlay
          muted
          loop
          playsInline
          aria-label="Aspecta proportional grid animation"
        >
          <source src={gridAnimWebm} type="video/webm" />
          <source src={gridAnimMp4} type="video/mp4" />
        </video>
      </div>

      <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6">
        {FONT_SPECIMENS.map((src, i) => (
          <figure
            key={src}
            className={`rounded-lg overflow-hidden animate-on-scroll image-fade stagger-${i + 1}`}
          >
            <img src={src} alt={`Aspecta Neue specimen ${i + 1}`} className="w-full" loading="lazy" decoding="async" />
          </figure>
        ))}
      </div>

      <figure className="mb-8 rounded-lg overflow-hidden animate-on-scroll image-fade">
        <img src={demo4} alt="Aspecta Neue type specimen sheet" className="w-full" loading="lazy" decoding="async" />
      </figure>

      <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="animate-on-scroll text-slide">
          <h2 className="text-2xl font-medium mb-6">Aspecta Neue</h2>
          <p className="text-lg text-gray-300">
            A proprietary display typeface drawn for the Aspecta identity, used for
            the logotype, headings and large-format type.
          </p>
        </div>
      </div>

      <Carousel
        slides={RENDERS}
        label="Aspecta concept renders"
        aspect="aspect-square md:aspect-[21/9]"
        className="mb-8 animate-on-scroll image-fade"
      />

      <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="animate-on-scroll text-slide">
          <h2 className="text-2xl font-medium mb-6">Concept visualization</h2>
          <p className="text-lg text-gray-300">
            3D renders imagine Aspecta's future. Each variant represents a stage of
            the brand's development, from SaaS product to fully decentralized
            workspace.
          </p>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 md:grid-cols-5 gap-4">
        <figure className="aspect-square md:aspect-auto md:col-span-2 bg-gray-900 rounded-lg overflow-hidden animate-on-scroll image-fade stagger-1">
          <img src={demo1} alt="Aspecta brand application" className="w-full h-full object-cover" loading="lazy" decoding="async" />
        </figure>
        <div className="md:col-span-3 grid grid-rows-2 gap-4">
          <figure className="aspect-square md:aspect-[2/1] bg-gray-900 rounded-lg overflow-hidden animate-on-scroll image-fade stagger-2">
            <img src={demo2} alt="Aspecta brand application" className="w-full h-full object-cover" loading="lazy" decoding="async" />
          </figure>
          <figure className="aspect-square md:aspect-[2/1] bg-gray-900 rounded-lg overflow-hidden animate-on-scroll image-fade stagger-3">
            <img src={demo3} alt="Aspecta brand application" className="w-full h-full object-cover" loading="lazy" decoding="async" />
          </figure>
        </div>
      </div>

      <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="animate-on-scroll text-slide">
          <h2 className="text-2xl font-medium mb-6">Scalable application</h2>
          <p className="text-lg text-gray-300">
            The system was designed to adapt across digital platforms, environmental
            graphics and print. Every application keeps the core principles of
            proportion and balance.
          </p>
        </div>
      </div>

      <ProjectDetails
        items={[
          { label: "Client", value: "Aspecta Inc." },
          { label: "Year", value: "2022" },
          { label: "Team", value: "Fusor Design Labs" },
          { label: "Scope", value: ["Visual identity", "Typography", "Print design", "Motion graphics"] },
        ]}
      />
    </CaseStudy>
  );
}

export default AspectaPage;
