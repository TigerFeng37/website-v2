import React, { useRef, useEffect, useState } from "react";

/**
 * Experimental glow cursor that follows the mouse with smooth lerp.
 * Not used in production — for experimenting only.
 */
export default function GlowCursor() {
  const glowRef = useRef(null);
  const targetPos = useRef({ x: -100, y: -100 });
  const smoothPos = useRef({ x: -100, y: -100 });
  const animFrame = useRef(null);
  const [cursorVisible, setCursorVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      setCursorVisible(true);
    };
    const handleMouseLeave = () => setCursorVisible(false);
    const handleMouseEnter = () => setCursorVisible(true);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const lerp = (a, b, t) => a + (b - a) * t;
    const animate = () => {
      smoothPos.current.x = lerp(smoothPos.current.x, targetPos.current.x, 0.12);
      smoothPos.current.y = lerp(smoothPos.current.y, targetPos.current.y, 0.12);
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${smoothPos.current.x}px, ${smoothPos.current.y}px) translate(-50%, -50%)`;
      }
      animFrame.current = requestAnimationFrame(animate);
    };
    animFrame.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(animFrame.current);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-300 ${cursorVisible ? "opacity-100" : "opacity-0"}`}
      style={{ willChange: "transform" }}
    >
      <div className="relative flex items-center justify-center w-24 h-24">
        <div className="absolute w-full h-full rounded-full bg-cyan-400/40 blur-xl animate-glow-drift-1" />
        <div className="absolute w-3/4 h-3/4 rounded-full bg-cyan-300/60 blur-lg animate-glow-drift-2" />
        <div className="absolute w-1/2 h-1/2 rounded-full bg-white blur-md shadow-[0_0_40px_20px_rgba(100,220,255,0.7),0_0_80px_40px_rgba(100,220,255,0.4)] animate-glow-drift-3" />
      </div>
    </div>
  );
}
