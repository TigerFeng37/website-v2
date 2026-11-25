import CaseStudy from "../../components/case-study/CaseStudy";
import Media from "../../components/Media";
import { Figure, Points, Quote, Row, Section, Shot } from "../../components/case-study/blocks";
import logoAnim from "../../assets/eclair/logo-anim.mp4";
import logoPoster from "../../assets/eclair/logo-anim-poster.webp";
import conceptAnim from "../../assets/eclair/concept-anim.mp4";
import conceptPoster from "../../assets/eclair/concept-anim-poster.webp";
import demo0 from "../../assets/eclair/demo-0.png";
import demo1 from "../../assets/eclair/demo-1.webp";
import demo3 from "../../assets/eclair/demo-3.webp";

const PILLARS = [
  {
    title: "Unifying · Unity",
    body: "Care teams work across shifts and cases. The top row pairs a green point with a wide capsule — shared goals anchored in one place.",
  },
  {
    title: "People · Sympathy",
    body: "The circular nodes represent individual caregivers: the human warmth behind every metric, never flattened into an anonymous bar chart.",
  },
  {
    title: "Connecting · Efficiency",
    body: "Reversing the middle row creates visual momentum across the 2x / 6x grid — turning daily milestones into quick, rewarding feedback.",
  },
  {
    title: "Modified wordmark",
    body: "Derived from Strawford, the wordmark reshapes the lowercase r with a stroke and rounded Eclair terminal so type and symbol share one silhouette.",
  },
];

function EclairPage() {
  return (
    <CaseStudy
      slug="eclair"
      lead="A modular visual identity for an incentive platform built around social caregivers."
      facts={[
        { label: "Client", value: "Eclair Labs" },
        { label: "Year", value: "2022" },
        { label: "Team", value: "Fusor Design Labs" },
        { label: "Scope", value: ["Visual identity", "Typography", "Motion graphics"] },
      ]}
    >
      <Section title="Overview">
        <p>
          Eclair Labs builds an interactive platform where social caregivers set performance goals
          and earn points as they hit them. Enterprise incentive tools easily feel cold or
          bureaucratic — the wrong tone for nursing and care work.
        </p>
        <p>
          With Fusor Design Labs, I created a visual identity system built to feel motivating,
          approachable and clear from first principles.
        </p>
      </Section>

      <Section title="Brand philosophy">
        <p>
          An éclair is both a pastry and the French word for lightning. Eclair Labs believes work
          engagement should feel the same way: <strong>fast and sweet</strong>.
        </p>
        <p>
          To reflect both the product's motivational rhythm and the humanistic side of care work, we
          broke Eclair's brand culture down into three ideas — Unity, Sympathy and Efficiency — and
          translated them directly into circles and rounded capsules.
        </p>
      </Section>

      <Row>
        <Shot
          span={6}
          src={logoAnim}
          poster={logoPoster}
          label="Eclair Labs logo animation"
          aspectClass="aspect-square"
          caption="Symbol motion study: circles and capsules shift across the three-row grid."
        />
        <Shot
          span={6}
          src={demo3}
          alt="Canvas tote bag printed with oversized Eclair wordmark and green accent dot"
          aspectClass="aspect-square"
          caption="Canvas tote wrapping the modified Strawford wordmark and green dot."
        />
      </Row>
      <Figure
        src={conceptAnim}
        poster={conceptPoster}
        label="Eclair Labs concept animation"
        aspectClass="aspect-square md:aspect-[21/9]"
        caption="Concept motion translating caregiver milestones into rhythmic capsule geometry."
      />

      <Points title="From culture to geometry" items={PILLARS} />

      <Section title="Symbol and system">
        <p>
          The Eclair symbol locks to a strict <strong>2x / 6x modular grid</strong> labeled Symmetry,
          Dynamic and Regulatory: alternating 2x green dots and 6x rounded bars across three rows.
          In motion, the capsules slide and swap places to signal progress without losing balance.
        </p>
        <p>
          Around the mark, a nine-step scale of <strong>Eclair Green (#19d21e)</strong> and neutral
          blacks sits on warm <strong>Primary Sepia (#f5f4ee)</strong> and crisp white across a
          6-column layout grid — keeping documentation and product surfaces grounded rather than
          sterile.
        </p>
        <figure>
          <Media
            src={demo0}
            alt="Eclair Labs symbol construction on a 2x and 6x Symmetry, Dynamic, Regulatory grid"
            className="aspect-[1237/541] bg-transparent"
            rounded={false}
          />
          <figcaption className="mt-3 max-w-[56ch] text-fg-2 md:mt-4">
            Symbol construction: 2x circles and 6x capsules aligned to a 2x / 6x grid.
          </figcaption>
        </figure>
      </Section>

      <Figure
        src={demo1}
        alt="Eclair Labs Visual Identity System sheets showing cultural breakdown, Strawford-derived wordmark, Eclair Green scale and 6-column grid"
        aspectClass="aspect-[2560/1599]"
        caption="Identity specification sheets: values breakdown, wordmark anatomy, color scales and grid."
      />

      <Quote>
        By reducing a company's values to two shapes on a strict grid, the symbol, the wordmark and
        the motion all speak the same language.
      </Quote>

      <Section title="What I took from it">
        <p>
          Care software works best when its graphics feel human without turning cute. Grounding warm
          sepia surfaces and lively green accents in tight mathematical proportions kept Eclair
          energetic and trustworthy at the same time.
        </p>
      </Section>
    </CaseStudy>
  );
}

export default EclairPage;
