/**
 * The design process drawn as a subway line, after the thesis board: five
 * stations on a four-track trunk, with test findings looping back to Ideate.
 * Horizontal from md up; a vertical line on phones.
 * stops: [{ title, body }]
 */

const TRACKS = ["#00933C", "#FCCC0A", "#0039A6", "#A7A9AC"];
const HELVETICA = { fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' };

function Bullet({ n }) {
  return (
    <span
      aria-hidden
      className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-fg text-base font-bold text-bg"
      style={HELVETICA}
    >
      {n}
    </span>
  );
}

function Station() {
  return <span aria-hidden className="block h-11 w-5 rounded-full border-[3px] border-fg bg-bg" />;
}

const mask = (gradient) => ({ maskImage: gradient, WebkitMaskImage: gradient });

// Phone layout: the line runs on past the last stop and dissolves instead of
// ending in square caps. Stacked copies of the tracks, each blurred a little
// more and masked to a lower band, make a progressive blur; an outer mask fades
// it all out. Masks (not a dark overlay) so it works on light and dark themes.
const BLUR_LAYERS = [
  { blur: 0, gradient: "linear-gradient(to bottom, #000 calc(100% - 9rem), transparent calc(100% - 5rem))" },
  {
    blur: 1.5,
    gradient:
      "linear-gradient(to bottom, transparent calc(100% - 9rem), #000 calc(100% - 6.5rem), #000 calc(100% - 5rem), transparent calc(100% - 2rem))",
  },
  { blur: 4, gradient: "linear-gradient(to bottom, transparent calc(100% - 6.5rem), #000 calc(100% - 3.5rem))" },
];

function FadingTracks() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -bottom-2 left-0 top-4 w-9"
      style={mask("linear-gradient(to bottom, #000 calc(100% - 7rem), transparent)")}
    >
      {BLUR_LAYERS.map((l) => (
        <div
          key={l.blur}
          className="absolute inset-0 flex justify-center gap-1"
          style={{ ...mask(l.gradient), filter: l.blur ? `blur(${l.blur}px)` : undefined }}
        >
          {TRACKS.map((c) => (
            <span key={c} className="block w-1" style={{ backgroundColor: c }} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function ProcessLine({ title, intro, stops, loop }) {
  return (
    <section className="cs-block wrap grid-12 gap-y-8" data-reveal>
      <div className="col-span-12 md:col-span-4">
        <h2 className="text-h3">{title}</h2>
      </div>
      <div className="cs-prose col-span-12 md:col-span-8 lg:col-span-7">
        <p>{intro}</p>
      </div>

      {/* Horizontal line, md and up */}
      <div className="relative col-span-12 hidden md:block">
        {/* bullet row 2.25rem + gap 1.25rem + half the 3.5rem station row */}
        <div aria-hidden className="absolute inset-x-0 top-[5.25rem] -translate-y-1/2 space-y-1">
          {TRACKS.map((c) => (
            <span key={c} className="block h-1 rounded-full" style={{ backgroundColor: c }} />
          ))}
        </div>
        <ol className="relative grid grid-cols-5 gap-x-gap">
          {stops.map((s, i) => (
            <li key={s.title}>
              <div className="flex items-center gap-3">
                <Bullet n={i + 1} />
                <h3 className="text-h4 font-medium">{s.title}</h3>
              </div>
              <div className="relative mt-5 h-14">
                <div className="absolute left-2 top-1/2 -translate-y-1/2">
                  <Station />
                </div>
              </div>
              <p className="mt-5 text-fg-2">{s.body}</p>
            </li>
          ))}
        </ol>
        {loop ? (
          // From Test (column 5) back to Ideate (column 3). It sits on the same
          // 5-column grid as the stations: it starts at Ideate's station center
          // (1.125rem into column 3) and runs one gap plus 1.125rem past the end
          // of column 4, which is Test's station center.
          <div className="mt-6 grid grid-cols-5 gap-x-gap">
            <div
              className="col-span-2 col-start-3"
              // minus half the 1.5px dashed line, so each line is centered on its station
              style={{ marginLeft: "calc(1.125rem - 0.75px)", marginRight: "calc(-1 * var(--gap) - 1.125rem - 0.75px)" }}
            >
              <div aria-hidden className="relative h-6 border-x-[1.5px] border-b-[1.5px] border-dashed border-fg-2">
                <span className="absolute -left-px -top-px block h-2.5 w-2.5 -translate-x-1/2 rotate-45 border-l-[1.5px] border-t-[1.5px] border-fg-2" />
              </div>
              <p className="mt-3 text-center text-fg-2">{loop}</p>
            </div>
          </div>
        ) : null}
      </div>

      {/* Vertical line, phones */}
      <div className="relative col-span-12 md:hidden">
        <FadingTracks />
        <ol>
        {stops.map((s, i) => (
          <li key={s.title} className="relative grid grid-cols-[2.25rem_1fr] gap-x-5 pb-8 last:pb-0">
            <div className="relative z-10 pt-0.5">
              <Bullet n={i + 1} />
            </div>
            <div>
              <h3 className="text-h4 font-medium">{s.title}</h3>
              <p className="mt-2 text-fg-2">{s.body}</p>
            </div>
          </li>
        ))}
        </ol>
        {loop ? <p className="relative mt-8 pl-[3.5rem] text-fg-2">↺ {loop}</p> : null}
      </div>
    </section>
  );
}
