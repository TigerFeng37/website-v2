import CaseStudy from "../../components/case-study/CaseStudy";
import { Figure, Gallery, Points, Quote, Row, Section, Shot } from "../../components/case-study/blocks";
import logoAnim from "../../assets/aspecta/logo-anim.mp4";
import logoPoster from "../../assets/aspecta/logo-anim-poster.webp";
import gridAnim from "../../assets/aspecta/grid-anim-1920.mp4";
import gridPoster from "../../assets/aspecta/grid-anim-1920-poster.webp";
import font1 from "../../assets/aspecta/font-1.webp";
import font2 from "../../assets/aspecta/font-2.webp";
import font3 from "../../assets/aspecta/font-3.webp";
import font4 from "../../assets/aspecta/font-4.webp";
import colorSystem from "../../assets/aspecta/color-system.png";
import render1 from "../../assets/aspecta/render1.webp";
import render2 from "../../assets/aspecta/render2.webp";
import render3 from "../../assets/aspecta/render3.webp";
import demo1 from "../../assets/aspecta/demo1.webp";
import demo2 from "../../assets/aspecta/demo2.webp";
import demo3 from "../../assets/aspecta/demo3.webp";
import demo4 from "../../assets/aspecta/demo4.png";

const RENDERS = [
  {
    src: render1,
    alt: "Aspecta 3D concept render: stacked glass layers over glowing cyan data lines and wireframe polyhedra",
    caption: "Data layer: stacked glass planes threaded by cyan telemetry rails.",
  },
  {
    src: render2,
    alt: "Aspecta 3D concept render 2",
    caption: "Modular identity nodes moving from individual credentials to team profiles.",
  },
  {
    src: render3,
    alt: "Aspecta 3D concept render 3",
    caption: "Spatial workspace concept for decentralized collaboration.",
  },
];

const PRINCIPLES = [
  {
    title: "Proportional grid",
    body: "Every stroke, margin and panel derives from one underlying ratio, so pitch slides, web layouts and street displays lock together.",
  },
  {
    title: "Aspecta Neue",
    body: "A bespoke display typeface with chamfered outer corners and wide, architectural proportions tuned from 96pt headings down to 12pt labels.",
  },
  {
    title: "Restrained palette",
    body: "Stone and charcoal neutrals (#1B1B1B, #6C6C6C, #E3E4E6) anchor the system while cyan (#00C1E3) and signal orange (#FF6900) mark active states.",
  },
  {
    title: "Multi-stage scale",
    body: "Designed to stretch from a pitch-deck talent engine to environmental transit posters and 3D product storytelling.",
  },
];

function AspectaPage() {
  return (
    <CaseStudy
      slug="aspecta"
      lead="A geometric identity and custom display typeface built on proportion for a Web3 talent platform."
      facts={[
        { label: "Client", value: "Aspecta Inc." },
        { label: "Year", value: "2022" },
        { label: "Team", value: "Fusor Design Labs" },
        { label: "Scope", value: ["Visual identity", "Typography", "Print design", "Motion graphics"] },
      ]}
    >
      <Section title="Overview">
        <p>
          Aspecta builds verifiable professional identity from Web2 and on-chain activity, matching
          engineers and builders with teams. In 2022, while much of Web3 leaned on loud gradients and
          novelty 3D, Aspecta needed a visual language with the calm authority of an architectural
          system.
        </p>
        <p>
          With Fusor Design Labs, I led the identity, color system, 3D concept renders and a custom
          display typeface that could carry the company from investor decks to transit displays in
          New York.
        </p>
      </Section>

      <Section title="Brand philosophy">
        <p>
          Aspecta's brand is built on proportion and visual harmony. The name itself points to both
          aspect ratios and the idea of seeing a body of work from different perspectives.
        </p>
        <p>
          From that premise came the three-way chevron mark and a directional arrow motif — one
          clean geometric grammar that organizes headlines, dividers and motion alike.
        </p>
      </Section>

      <Row>
        <Shot
          span={6}
          src={logoAnim}
          poster={logoPoster}
          label="Aspecta logo animation"
          aspectClass="aspect-[4/5]"
          caption="Logo motion study built on isometric three-way symmetry."
        />
        <Shot
          span={6}
          src={demo1}
          alt="Aspecta Job Market presentation deck displayed in a conference room"
          aspectClass="aspect-[4/5]"
          caption="Job Market pitch deck in situ, pairing Aspecta Neue with 3D glass studies."
        />
      </Row>
      <Figure
        size="bleed"
        src={gridAnim}
        poster={gridPoster}
        label="Aspecta proportional grid animation"
        aspectClass="aspect-square md:aspect-[21/9]"
        caption="The proportional grid driving mark construction, rules and layout rhythm."
      />

      <Section title="Aspecta Neue">
        <p>
          Off-the-shelf geometric sans faces felt either too soft or too generic for the mark. We
          drew <strong>Aspecta Neue</strong> specifically for the logotype, headings and
          large-format type: wide horizontal apertures, rigid verticals and subtle 45° chamfered
          corners that echo the prism mark.
        </p>
        <p>
          Testing the face from <strong>96pt display titles down to 12pt metadata</strong> kept
          counters open and legible across slides, posters and UI headers.
        </p>
      </Section>

      <Row>
        {[font1, font2, font3, font4].map((src, i) => (
          <Shot
            key={src}
            span={3}
            mobile={6}
            src={src}
            alt={`Aspecta Neue specimen ${i + 1}`}
            aspectClass="aspect-[281/601]"
          />
        ))}
      </Row>
      <Figure
        size="inset"
        src={demo4}
        alt="Aspecta Neue type specimen sheet from 96pt to 12pt"
        aspectClass="aspect-[1695/1553]"
        caption="Aspecta Neue v1.0 type specimen sheet (96pt to 12pt) on the master grid."
      />

      <Points title="System foundations" items={PRINCIPLES} />

      <Section title="Color and material">
        <p>
          Instead of a synthetic neon spectrum, the palette pairs concrete, brushed metal and dark
          slate (#1B1B1B, #6C6C6C, #E3E4E6) with two purposeful accents: <strong>cyan (#00C1E3)</strong>{" "}
          for data flow and <strong>orange (#FF6900)</strong> for focal highlights. Every swatch maps
          to a physical surface texture used in the 3D language.
        </p>
      </Section>

      <Figure
        size="inset"
        src={colorSystem}
        alt="Aspecta color and material system: #00C1E3, #6C6C6C, #E3E4E6, #1B1B1B and #FF6900"
        aspectClass="aspect-[1980/1602]"
        caption="Color and surface palette linking digital hex tokens to light, stone and metal."
      />

      <Section title="Concept visualization">
        <p>
          To articulate where the platform was heading beyond a single SaaS dashboard, we built a
          series of 3D concept renders. Glass layers, glowing telemetry tracks and modular nodes
          visualize each stage — from professional identity engine to a decentralized workspace.
        </p>
      </Section>

      <Gallery items={RENDERS} label="Aspecta concept renders" />

      <Section title="Scalable application">
        <p>
          The system was designed to move effortlessly between screens, exhibition walls and public
          transit. Whether set dark on hanging gallery prints or lit inside a subway platform
          display in Chelsea, the proportional grid and Aspecta Neue keep every piece unmistakably
          coherent.
        </p>
      </Section>

      <Row>
        <Shot
          span={6}
          src={demo2}
          alt="Hanging dark exhibition poster comparing the directional arrow and three-way chevron mark"
          aspectClass="aspect-[3/2]"
          caption="Exhibition poster study pairing the directional arrow and chevron prism."
        />
        <Shot
          span={6}
          src={demo3}
          alt="Aspecta event poster displayed on a JCDecaux digital totems in a subway station"
          aspectClass="aspect-[3/2]"
          caption="Out-of-home subway display for an Aspecta community event at Pier 60."
        />
      </Row>

      <Quote>
        When proportion governs the typeface, the mark and the grid together, a small team's
        identity reads like an established institution.
      </Quote>
    </CaseStudy>
  );
}

export default AspectaPage;
