import CaseStudy from "../../components/case-study/CaseStudy";
import { Figure, Points, Quote, Section, Stats, Switch } from "../../components/case-study/blocks";
import workspace from "../../assets/pixstudio/workspace.webp";
import navigator from "../../assets/pixstudio/navigator.webp";
import inspectorFraming from "../../assets/pixstudio/inspector-framing.webp";
import inspectorRendering from "../../assets/pixstudio/inspector-rendering.webp";

// Source frames: Figma "Website 3.0", page PixStudio, section "v3 · Case study assets".

const STATS = [
  { value: "2", label: "Webtoon studios using it in production" },
  { value: "2", label: "Modes on one canvas" },
  { value: "3", label: "Tiers of generation control" },
  { value: "7", label: "Navigator fixes, V1 to V2" },
];

const AUDIENCE = [
  {
    title: "The storyteller",
    body: "Writers and hobbyists with a script and no formal art training. They need to watch a page take shape without learning a professional toolchain first. For them, success is getting from an idea to a readable page.",
  },
  {
    title: "The studio artist",
    body: "Production teams on a schedule. They need control and repeatability: the same character, the same look, across hundreds of panels. For them, success is output they can predict and drop into a pipeline.",
  },
];

const PROCESS = [
  {
    title: "Walk the flow",
    body: "Map how a page actually gets made, from script to framing, rendering, lettering and export, and mark every point where the first build sent people off the canvas or lost their place.",
  },
  {
    title: "Audit the build",
    body: "Go through V1 screen by screen against that flow. Write each problem down as something a user can't do, not as a visual flaw, so every fix has a reason.",
  },
  {
    title: "Design in the system",
    body: "Rebuild panels from shared components with the same hover, active and disabled states, so a fix made once holds across the whole workspace.",
  },
  {
    title: "Test with artists",
    body: "Put working builds in front of artists, watch where they hesitate, and fold what we saw into the next round.",
  },
];

const TIERS = [
  {
    title: "General",
    body: "Only what a storyteller already knows: who is in the shot, what happens, and what shape the panel is. Character presets keep a face consistent from panel to panel.",
  },
  {
    title: "Model",
    body: "For people who know their checkpoints: pick the model, stack LoRAs with a weight slider, fix or randomize the seed.",
  },
  {
    title: "Advanced",
    body: "Pose, up to four reference images and negative prompts for exact control. Settings export and import, so a studio can share one look across a team.",
  },
];

function PixStudioPage() {
  return (
    <CaseStudy
      slug="pixstudio"
      lead="A browser workspace where storytellers lay out manga pages and render them with AI, one panel at a time."
      hero={{
        label:
          "A single pixel opens into a manga page, gutters cut it into panels and screentone scans in; the page then shrinks into the PixStudio mark beside the wordmark.",
      }}
      facts={[
        { label: "Client", value: "PixAI (Mewtant)" },
        { label: "Year", value: "2024" },
        { label: "Role", value: "Product design consultant" },
        { label: "Platform", value: "Web, desktop" },
        { label: "Scope", value: ["Product design", "Interaction design", "Design system", "User testing"] },
      ]}
    >
      <Section title="Overview">
        <p>
          PixAI is known for anime image generation. PixStudio was the step from single images to whole
          pages: one browser workspace that combines 2D layout, AI generation and inpainting, so people
          without formal art training can frame, compose and render webtoon and manga pages.
        </p>
        <p>
          I took the first build through a redesign, from the structure of the workspace down to the
          states of individual controls, and tested it with artists along the way.{" "}
          <strong>Two industry-leading webtoon studios adopted it</strong> in their production
          pipelines.
        </p>
      </Section>

      <Stats items={STATS} />

      <Section title="The problem">
        <p>
          Manga has a high technical ceiling: perspective, anatomy and professional software like Clip
          Studio Paint. AI image tools lowered the drawing barrier but stopped at one picture and a
          prompt box. No panels, no sequence, no lettering, and no reliable way to keep a character the
          same from one frame to the next.
        </p>
        <p>
          <strong>Generators make pictures. Stories need pages.</strong> A writer still had to stitch
          the page together somewhere else, by hand.
        </p>
      </Section>

      <Quote>The central UX problem was making AI feel like a brush rather than a black box.</Quote>

      <Points title="Two people, one tool" items={AUDIENCE} />

      <Section title="The tension">
        <p>
          The same screen had to be approachable on day one for the storyteller and deep enough for the
          studio artist on day one hundred. Every decision below is a way of keeping both: show the
          simple thing first, and keep the powerful thing one step away, never hidden.
        </p>
      </Section>

      <Points title="How I worked" items={PROCESS} />

      <Figure
        src={workspace}
        alt="The PixStudio workspace in Framing mode: workspace navigator and layers on the left, a manga page with a selected caption in the center, the inspector at right, view controls along the bottom."
        aspectClass="aspect-[16/9]"
        caption="The workspace. Story structure and layers on the left, the page in the middle, the inspector on the right. View controls stay docked along the bottom."
      />

      <Section title="Two modes, one canvas">
        <p>
          Making a page is two different jobs. Framing is arranging: panels, captions, balloons, order.
          Rendering is drawing: prompts, models, references. Showing every control for both at once
          would bury a first-timer.
        </p>
        <p>
          So the workspace has two modes. <strong>The canvas, layers and navigator never move; only
          the inspector changes.</strong> Switching modes changes the tools in your hand, not the page
          in front of you.
        </p>
      </Section>

      <Switch
        label="Inspector mode"
        items={[
          {
            label: "Framing",
            src: inspectorFraming,
            alt: "Framing mode: a manga page with a caption selected; beside it, the inspector for the caption (position, fill, stroke, font and language) and for a generated image (position, image properties, and the seed, dimensions, CFG scale, steps and sampler used to make it).",
            caption:
              "Framing: the inspector follows the selection. A caption gets lettering controls; a rendered image shows the seed and settings that made it, each one copyable.",
          },
          {
            label: "Rendering",
            src: inspectorRendering,
            alt: "Rendering mode: three inspector tabs. General has character presets, prompt, canvas size and options. Model has the model card, LoRA with a weight slider, and seed. Advanced has pose, IP-Adapter reference images, negative prompts, and import and export of generation settings.",
            caption:
              "Rendering: generation controls in three tabs, ordered from what anyone can answer to what only an expert needs.",
          },
        ]}
      />

      <Points title="Control in three tiers" items={TIERS} />

      <Section title="Every render remembers how it was made">
        <p>
          In Framing, selecting a generated image shows its seed, dimensions, CFG scale, steps and
          sampler. An artist can make the panel again, or a close variation of it, without keeping notes.
          For a studio, that is the difference between a lucky result and one they can rely on.
        </p>
      </Section>

      <Section title="Finding your place in a long story">
        <p>
          Webtoons run to dozens of chapters. The navigator is organized the way writers think: a project
          holds arcs, and arcs hold chapters. The audit found three problems in the first version; each
          one maps to specific changes in the second.
        </p>
      </Section>

      <Figure
        src={navigator}
        alt="Workspace navigator before and after. Before: a flat light panel with ungrouped toolbar icons and hard-to-read nesting. After: a dark panel with a grouped toolbar, chapters nested inside arcs, an always-visible expand toggle, hover actions to lock or duplicate, and a clear active state. Numbers link each problem to its fixes."
        aspectClass="aspect-[16/10]"
        caption="The navigator, V1 to V2. Each numbered problem on the left maps to the changes on the right that fix it."
      />

      <Section title="Outcome">
        <p>
          Two industry-leading webtoon studios adopted PixStudio in their production pipelines: the
          people the Advanced tab was built for chose to make real pages with it.
        </p>
      </Section>
    </CaseStudy>
  );
}

export default PixStudioPage;
