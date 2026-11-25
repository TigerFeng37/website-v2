import CaseStudy from "../../components/case-study/CaseStudy";
import { Bento, Figure, Gallery, Points, Quote, Section } from "../../components/case-study/blocks";
import logoAnim from "../../assets/ar/logo-anim.mp4";
import logoPoster from "../../assets/ar/logo-anim-poster.webp";
import demo1 from "../../assets/ar/demo-1.webp";
import demo2 from "../../assets/ar/demo-2.webp";
import demo3 from "../../assets/ar/demo-3.webp";
import demo4 from "../../assets/ar/demo-4.webp";
import demo5 from "../../assets/ar/demo-5.webp";
import demo6 from "../../assets/ar/demo-6.webp";
import demo7 from "../../assets/ar/demo-7.webp";

const SLIDES = [
  {
    src: demo1,
    alt: "Academy Records mobile site hero: NYC's one-stop music and movie destination since 1977 over red groove lines",
    caption: "Hero: the 1977 Flatiron institution framed by concentric red groove lines.",
  },
  {
    src: demo2,
    alt: "Academy Records mobile page showing buying and selling vinyl LPs, CDs, DVDs and Blu-rays with storefront photo",
    caption: "Catalog and history: underlined type ties LPs, CDs, DVDs and Blu-rays to the 18th St storefront.",
  },
  {
    src: demo3,
    alt: "Academy Records mobile page with daily opening hours and minimalist map of 12 W 18 St near 5 Av",
    caption: "Hours and custom Flatiron street map pointing straight to 12 W 18 St.",
  },
  {
    src: demo4,
    alt: "Academy Records press carousel featuring Goldmine Magazine and Village Voice quotes",
    caption: "Press cards quoting Goldmine Magazine and The Village Voice.",
  },
];

const MOTIFS = [
  {
    title: "The grooved A",
    body: "Concentric arcs inspired by vinyl grooves and sound waves compress into an emblem that reads cleanly from a subway banner down to a center label.",
  },
  {
    title: "The red plus & rule",
    body: "Academy sells CDs, LPs, DVDs and Blu-rays side by side. A red + and fine underline connect formats, call out hours and anchor links like index tabs.",
  },
  {
    title: "Swiss grotesk spine",
    body: "Tight, high-contrast black and white typography keeps the focus on catalog facts — what the shop buys, when it opens and where to find it.",
  },
  {
    title: "Built for crates and phones",
    body: "The system translates directly from mobile browsing on the train to wheatpaste posters and physical LP sleeves.",
  },
];

function AcademyRecordsPage() {
  return (
    <CaseStudy
      slug="academy-records"
      lead="Identity, website and packaging for a Flatiron record store open since 1977."
      facts={[
        { label: "Client", value: "Academy Records" },
        { label: "Year", value: "2023" },
        { label: "Team", value: "Fusor Design Labs" },
        { label: "Scope", value: ["Brand identity", "Web design", "Packaging", "Print"] },
      ]}
    >
      <Section title="Overview">
        <p>
          Open since 1977 at 12 West 18th Street, Academy Records + CDs is a fixture of Manhattan's
          Flatiron District — known among collectors for second-hand vinyl, CDs, DVDs, Blu-rays and
          one of the finest classical selections in the city.
        </p>
        <p>
          With Fusor Design Labs, I refreshed the visual identity, website and physical packaging so
          a nearly fifty-year-old shop feels crisp and current without losing the grit of crate
          digging.
        </p>
      </Section>

      <Section title="Brand philosophy">
        <p>
          The identity aims to capture the physicality of classic vinyl while presenting a
          contemporary editorial voice that speaks to both seasoned collectors and casual listeners
          walking past 18th Street.
        </p>
      </Section>

      <Figure
        src={logoAnim}
        poster={logoPoster}
        label="Academy Records logo animation"
        aspectClass="aspect-video"
        caption="Logo motion study: concentric groove arcs assemble into the Academy emblem."
      />

      <Points title="Elements of the system" items={MOTIFS} />

      <Section title="A digital front door">
        <p>
          Record-store websites often bury basic information under cluttered flyers. We designed a
          mobile-first web experience built around what someone on the street actually needs: what
          the store buys and sells, when it opens, how to get to 12 W 18 St, and why critics from{" "}
          <em>Goldmine Magazine</em> to <em>The Village Voice</em> vouch for the bins.
        </p>
      </Section>

      <Gallery items={SLIDES} label="Academy Records mobile website screens" aspectClass="aspect-[2560/1856]" />

      <Section title="Print, transit and sleeves">
        <p>
          The logo's sweeping arcs trace both the grooves of a record and sound waves moving through
          a room. Off screen, those lines wrap wheatpaste street posters, repeat across subway
          platform murals and dress refreshed LP jackets and center labels — keeping the black,
          white and red palette grounded in real ink and paper.
        </p>
      </Section>

      <Bento
        tall={{
          src: demo5,
          alt: "Academy Records street poster reading +CDs +Vinyls +Blu-rays with storefront photograph",
        }}
        stack={[
          {
            src: demo7,
            alt: "Turntable and shrink-wrapped Miles Davis Kind of Blue LP sleeve with Academy Records center label and groove artwork",
          },
          {
            src: demo6,
            alt: "Subway platform banner repeating the Academy Records concentric groove emblem",
          },
        ]}
      />

      <Quote>
        The goal wasn't to invent nostalgia — Academy already had nearly fifty years of history. It
        was to give that catalog a clean, modern frame.
      </Quote>
    </CaseStudy>
  );
}

export default AcademyRecordsPage;
