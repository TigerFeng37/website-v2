import CaseStudy from "../../components/case-study/CaseStudy";
import { Figure, Gallery, Row, Section, Shot } from "../../components/case-study/blocks";
import identityAnim from "../../assets/trackmap/ttp-hero.mp4";
import identityPoster from "../../assets/trackmap/ttp-hero-poster.webp";
import tm1 from "../../assets/trackmap/TM-1.webp";
import tm2 from "../../assets/trackmap/TM-2.webp";
import tm3 from "../../assets/trackmap/TM-3.webp";
import tm4 from "../../assets/trackmap/TM-4.webp";
import demo5 from "../../assets/trackmap/demo5.png";
import demo6 from "../../assets/trackmap/demo6.webp";
import demo7 from "../../assets/trackmap/demo7.webp";
import demo8 from "../../assets/trackmap/demo8.webp";

const SLIDES = [
  { src: tm4, caption: "Tokyo Station area" },
  { src: tm1, caption: "Shimbashi Station area" },
  { src: tm2, caption: "Ueno Station area, with elevation breakdowns" },
  { src: tm3, caption: "Shinagawa Station area" },
].map((s) => ({ ...s, alt: `Tokyo Trackmap detail: ${s.caption}` }));

function TokyoTrackmapPage() {
  return (
    <CaseStudy
      slug="tokyo-trackmap"
      facts={[
        { label: "Client", value: "Personal initiative" },
        { label: "Year", value: ["2023", "Ongoing"] },
        { label: "Team", value: "Feng Works" },
        { label: "Scope", value: ["Cartography", "Visual identity", "Web design"] },
      ]}
    >
      <Section title="Concept">
        <p>
          Tokyo Trackmap is an experimental mapping project that visualizes Tokyo's dense railway
          system. It aims to document the network in a geographically accurate way while keeping a
          simple, easy-to-read visual language.
        </p>
      </Section>

      <Gallery items={SLIDES} label="Tokyo Trackmap station-area details" aspectClass="aspect-[2560/1559]" />

      <Section title="Methodology">
        <p>
          The project started from GIS data of Tokyo's rail network, referenced against
          OpenRailwayMap. Lines and stations were then transcribed into a single large Figma file,
          with every line color-coded and every station labeled.
        </p>
      </Section>
      <Section title="Communication">
        <p>
          Colors come directly from each rail line's identifier palette, and station labels combine
          the station symbol, number and name. The map is labeled bilingually in English and
          Japanese.
        </p>
      </Section>

      <Figure src={demo5} alt="Tokyo Trackmap overview" aspectClass="aspect-[2068/856]" />

      <Section title="Visual identity">
        <p>
          The identity is drawn from railway tracks and switches — the mechanism that moves rails to
          guide a train from one track to another. They are the foundation of every line and one of
          the most common elements on the map.
        </p>
        <p>
          Because track elements underpin the whole map, they give the identity a great deal of
          flexibility and room to extend in different design directions.
        </p>
      </Section>

      <Figure
        src={identityAnim}
        poster={identityPoster}
        label="Tokyo Trackmap identity animation"
        aspectClass="aspect-[16/9] md:aspect-[2688/864]"
      />
      <Row>
        <Shot span={7} src={demo7} alt="Tokyo Trackmap identity application" aspectClass="aspect-[4/3]" />
        <Shot span={5} src={demo8} alt="Tokyo Trackmap identity application" aspectClass="aspect-[2270/2642]" />
      </Row>
      <Figure src={demo6} alt="Tokyo Trackmap identity system" aspectClass="aspect-[3/2]" />
    </CaseStudy>
  );
}

export default TokyoTrackmapPage;
