import CaseStudy from "../../components/case-study/CaseStudy";
import { Figure, Section } from "../../components/case-study/blocks";
import logoAnim from "../../assets/urbanscape/us-logo.mp4";
import logoPoster from "../../assets/urbanscape/us-logo-poster.webp";
import demo1 from "../../assets/urbanscape/demo1.webp";
import demo2 from "../../assets/urbanscape/demo2.png";
import demo3 from "../../assets/urbanscape/demo3.png";
import demo4 from "../../assets/urbanscape/demo4.png";
import demo5 from "../../assets/urbanscape/demo5.png";

const PLATES = [
  { src: demo4, alt: "Urbanscape identity application", aspectClass: "aspect-[1864/1126]" },
  { src: demo5, alt: "Urbanscape identity application", aspectClass: "aspect-[1847/796]" },
  { src: demo2, alt: "Urbanscape website design", aspectClass: "aspect-[2771/1193]" },
  { src: demo3, alt: "Urbanscape website design", aspectClass: "aspect-[1848/475]" },
  { src: demo1, alt: "Urbanscape brand overview", aspectClass: "aspect-[4/3]" },
];

function UrbanscapePage() {
  return (
    <CaseStudy
      slug="urbanscape"
      lead="Photographs of everyday city life, and a home for them online."
      facts={[
        { label: "Client", value: "Urbanscape" },
        { label: "Year", value: ["2025", "Ongoing"] },
        { label: "Team", value: "Feng Works" },
        { label: "Scope", value: ["Visual identity", "Web design", "Photography"] },
      ]}
    >
      <Section title="Design concept">
        <p>
          The caret, humble in its form, marks what is missing. In proofreading it asks for words;
          here it asks for beauty. It stands as a quiet plea to restore grace to the overlooked, and
          to thread aesthetics into the fabric of everyday life.
        </p>
      </Section>

      <Figure src={logoAnim} poster={logoPoster} label="Urbanscape logo animation" aspectClass="aspect-video" />

      {PLATES.map((plate) => (
        <Figure key={plate.src} {...plate} />
      ))}
    </CaseStudy>
  );
}

export default UrbanscapePage;
