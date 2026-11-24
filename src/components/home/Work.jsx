import { useMemo, useState } from "react";
import { CATEGORIES, inProgress, projects } from "../../data/projects";
import WorkGrid from "./WorkGrid";
import WorkIndex from "./WorkIndex";

const FILTERS = ["All", ...CATEGORIES];
const VIEWS = ["Grid", "Index"];
const VIEW_KEY = "work-view";

const readView = () => {
  try {
    return localStorage.getItem(VIEW_KEY) === "Index" ? "Index" : "Grid";
  } catch {
    return "Grid";
  }
};

/** A row of text options; the chosen one carries the caret. */
function Choice({ label, options, value, onChange, count }) {
  return (
    <div role="radiogroup" aria-label={label} className="flex gap-x-6 whitespace-nowrap">
      {options.map((option) => {
        const on = value === option;
        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(option)}
            className={`relative py-1 transition-colors duration-fast ${on ? "text-fg" : "text-fg-2 hover:text-fg"}`}
          >
            {option}
            {count ? <span className="ml-1.5 tabular-nums text-fg-3">{count(option)}</span> : null}
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

const countFor = (f) =>
  f === "All" ? projects.length : projects.filter((p) => p.categories.includes(f)).length;

function Work() {
  const [filter, setFilter] = useState("All");
  const [view, setViewState] = useState(readView);
  const setView = (v) => {
    setViewState(v);
    try {
      localStorage.setItem(VIEW_KEY, v);
    } catch {
      /* not persisted in private mode */
    }
  };

  const items = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter))),
    [filter]
  );
  const pending = filter === "All" || filter === "Product" ? inProgress : [];
  const View = view === "Index" ? WorkIndex : WorkGrid;

  return (
    <section id="work" aria-labelledby="work-title" className="wrap">
      <div className="rule mb-10 grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-5 pt-6 md:mb-16 md:flex md:justify-between">
        <h2 id="work-title" className="text-h2">
          Selected work
        </h2>
        {/* Phones: layout sits beside the title, filters scroll on one line below. */}
        <div className="-mx-gutter col-span-2 row-start-2 overflow-x-auto px-gutter [scrollbar-width:none] md:mx-0 md:ml-auto md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
          <Choice label="Filter work" options={FILTERS} value={filter} onChange={setFilter} count={countFor} />
        </div>
        <div className="flex items-baseline gap-10">
          <span aria-hidden className="hidden h-4 w-px self-center bg-line/20 md:block" />
          <Choice label="Layout" options={VIEWS} value={view} onChange={setView} />
        </div>
      </div>

      {/* Keyed so a new filter or view replays the entrance. */}
      <View key={`${view}-${filter}`} items={items} pending={pending} />
    </section>
  );
}

export default Work;
