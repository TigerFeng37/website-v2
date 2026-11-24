import React, { useRef, useEffect, useState } from 'react';

const OptimizedVideo = ({ 
  src, 
  mobileReplacement = null, 
  className = '', 
  autoPlay = true, 
  loop = true, 
  muted = true, 
  playsInline = true,
  priority = 'normal', // 'high', 'normal', 'low'
  ...props 
}) => {
  const videoRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLowMemory, setIsLowMemory] = useState(false);
  const [shouldShowVideo, setShouldShowVideo] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    // Detect device capabilities
    const detectDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 768;
      
      const mobile = isMobileUA || (isTouchDevice && isSmallScreen);
      
      // Detect low memory
      let lowMemory = false;
      if ('memory' in performance) {
        const memInfo = performance.memory;
        const totalMB = memInfo.jsHeapSizeLimit / (1024 * 1024);
        lowMemory = totalMB < 1024;
      } else {
        // Fallback detection
        const cores = navigator.hardwareConcurrency || 4;
        const connection = navigator.connection?.effectiveType;
        lowMemory = cores <= 4 || ['slow-2g', '2g', '3g'].includes(connection);
      }
      
      setIsMobile(mobile);
      setIsLowMemory(lowMemory);
    };

    detectDevice();
  }, []);

  useEffect(() => {
    // Don't show video on low memory devices
    if (isLowMemory) {
      setShouldShowVideo(false);
      return;
    }

    // Set up intersection observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            
            // Delay video loading based on priority
            const delay = {
              high: 100,
              normal: 300,
              low: 800
            }[priority];
            
            setTimeout(() => {
              setShouldShowVideo(true);
            }, delay);
            
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [priority, isLowMemory]);

  useEffect(() => {
    if (!shouldShowVideo || !videoRef.current) return;

    const video = videoRef.current;
    
    // Pause other videos when this one starts loading
    const pauseOtherVideos = () => {
      const allVideos = document.querySelectorAll('video');
      allVideos.forEach(v => {
        if (v !== video && !v.paused) {
          v.pause();
          // Clear video source to free memory on mobile
          if (isMobile) {
            v.removeAttribute('src');
            v.load();
          }
        }
      });
    };

    // Handle video events
    const handleLoadStart = () => {
      if (isMobile && priority !== 'high') {
        pauseOtherVideos();
      }
    };

    const handleError = (e) => {
      console.warn('Video failed to load:', src, e);
      setShouldShowVideo(false);
    };

    const handleLoadedData = () => {
      if (autoPlay && isMobile) {
        // Small delay to prevent memory spike
        setTimeout(() => {
          video.play().catch(e => {
            console.log('Video autoplay prevented:', e);
          });
        }, 200);
      }
    };

    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('error', handleError);
    video.addEventListener('loadeddata', handleLoadedData);

    return () => {
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [shouldShowVideo, isMobile, autoPlay, src, priority]);

  // Don't render video on low memory devices
  if (isLowMemory) {
    return mobileReplacement ? (
      <div className={`${className} bg-gray-900 flex items-center justify-center`}>
        {mobileReplacement}
      </div>
    ) : (
      <div className={`${className} bg-gradient-to-br from-gray-900 to-black`} />
    );
  }

  // Show placeholder until video should load
  if (!shouldShowVideo) {
    return (
      <div 
        ref={videoRef}
        className={`${className} bg-gray-900 animate-pulse`}
        style={{ aspectRatio: '16/9' }}
      />
    );
  }

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay={!isMobile && autoPlay} // Disable autoplay on mobile by default
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      preload={isMobile ? 'none' : 'metadata'}
      {...props}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default OptimizedVideo; 