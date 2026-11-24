/** @type {import('tailwindcss').Config} */

// Every color is a CSS variable holding RGB channels (see src/index.css), so
// utilities follow the active theme and still accept opacity: `bg-fg/10`.
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: v("bg"),
        "bg-2": v("bg-2"),
        fg: v("fg"),
        "fg-2": v("fg-2"),
        "fg-3": v("fg-3"),
        line: v("line"),
        accent: v("accent"),
        "accent-ink": v("accent-ink"),
      },
      fontFamily: {
        sans: ['"Mona Sans Variable"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      // One fluid scale. Nothing on the site is set smaller than `small` (15px).
      fontSize: {
        display: ["var(--fs-display)", { lineHeight: "0.96", letterSpacing: "-0.045em" }],
        h1: ["var(--fs-1)", { lineHeight: "1", letterSpacing: "-0.04em" }],
        h2: ["var(--fs-2)", { lineHeight: "1.06", letterSpacing: "-0.032em" }],
        h3: ["var(--fs-3)", { lineHeight: "1.18", letterSpacing: "-0.022em" }],
        h4: ["var(--fs-4)", { lineHeight: "1.3", letterSpacing: "-0.012em" }],
        body: ["var(--fs-body)", { lineHeight: "1.55", letterSpacing: "-0.004em" }],
        small: ["var(--fs-small)", { lineHeight: "1.45", letterSpacing: "0" }],
      },
      spacing: {
        gutter: "var(--gutter)",
        gap: "var(--gap)",
        section: "var(--section)",
        header: "var(--header-h)",
      },
      maxWidth: {
        site: "var(--max)",
        measure: "38rem",
      },
      borderRadius: {
        media: "var(--radius)",
      },
      transitionTimingFunction: {
        out: "var(--ease-out)",
        "in-out": "var(--ease-in-out)",
      },
      transitionDuration: {
        fast: "var(--dur-fast)",
        base: "var(--dur-base)",
        slow: "var(--dur-slow)",
      },
    },
  },
  plugins: [],
};
