import React, { useEffect, useRef, useState, forwardRef } from 'react';

const UnicornStudio = forwardRef(({ 
  projectId, 
  projectSrc,
  scale = 0.5,
  dpi = 1,
  lazyload = true,
  production = true,
  fps = 60,
  disablemobile = false,
  altText = '',
  ariaLabel = '',
  style = {},
  onLoadingChange
}, ref) => {
  const containerRef = useRef(null);
  const styleElementRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setError] = useState(null);
  const [isSafari, setIsSafari] = useState(false);

  // Detect Safari browser
  useEffect(() => {
    const safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    setIsSafari(safari);
  }, []);

  // Notify parent component when loading state changes
  useEffect(() => {
    if (onLoadingChange) {
      onLoadingChange(isInitializing);
    }
  }, [isInitializing, onLoadingChange]);

  useEffect(() => {
    let isMounted = true;
    let initAttempts = 0;
    const maxAttempts = 10;

    setIsInitializing(true);
    setError(null);

    const checkAndInitialize = () => {
      initAttempts++;

      if (!isMounted) {
        return;
      }

      if (!containerRef.current) {
        if (initAttempts < maxAttempts) {
          setTimeout(checkAndInitialize, 200);
        } else {
          setError('Container not ready');
          setIsInitializing(false);
        }
        return;
      }

      if (!window.UnicornStudio) {
        if (initAttempts < maxAttempts) {
          setTimeout(checkAndInitialize, 200);
        } else {
          setError('Library failed to load');
          setIsInitializing(false);
        }
        return;
      }

      if (!window.UnicornStudio.init) {
        if (initAttempts < maxAttempts) {
          setTimeout(checkAndInitialize, 200);
        } else {
          setError('Init method not available');
          setIsInitializing(false);
        }
        return;
      }

      try {
        // Force a small delay to ensure DOM is fully ready
        setTimeout(() => {
          if (isMounted && window.UnicornStudio && window.UnicornStudio.init) {
            try {
              window.UnicornStudio.init();
              
              // Check if anything was actually rendered
              setTimeout(() => {
                if (isMounted) {
                  const canvas = containerRef.current?.querySelector('canvas');
                  const iframe = containerRef.current?.querySelector('iframe');
                  if (canvas || iframe) {
                    setIsLoaded(true);
                    setIsInitializing(false);
                  } else {
                    if (initAttempts < maxAttempts) {
                      setTimeout(checkAndInitialize, 500);
                    } else {
                      setError('Scene failed to render');
                      setIsInitializing(false);
                    }
                  }
                }
              }, 1000);
              
            } catch (error) {
              if (initAttempts < maxAttempts) {
                setTimeout(checkAndInitialize, 500);
              } else {
                setError(error.message);
                setIsInitializing(false);
              }
            }
          }
        }, 100);
        
      } catch (error) {
        if (initAttempts < maxAttempts) {
          setTimeout(checkAndInitialize, 500);
        } else {
          setError(error.message);
          setIsInitializing(false);
        }
      }
    };

    // Load the UnicornStudio library if it's not already loaded
    if (!window.UnicornStudio) {
      const script = document.createElement('script');
      script.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.20/dist/unicornStudio.umd.js";
      script.onload = () => {
        setTimeout(checkAndInitialize, 100);
      };
      script.onerror = () => {
        setError('Failed to load library');
        setIsInitializing(false);
      };
      document.head.appendChild(script);
    } else {
      setTimeout(checkAndInitialize, 100);
    }

    // Add style to hide any unwanted elements
    if (!styleElementRef.current) {
      const styleEl = document.createElement('style');
      styleEl.textContent = `
        .unicorn-studio-container a {
          display: none !important;
        }
        .unicorn-studio-container img {
          display: none !important;
        }
      `;
      document.head.appendChild(styleEl);
      styleElementRef.current = styleEl;
    }

    return () => {
      isMounted = false;
      
      // Clean up the style element
      if (styleElementRef.current && document.head.contains(styleElementRef.current)) {
        try {
          document.head.removeChild(styleElementRef.current);
          styleElementRef.current = null;
        } catch (error) {
          // Silent cleanup
        }
      }

      // Enhanced cleanup for Safari
      if (window.UnicornStudio && typeof window.UnicornStudio.destroy === 'function') {
        try {
          // For Safari, add a small delay before destroying to prevent crashes
          if (isSafari) {
            setTimeout(() => {
              if (window.UnicornStudio && typeof window.UnicornStudio.destroy === 'function') {
                window.UnicornStudio.destroy();
              }
            }, 100);
          } else {
            window.UnicornStudio.destroy();
          }
        } catch (error) {
          // Silent cleanup
        }
      }

      // Additional Safari-specific cleanup
      if (isSafari && containerRef.current) {
        try {
          // Clear any WebGL contexts that might be causing memory issues
          const canvas = containerRef.current.querySelector('canvas');
          if (canvas) {
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            if (gl && gl.getExtension('WEBGL_lose_context')) {
              gl.getExtension('WEBGL_lose_context').loseContext();
            }
          }
        } catch (error) {
          // Silent cleanup
        }
      }
    };
  }, [projectId]);

  // Expose ref to parent component
  useEffect(() => {
    if (ref) {
      if (typeof ref === 'function') {
        ref(containerRef.current);
      } else {
        ref.current = containerRef.current;
      }
    }
  }, [ref]);

  const defaultStyle = {
    width: '100vw',
    height: '400px',
    ...style
  };

  return (
    <div className="relative">
      <div 
        ref={containerRef}
        className="unicorn-studio-container w-screen overflow-hidden"
        data-us-project={projectId}
        data-us-project-src={projectSrc}
        data-us-scale={scale}
        data-us-dpi={dpi}
        data-us-lazyload={lazyload}
        data-us-production={production}
        data-us-fps={fps}
        data-us-disablemobile={disablemobile}
        data-us-alttext={altText}
        data-us-arialabel={ariaLabel}
        style={defaultStyle}
      />
      {isInitializing && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-black z-50"
          style={defaultStyle}
        >
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-2 border-t-[#72EAE0] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
            {error && (
              <div className="text-red-400 text-xs mt-2 max-w-xs text-center">
                Error: {error}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

UnicornStudio.displayName = 'UnicornStudio';

export default UnicornStudio; 