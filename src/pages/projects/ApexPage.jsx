import CaseStudy from "../../components/case-study/CaseStudy";
import { Award, Quote, Row, Section, Shot } from "../../components/case-study/blocks";
import aLogo from "../../assets/a-logo.jpg";
import apex1 from "../../assets/apex/apex-1.jpg";
import apex2 from "../../assets/apex/apex-2.jpg";
import apex3 from "../../assets/apex/apex-3.jpg";
import apex4 from "../../assets/apex/apex-4.jpg";
import apex5 from "../../assets/apex/apex-5.jpg";

const PLATES = [
  {
    src: apex1,
    alt: "Apex, plate 1 of 5: visitors on wooden summit walkways below a jagged mountain peak in cloud",
    caption: "Plate 01 — Timber walkways and visitors tucked beneath a cloud-wrapped pinnacle.",
  },
  {
    src: apex2,
    alt: "Apex, plate 2 of 5: dark evergreen treeline meeting a misty stone ridge",
    caption: "Plate 02 — Dark conifers rising into a ridge dissolved by mist.",
  },
  {
    src: apex3,
    alt: "Apex, plate 3 of 5: sheer dark rock face and snowfields disappearing into white fog",
    caption: "Plate 03 — Striated granite and snowpack fading straight into white.",
  },
  {
    src: apex4,
    alt: "Apex, plate 4 of 5: snow and scree ridges receding into bright mountain mist",
    caption: "Plate 04 — Scree and snow ridges flattened into high-key negative space.",
  },
  {
    src: apex5,
    alt: "Apex, plate 5 of 5: alpine rock wall and snow slopes emerging from heavy fog",
    caption: "Plate 05 — Fractured rock emerging momentarily through moving cloud.",
  },
];

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
        { label: "Recognition", value: "Silver A' Design Award" },
      ]}
    >
      <Section title="The series">
        <p>
          Apex is a fine-art landscape series about the order and chaos within natural forms, set
          against the uniformity of social structures and routine life. The photographs present
          alpine ridges in a setting meant to feel serene and still.
        </p>
        <p>
          The facets of a mountain hold that tension in a single shape: ordered complexity and
          simplicity at once, and a quieter way of looking at natural scale.
        </p>
      </Section>

      <Section title="Atmosphere and negative space">
        <p>
          Shooting in dense, high-altitude cloud strips away blue sky and distant horizons. Without
          a conventional backdrop, <strong>rock, snowpack and dark conifers sit directly on white
          space</strong>, turning raw geology into stark tonal studies that read closer to ink wash
          than postcard scenery.
        </p>
      </Section>

      <Row>
        {PLATES.slice(0, 2).map((plate) => (
          <Shot key={plate.src} span={6} src={plate.src} alt={plate.alt} caption={plate.caption} aspectClass="aspect-[2/3]" />
        ))}
      </Row>

      <Section title="Order and scale">
        <p>
          The sequence moves deliberately from human foothold to pure terrain. Opening with timber
          observation decks and clusters of tiny coats beneath a limestone spire establishes scale;
          from there, the remaining plates step away from every trace of construction until only
          stone, ice and fog remain.
        </p>
      </Section>

      <Row>
        {PLATES.slice(2).map((plate) => (
          <Shot key={plate.src} span={4} src={plate.src} alt={plate.alt} caption={plate.caption} aspectClass="aspect-[2/3]" />
        ))}
      </Row>

      <Quote>
        Strip a mountain down to rock, snow and white mist, and its underlying geometry speaks with
        complete stillness.
      </Quote>

      <Award
        href="https://competition.adesignaward.com/gooddesign.php?ID=112465"
        logo={aLogo}
        title="Silver A' Design Award"
        detail="Photography and Photo Manipulation Design Award, 2020–2021"
      />
    </CaseStudy>
  );
}

export default ApexPage;
