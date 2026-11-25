import CaseStudy from "../../components/case-study/CaseStudy";
import { Figure, Points, Quote, Section } from "../../components/case-study/blocks";
import logoAnim from "../../assets/urbanscape/us-logo.mp4";
import logoPoster from "../../assets/urbanscape/us-logo-poster.webp";
import demo1 from "../../assets/urbanscape/demo1.webp";
import demo2 from "../../assets/urbanscape/demo2.png";
import demo3 from "../../assets/urbanscape/demo3.png";
import demo4 from "../../assets/urbanscape/demo4.png";
import demo5 from "../../assets/urbanscape/demo5.png";

const SYSTEM = [
  {
    title: "Two logomark scales",
    body: "The Regular pill lockup spans wide displays and print; the Compact variant stacks urban / scape into a half-length outline with a shifted caret for tight mobile spaces.",
  },
  {
    title: "Serif meets grotesk",
    body: "Sorts Mill Goudy gives headlines and the wordmark an editorial cadence, while Fustat keeps buttons, captions and navigation crisp at small sizes.",
  },
  {
    title: "Dual-mode palette",
    body: "Light surfaces pair Zest Green, Turquoise and Aero; dark mode mirrors them with Olive, Aqua and Ocean, every element held by a sharp primary outline.",
  },
  {
    title: "Expanding pill nav",
    body: "Navigation collapses into a single circular Zest Green button and expands horizontally into a pill holding Contact, About and close controls.",
  },
];

function UrbanscapePage() {
  return (
    <CaseStudy
      slug="urbanscape"
      lead="Photographs of everyday city life, and an identity built around the proofreader's caret."
      facts={[
        { label: "Client", value: "Urbanscape" },
        { label: "Year", value: ["2025", "Ongoing"] },
        { label: "Team", value: "Feng Works" },
        { label: "Scope", value: ["Visual identity", "Web design", "Photography"] },
      ]}
    >
      <Section title="Origin">
        <p>
          Urbanscape began as an ongoing collective dedicated to aesthetics in everyday
          environments. Most city photography chases landmarks or dramatic weather; I wanted a home
          for the quiet frames caught on an ordinary walk — reflections, shopfronts, street corners —
          before they disappear into a camera roll.
        </p>
      </Section>

      <Section title="Design concept">
        <p>
          The caret, humble in its form, marks what is missing. In proofreading it asks for words;
          here it asks for beauty. <strong>Inserting the caret between “urban” and “scape”</strong>{" "}
          turns the wordmark into a quiet plea to restore grace to the overlooked, and to thread
          aesthetics into the fabric of everyday life.
        </p>
      </Section>

      <Figure
        src={logoAnim}
        poster={logoPoster}
        label="Urbanscape logo animation"
        aspectClass="aspect-video"
        caption="Logo animation: the caret slips into place inside the pill outline."
      />

      <Section title="Mark and typography">
        <p>
          The identity pairs editorial warmth with rigid geometry. <strong>Sorts Mill Goudy</strong>{" "}
          sets the logomark and display statements with bookish contrast, while{" "}
          <strong>Fustat</strong> handles interface controls and body copy. Both sit inside fine
          pill outlines that scale down into a stacked Compact mark for small viewports.
        </p>
      </Section>

      <Figure
        src={demo5}
        alt="Urbanscape typography and logomark sheet showing Sorts Mill Goudy, Fustat, and Regular vs. Compact pill marks"
        aspectClass="aspect-[1847/796]"
        caption="Typography pairing and Regular vs. Compact logomark variants."
      />

      <Figure
        src={demo4}
        alt="Close-up crop of the Urbanscape caret mark and green outlined book icon"
        aspectClass="aspect-[1864/1126]"
        caption="Detail of the outlined pill geometry, editorial serif and icon weight."
      />

      <Points title="Building the visual system" items={SYSTEM} />

      <Section title="Color and interface components">
        <p>
          To let dark nocturnal street frames and bright daylight shots live side by side, the
          color system pairs high-energy light accents (Zest Green, Turquoise, Aero) with grounded
          dark counterparts (Olive, Aqua, Ocean). Every button, input and card carries a consistent
          outline so UI chrome stays light and structural rather than heavy.
        </p>
      </Section>

      <Figure
        src={demo2}
        alt="Urbanscape color palette comparing Light (Zest Green, Turquoise, Aero) and Dark (Olive, Aqua, Ocean) tokens"
        aspectClass="aspect-[2771/1193]"
        caption="Light and dark palettes with shared black, neutral and white anchors."
      />

      <Figure
        src={demo3}
        alt="Urbanscape UI components: collapsed and expanded navigation pill, circular icon buttons and dashed search input"
        aspectClass="aspect-[1848/475]"
        caption="Navigation and action components: the circular menu opens into a pill bar."
      />

      <Section title="An online home">
        <p>
          On the web, the landing page frames the collective's manifesto beside a horizontal strip of
          street photography and pill-shaped “Go Deeper” actions — bridging curated web series with
          social publishing so fleeting urban moments stay visible.
        </p>
      </Section>

      <Figure
        src={demo1}
        alt="Laptop mockup showing the Urbanscape website with the urban^scape pill mark, Sorts Mill Goudy headline and horizontal photo strip"
        aspectClass="aspect-[4/3]"
        caption="The web experience: editorial typography paired with horizontal photo browsing."
      />

      <Quote>
        The caret asks a simple question of every frame: what beauty was already sitting in plain
        sight on an ordinary block?
      </Quote>
    </CaseStudy>
  );
}

export default UrbanscapePage;
