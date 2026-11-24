import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function PageTransition({ children }) {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile devices
    const detectMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      return isMobileUA || isTouchDevice;
    };
    
    setIsMobile(detectMobile());
  }, []);

  // Scroll to the #hash target if there is one, otherwise to the top.
  const resetScroll = () => {
    const target = location.hash && document.getElementById(location.hash.slice(1));
    if (target) target.scrollIntoView({ block: 'start' });
    else window.scrollTo(0, 0);
  };

  useEffect(() => {
    // Skip View Transitions on mobile devices to prevent crashes
    if (isMobile) {
      // Simple scroll to top without transitions
      resetScroll();
      return;
    }

    // Only use View Transitions API on desktop devices
    if (!document.startViewTransition) {
      // Fallback for browsers that don't support View Transitions API
      resetScroll();
      return;
    }

    const handleNavigation = () => {
      try {
        // Skip the transition when the tab is hidden; browsers reject it anyway.
        if (document.hidden) {
          resetScroll();
          return;
        }
        const transition = document.startViewTransition(resetScroll);
        // `ready` rejects when a transition is skipped; that is expected, not an error.
        transition?.ready?.catch?.(() => {});
        // startViewTransition returns a ViewTransition (not a Promise); use .finished
        const finished = transition?.finished ?? transition?.updateCallbackDone;
        if (finished && typeof finished.then === 'function') {
          finished.catch((err) => {
            if (err?.name !== 'AbortError') {
              console.warn('View Transition failed:', err);
            }
            resetScroll();
          });
        }
      } catch (error) {
        console.warn('View Transition not supported or failed:', error);
        resetScroll();
      }
    };

    // Call the navigation handler when the location changes
    handleNavigation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.hash, isMobile]);

  return (
    <>
      {children}
    </>
  );
}

export default PageTransition; 