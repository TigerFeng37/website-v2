import { useEffect, useState } from "react";
import CaseStudy from "../../components/case-study/CaseStudy";
import { Bento, Figure, Points, Quote, Section } from "../../components/case-study/blocks";
import { useFinePointer } from "../../hooks/useMediaQuery";
import logoAnim from "../../assets/feng-works/hero.mp4";
import logoPoster from "../../assets/feng-works/hero-poster.webp";
import demo1 from "../../assets/feng-works/demo1.webp";
import demo2 from "../../assets/feng-works/demo2.webp";
import demo3 from "../../assets/feng-works/demo3.webp";

const ELEMENTS = [
  {
    title: "The underscore caret",
    body: "The FENG_ wordmark ends with a text cursor — the moment right before something is made. Across the site, caret teal (#72EAE0) is the only chromatic color, always meaning you are here.",
  },
  {
    title: "The Hexaspire",
    body: "A six-pronged polyhedron modeled in Blender. On the web it becomes a live Three.js and Rapier physics cluster you can stir with your pointer or click to scatter.",
  },
  {
    title: "Form and meaning",
    body: "“Form shapes meaning / meaning shapes form” anchors the studio posters and the 2025 site — treating visual structure and interactive behavior as the same decision.",
  },
  {
    title: "Tactile artifacts",
    body: "Extending an austere digital system onto transit shelter posters, a silver 512 MB floppy disk and suspended hardware studies tests whether the mark holds up off screen.",
  },
];

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
      <figcaption className="mt-3 max-w-[56ch] text-fg-2 md:mt-4">
        Interactive Three.js and Rapier physics playground from the 2025 site. Move through the
        cluster or click to scatter it.
      </figcaption>
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
      <Section title="Origin">
        <p>
          Designing an identity for your own studio is often the hardest brief because nobody hands
          you constraints. Feng Works is my one-person practice across brand identity, product
          design and front-end engineering, so the system couldn't feel like an agency template — it
          needed to reflect how I actually build.
        </p>
        <p>
          I wanted an identity that stayed quiet enough for client work to breathe, while carrying a
          clear signature in motion, type and code.
        </p>
      </Section>

      <Figure
        src={logoAnim}
        poster={logoPoster}
        label="feng.works logo animation"
        aspectClass="aspect-video"
        caption="Motion study for the FENG_ wordmark: the underscore caret stretches into a rule and snaps back into place."
      />

      <Points title="The system in four pieces" items={ELEMENTS} />

      <Section title="Identity in print and object">
        <p>
          Testing a minimal identity off screen quickly exposes weak proportions. I applied the
          stark monochrome grid, the abbreviated <strong>F_</strong> mark and the teal accent across
          nocturnal bus-shelter posters, a custom 512&nbsp;MB floppy disk label and suspended laptop
          studies for the 2025 launch.
        </p>
      </Section>

      <Bento
        tall={{ src: demo1, alt: "feng.works bus shelter poster at night with Hexaspires and form shapes meaning typography" }}
        stack={[
          { src: demo2, alt: "Silver 512 MB floppy disk with F_ label and teal shutter" },
          { src: demo3, alt: "Laptop suspended in studio cables displaying the 2025 feng.works Three.js hero" },
        ]}
      />

      <Section title="The Hexaspire">
        <p>
          The brand's physical and digital accent is a six-pronged polyhedron sculpted in Blender
          called the Hexaspire. Instead of rendering it as a static 3D badge, I brought it into the
          browser with Three.js and Rapier physics so visitors could push through the pieces and
          scatter them.
        </p>
        <p>
          Below is the dark-surface cluster from the 2025 site; the current home page reimagines the
          same geometry in paper-and-ink tones where only pieces near your pointer warm up to caret
          teal.
        </p>
      </Section>

      <Playground />

      <Quote>
        Stripping a studio identity down to one cursor and one physical shape leaves nowhere to hide
        — every proportion, interaction and line of code has to earn its place.
      </Quote>

      <Section title="What I took from it">
        <p>
          Building the identity and the website together blurred art direction into engineering. The
          caret and the Hexaspire survived the redesign from v2 to v3 because they aren't surface
          styling — they're a working grammar that shows up in the nav, the section rail, the hero
          and print alike.
        </p>
      </Section>
    </CaseStudy>
  );
}

export default FengWorksPage;
