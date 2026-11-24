import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import severed from "../assets/severed.webp";

const EMAIL = "me@feng.works";
const MARQUEE_REPEAT = 4;

const formatTime = (timeZone) =>
  new Date().toLocaleTimeString([], {
    ...(timeZone ? { timeZone } : {}),
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });

/** Re-renders once a minute, on the minute, so the clocks stay honest. */
function useMinuteClock() {
  const [, setTick] = useState(0);
  useEffect(() => {
    let interval;
    const align = setTimeout(() => {
      setTick((t) => t + 1);
      interval = setInterval(() => setTick((t) => t + 1), 60_000);
    }, 60_000 - (Date.now() % 60_000));
    return () => {
      clearTimeout(align);
      clearInterval(interval);
    };
  }, []);
}

function MarqueeRun() {
  return (
    <div className="flex" aria-hidden>
      {Array.from({ length: MARQUEE_REPEAT }, (_, i) => (
        <span key={i} className="text-xl font-mono text-gray-400">
          <span className="text-[#72EAE0]">⊙</span>&nbsp;form shapes meaning&nbsp;
          <span className="text-[#72EAE0]">⊙</span>&nbsp;meaning shapes form&nbsp;
        </span>
      ))}
    </div>
  );
}

function Footer() {
  useMinuteClock();
  const year = new Date().getFullYear();

  return (
    <footer className="flex flex-col bg-[#141618]">
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="px-4 py-6 md:py-12 flex flex-col items-start justify-center border-t border-white/10 col-span-1 md:col-span-3">
          <h2 className="text-5xl md:text-6xl font-light leading-[1] md:leading-[0.9]">
            Let's Create<br />Something Meaningful
          </h2>
          <a
            href={`mailto:${EMAIL}`}
            className="group px-4 py-3 mt-6 mb-2 md:mb-[-1rem] w-full flex flex-row justify-between bg-[#72EAE0] text-black rounded transition-colors hover:bg-white"
          >
            <span>LET'S CONNECT</span>
            <span className="flex items-center gap-4">
              <span className="hidden sm:inline font-mono text-sm opacity-70">{EMAIL}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>→</span>
            </span>
          </a>
        </div>
        <div className="px-4 pt-6 pb-12 md:py-12 flex flex-col items-start justify-end border-t border-white/10 col-span-1">
          <dl className="flex flex-col items-start justify-center">
            <dt className="text-xl font-medium text-gray-400">Your Timezone</dt>
            <dd className="text-4xl font-light text-white tabular-nums">{formatTime()}</dd>
            <dt className="text-xl font-medium text-gray-400 mt-4">My Timezone</dt>
            <dd className="text-4xl font-light text-white tabular-nums md:mb-[-1.5rem]">
              {formatTime('America/New_York')}
            </dd>
          </dl>
        </div>
      </div>

      <div className="w-full p-2 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          <MarqueeRun />
          <MarqueeRun />
        </div>
      </div>

      <div
        className="flex flex-row justify-between items-end p-4 mt-1 border-t border-white/10 md:h-[20rem] bg-cover bg-[position:50%_60%] lg:bg-[position:50%_47%] md:bg-[image:var(--footer-bg)]"
        style={{ '--footer-bg': `url(${severed})` }}
      >
        <div className="flex flex-col justify-start">
          <span className="text-lg font-bold">FENG<span className="text-[#72EAE0]">_</span></span>
          <nav aria-label="Footer" className="flex flex-col text-lg text-white/70 my-2 md:my-4">
            <Link to="/#works" className="hover:text-[#72EAE0] transition-colors">Works</Link>
            <Link to="/about" className="hover:text-[#72EAE0] transition-colors">About</Link>
            <a href="https://photos.feng.works" className="hover:text-[#72EAE0] transition-colors">Photos ↗</a>
          </nav>
          <span className="text-lg font-regular text-white/50">© {year} Feng Works</span>
        </div>
        <div className="flex flex-col items-end justify-start">
          <span className="text-lg text-white/50">New York, NY</span>
          <a href={`mailto:${EMAIL}`} className="text-lg text-white/50 hover:text-[#72EAE0] transition-colors">
            {EMAIL}
          </a>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0%); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee { animation: marquee 20s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee { animation: none; }
        }
      `}</style>
    </footer>
  );
}

export default Footer;
