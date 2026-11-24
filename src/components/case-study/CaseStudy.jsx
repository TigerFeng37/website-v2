import { useRef } from "react";
import { Link } from "react-router-dom";
import Seo from "../Seo";
import BackButton from "../BackButton";
import useReveal from "./useReveal";
import useLegacyDark from "../../hooks/useLegacyDark";
import { getProject, getNextProject } from "../../data/projects";

/**
 * Shell for every case study: SEO, back link, title block, scroll reveals,
 * and the "Next project" hand-off. Page bodies pass their content as children.
 *
 * `intro` overrides the summary shown beside the title (defaults to the
 * project's summary in data/projects.js).
 */
function CaseStudy({ slug, intro, quote = false, children }) {
  const rootRef = useRef(null);
  const project = getProject(slug);
  const next = getNextProject(slug);
  useReveal(rootRef);
  useLegacyDark();

  return (
    <article ref={rootRef} className="pt-24 pb-16 px-6 md:px-8 max-w-6xl mx-auto">
      <Seo title={project.title} description={project.summary} />
      <BackButton />

      <header className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-12 mt-6 mb-12">
        <div className="animate-on-scroll text-slide">
          <h1 className="text-4xl md:text-5xl font-medium uppercase tracking-tight mb-2">
            {project.title}
          </h1>
          <p className="text-base md:text-lg text-gray-400 uppercase tracking-wide">
            {project.disciplines.join(" · ")}
          </p>
        </div>
        <div className="md:w-1/3 shrink-0 animate-on-scroll text-slide stagger-1">
          <p className={`text-lg text-gray-300 ${quote ? "italic" : ""}`}>
            {intro ?? project.summary}
          </p>
        </div>
      </header>

      {children}

      <nav aria-label="Next project" className="mt-24 border-t border-white/10 pt-8">
        <Link to={`/works/${next.slug}`} viewTransition className="group flex flex-col gap-2">
          <span className="text-xs tracking-widest text-gray-500 uppercase">Next project</span>
          <span className="flex items-baseline justify-between gap-6">
            <span className="text-3xl md:text-5xl font-light uppercase tracking-tight transition-colors group-hover:text-[#72EAE0]">
              {next.title}
            </span>
            <span
              className="text-3xl md:text-5xl font-light text-[#72EAE0] transition-transform duration-300 group-hover:translate-x-2"
              aria-hidden
            >
              →
            </span>
          </span>
          <span className="text-gray-500 uppercase tracking-wide text-sm">
            {next.disciplines.join(" · ")}
          </span>
        </Link>
      </nav>
    </article>
  );
}

export default CaseStudy;
