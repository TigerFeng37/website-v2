import CaseStudy from "../../components/case-study/CaseStudy";
import { Bento, Figure, Gallery, Section } from "../../components/case-study/blocks";
import logoAnim from "../../assets/ar/logo-anim.mp4";
import logoPoster from "../../assets/ar/logo-anim-poster.webp";
import demo1 from "../../assets/ar/demo-1.webp";
import demo2 from "../../assets/ar/demo-2.webp";
import demo3 from "../../assets/ar/demo-3.webp";
import demo4 from "../../assets/ar/demo-4.webp";
import demo5 from "../../assets/ar/demo-5.webp";
import demo6 from "../../assets/ar/demo-6.webp";
import demo7 from "../../assets/ar/demo-7.webp";

const SLIDES = [demo1, demo2, demo3, demo4].map((src, i) => ({
  src,
  alt: `Academy Records brand application ${i + 1}`,
}));

function AcademyRecordsPage() {
  return (
    <CaseStudy
      slug="academy-records"
      facts={[
        { label: "Client", value: "Academy Records" },
        { label: "Year", value: "2023" },
        { label: "Team", value: "Fusor Design Labs" },
        { label: "Scope", value: ["Brand identity", "Logo design", "Packaging"] },
      ]}
    >
      <Section title="Brand philosophy">
        <p>
          The identity aims to capture the essence of classic vinyl while presenting a contemporary
          aesthetic that speaks to collectors and casual listeners alike.
        </p>
      </Section>

      <Figure src={logoAnim} poster={logoPoster} label="Academy Records logo animation" aspectClass="aspect-video" />

      <Section title="Design process">
        <p>
          The process began with research into the history of record labels and vinyl culture.
          Several concepts were explored before settling on a direction that balances nostalgia with
          contemporary appeal.
        </p>
      </Section>

      <Gallery items={SLIDES} label="Academy Records brand applications" aspectClass="aspect-[2560/1856]" />

      <Section title="A cohesive identity">
        <p>
          The result is an identity that feels both nostalgic and current, built on the timeless
          qualities of vinyl. The logo's line graphics draw on the grooves of a record and sound
          waves moving through a space, while the color palette stays vibrant and modern.
        </p>
      </Section>

      <Bento
        tall={{ src: demo5, alt: "Academy Records poster" }}
        stack={[
          { src: demo7, alt: "Academy Records brand application" },
          { src: demo6, alt: "Academy Records brand application" },
        ]}
      />
    </CaseStudy>
  );
}

export default AcademyRecordsPage;
