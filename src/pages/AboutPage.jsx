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
    body: "Worked on the company's first design system and shaped the UI of its upcoming products, including PixStudio. Mewtant is a Singapore-based company making AI-powered creative tools.",
    link: "/works/pixstudio",
  },
  {
    years: "2022 — now",
    role: "Co-Founder",
    org: "Fusor Design Labs",
    note: "On hiatus",
    body: "A project-based design studio where I lead UI/UX, brand identity and typeface design. Most of our clients are in tech, and we help them build a timeless presence in their industry.",
  },
  {
    years: "2021 — 2022",
    role: "Senior Designer (Interim)",
    org: "X Academy",
    body: "Generalist designer at a technology and education company, working mainly on UI/UX for web apps, plus print, promotional materials and social campaigns.",
  },
];

const AWARDS = [
  {
    date: "Feb 2026",
    title: "First Place, v0 × Contra Hackathon",
    issuer: "Vercel & Contra",
    body: "Design Your Dreams, an in-person challenge in Brooklyn for students and recent grads. Participants had 70 minutes to build a portfolio-adjacent site using v0, with winners chosen from a $5,000 pool by the end of the event. I built an alternative version of my portfolio site's landing page, balancing a minimal aesthetic with an elevated level of interactivity.",
    link: "/works/alt-site",
  },
  {
    date: "Apr 2021",
    title: "Global Top 15%, Cyber Apocalypse CTF",
    issuer: "HackTheBox",
    body: "A five-day online CTF for a good cause: for every challenge with at least one solve, Hack The Box donated to Code.org.",
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
  Creative: ["Brand identity", "UI/UX design", "Typography", "Photography", "Music production"],
  Technical: ["Figma / Sketch", "Adobe Creative Suite", "Affinity Suite", "Front-end development", "DaVinci Resolve"],
};

/** Label on the left, content on the right, hairline above. */
function Block({ title, children }) {
  return (
    <section className="wrap mt-[clamp(5rem,3rem+6vw,9rem)]" data-reveal>
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
          I’m a multidisciplinary designer creating meaningful interactions through thoughtful design.
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
      </div>

      <Block title="Who I am">
        <div className="cs-prose">
          <p>
            I have over four years of experience across brand identity, web design and experimental
            projects, with a focus on <strong>branding, UI/UX and design systems</strong>. I studied
            in the <strong>BFA Communication Design</strong> program at Parsons School of Design.
          </p>
        </div>
      </Block>

      <Block title="How I work">
        <div className="cs-prose">
          <p>
            My approach combines meticulous attention to detail with a holistic understanding of how
            designs work across different touchpoints. I believe thoughtful, functional design can
            change how people experience the world.
          </p>
        </div>
      </Block>

      <Block title="What I can do">
        <div className="grid grid-cols-2 gap-x-gap">
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

      <Block title="This site">
        <div className="cs-prose">
          <p>
            Hand-built — no template, no site builder. Set in Mona Sans, written in React with Vite,
            React Router and Tailwind CSS, with Three.js for the Hexaspire, and hosted on Cloudflare
            Pages.
          </p>
        </div>
      </Block>
    </div>
  );
}

export default AboutPage;
