import CaseStudy from "../../components/case-study/CaseStudy";
import { Figure, Row, Section, Shot } from "../../components/case-study/blocks";
import logoAnim from "../../assets/eclair/logo-anim.mp4";
import logoPoster from "../../assets/eclair/logo-anim-poster.webp";
import conceptAnim from "../../assets/eclair/concept-anim.mp4";
import conceptPoster from "../../assets/eclair/concept-anim-poster.webp";
import demo0 from "../../assets/eclair/demo-0.png";
import demo1 from "../../assets/eclair/demo-1.webp";
import demo3 from "../../assets/eclair/demo-3.webp";

function EclairPage() {
  return (
    <CaseStudy
      slug="eclair"
      lead="An interactive platform that helps social caregivers define performance goals within an incentive system."
      facts={[
        { label: "Client", value: "Eclair Labs" },
        { label: "Year", value: "2022" },
        { label: "Team", value: "Fusor Design Labs" },
        { label: "Scope", value: ["Visual identity", "Typography"] },
      ]}
    >
      <Section title="Brand philosophy">
        <p>
          An éclair is a pastry, and the French word for lightning. Eclair Labs believes work
          engagement should feel the same way: fast and sweet.
        </p>
      </Section>

      <Row>
        <Shot span={6} src={logoAnim} poster={logoPoster} label="Eclair Labs logo animation" aspectClass="aspect-square" />
        <Shot span={6} src={demo3} alt="Eclair Labs brand graphics" aspectClass="aspect-square" />
      </Row>
      <Figure
        src={conceptAnim}
        poster={conceptPoster}
        label="Eclair Labs concept animation"
        aspectClass="aspect-square md:aspect-[21/9]"
      />

      <Section title="Design objective">
        <p>
          We set out to build the Eclair Labs visual identity system: a cohesive brand aligned with
          the company's product and philosophy.
        </p>
      </Section>
      <Section title="Core concepts">
        <p>
          To reflect the product's motivational side and the humanistic nature of care work, we
          broke Eclair's brand culture into modular components. That approach runs from the brand
          keywords through to the graphics themselves.
        </p>
      </Section>

      <Figure size="inset" src={demo0} alt="Eclair Labs logotype and brand mark" aspectClass="aspect-video" />
      <Figure src={demo1} alt="Eclair Labs identity applications" aspectClass="aspect-[2560/1599]" />
    </CaseStudy>
  );
}

export default EclairPage;
