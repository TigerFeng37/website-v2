import { useRef } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import Media from "../components/Media";
import useReveal from "../hooks/useReveal";
import studio from "../assets/severed.webp";

const EXPERIENCE = [
  {
    years: "2024 — 2025",
    role: "Product Design Consultant",
    org: "Mewtant",
    note: "Contract",
    body: "Worked on the first design system and the UI of upcoming products, including PixStudio, at a Singapore company making AI creative tools. Shipped 100+ UI components for a web-based AI graphic novel product across two closed betas, and led branding and UI for an LLM companion app aimed at audiences in Japan and East Asia, supporting its React Native build.",
    link: "/works/pixstudio",
  },
  {
    years: "2022 — now",
    role: "Co-Founder",
    org: "Fusor Design Labs",
    body: "A project-based studio where I lead UI/UX, brand identity and typeface design for 20+ startups across technology and commodities, and build their websites in React, TypeScript and Next.js.",
  },
  {
    years: "2021 — 2022",
    role: "Design Lead",
    org: "X Academy",
    body: "Generalist designer at a tech and education company: mostly web app UI/UX, plus print and social campaigns, one of which reached 1M+ impressions. I also designed and built the official site in React, which raised average time on site by 20%.",
  },
];

const AWARDS = [
  {
    date: "Feb 2026",
    title: "First Place, v0 × Contra Hackathon",
    issuer: "Vercel & Contra",
    body: "An in-person challenge in Brooklyn: 70 minutes to build a site with v0. I built an alternate landing page for this portfolio.",
    link: "/works/alt-site",
  },
  {
    date: "Apr 2021",
    title: "Global Top 15%, Cyber Apocalypse CTF",
    issuer: "HackTheBox",
    body: "A five-day online CTF for a good cause: for every challenge with at least one solve, Hack The Box donated to Code.org.",
  },
  {
    date: "2021",
    title: "Silver A' Design Award, Photography",
    issuer: "A' Design Award",
    body: "Photography and Photo Manipulation.",
  },
  {
    date: "Jun 2019",
    title: "Award for Best Design",
    issuer: "The Hack 2019, Shanghai Jiao Tong University",
    body: "A 24-hour national hackathon. Best Design and Innovation went to our iOS app for community-based waste sorting, with goals, agendas and friendly competition between neighborhoods. I led visual identity and UI/UX.",
  },
  {
    date: "Apr 2019",
    title: "A' Design Award, Photography",
    issuer: "A' Design Award",
    body: "Photography and Photo Manipulation, for the minimalist series Human Light.",
    link: "/works/human-light",
  },
  {
    date: "Jun 2018",
    title: "Rokid Award for Best Design & Innovation",
    issuer: "hack.init 2018, ShanghaiTech University",
    body: "A 24-hour national hackathon. Our spare-item sharing iOS app paired with locker hardware for drop-off, storage and pickup. I led visual identity and app UI/UX.",
  },
  {
    date: "Jun 2017",
    title: "Best Design & Best Hardware",
    issuer: "hack.init 2017, ShanghaiTech University",
    body: "China's youth hackathon focused on inclusivity: 300 participants in a 24-hour build, with strong support for high schoolers, international students and university freshmen.",
  },
];

const CAPABILITIES = {
  Design: ["Brand identity", "Product design", "UI/UX design", "Interaction design", "Design systems", "Figma / Sketch"],
  Build: ["React / TypeScript", "Next.js / Vite", "Tailwind CSS", "Three.js",],
  Craft: ["Motion (Rive, After Effects)", "3D (Blender, Cinema 4D)", "Photography", "Music production", "DaVinci Resolve"],
};

/** Label on the left, content on the right, hairline above. */
function Block({ title, children }) {
  return (
    <section className="wrap mt-[clamp(3rem,2rem+3vw,5rem)]" data-reveal>
      <div className="grid-12 rule gap-y-6 pt-6">
        <h2 className="col-span-12 text-h3 md:col-span-4">{title}</h2>
        <div className="col-span-12 md:col-span-8">{children}</div>
      </div>
    </section>
  );
}

function Entry({ aside, title, sub, children, link }) {
  return (
    <li className="rule grid grid-cols-8 gap-x-gap gap-y-2 py-6 first:border-t-0 first:pt-0">
      <p className="col-span-8 tabular-nums text-fg-2 sm:col-span-2">{aside}</p>
      <div className="col-span-8 sm:col-span-6">
        <h3 className="text-h4 font-medium">{title}</h3>
        {sub ? <p className="text-fg-2">{sub}</p> : null}
        {children ? <p className="mt-3 max-w-[60ch] text-fg-2">{children}</p> : null}
        {link ? (
          <Link to={link} viewTransition className="link mt-3 inline-block">
            See the project
          </Link>
        ) : null}
      </div>
    </li>
  );
}

function AboutPage() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <div ref={ref}>
      <Seo
        title="About"
        description="Yicheng Feng is a multidisciplinary designer in New York working across brand identity, UI/UX and design systems."
      />

      <header className="wrap pt-[calc(var(--header-h)+clamp(3rem,10vh,7rem))]">
        <h1 className="intro-line max-w-[18ch] text-h1">
          I design brands and products, and often build them too.
        </h1>
      </header>

      <div className="wrap mt-12 md:mt-16">
        <Media
          src={studio}
          alt="A Hexaspire sculpture on a black plinth in an empty gallery hall with a teal floor"
          priority
          className="intro-line aspect-[4/5] sm:aspect-[16/9] md:aspect-[21/9]"
          position="50% 58%"
        />
        <p class="my-2">The Hexaspire<span class="text-gray-500"> – made with Blender</span></p>
      </div>

      <Block title="Who I am">
        <div className="cs-prose">
          <p>
            A designer who also builds. Four-plus years in{" "}
            <strong>brand identity, product design, UI/UX and design systems</strong>, with experimental projects on the side. I studied{" "}
            <strong>Communication Design (BFA)</strong> at Parsons School of Design.
          </p>
        </div>
      </Block>

      <Block title="How I work">
        <div className="cs-prose">
          <p>
            I prototype early, in the real medium and usually in code, so ideas get judged on
            something that works rather than a mockup.
          </p>
          <p>
            I treat a design system as the shared language between design and engineering. I craft designs with <strong>Figma + React</strong>, so what ships matches
            what was designed and the handoff stays minimal.
          </p>
        </div>
      </Block>

      <Block title="What I can do">
        <div className="grid grid-cols-2 gap-x-gap gap-y-10 sm:grid-cols-3">
          {Object.entries(CAPABILITIES).map(([group, items]) => (
            <div key={group}>
              <h3 className="text-fg-2">{group}</h3>
              <ul className="mt-3 space-y-1 text-h4">
                {items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Experience">
        <ol>
          {EXPERIENCE.map((e) => (
            <Entry
              key={e.org}
              aside={e.years}
              title={`${e.role}, ${e.org}`}
              sub={e.note}
              link={e.link}
            >
              {e.body}
            </Entry>
          ))}
        </ol>
      </Block>

      <Block title="Recognition">
        <ol>
          {AWARDS.map((a) => (
            <Entry key={a.title} aside={a.date} title={a.title} sub={a.issuer} link={a.link}>
              {a.body}
            </Entry>
          ))}
        </ol>
      </Block>

      {/* <Block title="This site">
        <div className="cs-prose">
          <p>
            Hand-built in React, Three.js and Tailwind CSS. Set in Mona Sans, hosted on Cloudflare
            Pages.
          </p>
        </div>
      </Block> */}
    </div>
  );
}

export default AboutPage;
