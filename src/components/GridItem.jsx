import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const isVideoUrl = (url) => /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(String(url ?? ""));

/** Plays a muted loop only while it is on screen. */
function InViewVideo({ src }) {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.15 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden
      className="w-full h-full object-cover"
    />
  );
}

function GridItem({ project }) {
  const { slug, hero, title, disciplines, year, comingSoon } = project;

  const media = (
    <div className="relative w-full h-full mb-3 rounded-lg overflow-hidden bg-gray-900 transition-transform duration-500 ease-out group-hover:scale-[1.01] group-active:scale-[0.99]">
      {isVideoUrl(hero) ? (
        <InViewVideo src={hero} />
      ) : (
        <img src={hero} alt="" className="w-full h-full object-cover" loading="lazy" decoding="async" />
      )}
      {comingSoon ? (
        <span className="absolute top-4 left-4 rounded-full bg-black/60 backdrop-blur px-3 py-1 text-xs tracking-widest uppercase text-white/80">
          Coming soon
        </span>
      ) : null}
    </div>
  );

  const meta = (
    <div className="flex w-full items-start justify-between gap-6">
      <div className="flex flex-col">
        <span className="text-lg font-medium uppercase">
          {title}
          {!comingSoon ? (
            <span
              className="ml-2 inline-block transition-all duration-300 ease-out group-hover:text-[#72EAE0] group-hover:translate-x-2"
              aria-hidden
            >
              →
            </span>
          ) : null}
        </span>
        <span className="text-lg font-light uppercase text-gray-500 transition-colors duration-300 group-hover:text-gray-400">
          {disciplines.join(" · ")}
        </span>
      </div>
      <span className="text-lg font-light text-gray-500 tabular-nums whitespace-nowrap">{year}</span>
    </div>
  );

  const shell = "flex flex-col items-start justify-start h-[80vh] md:h-[30rem] w-full mb-4 group";

  if (comingSoon) {
    return (
      <div className={`${shell} cursor-default`} aria-label={`${title} — coming soon`}>
        {media}
        {meta}
      </div>
    );
  }

  return (
    <Link to={`/works/${slug}`} className={shell}>
      {media}
      {meta}
    </Link>
  );
}

export default GridItem;
