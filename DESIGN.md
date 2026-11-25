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
- on the Hexaspires in the home hero, wherever the pointer is passing through them

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

The work grid is justified rows: on wide screens a pair (3:2 beside 1.1:1,
sides alternating) then a triple of 4:3s, and so on; every card in a row shares
one media height. Tablets get pairs only, phones one column. Aim: a visitor
sees at least a row and a half per screen.

## Motion

- Ease: `--ease-out` (cubic-bezier(0.22, 1, 0.36, 1)) for nearly everything.
- Above the fold, words and lines rise in on load (CSS only, so they play
  inside view transitions). Below the fold, `[data-reveal]` + `useReveal`.
- Page changes use the View Transitions API through React Router's
  `viewTransition`; the header is excluded so it never flickers.
- Videos only play while on screen and never under reduced motion.
- `prefers-reduced-motion` collapses every animation.

## Components

- `Hero` — the Hexaspires (`src/three/Hexaspires.jsx`, Rapier physics) behind a
  rolling "I make {what} {for whom}" line; each line links to the project that
  proves it, playing inline beside "I make". Stir with the pointer, click to
  scatter. three.js loads after first paint and pauses off screen; skipped on
  Save-Data.
- `Media` — every image and video. Lazy, in-view autoplay, fade-in on load,
  optional `vt` (view-transition-name) for card → hero morphs.
- `Header` — logo, three links, sliding caret. Hides on scroll down.
- `Footer` — contact (it is the Contact section), links, NY time, appearance.
- `Switch` (case-study block) — one figure, several states (modes,
  before/after), picked with the caret like the Appearance control.

## Motion pieces

Logo animations (Tokyo Trackmap, Academy Records, PixStudio) are white line
work on black, and they ship as video only, never as a live runtime: 1920×1080
H.264 at 60fps in `src/assets/hero-webm/`, a 1280px 30fps loop and a 1600px
WebP poster in `src/assets/thumbs/`. Loops start and end on the same frame.

The PixStudio loop is designed in Rive (file "PixStudio", artboard "PixStudio
Logo", animation "Loop", 600 frames). It runs on a 24-frame beat (150 BPM)
with hits on the eighths: gutters slice on consecutive eighths and kick the
page, dots pop as the scan passes and then ripple, and the mark folds back
into the opening pixel. The shipped video is newer than the Rive file, which
still has an end cursor and a stray line to clean up. It was built through the Rive
desktop editor's MCP server at
`http://127.0.0.1:9791/mcp`. Rive's free plan watermarks `.riv` exports and
strips their timelines, so the frames were rendered at 2× from the same shapes
and keyframes and downscaled with ffmpeg. On a paid plan, export the video from
Rive directly instead.

## Deploying

Staging is https://staging.feng.works (the `staging` branch of the `feng-works`
Cloudflare Pages project). Production (`main` → feng.works) is never touched.

- **Automatic:** every push to `v3-beta` runs `.github/workflows/deploy-staging.yml`,
  which builds and runs `wrangler pages deploy --branch staging`. It needs one
  repository secret, `CLOUDFLARE_API_TOKEN` (Account › Cloudflare Pages › Edit);
  without it the job skips.
- **By hand, on your machine:** `yarn deploy:staging`.

Cloud agent sessions can't deploy directly: their egress proxy rewrites the
`Authorization` header on every request to api.cloudflare.com, which breaks
wrangler's short-lived asset-upload token. Push and let the workflow deploy.

## Media pipeline

Card loops and posters live in `src/assets/thumbs/` (1280px H.264, 1600px WebP),
generated from `src/assets/hero-webm/`. Every case-study video has a
`*-poster.webp` still beside it, used before load and under reduced motion.
Never use the animated `logo-anim.webp` files as posters; they're megabytes.
