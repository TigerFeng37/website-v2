// Single source of truth for the work index and every case-study header.
// Order here is the order on the home grid and the "Next project" sequence.

import nysdaHero from "../assets/nysda/map-hero.svg";
import { photosByFengHero } from "../assets/photos-by-feng";
import altHero from "../assets/alt-page/hero.png";
import stealthHero1 from "../assets/wip-placeholder.webp";
import stealthHero2 from "../assets/wip-placeholder-2.webp";
import pixstudioHero from "../assets/pixstudio/hero.png";
import aspectaHero from "../assets/hero-webm/aspecta-hero.mp4";
import eclairHero from "../assets/hero-webm/eclair-hero.mp4";
import academyRecordsHero from "../assets/hero-webm/ar-hero.mp4";
import trackmapHero from "../assets/hero-webm/trackmap-hero.mp4";
import fengWorksHero from "../assets/hero-webm/feng-hero.mp4";
import urbanscapeHero from "../assets/hero-webm/urbanscape-hero.mp4";
import apexHero from "../assets/hero-webm/apex-hero.mp4";
import humanLightHero from "../assets/hero-webm/humanlight-hero.mp4";

export const projects = [
  {
    slug: "nyc-subway-archive",
    title: "NYC Subway Digital Archive",
    disciplines: ["UI/UX Design", "iOS Development", "Cartography"],
    year: "2026",
    hero: nysdaHero,
    summary:
      "A native iOS app that maps what the subway left behind: ghost stations, hidden platforms, unused tunnels, elevated remnants and the architecture still standing above it all.",
  },
  {
    slug: "photos-by-feng",
    title: "Photos by Feng",
    disciplines: ["UI/UX Design", "Creative Technology", "Photography"],
    year: "2026",
    hero: photosByFengHero,
    summary:
      "A street-photography archive indexed by where and when — a map and a time-aware gallery over one body of work.",
  },
  {
    slug: "alt-site",
    title: "alt · site",
    disciplines: ["UI/UX Design", "v0 × Contra Hackathon — First Place"],
    year: "2026",
    hero: altHero,
    summary:
      "A speed-built landing page exploring a new navigation interaction, prototyped and shipped in a single timed session with v0.",
  },
  {
    slug: "stealth-agentic",
    title: "Stealth Project",
    disciplines: ["UI/UX Design", "Agentic AI"],
    year: "In progress",
    hero: stealthHero1,
    comingSoon: true,
  },
  {
    slug: "pixstudio",
    title: "PixStudio",
    disciplines: ["UI/UX Design", "User Testing"],
    year: "2024",
    hero: pixstudioHero,
    summary:
      "A zero-to-one, AI-assisted creation suite for webtoon and manga artists, adopted by two professional studios.",
  },
  {
    slug: "stealth-app",
    title: "Stealth Project",
    disciplines: ["UI/UX Design", "App Development"],
    year: "In progress",
    hero: stealthHero2,
    comingSoon: true,
  },
  {
    slug: "aspecta",
    title: "Aspecta.ai",
    disciplines: ["Branding", "Typography"],
    year: "2022",
    hero: aspectaHero,
    summary:
      "A minimalist identity and proprietary display typeface for Aspecta, built on proportion and the harmony of human connection.",
  },
  {
    slug: "eclair",
    title: "Eclair Labs",
    disciplines: ["Branding", "Visual Identity"],
    year: "2022",
    hero: eclairHero,
    summary:
      "Visual identity for an incentive platform that helps social caregivers set and reach performance goals.",
  },
  {
    slug: "academy-records",
    title: "Academy Records",
    disciplines: ["Branding", "Web Design"],
    year: "2023",
    hero: academyRecordsHero,
    summary:
      "A complete brand identity for Academy Records: modern design with vintage, vinyl-era influences.",
  },
  {
    slug: "tokyo-trackmap",
    title: "Tokyo Trackmap",
    disciplines: ["Cartography", "Branding", "Web Design"],
    year: "2023",
    hero: trackmapHero,
    summary:
      "A geographically accurate map of Tokyo's rail network that stays as easy to read as a schematic.",
  },
  {
    slug: "feng-works",
    title: "feng.works",
    disciplines: ["Branding", "Web Design", "Motion"],
    year: "2025",
    hero: fengWorksHero,
    summary:
      "Identity, motion and website for feng.works, a one-person design practice working across brand and product.",
  },
  {
    slug: "urbanscape",
    title: "Urbanscape",
    disciplines: ["Branding", "Web Design", "Photography"],
    year: "2025",
    hero: urbanscapeHero,
    summary:
      "An identity and online home for photography of everyday city life, built around the proofreader's caret.",
  },
  {
    slug: "apex",
    title: "Apex",
    disciplines: ["Fine Art Photography"],
    year: "2020",
    hero: apexHero,
    summary:
      "A landscape series on the order and chaos in mountain forms. A' Design Award winner.",
  },
  {
    slug: "human-light",
    title: "Human Light",
    disciplines: ["Fine Art Photography"],
    year: "2018",
    hero: humanLightHero,
    summary:
      "A minimalist architectural series shot inside the Pinakothek der Moderne. A' Design Award winner.",
  },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);

/** The next published project after `slug`, wrapping to the start. */
export const getNextProject = (slug) => {
  const published = projects.filter((p) => !p.comingSoon);
  const i = published.findIndex((p) => p.slug === slug);
  return published[(i + 1) % published.length];
};
