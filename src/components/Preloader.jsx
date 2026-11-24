import React, { useEffect, useState } from 'react';
import { signalIntroDone } from './introSignal';

const MIN_DURATION = 900; // ms the mark stays up, so the intro reads as deliberate
const FADE_DURATION = 600;

/**
 * One-time brand intro on first load. Waits for the window `load` event
 * (or MIN_DURATION, whichever is later), then fades out and unmounts.
 */
const Preloader = ({ children }) => {
  const [phase, setPhase] = useState('visible'); // visible → fading → done

  useEffect(() => {
    const start = performance.now();
    let fadeTimer;
    let doneTimer;

    const finish = () => {
      const wait = Math.max(0, MIN_DURATION - (performance.now() - start));
      fadeTimer = setTimeout(() => {
        setPhase('fading');
        signalIntroDone();
        doneTimer = setTimeout(() => setPhase('done'), FADE_DURATION);
      }, wait);
    };

    if (document.readyState === 'complete') finish();
    else window.addEventListener('load', finish, { once: true });

    return () => {
      window.removeEventListener('load', finish);
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  return (
    <>
      {phase !== 'done' && (
        <div
          aria-hidden
          className={`fixed inset-0 z-[100000] bg-black flex items-center justify-center transition-opacity ease-out ${
            phase === 'fading' ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          style={{ transitionDuration: `${FADE_DURATION}ms` }}
        >
          <div className="flex flex-col items-start">
            <span className="text-4xl font-medium tracking-tighter text-white">FENG</span>
            <span className="mt-1 block h-1 w-full overflow-hidden bg-white/10">
              <span className="preloader-bar block h-full bg-[#72EAE0]" />
            </span>
          </div>
        </div>
      )}
      {children}
    </>
  );
};

export default Preloader;
