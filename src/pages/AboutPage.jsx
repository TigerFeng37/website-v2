import React, { useEffect, useRef, useState } from "react";
import Seo from "../components/Seo";
import Logo from "../assets/logo-feng.svg";
import aboutHero from "../assets/about-hero.mp4";
import severed from "../assets/severed.webp";

const AWARDS = [
  {
    title: "First Place — v0 × Contra Hackathon",
    issuer: "Vercel & Contra",
    date: "Feb 2026",
    description:
      "Design Your Dreams — an in-person challenge in Brooklyn for students and recent grads, co-hosted by Contra and Vercel. Participants had 70 minutes to build a portfolio-adjacent site using v0; winners were chosen from a $5,000 pool by the end of the event. I built an alternative version of my portfolio site's landing page, balancing a minimalistic aesthetic with an elevated level of interactivity.",
  },
  {
    title: "Global Top 15% — Cyber Apocalypse CTF 2021",
    issuer: "HackTheBox",
    date: "Apr 2021",
    description:
      "A five-day online CTF for a good cause: for every challenge with at least one solve, Hack The Box donated to Code.org. Our team placed in the global top 15%.",
  },
  {
    title: "Award for Best Design",
    issuer: "The Hack 2019 @ Shanghai JiaoTong University",
    date: "Jun 2019",
    description:
      "Nationwide 24-hour hackathon for high school and college students. Best Design and Innovation went to our iOS app for community-based waste sorting—goals, agendas, and healthy competition between neighborhoods. I led visual identity and UI/UX.",
  },
  {
    title: "A' Design Award — Photography & Photo Manipulation",
    issuer: "A' Design Award",
    date: "Apr 2019",
    description:
      "Awarded in Photography & Photo Manipulation for the minimalist series Human Light.",
  },
  {
    title: "Rokid Award for Best Design & Innovation",
    issuer: "The Hack — hack.init 2018 @ Shanghai Technology University",
    date: "Jun 2018",
    description:
      "Nationwide 24-hour hackathon. Our team won Rokid’s Best Design & Innovation for a spare-item sharing iOS app with locker hardware for drop-off, storage, and pickup. I led visual identity and app UI/UX.",
  },
  {
    title: "Best Design & Best Hardware",
    issuer: "hack.init 2017 @ Shanghai Technology University",
    date: "Jun 2017",
    description:
      "China’s premier youth hackathon emphasizing inclusivity and cultural diversity—300 participants in a 24-hour build, with strong support for high schoolers, international students, and university freshmen.",
  },
];

/**
 * Pointer + scroll parallax on the hero image, written straight to the DOM in a
 * rAF loop so the page doesn't re-render on every mouse move.
 */
function useHeroParallax(ref, { pointer }) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let mx = 0;
    let my = 0;
    let frame = 0;

    const render = () => {
      frame = 0;
      const y = window.scrollY;
      const vh = window.innerHeight;
      const fadeStart = vh * 0.5;
      const opacity = y <= fadeStart ? 1 : Math.max(0, 1 - (y - fadeStart) / (vh * 0.25));
      el.style.transform = `translate3d(${mx * 15}px, ${my * 15 + y * 0.5}px, 0) scale(1.05)`;
      el.style.opacity = String(opacity);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    const onMove = (e) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
      schedule();
    };

    if (pointer) window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", schedule, { passive: true });
    render();
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", schedule);
      cancelAnimationFrame(frame);
    };
  }, [ref, pointer]);
}

const isTouch = () =>
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

function AboutPage() {
  const heroRef = useRef(null);
  const [touch] = useState(isTouch);
  const [smallScreen, setSmallScreen] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );

  useEffect(() => {
    const onResize = () => setSmallScreen(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Phones get the looping video; everything else gets the parallax still.
  const showVideo = touch && smallScreen;
  useHeroParallax(heroRef, { pointer: !touch });

  return (
    <>
      <Seo
        title="About"
        description="Yicheng Feng is a multidisciplinary designer in New York working across brand identity, UI/UX and design systems."
      />
      <div className="relative overflow-hidden min-h-screen mb-10">
        <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
          <img src={Logo} alt="" className="w-40 h-40" />
        </div>

        <div className="absolute inset-0 z-20">
          {showVideo ? (
            <>
              <video
                autoPlay
                muted
                playsInline
                aria-hidden
                className="w-full h-full object-cover scale-105"
              >
                <source src={aboutHero} type="video/mp4" />
              </video>
              <div
                className="absolute inset-0 z-30 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, transparent 30%, rgba(0,0,0,0.5) 50%, #000 70%, #000 100%)",
                }}
              />
            </>
          ) : (
            <img
              ref={heroRef}
              src={severed}
              alt=""
              className="w-full h-full object-cover will-change-transform"
            />
          )}
        </div>
      </div>

      <div>
        <div className="w-full border-gray-700 grid grid-cols-1 md:grid-cols-4 p-4">
          <h1 className="text-2xl font-medium">Yicheng Feng</h1>
        </div>
        <div className="w-full border-t border-gray-700 grid grid-cols-1 md:grid-cols-4 p-4">
          <h2 className="text-2xl font-light mb-6">Who am I?</h2>
          <p className="text-lg col-span-3 text-gray-300 hover:text-gray-600 transition-all duration-300 leading-[1.4] group">
            I'm a <span className="group-hover:text-white">multidisciplinary designer</span> with a passion for <span className="group-hover:text-white">creating meaningful
            interactions through thoughtful design</span>. I have over <span className="group-hover:text-white">4 years of experience</span> across brand identity, web design and experimental projects, with a focus on <span className="group-hover:text-white">branding, UI/UX and design systems</span>. I studied in the <span className="group-hover:text-white">BFA Communication Design program at Parsons School of Design</span>.
          </p>
        </div>
        <div className="w-full border-t border-gray-700 grid grid-cols-1 md:grid-cols-4 p-4">
          <h2 className="text-2xl font-light mb-6">How I Work</h2>
          <p className="text-lg col-span-3 text-gray-300 hover:text-gray-600 transition-all duration-300 leading-[1.4] group">
            My approach combines <span className="group-hover:text-white">meticulous</span> attention to detail <span className="group-hover:text-white">with a holistic understanding </span>of how designs work across different touchpoints. I <span className="group-hover:text-white">believe thoughtful, functional design can change how people experience the world.</span>
          </p>
        </div>
        <div className="w-full border-t border-gray-700 grid grid-cols-1 md:grid-cols-4 p-4">
          <h2 className="text-2xl font-light mb-6">What I Can Do</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 w-full col-span-3">
            <div>
              <h3 className="text-xl font-medium mb-3 text-white">Creative</h3>
              <ul className="text-lg text-gray-300 space-y-1">
                <li>Brand Identity</li>
                <li>UI/UX Design</li>
                <li>Typography</li>
                <li>Photography</li>
                <li>Music Production</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-3 text-white">Technical</h3>
              <ul className="text-lg text-gray-300 space-y-1">
                <li>Figma / Sketch</li>
                <li>Adobe Creative Suite</li>
                <li>Affinity Suite</li>
                <li>Front-end Development</li>
                <li>DaVinci Resolve</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full border-t border-gray-700 grid grid-cols-1 md:grid-cols-4 p-4">
          <h2 className="text-2xl font-light mb-6">Where I've Been</h2>
          <div className="col-span-3" style={{ viewTransitionName: 'about-experience-section' }}>
            <div className="space-y-4">
              <div className="border-b border-gray-700 w-full pb-4">
                <h3 className="text-xl font-medium mb-1">Product Design Consultant — Mewtant</h3>
                <p className="text-gray-400 font-mono mb-2">2024 — 2025 · Contract</p>
                <p className="text-gray-300">Worked on the company's first design system and shaped the UI of its upcoming products, including PixStudio. Mewtant is a Singapore-based company making AI-powered creative tools.</p>
              </div>
              <div className="border-b border-gray-700 w-full pb-4">
                <h3 className="text-xl font-medium mb-1">Co-Founder — Fusor Design Labs</h3>
                <p className="text-gray-400 font-mono mb-2">2022 — Present · On hiatus</p>
                <p className="text-gray-300">A project-based design studio where I lead UI/UX, brand identity and typeface design. Most of our clients are in tech, and we help them build a timeless presence in their industry.</p>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-1">Senior Designer (Interim) — X Academy</h3>
                <p className="text-gray-400 font-mono mb-2">2021 — 2022</p>
                <p className="text-gray-300">Generalist designer at a technology and education company, working mainly on UI/UX for web apps, plus print, promotional materials and social campaigns.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full border-t border-gray-700 grid grid-cols-1 md:grid-cols-4 p-4">
          <h2 className="text-2xl font-light mb-6">Awards &amp; Accolades</h2>
          <div className="col-span-3">
            <div className="space-y-4">
              {AWARDS.map((item, index) => (
                <div
                  key={`${item.title}-${item.date}`}
                  className={`w-full pb-4 ${
                    index < AWARDS.length - 1 ? "border-b border-gray-700" : ""
                  }`}
                >
                  <h3 className="text-xl font-medium mb-1">{item.title}</h3>
                  <p className="text-gray-400 font-mono mb-2">
                    {item.issuer} · {item.date}
                  </p>
                  {item.description ? (
                    <p className="text-gray-300">{item.description}</p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full border-t border-gray-700 grid grid-cols-1 md:grid-cols-4 p-4 pb-16">
          <h2 className="text-2xl font-light mb-6">About This Site</h2>
          <div className="col-span-3 space-y-8">
            <p className="text-lg text-gray-300 hover:text-gray-600 transition-all duration-300 leading-[1.4] group">
              <span className="group-hover:text-white">
                I designed and built this website end to end—visual language, layout, motion, and every line of front-end code.
              </span>{" "}
              It is not from a template or a no-code tool; it reflects how I like to work: one person owning both the product surface and the implementation.
            </p>
            <div>
              <h3 className="text-xl font-medium mb-1 text-white">Stack</h3>
              <ul className="text-lg text-gray-300 flex flex-col md:flex-row gap-1 md:gap-4">
                <li>React.js</li>
                <li className="hidden md:inline text-gray-400">·</li>
                <li>Vite</li>
                <li className="hidden md:inline text-gray-400">·</li>
                <li>React Router</li>
                <li className="hidden md:inline text-gray-400">·</li>
                <li>Tailwind CSS</li>
                <li className="hidden md:inline text-gray-400">·</li>
                <li>Three.js / React Three Fiber</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutPage; 