import { useRef } from "react";
import { Link } from "react-router-dom";
import { getProject } from "../../data/projects";
import useReveal from "../../hooks/useReveal";

const PRACTICE = [
  {
    title: "Brand identity",
    body: "Identity systems, typefaces and motion for companies that want to look like themselves for a long time.",
    proof: ["aspecta", "academy-records", "eclair"],
  },
  {
    title: "Product design",
    body: "Zero-to-one products and the design systems that keep them coherent, from AI creative tools to native iOS apps.",
    proof: ["pixstudio", "nyc-subway-archive"],
  },
  {
    title: "Creative technology",
    body: "I build what I design — front ends, prototypes and data pipelines — so ideas are tested in the real medium, not a mockup.",
    proof: ["photos-by-feng", "alt-site", "tokyo-trackmap"],
  },
];

function Practice() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section ref={ref} aria-labelledby="practice-title" className="wrap mt-section">
      <div className="grid-12 rule gap-y-10 pt-6">
        <h2 id="practice-title" className="col-span-12 text-h2 lg:col-span-4" data-reveal>
          What I do
        </h2>
        <ol className="col-span-12 lg:col-span-8">
          {PRACTICE.map((item, i) => (
            <li
              key={item.title}
              className={`grid gap-x-gap gap-y-3 pb-10 md:grid-cols-8 md:pb-12 ${i ? "rule pt-6 md:pt-8" : ""}`}
              data-reveal
            >
              <h3 className="text-h3 md:col-span-3">{item.title}</h3>
              <div className="md:col-span-5">
                <p className="max-w-[40ch] text-h4 text-fg-2">{item.body}</p>
                <p className="mt-4 text-fg-2">
                  See{" "}
                  {item.proof.map((slug, j) => {
                    const project = getProject(slug);
                    const sep = j === 0 ? "" : j === item.proof.length - 1 ? " and " : ", ";
                    return (
                      <span key={slug}>
                        {sep}
                        <Link to={`/works/${slug}`} viewTransition className="link text-fg">
                          {project.title}
                        </Link>
                      </span>
                    );
                  })}
                  .
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default Practice;
