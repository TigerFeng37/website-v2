import { useMemo, useState } from "react";
import { CATEGORIES, inProgress, projects } from "../../data/projects";
import WorkIndex from "./WorkIndex";

const FILTERS = ["All", ...CATEGORIES];

function FilterBar({ value, onChange }) {
  return (
    <div role="radiogroup" aria-label="Filter work" className="flex flex-wrap gap-x-6 gap-y-2">
      {FILTERS.map((f) => {
        const on = value === f;
        const count = f === "All" ? projects.length : projects.filter((p) => p.categories.includes(f)).length;
        return (
          <button
            key={f}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(f)}
            className={`relative py-1 transition-colors duration-fast ${on ? "text-fg" : "text-fg-2 hover:text-fg"}`}
          >
            {f}
            <span className="ml-1.5 tabular-nums text-fg-3">{count}</span>
            <span
              aria-hidden
              className={`absolute -bottom-0.5 left-0 h-[2px] w-[0.5em] rounded-[1px] bg-accent transition-opacity duration-fast ${
                on ? "opacity-100" : "opacity-0"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}

function Work() {
  const [filter, setFilter] = useState("All");
  const items = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter))),
    [filter]
  );
  const pending = filter === "All" || filter === "Product" ? inProgress : [];

  return (
    <section id="work" aria-labelledby="work-title" className="wrap">
      <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
        <h2 id="work-title" className="text-h2">
          Selected work
        </h2>
        <FilterBar value={filter} onChange={setFilter} />
      </div>

      {/* Keyed so a new filter replays the row entrance. */}
      <WorkIndex key={filter} items={items} pending={pending} />
    </section>
  );
}

export default Work;
