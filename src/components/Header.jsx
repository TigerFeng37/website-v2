import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";

const NAV = [
  { label: "Work", to: "/#work", match: (p) => p === "/" || p.startsWith("/works") },
  { label: "About", to: "/about", match: (p) => p.startsWith("/about") },
  { label: "Contact", to: "#contact", match: () => false },
];

/** Hide on the way down, return on the way up; tint once the page has moved. */
function useHeaderState() {
  const [state, setState] = useState({ hidden: false, scrolled: false });
  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - last;
      if (Math.abs(delta) < 6) return;
      last = y;
      setState({ hidden: delta > 0 && y > 160, scrolled: y > 8 });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  return state;
}

/**
 * The nav caret: a teal underscore that rests after the current section and
 * glides to whichever item you point at, like a text cursor.
 */
function useNavCaret(listRef, activeIndex) {
  const [target, setTarget] = useState(null);
  const [pos, setPos] = useState(null);
  const index = target ?? activeIndex;

  const measure = useCallback(() => {
    const list = listRef.current;
    if (!list || index < 0) return setPos(null);
    const anchor = list.querySelectorAll("[data-caret-anchor]")[index];
    if (!anchor) return setPos(null);
    // Measure against the list itself: each link is positioned, so offsetLeft
    // would be relative to the link rather than the list.
    const a = anchor.getBoundingClientRect();
    const l = list.getBoundingClientRect();
    setPos({ x: a.left - l.left, y: a.top - l.top });
  }, [listRef, index]);

  useLayoutEffect(measure, [measure]);
  useEffect(() => {
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  return { pos, setTarget, index };
}

function Header() {
  const { pathname } = useLocation();
  const { hidden, scrolled } = useHeaderState();
  const listRef = useRef(null);
  const activeIndex = NAV.findIndex((item) => item.match(pathname));
  const { pos, setTarget, index } = useNavCaret(listRef, activeIndex);
  const [moving, setMoving] = useState(false);

  // Pause the blink while the caret travels, like a real cursor.
  useEffect(() => {
    setMoving(true);
    const t = setTimeout(() => setMoving(false), 700);
    return () => clearTimeout(t);
  }, [index]);

  const scrollToContact = (e) => {
    const el = document.getElementById("contact");
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`site-header fixed inset-x-0 top-0 z-50 transition-[transform,background-color,box-shadow] duration-base ease-out ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${scrolled ? "is-scrolled" : ""}`}
    >
      <div className="wrap flex h-header items-center justify-between">
        <Link
          to="/"
          viewTransition
          className="group -m-2 p-2"
          aria-label="Yicheng Feng — home"
        >
          <Logo className="h-[18px] w-auto md:h-[20px]" blink={false} />
        </Link>

        <nav aria-label="Primary">
          <ul
            ref={listRef}
            className="relative flex items-baseline gap-6 md:gap-9"
            onMouseLeave={() => setTarget(null)}
          >
            {NAV.map((item, i) => {
              const active = i === activeIndex;
              const lit = i === index;
              const isHash = item.to.startsWith("#");
              const className = `relative inline-block py-2 transition-colors duration-fast ${
                lit ? "text-fg" : "text-fg-2 hover:text-fg"
              }`;
              const children = (
                <>
                  {item.label}
                  <span data-caret-anchor aria-hidden className="inline-block h-0 w-0 align-baseline" />
                </>
              );
              return (
                <li key={item.label} onMouseEnter={() => setTarget(i)}>
                  {isHash ? (
                    <a
                      href={item.to}
                      onClick={scrollToContact}
                      onFocus={() => setTarget(i)}
                      onBlur={() => setTarget(null)}
                      className={className}
                    >
                      {children}
                    </a>
                  ) : (
                    <Link
                      to={item.to}
                      viewTransition
                      aria-current={active ? "page" : undefined}
                      onFocus={() => setTarget(i)}
                      onBlur={() => setTarget(null)}
                      className={className}
                    >
                      {children}
                    </Link>
                  )}
                </li>
              );
            })}
            <span
              aria-hidden
              className={`nav-caret ${moving ? "" : "caret-blink"}`}
              style={{
                opacity: pos ? 1 : 0,
                transform: pos ? `translate3d(${pos.x + 3}px, ${pos.y - 2}px, 0)` : undefined,
              }}
            />
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
