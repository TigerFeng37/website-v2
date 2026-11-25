import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useClock from "../hooks/useClock";
import { useTheme } from "../lib/theme";

export const EMAIL = "me@feng.works";

const ELSEWHERE = [
  { label: "GitHub", href: "https://github.com/TigerFeng37" },
  { label: "Photographs", href: "https://photos.feng.works" },
];

const THEMES = [
  { value: "system", label: "Auto" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-11 items-center rounded-full border border-line/20 px-5 text-fg-2 transition-colors duration-fast hover:border-fg/40 hover:text-fg"
    >
      <span aria-live="polite">{copied ? "Copied to clipboard" : "Copy address"}</span>
    </button>
  );
}

function ThemeSwitch() {
  const [theme, setTheme] = useTheme();
  return (
    <div role="radiogroup" aria-label="Appearance" className="flex gap-5">
      {THEMES.map((t) => {
        const on = theme === t.value;
        return (
          <button
            key={t.value}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => setTheme(t.value)}
            className={`relative py-1 transition-colors duration-fast ${on ? "text-fg" : "text-fg-2 hover:text-fg"}`}
          >
            {t.label}
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

function Column({ title, children }) {
  return (
    <div className="col-span-6 md:col-span-3">
      <h3 className="mb-3 font-normal text-fg-2">{title}</h3>
      {children}
    </div>
  );
}

function Footer() {
  const time = useClock("America/New_York");
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="mt-section">
      <div className="wrap">
        <div className="rule pb-16 pt-14 md:pb-24 md:pt-20">
          <p className="max-w-[22ch] text-h3 text-fg-2">
            Have a project in mind?
          </p>
          <a
            href={`mailto:${EMAIL}`}
            className="group mt-5 inline-block text-h1 font-medium md:mt-7"
          >
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_0.05em] bg-left-bottom bg-no-repeat pb-[0.06em] transition-[background-size] duration-slow ease-out group-hover:bg-[length:100%_0.05em]">
              {EMAIL}
            </span>
            <span className="caret caret-blink" aria-hidden />
          </a>
          <div className="mt-8">
            <CopyEmail />
          </div>
        </div>

        <div className="grid-12 rule gap-y-10 py-12 md:py-14">
          <Column title="Elsewhere">
            <ul className="space-y-1">
              {ELSEWHERE.map((l) => (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="link">
                    {l.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </Column>
          <Column title="Index">
            <ul className="space-y-1">
              <li>
                <Link to="/#work" viewTransition className="link">
                  Work
                </Link>
              </li>
              <li>
                <Link to="/about" viewTransition className="link">
                  About
                </Link>
              </li>
            </ul>
          </Column>
          <Column title="New York">
            <p className="tabular-nums">{time}</p>
          </Column>
          <Column title="Appearance">
            <ThemeSwitch />
          </Column>
        </div>

        <p className="pb-10 pt-2 text-fg-2">© {year} Feng Works LLC</p>
      </div>
    </footer>
  );
}

export default Footer;
