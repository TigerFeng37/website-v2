import CaseStudy from "../../components/case-study/CaseStudy";
import { Figure, Quote, Section } from "../../components/case-study/blocks";
import hero2 from "../../assets/pixstudio/hero-2.webp";
import demo1 from "../../assets/pixstudio/demo-1.webp";
import demo2 from "../../assets/pixstudio/demo-2.png";

function PixStudioPage() {
  return (
    <CaseStudy
      slug="pixstudio"
      hero={{ alt: "PixStudio workspace" }}
      facts={[
        { label: "Client", value: "Mewtant" },
        { label: "Year", value: "2024" },
        { label: "Role", value: "Product design consultant" },
        { label: "Scope", value: ["UI/UX design", "Design system", "User testing"] },
      ]}
    >
      <Section title="What PixStudio is">
        <p>
          A browser-based creation suite that puts AI generation, inpainting and 2D layout tools in
          one workspace, so storytellers without formal art training can frame, compose and render
          webtoon and manga pages.
        </p>
      </Section>

      <Figure src={hero2} alt="PixStudio interface overview" aspectClass="aspect-[2560/1537]" />

      <Section title="The challenge">
        <p>
          Manga creation has a high technical ceiling: perspective, anatomy and complex software like
          Clip Studio Paint. The goal was a new web tool that opened the process up, folding AI
          generation and 2D graphics into a frictionless creative flow for people with no formal art
          training.
        </p>
      </Section>

      <Section title="The solution">
        <p>
          I refined the UI of a tool that bridges generative AI and storytelling. By reworking the
          layout and designing more intuitive controls, we turned a complex process into a
          drag-and-drop experience. The result was efficient enough that{" "}
          <strong>two industry-leading webtoon studios adopted it</strong> in their production
          pipelines.
        </p>
      </Section>

      <Quote>
        The central UX problem was making AI feel like a brush rather than a black box.
      </Quote>

      <Section title="Key decision">
        <p>
          Inpainting and generation live directly in the workspace, and a contextual control panel
          adapts to the current mode (Framing or Rendering). That cut cognitive load and kept
          creators focused on the story, not the technology.
        </p>
      </Section>

      <Figure src={demo1} alt="PixStudio interface detail: framing mode" aspectClass="aspect-[2124/1176]" />
      <Figure src={demo2} alt="PixStudio interface detail: rendering mode" aspectClass="aspect-[2124/1256]" />
    </CaseStudy>
  );
}

export default PixStudioPage;
