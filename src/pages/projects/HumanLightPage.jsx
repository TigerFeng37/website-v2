import CaseStudy from "../../components/case-study/CaseStudy";
import { Award, Row, Section, Shot } from "../../components/case-study/blocks";
import aLogo from "../../assets/a-logo.jpg";
import plate1 from "../../assets/humanlight/human-light-1.jpg";
import plate2 from "../../assets/humanlight/human-light-2.jpg";
import plate3 from "../../assets/humanlight/human-light-3.jpg";
import plate4 from "../../assets/humanlight/human-light-4.jpg";
import plate5 from "../../assets/humanlight/human-light-5.jpg";

const PLATES = [plate1, plate2, plate3, plate4, plate5];
const alt = (i) =>
  `Human Light, plate ${i + 1} of ${PLATES.length}: minimal architectural interior at the Pinakothek der Moderne`;

function HumanLightPage() {
  return (
    <CaseStudy
      slug="human-light"
      lead="“Architecture is the light of the human intellect.”"
      hero={{ alt: "White architectural interior with stairs and glass, from the Human Light series" }}
      facts={[
        { label: "Year", value: "2018" },
        { label: "Location", value: "Pinakothek der Moderne, Munich" },
        { label: "Medium", value: "Fine art photography" },
        { label: "Recognition", value: "A' Design Award" },
      ]}
    >
      <Section title="The series">
        <p>
          The idea that architecture is the light of the human intellect sits at the center of this
          series. The interior and facade of the Pinakothek der Moderne in Munich offer a clean,
          minimal environment; isolating those elements turns each photograph into something closer
          to a meditation on the space.
        </p>
        <p>
          The light here isn't only daylight. It is also the light of the people who designed the
          building.
        </p>
      </Section>

      <Row>
        {PLATES.slice(0, 2).map((src, i) => (
          <Shot key={src} span={6} src={src} alt={alt(i)} aspectClass="aspect-square" />
        ))}
      </Row>
      <Row>
        {PLATES.slice(2).map((src, i) => (
          <Shot key={src} span={4} src={src} alt={alt(i + 2)} aspectClass="aspect-square" />
        ))}
      </Row>

      <Award
        href="https://competition.adesignaward.com/gooddesign.php?ID=79803"
        logo={aLogo}
        title="A' Design Award winner"
        detail="Photography and Photo Manipulation Design Award, 2018–2019"
      />
    </CaseStudy>
  );
}

export default HumanLightPage;
