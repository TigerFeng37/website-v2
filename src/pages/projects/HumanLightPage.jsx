import CaseStudy from "../../components/case-study/CaseStudy";
import { Award, Quote, Row, Section, Shot } from "../../components/case-study/blocks";
import aLogo from "../../assets/a-logo.jpg";
import plate1 from "../../assets/humanlight/human-light-1.jpg";
import plate2 from "../../assets/humanlight/human-light-2.jpg";
import plate3 from "../../assets/humanlight/human-light-3.jpg";
import plate4 from "../../assets/humanlight/human-light-4.jpg";
import plate5 from "../../assets/humanlight/human-light-5.jpg";

const PLATES = [
  {
    src: plate1,
    alt: "Human Light, plate 1 of 5: circular rotunda colonnade and glass balustrades at the Pinakothek der Moderne",
    caption: "Plate 01 — Rotunda colonnade and glass balustrades under diffused overhead daylight.",
  },
  {
    src: plate2,
    alt: "Human Light, plate 2 of 5: sweeping curved plaster wall lit by a vertical blade of daylight",
    caption: "Plate 02 — A curved wall split by a single vertical seam and grazing skylight.",
  },
  {
    src: plate3,
    alt: "Human Light, plate 3 of 5: tall gallery pillars and glass walkway with two motion-blurred visitors",
    caption: "Plate 03 — Two softly blurred visitors passing along the upper gallery bridge.",
  },
  {
    src: plate4,
    alt: "Human Light, plate 4 of 5: minimalist concrete stairwell framed behind white wall planes and glass",
    caption: "Plate 04 — A quiet stairwell framed between sharp white planes and a glass corner.",
  },
  {
    src: plate5,
    alt: "Human Light, plate 5 of 5: single visitor descending a diagonal concrete ramp wall between cylindrical columns",
    caption: "Plate 05 — A lone visitor descending the cast-concrete diagonal between twin columns.",
  },
];

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
          series. Shot inside the Pinakothek der Moderne in Munich, the building's stark white
          volumes, raw concrete and glass offer a clean, minimal environment; isolating those
          elements turns each photograph into a quiet meditation on the space.
        </p>
        <p>
          The light here isn't only daylight spilling through the oculus. It is also the clarity of
          the people who conceived and proportioned the building.
        </p>
      </Section>

      <Section title="Geometry in a square frame">
        <p>
          Every photograph is composed in a strict <strong>1:1 square</strong>. Without wide
          horizontal margins to lean on, pillars, curved walls, handrails and formwork seams have to
          lock into balance on their own — turning museum circulation into pure graphic planes.
        </p>
      </Section>

      <Row>
        {PLATES.slice(0, 2).map((plate) => (
          <Shot key={plate.src} span={6} src={plate.src} alt={plate.alt} caption={plate.caption} aspectClass="aspect-square" />
        ))}
      </Row>

      <Section title="Human scale">
        <p>
          In a busy public museum, architecture easily becomes sterile if emptied completely, or
          chaotic if crowded. Waiting for one or two figures — slightly blurred on a bridge, or
          stepping down a concrete diagonal — gives the geometry a pulse and a sense of true scale.
        </p>
      </Section>

      <Row>
        {PLATES.slice(2).map((plate) => (
          <Shot key={plate.src} span={4} src={plate.src} alt={plate.alt} caption={plate.caption} aspectClass="aspect-square" />
        ))}
      </Row>

      <Quote>
        Waiting for a public museum to quiet down to one figure and one angle of daylight is where
        observation turns into composition.
      </Quote>

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
