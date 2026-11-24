import { useEffect } from 'react';

/**
 * Safari Compatibility Component
 * Handles Safari-specific issues and prevents crashes with native page controls
 */
function SafariCompatibility() {
  useEffect(() => {
    // Detect Safari browser
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isWebKit = /webkit/i.test(navigator.userAgent);
    
    if (isSafari || isWebKit) {
      // Add Safari-specific class to body for styling
      document.body.classList.add('safari-browser');
      
      // Override aggressive event prevention globally
      const originalAddEventListener = EventTarget.prototype.addEventListener;
      
      EventTarget.prototype.addEventListener = function(type, listener, options) {
        // If it's a wheel event, make sure it's passive by default to avoid conflicts
        if (type === 'wheel' && typeof options === 'object' && options.passive === false) {
          console.warn('Safari Compatibility: Converting non-passive wheel listener to passive to prevent crashes');
          options = { ...options, passive: true };
        }
        
        return originalAddEventListener.call(this, type, listener, options);
      };
      
      // Handle Safari's memory management issues
      let memoryWarningCount = 0;
      const handleMemoryWarning = () => {
        memoryWarningCount++;
        if (memoryWarningCount > 3) {
          console.warn('Safari Compatibility: Multiple memory warnings detected, reducing animations');
          document.body.classList.add('reduced-motion');
        }
      };
      
      // Listen for memory pressure events (Safari specific)
      if ('webkitMemoryInfo' in performance) {
        const checkMemory = () => {
          const memInfo = performance.webkitMemoryInfo;
          if (memInfo.usedJSHeapSize / memInfo.totalJSHeapSize > 0.9) {
            handleMemoryWarning();
          }
        };
        
        // Check memory usage periodically
        const memoryCheckInterval = setInterval(checkMemory, 30000); // Every 30 seconds
        
        return () => {
          clearInterval(memoryCheckInterval);
          document.body.classList.remove('safari-browser', 'reduced-motion');
        };
      }
    }
    
    return () => {
      document.body.classList.remove('safari-browser', 'reduced-motion');
    };
  }, []);

  return null; // This component doesn't render anything
}

export default SafariCompatibility; 