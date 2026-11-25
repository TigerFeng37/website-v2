// Single source of truth for the work index, the home grid and every
// case-study header. Order here is the order on the site and the order of
// the "Next project" hand-off.

import nysdaHero from "../assets/hero-webm/nysda-hero.mp4";
import { photosByFengHero } from "../assets/photos-by-feng";
import altHero from "../assets/alt-page/hero.png";
import aspectaHero from "../assets/hero-webm/aspecta-hero.mp4";
import eclairHero from "../assets/hero-webm/eclair-hero.mp4";
import academyRecordsHero from "../assets/hero-webm/ar-hero.mp4";
import trackmapHero from "../assets/hero-webm/trackmap-hero.mp4";
import fengWorksHero from "../assets/hero-webm/feng-hero.mp4";
import urbanscapeHero from "../assets/hero-webm/urbanscape-hero-1920.mp4";
import apexHero from "../assets/hero-webm/apex-hero.mp4";
import humanLightHero from "../assets/hero-webm/humanlight-hero.mp4";
import pixstudioHero from "../assets/hero-webm/pixstudio-hero.mp4";

// Card media: lightweight loops (1280px H.264) and posters (1600px WebP),
// generated from the full-size heroes. Posters double as the still shown
// under reduced motion and before a loop has loaded.
import academyRecordsThumb from "../assets/thumbs/academy-records.mp4";
import academyRecordsPoster from "../assets/thumbs/academy-records.webp";
import altThumb from "../assets/thumbs/alt-site.webp";
import apexThumb from "../assets/thumbs/apex.mp4";
import apexPoster from "../assets/thumbs/apex.webp";
import aspectaThumb from "../assets/thumbs/aspecta.mp4";
import aspectaPoster from "../assets/thumbs/aspecta.webp";
import eclairThumb from "../assets/thumbs/eclair.mp4";
import eclairPoster from "../assets/thumbs/eclair.webp";
import fengWorksThumb from "../assets/thumbs/feng-works.mp4";
import fengWorksPoster from "../assets/thumbs/feng-works.webp";
import humanLightThumb from "../assets/thumbs/human-light.mp4";
import humanLightPoster from "../assets/thumbs/human-light.webp";
import nysdaThumb from "../assets/thumbs/nyc-subway-archive.mp4";
import nysdaPoster from "../assets/thumbs/nyc-subway-archive.webp";
import photosThumb from "../assets/thumbs/photos-by-feng.webp";
import pixstudioThumb from "../assets/thumbs/pixstudio.mp4";
import pixstudioPoster from "../assets/thumbs/pixstudio.webp";
import trackmapThumb from "../assets/thumbs/tokyo-trackmap.mp4";
import trackmapPoster from "../assets/thumbs/tokyo-trackmap.webp";
import urbanscapeThumb from "../assets/thumbs/urbanscape.mp4";
import urbanscapePoster from "../assets/thumbs/urbanscape.webp";

/** Filter groups on the work index. A project can sit in more than one. */
export const CATEGORIES = ["Product", "Brand", "Photography"];

export const projects = [
  {
    slug: "nyc-subway-archive",
    title: "NYC Subway Digital Archive",
    tagline: "An iOS field guide to the ghost stations of the New York subway.",
    client: "Personal",
    categories: ["Product"],
    disciplines: ["Product design", "iOS development", "Cartography"],
    year: "2026",
    hero: nysdaHero,
    thumb: nysdaThumb,
    poster: nysdaPoster,
    summary:
      "A native iOS app that maps what the subway left behind: ghost stations, hidden platforms, unused tunnels, elevated remnants and the architecture still standing above it all.",
  },
  {
    slug: "photos-by-feng",
    title: "Photos by Feng",
    tagline: "A street photography archive you can browse by place and time.",
    client: "Personal",
    categories: ["Product", "Photography"],
    disciplines: ["Product design", "Creative technology", "Photography"],
    year: "2026",
    hero: photosByFengHero,
    thumb: photosThumb,
    summary:
      "A street-photography archive indexed by where and when — a map and a time-aware gallery over one body of work.",
  },
  {
    slug: "alt-site",
    title: "alt · site",
    tagline: "A navigation experiment, designed and shipped in 70 minutes. First place.",
    client: "v0 × Contra Hackathon",
    categories: ["Product"],
    disciplines: ["Interaction design", "Prototyping"],
    award: "First place, v0 × Contra Hackathon",
    year: "2026",
    hero: altHero,
    thumb: altThumb,
    summary:
      "A landing page built around one navigation idea, designed and shipped in 70 minutes with v0.",
  },
  {
    slug: "pixstudio",
    title: "PixStudio",
    tagline: "An AI-assisted creation suite for webtoon and manga artists, adopted by two studios.",
    client: "Mewtant",
    categories: ["Product"],
    disciplines: ["Product design", "Interaction design", "Design system"],
    year: "2024",
    hero: pixstudioHero,
    thumb: pixstudioThumb,
    poster: pixstudioPoster,
    summary:
      "A zero-to-one, AI-assisted creation suite for webtoon and manga artists, adopted by two professional studios.",
  },
  {
    slug: "aspecta",
    title: "Aspecta.ai",
    tagline: "A minimal identity and a custom display typeface.",
    client: "Aspecta",
    categories: ["Brand"],
    disciplines: ["Identity", "Typeface design"],
    year: "2022",
    hero: aspectaHero,
    thumb: aspectaThumb,
    poster: aspectaPoster,
    summary:
      "A minimal identity and a custom display typeface for Aspecta, built on proportion.",
  },
  {
    slug: "academy-records",
    title: "Academy Records",
    tagline: "Identity and website for a record label with vinyl-era roots.",
    client: "Academy Records",
    categories: ["Brand"],
    disciplines: ["Identity", "Web design"],
    year: "2023",
    hero: academyRecordsHero,
    thumb: academyRecordsThumb,
    poster: academyRecordsPoster,
    summary:
      "Identity and website for Academy Records, a modern label with vinyl-era roots.",
  },
  {
    slug: "tokyo-trackmap",
    title: "Tokyo Trackmap",
    tagline: "Tokyo's rail network, geographically accurate and as easy to read as a schematic.",
    client: "Personal",
    categories: ["Brand"],
    disciplines: ["Cartography", "Identity", "Web design"],
    year: "2023",
    hero: trackmapHero,
    thumb: trackmapThumb,
    poster: trackmapPoster,
    summary:
      "A geographically accurate map of Tokyo's rail network that stays as easy to read as a schematic.",
  },
  {
    slug: "eclair",
    title: "Eclair Labs",
    tagline: "Identity for an incentive platform for social caregivers.",
    client: "Eclair Labs",
    categories: ["Brand"],
    disciplines: ["Identity", "Motion"],
    year: "2022",
    hero: eclairHero,
    thumb: eclairThumb,
    poster: eclairPoster,
    summary:
      "Visual identity for an incentive platform that helps social caregivers set and reach performance goals.",
  },
  {
    slug: "feng-works",
    title: "feng.works",
    tagline: "Identity, motion and website for this studio.",
    client: "Feng Works",
    categories: ["Brand"],
    disciplines: ["Identity", "Web design", "Motion"],
    year: "2025",
    hero: fengWorksHero,
    thumb: fengWorksThumb,
    poster: fengWorksPoster,
    summary:
      "Identity, motion and website for Feng Works, a one-person studio for brand and product.",
  },
  {
    slug: "urbanscape",
    title: "Urbanscape",
    tagline: "Identity and website for photographs of everyday city life.",
    client: "Urbanscape",
    categories: ["Brand", "Photography"],
    disciplines: ["Identity", "Web design", "Photography"],
    year: "2025",
    hero: urbanscapeHero,
    thumb: urbanscapeThumb,
    poster: urbanscapePoster,
    summary:
      "An identity and online home for photography of everyday city life, built around the proofreader's caret.",
  },
  {
    slug: "apex",
    title: "Apex",
    tagline: "A landscape series on order and chaos in mountain forms.",
    client: "Personal",
    categories: ["Photography"],
    disciplines: ["Fine art photography"],
    award: "A' Design Award",
    year: "2020",
    hero: apexHero,
    thumb: apexThumb,
    poster: apexPoster,
    summary:
      "A landscape series on the order and chaos in mountain forms. A' Design Award winner.",
  },
  {
    slug: "human-light",
    title: "Human Light",
    tagline: "A minimalist architectural series shot inside the Pinakothek der Moderne.",
    client: "Personal",
    categories: ["Photography"],
    disciplines: ["Fine art photography"],
    award: "A' Design Award",
    year: "2018",
    hero: humanLightHero,
    thumb: humanLightThumb,
    poster: humanLightPoster,
    summary:
      "A minimalist architectural series shot inside the Pinakothek der Moderne. A' Design Award winner.",
  },
];

/** Work that exists but can't be shown yet. Listed, never linked. */
export const inProgress = [
  { title: "Untitled", note: "Agentic AI product", phrase: "an agentic AI product", disciplines: ["Product design"] },
  { title: "Untitled", note: "Consumer app", phrase: "a consumer app", disciplines: ["Product design", "App development"] },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);

/** The next project after `slug`, wrapping to the start. */
export const getNextProject = (slug) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
};
