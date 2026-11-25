import { useRef } from "react";
import { Link } from "react-router-dom";
import Seo from "../Seo";
import Media from "../Media";
import SectionRail from "./SectionRail";
import useReveal from "../../hooks/useReveal";
import { getNextProject, getProject } from "../../data/projects";

/**
 * Shell for every case study.
 *
 * The header answers what a reviewer needs before scrolling — what it is,
 * who it was for, what I did, when — then the cover reel (which morphs in
 * from the card that was clicked), the page body, and the next project.
 *
 * facts: [{ label, value: string | string[] }]
 * links: [{ label, href }] — live site, source, award listing
 */
function CaseStudy({ slug, lead, facts = [], links = [], hero, children }) {
  const ref = useRef(null);
  const project = getProject(slug);
  const next = getNextProject(slug);
  useReveal(ref);

  return (
    <article ref={ref}>
      <Seo title={project.title} description={project.summary} />

      <header data-toc="Overview" className="wrap pt-[calc(var(--header-h)+clamp(2rem,7vh,5.5rem))]">
        <Link
          to="/#work"
          viewTransition
          className="intro-line group inline-flex items-center gap-2 py-1 text-fg-2 transition-colors duration-fast hover:text-fg"
        >
          <span aria-hidden className="transition-transform duration-base ease-out group-hover:-translate-x-1">
            ←
          </span>
          All work
        </Link>

        <div className="grid-12 mt-8 gap-y-12 md:mt-12">
          <div className="col-span-12 lg:col-span-8">
            <h1 className="intro-line text-h1" style={{ "--i": 1 }}>
              {project.title}
            </h1>
            <p className="intro-line mt-6 max-w-[30ch] text-h3 text-fg-2 md:mt-8" style={{ "--i": 2 }}>
              {lead ?? project.summary}
            </p>
          </div>

          <dl
            className="intro-line col-span-12 grid grid-cols-2 gap-x-gap gap-y-6 self-end lg:col-span-4"
            style={{ "--i": 3 }}
          >
            {facts.map(({ label, value }) => (
              <div key={label}>
                <dt className="text-fg-2">{label}</dt>
                {(Array.isArray(value) ? value : [value]).map((v) => (
                  <dd key={v}>{v}</dd>
                ))}
              </div>
            ))}
            {links.map(({ label, href, text }) => (
              <div key={href}>
                <dt className="text-fg-2">{label}</dt>
                <dd>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="link break-words">
                    {text ?? href.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                    <span aria-hidden> ↗</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <SectionRail rootRef={ref} slug={slug} />

      <div className="wrap mt-12 md:mt-16">
        <Media
          src={hero?.src ?? project.hero}
          poster={hero?.poster ?? project.poster}
          placeholder={project.poster ?? (project.thumb !== project.hero ? project.thumb : undefined)}
          alt={hero?.alt ?? ""}
          label={hero?.label}
          loop={project.loop}
          position={hero?.position}
          vt={`media-${slug}`}
          priority
          className="aspect-[4/3] md:aspect-video"
        />
      </div>

      <div className="cs-flow">{children}</div>

      <NextProject project={next} />
    </article>
  );
}

function NextProject({ project }) {
  return (
    <nav aria-label="Next project" data-toc="Next project" className="wrap mt-[clamp(4.5rem,3rem+5vw,8.5rem)]">
      <Link to={`/works/${project.slug}`} viewTransition className="card group grid-12 rule gap-y-6 pt-6">
        <div className="col-span-12 md:col-span-7">
          <p className="text-fg-2">Next project</p>
          <p className="mt-3 text-h1">
            {project.title}
            <span
              aria-hidden
              className="caret caret-ghost opacity-0 transition-opacity duration-fast group-hover:opacity-100 group-focus-visible:opacity-100"
            />
          </p>
          <p className="mt-4 max-w-[36ch] text-h4 text-fg-2">{project.tagline}</p>
        </div>
        <div className="col-span-12 md:col-span-5">
          <Media
            src={project.thumb ?? project.hero}
            poster={project.poster}
            loop={project.loop}
            vt={`media-${project.slug}`}
            className="aspect-[4/3]"
          />
        </div>
      </Link>
    </nav>
  );
}

export default CaseStudy;
