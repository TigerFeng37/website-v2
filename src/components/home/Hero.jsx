import { Fragment } from "react";

const LEAD = "Designer and creative technologist";
const REST = "making brands, interfaces and the software behind them.";

const FACTS = [
  { label: "Yicheng Feng", value: "Independent, New York" },
  { label: "Now", value: "Feng Works, plus two products in stealth" },
  { label: "Background", value: "Parsons BFA, Mewtant, Fusor Design Labs" },
  { label: "Recognition", value: "A' Design Award, twice. First place, v0 × Contra" },
];

/** Splits a phrase into words that rise in one after another. */
function Words({ text, start = 0 }) {
  const words = text.split(" ");
  return words.map((word, i) => (
    <Fragment key={i}>
      <span className="hero-word" style={{ "--i": start + i }}>
        {word}
      </span>
      {i < words.length - 1 ? " " : null}
    </Fragment>
  ));
}

function Hero() {
  const leadCount = LEAD.split(" ").length;
  const restCount = REST.split(" ").length;

  return (
    <section aria-labelledby="hero-title" className="wrap pb-section pt-[calc(var(--header-h)+clamp(4.5rem,13vh,9.5rem))]">
      <h1 id="hero-title" className="max-w-[19ch] text-display font-medium">
        <Words text={LEAD} />{" "}
        <span className="text-fg-2">
          <Words text={REST} start={leadCount} />
        </span>
        <span className="hero-word" style={{ "--i": leadCount + restCount }} aria-hidden>
          <span className="caret caret-blink" />
        </span>
      </h1>

      <dl className="grid-12 mt-16 gap-y-8 md:mt-24">
        {FACTS.map((f, i) => (
          <div
            key={f.label}
            className="hero-fact col-span-6 lg:col-span-3"
            style={{ "--i": i }}
          >
            <dt className="text-fg">{f.label}</dt>
            <dd className="mt-1 max-w-[24ch] text-fg-2">{f.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default Hero;
