import { useEffect, useState } from 'react';

/**
 * Mobile Optimizer Component
 * Prevents crashes on mobile devices by implementing comprehensive optimizations
 */
function MobileOptimizer() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLowMemoryDevice, setIsLowMemoryDevice] = useState(false);

  useEffect(() => {
    // Enhanced mobile detection
    const detectMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 768;
      
      return isMobileUA || (isTouchDevice && isSmallScreen);
    };

    // Detect low memory devices
    const detectLowMemory = () => {
      // Check available memory (Chrome/Edge)
      if ('memory' in performance) {
        const memInfo = performance.memory;
        const totalMB = memInfo.jsHeapSizeLimit / (1024 * 1024);
        return totalMB < 1024; // Less than 1GB available
      }
      
      // Fallback: Check device characteristics
      const isOldDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
      const isSlowConnection = navigator.connection && navigator.connection.effectiveType && 
        ['slow-2g', '2g', '3g'].includes(navigator.connection.effectiveType);
      
      return isOldDevice || isSlowConnection;
    };

    const mobile = detectMobile();
    const lowMemory = detectLowMemory();
    
    setIsMobile(mobile);
    setIsLowMemoryDevice(lowMemory);

    if (mobile || lowMemory) {
      // Add mobile optimization class
      document.body.classList.add('mobile-optimized');
      
      // Disable View Transitions API on mobile
      if (document.startViewTransition) {
        const originalStartViewTransition = document.startViewTransition;
        document.startViewTransition = function() {
          console.log('View Transitions disabled on mobile for performance');
          return Promise.resolve();
        };
      }

      // Optimize video loading
      optimizeVideoElements();
      
      // Implement memory cleanup
      implementMemoryCleanup();
      
      // Reduce animation complexity
      if (lowMemory) {
        document.body.classList.add('low-memory-device');
      }
    }

    // Cleanup function
    return () => {
      document.body.classList.remove('mobile-optimized', 'low-memory-device');
    };
  }, []);

  const optimizeVideoElements = () => {
    // Pause all videos initially and load them on demand
    const videos = document.querySelectorAll('video');
    
    videos.forEach((video, index) => {
      // Remove autoplay for mobile
    //   video.removeAttribute('autoplay');
      
      // Add lazy loading
      video.setAttribute('preload', 'none');
      
      // Use Intersection Observer to load videos when in view
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const video = entry.target;
            
            // Only load one video at a time
            pauseOtherVideos(video);
            
            // Load and play the video
            video.setAttribute('preload', 'metadata');
            video.load();
            
            // Small delay to prevent memory spike
            setTimeout(() => {
              video.play().catch(e => console.log('Video autoplay prevented:', e));
            }, 300);
            
            observer.unobserve(video);
          }
        });
      }, {
        rootMargin: '50px',
        threshold: 0.1
      });
      
      observer.observe(video);
    });
  };

  const pauseOtherVideos = (currentVideo) => {
    const allVideos = document.querySelectorAll('video');
    allVideos.forEach(video => {
      if (video !== currentVideo && !video.paused) {
        video.pause();
        // Clear video data to free memory
        video.src = '';
        video.load();
      }
    });
  };

  const implementMemoryCleanup = () => {
    let memoryCheckInterval;
    
    // Monitor memory usage
    const checkMemoryUsage = () => {
      if ('memory' in performance) {
        const memInfo = performance.memory;
        const usedMB = memInfo.usedJSHeapSize / (1024 * 1024);
        const totalMB = memInfo.totalJSHeapSize / (1024 * 1024);
        
        // If using more than 80% of available memory
        if (usedMB / totalMB > 0.8) {
          console.warn('High memory usage detected, cleaning up...');
          
          // Pause all videos
          document.querySelectorAll('video').forEach(video => {
            if (!video.paused) {
              video.pause();
            }
          });
          
          // Add emergency low memory class
          document.body.classList.add('emergency-low-memory');
          
          // Force garbage collection if available
          if (window.gc) {
            window.gc();
          }
        }
      }
    };
    
    // Check memory every 10 seconds on mobile
    memoryCheckInterval = setInterval(checkMemoryUsage, 10000);
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
      clearInterval(memoryCheckInterval);
      
      // Pause and clear all videos
      document.querySelectorAll('video').forEach(video => {
        video.pause();
        video.src = '';
        video.load();
      });
    });
  };

  return null; // This component doesn't render anything
}

export default MobileOptimizer; 