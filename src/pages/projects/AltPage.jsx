import CaseStudy from "../../components/case-study/CaseStudy";
import { Figure, Quote, Section } from "../../components/case-study/blocks";
import hero from "../../assets/alt-page/hero.png";

const LIVE_BUILD_URL = "https://v0-feng-works.vercel.app/";
/** Served from `public/media/alt-page/` */
const INTERACTION_VIDEO = "/media/alt-page/interaction.mp4";

function AltPage() {
  return (
    <CaseStudy
      slug="alt-site"
      hero={{ alt: "alt · site landing page built during the v0 × Contra hackathon" }}
      facts={[
        { label: "Context", value: "v0 × Contra Hackathon" },
        { label: "Result", value: "First place" },
        { label: "Time box", value: "75 minutes" },
        { label: "Scope", value: ["Interaction design", "Landing narrative", "v0-assisted build"] },
      ]}
      links={[{ label: "Live build", href: LIVE_BUILD_URL }]}
    >
      <Section title="The build">
        <p>
          alt · site was made at the v0 × Contra hackathon as a focused exercise: conceive and code a
          new interaction inside a strict <strong>75-minute</strong> build, using v0, a tool I hadn't
          used before (I normally work in Cursor). The goal wasn't polish for its own sake, but to
          see how far an idea could go when time, tooling and intent were all constrained at once.
        </p>
      </Section>

      <Figure
        src={INTERACTION_VIDEO}
        poster={hero}
        label="Screen recording of navigation and motion in the live build"
        aspectClass="aspect-video"
        fit="contain"
        caption="Navigation and motion in the live build."
      />

      <Section title="Why v0">
        <p>
          Using v0 was part of the brief, so I used the session to pressure-test it: could it
          interpret an interaction I came up with on the spot and turn it into a presentable landing
          page? The experiment was to push v0 to the edge of a tight brief and see how well it
          carried a specific design vision end to end.
        </p>
      </Section>

      <Quote>
        In 75 minutes, the question was less “is this production-ready?” and more “can this
        toolchain keep up with a deliberate interaction bet, fast enough to learn from it while the
        idea is still hot?”
      </Quote>
    </CaseStudy>
  );
}

export default AltPage;
