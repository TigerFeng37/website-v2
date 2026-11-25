import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../hooks/useMediaQuery";

export const isVideo = (src) => /\.(mp4|webm|mov|m4v)(\?.*)?$/i.test(String(src ?? ""));

/**
 * Every image and video on the site goes through here.
 *
 * - Videos are muted loops that only play while on screen (and never under
 *   reduced motion), and don't download until they're close to the viewport.
 * - Images fade in once decoded so nothing pops.
 * - `vt` sets a view-transition-name so a card can morph into a case-study hero.
 * - `placeholder` paints an already-cached image underneath while loading.
 *
 * Pass `controls` for long-form video the visitor should drive themselves.
 */
function Media({
  src,
  poster,
  alt = "",
  aspect,
  fit = "cover",
  position,
  priority = false,
  controls = false,
  loop = true,
  playing, // optional external control (e.g. play on hover)
  vt,
  className = "",
  mediaClassName = "",
  rounded = true,
  label,
  placeholder, // image shown underneath until the real media has loaded
}) {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const reduced = useReducedMotion();
  // Under reduced motion a decorative loop is just its poster: no download.
  const stillOnly = isVideo(src) && reduced && !controls && Boolean(poster);
  const video = isVideo(src) && !stillOnly;
  if (stillOnly) src = poster;
  const [loaded, setLoaded] = useState(false);
  const [near, setNear] = useState(priority);
  const [visible, setVisible] = useState(false);

  // Start fetching a little before it scrolls in; play only while visible.
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setNear(true);
      setVisible(true);
      return;
    }
    const nearObs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          nearObs.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );
    const visObs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0.2,
    });
    nearObs.observe(el);
    visObs.observe(el);
    return () => {
      nearObs.disconnect();
      visObs.disconnect();
    };
  }, []);

  const shouldPlay = video && !controls && !reduced && near && (playing ?? visible);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || controls) return;
    if (shouldPlay) {
      const p = v.play();
      p?.catch?.(() => {});
    } else {
      v.pause();
    }
  }, [shouldPlay, controls]);

  const style = {
    ...(aspect ? { aspectRatio: aspect } : null),
    ...(vt ? { viewTransitionName: vt, viewTransitionClass: "media" } : null),
    ...(placeholder
      ? { backgroundImage: `url(${placeholder})`, backgroundSize: "cover", backgroundPosition: "center" }
      : null),
  };
  const fitClass = fit === "contain" ? "!object-contain" : "";
  const fade = `transition-opacity duration-slow ease-out ${loaded ? "opacity-100" : "opacity-0"}`;

  return (
    <div
      ref={ref}
      className={`media ${rounded ? "" : "!rounded-none"} ${className}`}
      style={style}
    >
      {video ? (
        <video
          ref={videoRef}
          src={near ? src : undefined}
          poster={poster}
          muted
          loop={loop}
          playsInline
          controls={controls}
          preload={near ? (controls ? "metadata" : "auto") : "none"}
          onLoadedData={() => setLoaded(true)}
          aria-label={label || alt || undefined}
          aria-hidden={!label && !alt ? true : undefined}
          className={`${fitClass} ${poster ? "" : fade} ${mediaClassName}`}
          style={position ? { objectPosition: position } : undefined}
        />
      ) : (
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : undefined}
          onLoad={() => setLoaded(true)}
          ref={(img) => {
            // Cached images can finish before React attaches onLoad.
            if (img?.complete && img.naturalWidth && !loaded) setLoaded(true);
          }}
          className={`${fitClass} ${fade} ${mediaClassName}`}
          style={position ? { objectPosition: position } : undefined}
        />
      )}
    </div>
  );
}

export default Media;
