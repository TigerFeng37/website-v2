import CaseStudy from "../../components/case-study/CaseStudy";
import { Figure, Points, Quote, Section } from "../../components/case-study/blocks";
import hero from "../../assets/alt-page/hero.png";

const LIVE_BUILD_URL = "https://v0-feng-works.vercel.app/";
/** Served from `public/media/alt-page/` */
const INTERACTION_VIDEO = "/media/alt-page/interaction.mp4";

const CONSTRAINTS = [
  {
    title: "70 minutes on the clock",
    body: "No time for multi-page architecture or bespoke illustrations. Every minute had to go into the core layout, motion feel and typography.",
  },
  {
    title: "One interaction bet",
    body: "Instead of a conventional header and grid, navigation became a single radial dial of spokes between alt and site.",
  },
  {
    title: "Steering a new tool",
    body: "I normally build by hand in Cursor. Using v0 meant translating spatial and kinetic intent into tight prompts and iterating live.",
  },
];

function AltPage() {
  return (
    <CaseStudy
      slug="alt-site"
      lead="An alternate portfolio landing page built around a radial dial interaction, designed and shipped in 70 minutes."
      hero={{ alt: "alt · site landing page built during the v0 × Contra hackathon" }}
      facts={[
        { label: "Context", value: "v0 × Contra Hackathon" },
        { label: "Result", value: "First place" },
        { label: "Time box", value: "70 minutes" },
        { label: "Scope", value: ["Interaction design", "Landing narrative", "v0-assisted build"] },
      ]}
      links={[{ label: "Live build", href: LIVE_BUILD_URL }]}
    >
      <Section title="Origin">
        <p>
          alt · site was built at the in-person <strong>v0 × Contra Hackathon</strong> in Brooklyn in
          February 2026. The brief gave participants 70 minutes to take an idea from blank canvas to
          a deployed site using v0 — a tool I hadn't worked with before, since I normally write code
          in Cursor.
        </p>
        <p>
          Rather than inventing a fictional startup, I used my own portfolio as the testbed. The goal
          wasn't polish for its own sake, but to see how far a single deliberate interaction could
          carry a page when time, tooling and intent were all constrained at once.
        </p>
      </Section>

      <Section title="The interaction">
        <p>
          Most portfolio home pages open with a standard nav bar and a stacked project feed. alt ·
          site replaces both with a centered radial dial of spokes flanked by <em>alt</em> and{" "}
          <em>site</em>. Selecting or moving across the spokes pivots the active arm and anchors a
          floating preview card directly to it.
        </p>
        <p>
          Keeping the chrome down to monospace metadata and generous grey space meant the dial itself
          did all the structural work — acting as index, navigation and focal point at once.
        </p>
      </Section>

      <Figure
        src={INTERACTION_VIDEO}
        poster={hero}
        label="Screen recording of navigation and motion in the live build"
        aspectClass="aspect-video"
        fit="contain"
        caption="Radial spoke navigation and motion in the live build."
      />

      <Points title="Working inside the time box" items={CONSTRAINTS} />

      <Section title="Why v0">
        <p>
          Using v0 was part of the brief, so I treated the session as a pressure test: could it
          interpret an interaction I came up with on the spot and turn it into a presentable,
          responsive landing page? <strong>The tool became a fast sketching medium</strong> — letting
          me judge pacing, hover states and proportions in the browser while the idea was still hot.
        </p>
      </Section>

      <Quote>
        In 70 minutes, the question was less “is this production-ready?” and more “can this
        toolchain keep up with a deliberate interaction bet, fast enough to learn from it while the
        idea is still hot?”
      </Quote>

      <Section title="Outcome">
        <p>
          The prototype took <strong>first place</strong> at the hackathon and remains live as a
          working artifact. More importantly, it proved that a 70-minute sprint works best when you
          commit to one clear mechanical idea early and strip away everything that doesn't serve it.
        </p>
      </Section>
    </CaseStudy>
  );
}

export default AltPage;
