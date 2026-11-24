# feng.works v3 — design notes

The site is a quiet frame for the work. Everything here exists to keep it that way.

## The caret

The teal underscore from the FENG_ wordmark is a text cursor: the moment before
something is made. It is the **only** chromatic color on the site, and it always
means *you are here*:

- after the current section in the nav, gliding to whatever you point at
- under the active filter and the active appearance setting
- after a project title when you hover it in the index
- at the end of the hero statement and the email address, blinking, waiting

If you're about to use teal for anything else, don't.

## Color

Tokens live in `src/index.css` as RGB channels and are exposed to Tailwind as
`bg`, `bg-2`, `fg`, `fg-2`, `fg-3`, `line`, `accent`, `accent-ink`.

|          | Paper (light) | Ink (dark) | Use                                   |
| -------- | ------------- | ---------- | ------------------------------------- |
| `bg`     | `#F3F3F0`     | `#141618`  | page                                  |
| `bg-2`   | `#E8E8E3`     | `#1F2225`  | media placeholders                    |
| `fg`     | `#141618`     | `#ECECE8`  | primary text                          |
| `fg-2`   | `#5C6064`     | `#9CA0A5`  | secondary text (passes AA)            |
| `fg-3`   | `#94979A`     | `#64686D`  | dimmed or decorative only             |
| `accent` | `#72EAE0`     | `#72EAE0`  | the caret (fills only, never body text) |

Theme follows the system by default; the footer's Appearance switch overrides
it, saved in `localStorage` and applied before first paint by `index.html`.

## Type

Mona Sans (variable, self-hosted, weight axis only — 40KB). One fluid scale:

| Token     | Size (375 → 1600px) | Use                           |
| --------- | ------------------- | ----------------------------- |
| `display` | 44 → 124px          | home statement                |
| `h1`      | 38 → 92px           | page titles, email            |
| `h2`      | 30 → 56px           | section titles                |
| `h3`      | 23 → 34px           | index rows, leads             |
| `h4`      | 19 → 23px           | sub-leads                     |
| `body`    | 17 → 19px           | everything else               |
| `small`   | 15px                | captions only — the floor     |

Rules: no monospace, no tracked-out uppercase labels, nothing below 15px.
Hierarchy comes from size and the `fg` / `fg-2` pair, not from tiny type.

## Layout

12 columns inside `.wrap` (`--gutter` side margins, max 110rem). Sections are
separated by `--section` (96 → 192px). Hairlines (`.rule`) divide; boxes and
cards don't.

## Motion

- Ease: `--ease-out` (cubic-bezier(0.22, 1, 0.36, 1)) for nearly everything.
- Above the fold, words and lines rise in on load (CSS only, so they play
  inside view transitions). Below the fold, `[data-reveal]` + `useReveal`.
- Page changes use the View Transitions API through React Router's
  `viewTransition`; the header is excluded so it never flickers.
- Videos only play while on screen and never under reduced motion.
- `prefers-reduced-motion` collapses every animation.

## Components

- `Media` — every image and video. Lazy, in-view autoplay, fade-in on load,
  optional `vt` (view-transition-name) for card → hero morphs.
- `Header` — logo, three links, sliding caret. Hides on scroll down.
- `Footer` — contact (it is the Contact section), links, NY time, appearance.

## Deploying

`yarn deploy:staging` builds and publishes to the `staging` branch of the
`feng-works` Cloudflare Pages project (https://staging.feng-works.pages.dev).
