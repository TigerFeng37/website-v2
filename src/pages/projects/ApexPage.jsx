import CaseStudy from "../../components/case-study/CaseStudy";
import { Award, Row, Section, Shot } from "../../components/case-study/blocks";
import aLogo from "../../assets/a-logo.jpg";
import apex1 from "../../assets/apex/apex-1.jpg";
import apex2 from "../../assets/apex/apex-2.jpg";
import apex3 from "../../assets/apex/apex-3.jpg";
import apex4 from "../../assets/apex/apex-4.jpg";
import apex5 from "../../assets/apex/apex-5.jpg";

const PLATES = [apex1, apex2, apex3, apex4, apex5];
const alt = (i) => `Apex, plate ${i + 1} of ${PLATES.length}: mountain landscape`;

function ApexPage() {
  return (
    <CaseStudy
      slug="apex"
      lead="“Juxtaposition between ordered complexity and simplicity.”"
      hero={{ alt: "Snow-covered mountain ridge from the Apex series" }}
      facts={[
        { label: "Year", value: "2020" },
        { label: "Type", value: "Personal series" },
        { label: "Medium", value: "Fine art photography" },
        { label: "Recognition", value: "A' Design Award" },
      ]}
    >
      <Section title="The series">
        <p>
          Apex is a fine-art landscape series about the order and chaos within natural forms, set
          against the uniformity of social structures and routine life. The photographs present those
          forms in a setting meant to feel serene and still.
        </p>
        <p>
          The facets of a mountain hold that tension in a single shape: ordered complexity and
          simplicity at once, and a different way of looking at natural beauty.
        </p>
      </Section>

      <Row>
        {PLATES.slice(0, 2).map((src, i) => (
          <Shot key={src} span={6} src={src} alt={alt(i)} aspectClass="aspect-[2/3]" />
        ))}
      </Row>
      <Row>
        {PLATES.slice(2).map((src, i) => (
          <Shot key={src} span={4} src={src} alt={alt(i + 2)} aspectClass="aspect-[2/3]" />
        ))}
      </Row>

      <Award
        href="https://competition.adesignaward.com/gooddesign.php?ID=112465"
        logo={aLogo}
        title="A' Design Award winner"
        detail="Photography and Photo Manipulation Design Award, 2020–2021"
      />
    </CaseStudy>
  );
}

export default ApexPage;
