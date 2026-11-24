import { useRef } from "react";
import { Link } from "react-router-dom";
import Media from "../Media";
import useReveal from "../../hooks/useReveal";

// Card shapes. Wide and tall cards pair up in a row (7 + 5 columns), sides
// alternating; full-width features open the grid and break it up mid-way.
const SHAPES = {
  full: { col: "md:col-span-12", aspect: "aspect-[4/3] md:aspect-[2/1]" },
  wide: { col: "md:col-span-7", aspect: "aspect-[4/3]" },
  tall: { col: "md:col-span-5", aspect: "aspect-[4/5]" },
};

/**
 * Lays out any number of projects so every row is complete: an odd count
 * gets one feature, an even count of six or more gets two (first, and after
 * half the pairs), and everything else pairs up wide/tall, tall/wide, ...
 */
export function layout(items) {
  const n = items.length;
  const features = n % 2 === 1 ? 1 : n >= 6 ? 2 : 0;
  const pairs = (n - features) / 2;
  const secondFeatureAfter = Math.floor(pairs / 2);

  const shapes = [];
  if (features) shapes.push("full");
  for (let r = 0; r < pairs; r++) {
    if (features === 2 && r === secondFeatureAfter) shapes.push("full");
    shapes.push(...(r % 2 === 0 ? ["wide", "tall"] : ["tall", "wide"]));
  }
  return items.map((item, i) => ({ item, shape: shapes[i] }));
}

function ProjectCard({ project, shape, index }) {
  const { col, aspect } = SHAPES[shape];
  return (
    <li className={`col-span-12 ${col}`} data-reveal style={{ "--i": index % 2 }}>
      <Link to={`/works/${project.slug}`} viewTransition className="card group block">
        <Media
          src={project.thumb ?? project.hero}
          poster={project.poster}
          alt=""
          className={aspect}
          vt={`media-${project.slug}`}
        />
        <div className="mt-4 grid grid-cols-[1fr_auto] gap-x-6 md:mt-5">
          <h3 className="text-h4 font-medium">
            {project.title}
            <span
              aria-hidden
              className="caret caret-ghost opacity-0 transition-opacity duration-fast group-hover:opacity-100 group-focus-visible:opacity-100"
            />
          </h3>
          <span className="tabular-nums text-fg-2">{project.year}</span>
          <p className="col-span-2 mt-1 max-w-[46ch] text-fg-2">{project.tagline}</p>
        </div>
      </Link>
    </li>
  );
}

function WorkGrid({ items, pending = [] }) {
  const ref = useRef(null);
  useReveal(ref, [items]);

  return (
    <div ref={ref}>
      <ul className="grid-12 gap-y-16 md:gap-y-[clamp(5rem,8vw,9rem)]">
        {layout(items).map(({ item, shape }, i) => (
          <ProjectCard key={item.slug} project={item} shape={shape} index={i} />
        ))}
      </ul>

      {pending.length ? (
        <p className="rule mt-16 max-w-[52ch] pt-6 text-h4 text-fg-2 md:mt-24" data-reveal>
          Also in progress, not yet public:{" "}
          <span className="text-fg">
            {pending.map((p) => p.phrase).join(" and ")}
          </span>
          .
        </p>
      ) : null}
    </div>
  );
}

export default WorkGrid;
