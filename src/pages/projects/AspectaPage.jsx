import CaseStudy from "../../components/case-study/CaseStudy";
import { Figure, Gallery, Row, Section, Shot } from "../../components/case-study/blocks";
import logoAnim from "../../assets/aspecta/logo-anim.mp4";
import logoPoster from "../../assets/aspecta/logo-anim-poster.webp";
import gridAnim from "../../assets/aspecta/grid-anim-1920.mp4";
import gridPoster from "../../assets/aspecta/grid-anim-1920-poster.webp";
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

const RENDERS = [render1, render2, render3].map((src, i) => ({
  src,
  alt: `Aspecta concept render ${i + 1}`,
}));

function AspectaPage() {
  return (
    <CaseStudy
      slug="aspecta"
      facts={[
        { label: "Client", value: "Aspecta Inc." },
        { label: "Year", value: "2022" },
        { label: "Team", value: "Fusor Design Labs" },
        { label: "Scope", value: ["Visual identity", "Typography", "Print design", "Motion graphics"] },
      ]}
    >
      <Section title="Brand philosophy">
        <p>
          Aspecta's brand is built on proportion and visual harmony. The name itself points to both
          aspect ratios and the idea of seeing things from different perspectives.
        </p>
      </Section>

      <Row>
        <Shot span={6} src={logoAnim} poster={logoPoster} label="Aspecta logo animation" aspectClass="aspect-[4/5]" />
        <Shot span={6} src={demo1} alt="Aspecta brand application" aspectClass="aspect-[4/5]" />
      </Row>
      <Figure
        size="bleed"
        src={gridAnim}
        poster={gridPoster}
        label="Aspecta proportional grid animation"
        aspectClass="aspect-square md:aspect-[21/9]"
      />

      <Section title="Aspecta Neue">
        <p>
          A proprietary display typeface drawn for the Aspecta identity, used for the logotype,
          headings and large-format type.
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
      <Figure size="inset" src={demo4} alt="Aspecta Neue type specimen sheet" aspectClass="aspect-[1695/1553]" />

      <Section title="Concept visualization">
        <p>
          3D renders imagine Aspecta's future. Each variant represents a stage of the brand's
          development, from SaaS product to fully decentralized workspace.
        </p>
      </Section>

      <Gallery items={RENDERS} label="Aspecta concept renders" />

      <Section title="Scalable application">
        <p>
          The system was designed to adapt across digital platforms, environmental graphics and
          print. Every application keeps the core principles of proportion and balance.
        </p>
      </Section>

      <Row>
        <Shot span={6} src={demo2} alt="Aspecta brand application" aspectClass="aspect-[3/2]" />
        <Shot span={6} src={demo3} alt="Aspecta brand application" aspectClass="aspect-[3/2]" />
      </Row>
    </CaseStudy>
  );
}

export default AspectaPage;
