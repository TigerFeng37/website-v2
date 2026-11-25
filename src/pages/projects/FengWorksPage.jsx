import { useEffect, useState } from "react";
import CaseStudy from "../../components/case-study/CaseStudy";
import { Bento, Figure, Section } from "../../components/case-study/blocks";
import { useFinePointer } from "../../hooks/useMediaQuery";
import logoAnim from "../../assets/feng-works/hero.mp4";
import logoPoster from "../../assets/feng-works/hero-poster.webp";
import demo1 from "../../assets/feng-works/demo1.webp";
import demo2 from "../../assets/feng-works/demo2.webp";
import demo3 from "../../assets/feng-works/demo3.webp";

/** The Hexaspire, live: three.js loads only when this panel mounts. */
function Playground() {
  const [Scene, setScene] = useState(null);
  const [key, setKey] = useState(0);
  const finePointer = useFinePointer();

  useEffect(() => {
    import("../../three/Hexaspires")
      .then((m) => setScene(() => m.default))
      .catch((error) => console.warn("Failed to load the Hexaspires:", error));
  }, []);

  return (
    <figure className="cs-block cs-fig wrap" data-reveal>
      <div className="relative h-[70svh] min-h-[28rem] overflow-hidden rounded-media bg-[#0c0d0e]">
        {Scene ? <Scene key={key} /> : null}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 text-white md:p-5">
          <span className="text-white/70">{finePointer ? "Move through the shapes; click to scatter." : "Tap to scatter."}</span>
          <button
            type="button"
            onClick={() => setKey((k) => k + 1)}
            className="pointer-events-auto rounded-full border border-white/25 px-4 py-2 text-white/80 transition-colors duration-fast hover:border-white/60 hover:text-white"
          >
            Reset
          </button>
        </div>
      </div>
    </figure>
  );
}

function FengWorksPage() {
  return (
    <CaseStudy
      slug="feng-works"
      lead="A minimal identity for a one-person studio, built around a caret and a polyhedron."
      facts={[
        { label: "Client", value: "Feng Works LLC" },
        { label: "Year", value: "2025" },
        { label: "Team", value: "Feng Works" },
        { label: "Scope", value: ["Visual identity", "Web design & development", "Print design", "Motion graphics"] },
      ]}
    >
      <Figure src={logoAnim} poster={logoPoster} label="feng.works logo animation" aspectClass="aspect-video" />

      <Bento
        tall={{ src: demo1, alt: "feng.works identity application" }}
        stack={[
          { src: demo2, alt: "feng.works identity application" },
          { src: demo3, alt: "feng.works identity application" },
        ]}
      />

      <Section title="The Hexaspire">
        <p>
          The brand's accent is a polyhedron called the Hexaspire. It turns up across the website
          and print. Below is the version from the previous site; the home page has the current one.
        </p>
      </Section>

      <Playground />
    </CaseStudy>
  );
}

export default FengWorksPage;
