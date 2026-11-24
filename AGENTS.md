# AGENTS.md — feng.works (website-v2)

Guide for AI coding agents working on this repo: how to build it, how to ship
changes to **staging** for review, and what has already been done. Read this
before touching deploys, media or the case-study system.

---

## Rules that are not optional

1. **Staging first, production only on an explicit yes.** Every change goes to
   staging with `yarn deploy:staging`. Never run `yarn deploy` (production,
   feng.works) unless the user has explicitly asked for a production deploy in
   the current conversation.
2. **`yarn build` must pass before any deploy.**
3. **Other agent sessions often work in this same checkout at the same time.**
   Run `git status` before you start and again before you commit. Stage only
   the files you changed (`git add <paths>`, never `git add -A`). Re-read a file
   before editing it if another session might have touched it. Do not revert
   or "clean up" changes you did not make.
4. **Git:** if you're on `main`, branch before committing. Merge into `main`
   (fast-forward) and push only when the user asks. Never amend or rewrite a
   commit that has been pushed.
5. **Never commit full-size media.** Compress first (see [Media](#media)).
   Anything committed stays in git history forever. On 2026-11-24, 240 MB of
   original images had to be amended out of an unpushed commit.

---

## Stack

- React 19, Vite 6, React Router 7, Tailwind CSS 3.4
- three.js via `@react-three/fiber`, `@react-three/drei`, `@react-three/rapier`
- Yarn 1 (`packageManager` is pinned in `package.json`)
- Hosting: **Cloudflare Pages**, project `feng-works`. It is **not** connected
  to GitHub; pushing changes nothing on the site. Deploys happen only when
  someone runs wrangler from a machine that is logged in.
- GitHub remote: `origin` → `TigerFeng37/website-v2`

## Commands

| Task | Command |
|---|---|
| Install | `yarn` |
| Dev server | `yarn dev --port 5173` (the `vite` entry in `.claude/launch.json`; `vite.config.js` would otherwise default to port 3000) |
| Production build | `yarn build` → `dist/` |
| Lint | `yarn lint` |
| Deploy to **staging** | `yarn deploy:staging` |
| Deploy to **production** | `yarn deploy` (only from `main`, only on explicit user approval) |
| List deployments | `npx wrangler pages deployment list --project-name feng-works` |
| Check wrangler login | `npx wrangler whoami` |

## Environments

| Env | URL | How it gets there | Cloudflare environment |
|---|---|---|---|
| Local | http://localhost:5173 | `yarn dev --port 5173` | — |
| **Staging** | **https://staging.feng-works.pages.dev** | `yarn deploy:staging` | Preview, branch alias `staging` |
| Production | https://feng.works, https://www.feng.works | `yarn deploy` on `main` | Production (production branch `main`) |

Every deploy also gets a permanent per-deploy URL like
`https://6f1c6099.feng-works.pages.dev`. Include it in your report so the user
can compare versions.

Staging is a **branch alias on the same Pages project**, not a separate
project. `wrangler.toml` holds the one project name, so don't create a second
Pages project for staging.

---

## Staging workflow

1. **Check the tree.** Run `git status`. If files you didn't change are mid-edit
   (another session is converting images, for example), wait or ask. Building a
   half-finished tree ships a broken site.
2. **Build.** Run `yarn build`. It must pass. Then check the Pages per-file limit:
   ```bash
   find dist -type f -size +25M
   ```
   This must print nothing. Cloudflare Pages rejects any file over 25 MiB.
3. **Deploy.** Run `yarn deploy:staging`. This deploys the **working tree,
   uncommitted changes included**; that's the point of staging. Wrangler warns
   about a dirty git tree; that's expected.
4. **Verify. Don't skip this.**
   ```bash
   for u in / /about /works/nyc-subway-archive; do curl -s -o /dev/null -w "%{http_code} $u\n" "https://staging.feng-works.pages.dev$u"; done
   curl -sI https://staging.feng-works.pages.dev | grep -i x-robots   # expect: noindex
   ```
   Then open the staging URL in the browser. The home page shows a preloader
   first, so wait about 10 s before taking a screenshot. Check the console for
   errors. Look at any page you changed at desktop (1440×900) and phone
   (375×812) sizes.
5. **Report** the alias URL, the per-deploy URL, and what you checked.
6. **Production** runs only after the user reviews staging and says so: on
   `main`, run `yarn deploy`, then confirm with `deployment list` that the newest
   entry is `Production | main`.

### Deploying a specific commit to staging without touching the working tree

Use this when the working tree is busy (another session is mid-change) and you
need staging to show committed code:

```bash
EX=$(mktemp -d)                                   # or your scratchpad
git archive HEAD | tar -x -C "$EX"
cp wrangler.toml "$EX/"                           # include uncommitted config if needed
ln -s "$PWD/node_modules" "$EX/node_modules"
(cd "$EX" && npx vite build && npx wrangler pages deploy ./dist --branch staging --commit-hash "$(git rev-parse HEAD)")
rm -rf "$EX"
```

**Always pass `--branch staging` outside a git checkout.** Without git info,
wrangler falls back to the production branch and **deploys to production**.

### Cloudflare Pages notes

- **`wrangler.toml` controls the project's settings** on every deploy.
  `compatibility_date` is `2026-05-14`, matching the dashboard. To compare
  against the live project config, run this **in an empty temp directory**,
  because it writes `wrangler.toml` into the current directory:
  ```bash
  npx wrangler pages download config feng-works
  ```
- The site is static only, with no `functions/` directory. Pages falls back to
  `index.html` for unknown paths (there is no `404.html`), so deep links work and
  React Router renders `NotFound` for bad URLs. They return HTTP 200, not 404.
- Preview and staging deploys are **public but `noindex`**. Restricting them
  with Cloudflare Access is a dashboard setting.
- Uploads skip files the project already has (matched by hash). The first
  upload with large media took about 6 minutes; later ones only send changed
  files.
- A `staging.feng.works` custom domain is **not** set up. It needs the
  Cloudflare dashboard (custom domain plus a DNS CNAME to
  `staging.feng-works.pages.dev`). The wrangler OAuth token only has `zone
  (read)`, so wrangler can't do it.
- `nginx.conf` and `feng.works.conf` are nginx configs from a self-hosted setup.
  The Cloudflare deploy doesn't use them, and feng.works is served by Pages.
- Wrangler is pinned at `^4.0.0`; 4.92 is installed and newer versions are out.
  Upgrading is optional.

---

## Code map

| Area | Where |
|---|---|
| Routes | `src/App.jsx`: `/`, `/about`, `/works/<slug>`, `*` → `NotFound` |
| **Project index (single source of truth)** | `src/data/projects.js`. Its order is the home grid order and the "Next project" sequence. `comingSoon: true` marks the stealth cards. |
| Case-study shell | `src/components/case-study/CaseStudy.jsx`: SEO, back link, title block, scroll reveals, "Next project" |
| Shared case-study parts | `Carousel.jsx` (markers are 0.15rem-tall lines), `ProjectDetails.jsx`, `AwardBadge.jsx`, `useReveal.js` |
| Case-study pages | `src/pages/projects/*Page.jsx` (12 pages) |
| Landing hero | `src/components/HomeHero.jsx` (`REEL` headline pairings, `SLIDE_MS`), `src/three/HeroAnimation.jsx` (`SCATTER`), `src/components/introSignal.js` (preloader → hero start), `Preloader.jsx` |
| NYSDA page extras | `src/components/ArchiveMap.jsx` (interactive category map; `src/assets/nysda/map-base.svg` and `places.json`), `src/components/GhostLineAnimation.jsx` |
| SEO | `src/components/Seo.jsx`. React 19 hoists `<title>`/`<meta>` into `<head>`. |
| Global styles | `src/index.css`, including the "Scroll reveals" section. Below 768 px, reveals don't animate (on purpose, for performance). |
| Navbar glass | `src/components/glass.css`. It's scoped to glass buttons only; don't widen it to all `button`s again. |

### Adding a case study

1. Add an entry to `src/data/projects.js` (`slug`, `title`, `disciplines`,
   `year`, `hero`, `summary`) where it should appear in the grid.
2. Create `src/pages/projects/<Name>Page.jsx` and wrap the content in
   `<CaseStudy slug="<slug>">…</CaseStudy>`. Give each block the
   `animate-on-scroll` class. `useReveal` picks the entrance style from what the
   block contains (title, text, image, video, bleed, carousel, quote, card).
   Add `data-reveal="<type>"` to override it.
3. Add the route in `src/App.jsx`.
4. Compress the media first (see below), then build, check it in the browser,
   and deploy to staging.

Style conventions: separators are always `·`, never `|`. The accent color is
`#72EAE0`. Body text is IBM Plex Sans; labels are IBM Plex Mono (Tailwind
`font-mono`), both loaded from Google Fonts in `index.html`.

---

## Media

All images the site uses were compressed on 2026-11-24 (240.7 MB → about 13 MB).
Keep new media to the same rules:

- **Max size 2560×3200 px.** Case-study images display at most about 1,100 px
  wide, so this stays sharp on 2× screens.
- **PNG → WebP at quality 82**: `cwebp -q 82 in.png -o out.webp`. For simple flat
  graphics, try lossless (`-lossless`) and keep whichever is smaller.
- **JPEG stays JPEG**, re-encoded with mozjpeg: `cjpeg -quality 84`.
- Leave files under 150 KB alone. Keep the original if the re-encode comes out
  larger.
- **Check the real format with `file`**: several `.png` files were actually JPEGs.
- **Don't re-encode animated WebP or APNG**; the encoder flattens them to one
  frame.
- After converting, update the imports and confirm each one resolves, then run
  `yarn build`.
- Tools on this Mac: `cwebp`, `cjpeg` (mozjpeg), `sips`, `ffmpeg`. There is no
  ImageMagick.

**Videos (about 91 MB) are not compressed yet.** The largest are
`src/assets/Filmic.webm` (19 MB), `Filmic.mp4` (15 MB),
`landing-hero-lg.webm` (8.7 MB), `WebGL Tool Video (5).webm` (8.6 MB) and
`hero-webm/urbanscape-hero.mp4` (8.2 MB). `optimize-videos.sh` (ffmpeg) is the
tool. It writes to `src/assets/optimized/`, so the imports need updating
afterwards.

**Images no code imports (about 17 MB).** Deleting them is the user's call; ask
first: `ar/logo-anim.webp`, `ar/ar-hero-2.png`, `hero-webm/urbanscape.png`,
`trackmap/trackmap-apng.png`, `aspecta/logo-anim.webp`, `apex/apex-6.jpg`,
`aspecta/color-system.png`, `eclair/logo-anim.webp`, `eclair/demo-2.png`
(all under `src/assets/`).

**Photo rights (NYSDA):** don't use photos from Brennan or LTV Squad; there's
no permission. Wikimedia Commons photos are fine.

---

## Verification tips (learned the hard way)

- **The browser pane may be hidden.** Screenshots then come back blank, and
  `requestAnimationFrame` and lazy `img.decode()` never settle. Use
  `read_page` and JS checks instead. For canvas animations, render frames
  offscreen and check those.
- **Fast Refresh can keep stale refs** across edits and throw errors that don't
  happen on a fresh load. Reload before calling something a bug.
- **Lint noise is pre-existing:** `react/prop-types`, three.js prop warnings and
  unused `React` imports fire across the codebase. Only fix new real errors;
  don't mass-fix.
- `MobileOptimizer`, `SafariCompatibility`, `MobileDebugger`, `GlowCursor` and
  `UnicornStudio` are **not mounted**. The low-memory CSS that forces 0.1 s
  animations is dormant. `MOBILE_CRASH_FIX.md` describes the older setup.
- Reduced motion matters: the hero reel starts paused, the ghost-line animation
  shows a still frame, and reveals turn off. Keep that when adding motion.
- The 3D hero's physics forces run on Rapier's fixed step
  (`useBeforePhysicsStep`), not per rendered frame. Keep it that way; per-frame
  forces made the shapes drift off screen at low frame rates.

---

## Git conventions

- Commit messages: a short subject, then a body with bullets grouped by area,
  ending with a `Co-Authored-By:` line when an agent wrote it.
- Local `main` doesn't track `origin/main`. Push with `git push origin main`, or
  set the upstream once: `git branch --set-upstream-to=origin/main main`.
- `dist/` and `.gstack/` are gitignored. Never commit build output.

---

## Log: 2026-11-24 (four Claude Code sessions)

**1. NYC Subway Digital Archive case study**: new page `/works/nyc-subway-archive`,
first card on the home grid. Source app: `TigerFeng37/nyc-subway-digital-archive`
(SwiftUI).
- Hero and map images generated from the app's own line and place data (204
  places) on a minimal NYC basemap. Borough shapes come from NYC Open Data and
  the surrounding counties from US Census 2023; both are public domain and baked
  into the SVGs. The render scripts lived in a scratchpad and are probably gone.
- Six App Store–style screenshots from the app repo's `docs/screenshots/`,
  converted to WebP in `src/assets/nysda/screens/` (2.7 MB → 490 KB).
- `GhostLineAnimation`: an 18 s seamless loop of the 6, 1 and Q lines. Trains
  are solid dots, and ghost stations flicker on with their names and dates as a
  train passes.
- `ArchiveMap`: hover or tab to a category to isolate its places; click to pin
  it (tap on phones).
- Open: confirm the year (2026), the scope and that linking the GitHub repo is
  fine. The credit on the small "Today in the Archive" photo on the map
  screenshot couldn't be read; swap that screenshot if it's Brennan or LTV
  Squad.

**2. Professional audit**: brought every page up to the NYSDA page's standard.
- Built the shared case-study system and `projects.js`, and moved all 12 case
  studies onto it, each ending with "Next project".
- Bugs fixed:
  - About page: the preloader stayed as an invisible layer blocking clicks.
  - Home grid: cards threw on mouse-leave and weren't real links.
  - The stealth cards led nowhere; they're now labelled "Coming soon".
  - Apex and Human Light showed duplicate photos.
  - Home showed a fake 3 s loader on every visit.
  - The empty Eclair slideshow refreshed the page every 3 s.
  - Feng Works: the overlay was misplaced.
  - The Aspecta full-bleed video was shifted sideways.
- Copy typos fixed, per-page titles and link previews added, the footer year
  made dynamic, the 404 redesigned, plus a skip link, focus styles and reduced
  motion.
- Carousel markers are now thin lines. `glass.css` is scoped to glass buttons.
  Scroll reveals vary by content type.
- Open questions for the user: the hackathon took 70 min (About) or 75 min
  (alt·site)? Mewtant was normalized to plain "Mewtant". "Over 4 years" may
  be out of date.

**3. Landing hero redesign + repo hygiene**
- Hero: rolling "I make ___" headline tied to real projects, a "Now showing"
  preview, story-style progress segments (click to jump, pause on hover, focus
  or off-screen), a status line, a New York clock and a credentials row.
- 3D cluster: drifts on its own when idle, scatters on click, renders only while
  on screen. Physics fix: the pull toward the center now runs on the fixed
  physics step.
- Committed everything as `7c440b0`, merged it into `main`, then compressed the
  images (240.7 MB → about 13 MB). Amended the commit to `047bdaa` so the
  originals never reached GitHub, pushed, and deleted the local
  `portfolio-build-out` branch.

**4. Wrangler + staging**
- Confirmed the wrangler login and the `feng-works` Pages project. Aligned
  `compatibility_date` with the dashboard (`2026-05-14`).
- Added `yarn deploy:staging` (`--branch staging`). First staging deploy:
  `7c440b0` (before compression) at `6f1c6099.feng-works.pages.dev`.
- Committed `2c32182` and pushed it to `origin/main`.

### State at end of 2026-11-24

- `origin/main` = `2c32182`.
- **Staging** runs `7c440b0`, from **before** image compression. Redeploy it
  from `main` before anyone reviews.
- **Production** still runs `e597a1d` from about 6 months earlier, far behind
  `main`. Nothing from today is live on feng.works.

### Next steps

1. `yarn deploy:staging` from `main`, then the user reviews staging.
2. Deploy to production when the user approves.
3. Compress the videos (`optimize-videos.sh`).
4. Ask about deleting the unused images.
5. Settle the open content questions above.
6. Optional: `staging.feng.works` custom domain, Cloudflare Access on previews,
   a wrangler upgrade, and replacing `README.md` (still the Vite template).
