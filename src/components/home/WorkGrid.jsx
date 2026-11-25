import { useRef } from "react";
import { Link } from "react-router-dom";
import Media from "../Media";
import useReveal from "../../hooks/useReveal";
import useMediaQuery from "../../hooks/useMediaQuery";

// Row shapes, as media aspect ratios. Cards in a row grow in proportion to
// their ratio, so every card in it shares one media height: a pair is a wide
// card beside a near-square one (sides alternate), a triple is three 4:3s.
const PAIRS = [
  [3 / 2, 1.1],
  [1.1, 3 / 2],
];
const TRIPLE = [4 / 3, 4 / 3, 4 / 3];
const SINGLE = [2];

/**
 * How many cards go in each row. With triples allowed (wide screens) rows
 * alternate pair, triple, pair … and start and end on a pair where the count
 * allows; otherwise everything pairs up, with one full-width card first if
 * the count is odd.
 */
function plan(n, triples) {
  if (n <= 1) return n ? [1] : [];
  if (!triples) return n % 2 ? [1, ...Array((n - 1) / 2).fill(2)] : Array(n / 2).fill(2);

  let best;
  for (let t = 0; 3 * t <= n; t++) {
    if ((n - 3 * t) % 2) continue;
    const p = (n - 3 * t) / 2;
    const score = Math.abs(p - (t + 1));
    if (!best || score < best.score) best = { p, t, score };
  }
  const sizes = [];
  for (let k = 0; k < Math.max(best.p, best.t); k++) {
    if (k < best.p) sizes.push(2);
    if (k < best.t) sizes.push(3);
  }
  return sizes;
}

/** Each item with its aspect ratio, its share of the row, and its place in it. */
function layout(items, triples) {
  const out = [];
  let i = 0;
  let pair = 0;
  for (const size of plan(items.length, triples)) {
    const ratios = size === 3 ? TRIPLE : size === 2 ? PAIRS[pair++ % 2] : SINGLE;
    const sum = ratios.reduce((a, b) => a + b, 0);
    ratios.forEach((ar, col) => {
      out.push({ item: items[i++], ar, share: ar / sum, size, col });
    });
  }
  return out;
}

function ProjectCard({ project, ar, share, size, col, compact }) {
  // Widths are exact shares of the row minus its gaps (less a hair, so
  // sub-pixel rounding never pushes the last card onto the next line).
  const basis = `calc((100% - ${size - 1} * var(--gap)) * ${share} - 0.5px)`;
  return (
    <li
      className="w-full md:w-auto md:flex-none md:basis-[var(--basis)]"
      data-reveal
      style={{ "--basis": basis, "--ar": ar, "--i": col }}
    >
      <Link to={`/works/${project.slug}`} viewTransition className="card group block">
        <Media
          src={project.thumb ?? project.hero}
          poster={project.poster}
          loop={project.loop}
          alt=""
          className="aspect-[4/3] md:aspect-[var(--ar)]"
          vt={`media-${project.slug}`}
        />
        <div className="mt-4 grid grid-cols-[1fr_auto] gap-x-6">
          <h3 className={`${compact ? "" : "text-h4"} font-medium`}>
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
  const triples = useMediaQuery("(min-width: 1024px)");
  useReveal(ref, [items, triples]);

  return (
    <div ref={ref}>
      <ul className="flex flex-wrap gap-x-gap gap-y-12 md:gap-y-[clamp(3rem,1rem+3.5vw,5rem)]">
        {layout(items, triples).map(({ item, ...shape }) => (
          <ProjectCard key={item.slug} project={item} {...shape} compact={shape.size === 3} />
        ))}
      </ul>

      {pending.length ? (
        <p className="rule mt-16 max-w-[52ch] pt-6 text-h4 text-fg-2 md:mt-20" data-reveal>
          Not public yet:{" "}
          <span className="text-fg">{pending.map((p) => p.phrase).join(" and ")}</span>.
        </p>
      ) : null}
    </div>
  );
}

export default WorkGrid;
