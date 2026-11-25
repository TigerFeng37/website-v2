import CaseStudy from "../../components/case-study/CaseStudy";
import { Figure, Gallery, Points, Quote, Row, Section, Shot } from "../../components/case-study/blocks";
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
  { src: tm4, caption: "Tokyo Station area: trunk platforms, Imperial Palace moat and adjacent Metro lines" },
  { src: tm1, caption: "Shimbashi Station area, including the Old Shinbashi alignment beside modern junctions" },
  { src: tm2, caption: "Ueno Station area, with 2F / 1F / B4F elevation breakdowns and the underground depot" },
  { src: tm3, caption: "Shinagawa and Takanawa Gateway, including the Tamachi Rolling Stock Center" },
].map((s) => ({ ...s, alt: `Tokyo Trackmap detail: ${s.caption}` }));

const GRAMMAR = [
  {
    title: "True-scale track geometry",
    body: "Every curve, turnout, crossover and yard siding follows real GIS coordinates, so riders see how lines actually thread beneath streets and rivers.",
  },
  {
    title: "Schematic line language",
    body: "Lines stay color-coded to each operator's official trunk palette, with solid platform blocks and clean junctions cutting out visual clutter.",
  },
  {
    title: "Bilingual station coding",
    body: "Labels pair Japanese and English names with route badges and station numbers, staying readable whether zoomed out to a ward or down to 100 m.",
  },
  {
    title: "Multi-level hub insets",
    body: "Stacked interchanges like JR Ueno and its underground subway facility break out into clean 2F, 1F, B4F and underground diagrams (構内図).",
  },
];

function TokyoTrackmapPage() {
  return (
    <CaseStudy
      slug="tokyo-trackmap"
      lead="Tokyo's rail network, plotted at true geographic scale while staying as legible as a schematic."
      facts={[
        { label: "Client", value: "Personal initiative" },
        { label: "Year", value: ["2023", "Ongoing"] },
        { label: "Team", value: "Feng Works" },
        { label: "Scope", value: ["Cartography", "Visual identity", "Web design"] },
      ]}
    >
      <Section title="Overview">
        <p>
          Standard transit diagrams straighten curves and compress distances for quick routing;
          geographic rail maps keep true coordinates but usually drown in overlapping lines and
          engineering symbols.
        </p>
        <p>
          Tokyo Trackmap is an ongoing cartography and web project that refuses that trade-off: it
          documents Tokyo's dense rail network — every platform, switch and yard —{" "}
          <strong>at true geographic scale with the graphic restraint of a subway diagram</strong>.
        </p>
      </Section>

      <Gallery items={SLIDES} label="Tokyo Trackmap station-area details" aspectClass="aspect-[2560/1559]" />

      <Section title="Cartography and data">
        <p>
          The map began from GIS datasets of Tokyo's rail network cross-referenced against
          OpenRailwayMap. Lines, yards and stations were transcribed into a single master Figma
          file, with each track weighted for clarity and each station anchored to its real footprint
          along parks, canals and historic alignments like Old Shinbashi.
        </p>
        <p>
          Colors come straight from each line's official identifier palette, paired with bilingual
          Japanese and English labels, station-numbering badges and inset diagrams where stacked
          underground complexes would otherwise collide.
        </p>
      </Section>

      <Points title="Map grammar" items={GRAMMAR} />

      <Figure
        src={demo5}
        alt="Tokyo Trackmap bilingual logo construction showing crossover switches forming 東京配線図 and Tokyo Trackmap"
        aspectClass="aspect-[2068/856]"
        caption="Bilingual identity lockup (東京配線図 / Tokyo Trackmap) derived directly from track crossover switches."
      />

      <Section title="Visual identity">
        <p>
          The identity grows out of railway switches — the mechanical turnouts that guide a train
          from one track to another. They are the structural hinge of every junction on the map,
          and turning them into typography connects the Japanese and English wordmarks directly to
          what the map draws.
        </p>
        <p>
          Because track elements underpin the entire system, that single motif scales naturally from
          animated dividers to station wayfinding totems, posters and the interactive{" "}
          <em>tokyo-trackmap.com</em> web viewer.
        </p>
      </Section>

      <Figure
        src={identityAnim}
        poster={identityPoster}
        label="Tokyo Trackmap identity animation"
        aspectClass="aspect-[16/9] md:aspect-[2688/864]"
        caption="Motion study: track lines branch through switches to reveal the bilingual title."
      />
      <Row>
        <Shot
          span={7}
          src={demo7}
          alt="Two designers reviewing Tokyo Trackmap on a laptop with 100m scale bar and legend controls"
          aspectClass="aspect-[4/3]"
          caption="Desktop web viewer with 100 m scale bar and legend toggle."
        />
        <Shot
          span={5}
          src={demo8}
          alt="Tokyo Trackmap mobile browser view centered on Tokyo Station tracks"
          aspectClass="aspect-[2270/2642]"
          caption="Mobile view at tokyo-trackmap.com, tuned for single-hand panning."
        />
      </Row>
      <Figure
        src={demo6}
        alt="Tokyo Trackmap digital station totem and platform poster inside a concrete transit concourse"
        aspectClass="aspect-[3/2]"
        caption="Environmental application: digital concourse totem and platform poster."
      />

      <Quote>
        When line weights, colors and label hierarchy stay disciplined, true-to-life rail geography
        can read just as calmly as an abstract diagram.
      </Quote>
    </CaseStudy>
  );
}

export default TokyoTrackmapPage;
