import React from "react";
import CaseStudy from "../../components/case-study/CaseStudy";
import ProjectDetails from "../../components/case-study/ProjectDetails";
import Carousel from "../../components/case-study/Carousel";
import logoAnim from "../../assets/ar/logo-anim.mp4";
import demo1 from "../../assets/ar/demo-1.webp";
import demo2 from "../../assets/ar/demo-2.webp";
import demo3 from "../../assets/ar/demo-3.webp";
import demo4 from "../../assets/ar/demo-4.webp";
import demo5 from "../../assets/ar/demo-5.webp";
import demo6 from "../../assets/ar/demo-6.webp";
import demo7 from "../../assets/ar/demo-7.webp";

const SLIDES = [demo1, demo2, demo3, demo4].map((src, i) => ({
  src,
  alt: `Academy Records brand application ${i + 1}`,
}));

function AcademyRecordsPage() {
  return (
    <CaseStudy slug="academy-records">
      <div className="mb-16 rounded-lg overflow-hidden bg-black animate-on-scroll image-fade stagger-2">
        <video
          className="w-full aspect-video object-cover"
          autoPlay
          muted
          playsInline
          aria-label="Academy Records logo animation"
        >
          <source src={logoAnim} type="video/mp4" />
        </video>
      </div>

      <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="animate-on-scroll text-slide">
          <h2 className="text-2xl font-medium mb-6">Brand philosophy</h2>
          <p className="text-lg text-gray-300">
            The identity aims to capture the essence of classic vinyl while
            presenting a contemporary aesthetic that speaks to collectors and
            casual listeners alike.
          </p>
        </div>
      </div>

      <Carousel
        slides={SLIDES}
        label="Academy Records brand applications"
        aspect="aspect-[4/3] md:aspect-[21/9]"
        className="mb-16 animate-on-scroll image-fade"
      />

      <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="animate-on-scroll text-slide">
          <h2 className="text-2xl font-medium mb-6">Design process</h2>
          <p className="text-lg text-gray-300">
            The process began with research into the history of record labels and
            vinyl culture. Several concepts were explored before settling on a
            direction that balances nostalgia with contemporary appeal.
          </p>
        </div>
      </div>

      <div className="mb-16 grid grid-cols-1 md:grid-cols-5 gap-4">
        <figure className="md:col-span-2 bg-gray-900 rounded-lg overflow-hidden animate-on-scroll image-fade stagger-1">
          <img src={demo5} alt="Academy Records poster" className="w-full h-full object-cover" loading="lazy" decoding="async" />
        </figure>
        <div className="md:col-span-3 grid grid-rows-2 gap-4">
          <figure className="aspect-[2/1] bg-gray-900 rounded-lg overflow-hidden animate-on-scroll image-fade stagger-2">
            <img src={demo7} alt="Academy Records brand application" className="w-full h-full object-cover" loading="lazy" decoding="async" />
          </figure>
          <figure className="aspect-[2/1] bg-gray-900 rounded-lg overflow-hidden animate-on-scroll image-fade stagger-3">
            <img src={demo6} alt="Academy Records brand application" className="w-full h-full object-cover" loading="lazy" decoding="async" />
          </figure>
        </div>
      </div>

      <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="animate-on-scroll text-slide">
          <h2 className="text-2xl font-medium mb-6">A cohesive identity</h2>
          <p className="text-lg text-gray-300">
            The result is an identity that feels both nostalgic and current, built
            on the timeless qualities of vinyl. The logo's line graphics draw on
            the grooves of a record and sound waves moving through a space, while
            the color palette stays vibrant and modern.
          </p>
        </div>
      </div>

      <ProjectDetails
        items={[
          { label: "Client", value: "Academy Records" },
          { label: "Year", value: "2023" },
          { label: "Team", value: "Fusor Design Labs" },
          { label: "Scope", value: ["Brand identity", "Logo design", "Packaging"] },
        ]}
      />
    </CaseStudy>
  );
}

export default AcademyRecordsPage;
