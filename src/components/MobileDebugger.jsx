import React, { useState, useEffect } from 'react';

const MobileDebugger = ({ enabled = false }) => {
  const [debugInfo, setDebugInfo] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const collectDebugInfo = () => {
      const info = {
        // Device information
        userAgent: navigator.userAgent,
        isMobile: /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()),
        isTouchDevice: 'ontouchstart' in window,
        screenSize: `${window.screen.width}x${window.screen.height}`,
        viewportSize: `${window.innerWidth}x${window.innerHeight}`,
        devicePixelRatio: window.devicePixelRatio,
        
        // Performance information
        memory: null,
        connection: null,
        hardwareConcurrency: navigator.hardwareConcurrency,
        
        // Video information
        videoCount: document.querySelectorAll('video').length,
        playingVideos: document.querySelectorAll('video:not([paused])').length,
        
        // Network information
        onLine: navigator.onLine,
        
        // Performance timing
        loadTime: performance.now(),
        
        // CSS class information
        bodyClasses: Array.from(document.body.classList),
      };

      // Memory information (Chrome/Edge)
      if ('memory' in performance) {
        const memInfo = performance.memory;
        info.memory = {
          used: Math.round(memInfo.usedJSHeapSize / (1024 * 1024)),
          total: Math.round(memInfo.totalJSHeapSize / (1024 * 1024)),
          limit: Math.round(memInfo.jsHeapSizeLimit / (1024 * 1024)),
          usage: Math.round((memInfo.usedJSHeapSize / memInfo.jsHeapSizeLimit) * 100)
        };
      }

      // Network information
      if (navigator.connection) {
        info.connection = {
          effectiveType: navigator.connection.effectiveType,
          downlink: navigator.connection.downlink,
          rtt: navigator.connection.rtt,
          saveData: navigator.connection.saveData
        };
      }

      setDebugInfo(info);
    };

    // Initial collection
    collectDebugInfo();

    // Update every 5 seconds
    const interval = setInterval(collectDebugInfo, 5000);

    // Listen for specific events
    const handleMemoryWarning = () => {
      console.warn('🚨 Memory warning detected!');
      collectDebugInfo();
    };

    const handleVideoPlay = () => {
      setTimeout(collectDebugInfo, 100);
    };

    const handleVideoError = (e) => {
      console.error('🎬 Video error:', e.target.src, e);
      collectDebugInfo();
    };

    // Add event listeners
    document.addEventListener('webkitmemorywarning', handleMemoryWarning);
    document.addEventListener('play', handleVideoPlay, true);
    document.addEventListener('error', handleVideoError, true);

    return () => {
      clearInterval(interval);
      document.removeEventListener('webkitmemorywarning', handleMemoryWarning);
      document.removeEventListener('play', handleVideoPlay, true);
      document.removeEventListener('error', handleVideoError, true);
    };
  }, [enabled]);

  if (!enabled) return null;

  const getMemoryStatus = () => {
    if (!debugInfo.memory) return 'unknown';
    if (debugInfo.memory.usage > 90) return 'critical';
    if (debugInfo.memory.usage > 70) return 'warning';
    return 'good';
  };

  const getPerformanceRecommendations = () => {
    const recommendations = [];
    
    if (debugInfo.memory?.usage > 80) {
      recommendations.push('🚨 High memory usage - consider reducing video quality');
    }
    
    if (debugInfo.playingVideos > 1) {
      recommendations.push('⚠️ Multiple videos playing - only one should play at a time');
    }
    
    if (debugInfo.videoCount > 3 && debugInfo.isMobile) {
      recommendations.push('📱 Too many videos for mobile - consider lazy loading');
    }
    
    if (debugInfo.connection?.effectiveType === 'slow-2g' || debugInfo.connection?.effectiveType === '2g') {
      recommendations.push('🐌 Slow connection - disable videos or use images');
    }
    
    if (debugInfo.devicePixelRatio > 2 && debugInfo.isMobile) {
      recommendations.push('📱 High DPI mobile device - optimize images and videos');
    }

    return recommendations;
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      zIndex: 9999,
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      color: 'white',
      padding: '10px',
      fontFamily: 'monospace',
      fontSize: '12px',
      maxWidth: '300px',
      transform: isVisible ? 'translateX(0)' : 'translateX(calc(100% - 40px))',
      transition: 'transform 0.3s ease',
      border: '1px solid #333',
      borderRadius: '0 0 0 8px'
    }}>
      <button
        onClick={() => setIsVisible(!isVisible)}
        style={{
          position: 'absolute',
          left: '-30px',
          top: '10px',
          background: '#333',
          color: 'white',
          border: 'none',
          padding: '5px',
          borderRadius: '4px 0 0 4px',
          cursor: 'pointer',
          fontSize: '12px'
        }}
      >
        🐛
      </button>

      {isVisible && (
        <div>
          <h3 style={{ margin: '0 0 10px 0', color: '#00ff00' }}>Mobile Debug Info</h3>
          
          <div style={{ marginBottom: '10px' }}>
            <strong>Device:</strong><br/>
            Mobile: {debugInfo.isMobile ? '✅' : '❌'}<br/>
            Touch: {debugInfo.isTouchDevice ? '✅' : '❌'}<br/>
            Size: {debugInfo.screenSize} → {debugInfo.viewportSize}<br/>
            DPR: {debugInfo.devicePixelRatio}<br/>
            Cores: {debugInfo.hardwareConcurrency}
          </div>

          {debugInfo.memory && (
            <div style={{ marginBottom: '10px' }}>
              <strong>Memory:</strong><br/>
              <span style={{ 
                color: getMemoryStatus() === 'critical' ? '#ff4444' : 
                      getMemoryStatus() === 'warning' ? '#ffaa00' : '#44ff44'
              }}>
                {debugInfo.memory.used}MB / {debugInfo.memory.limit}MB ({debugInfo.memory.usage}%)
              </span>
            </div>
          )}

          <div style={{ marginBottom: '10px' }}>
            <strong>Videos:</strong><br/>
            Total: {debugInfo.videoCount}<br/>
            Playing: {debugInfo.playingVideos}
          </div>

          {debugInfo.connection && (
            <div style={{ marginBottom: '10px' }}>
              <strong>Network:</strong><br/>
              Type: {debugInfo.connection.effectiveType}<br/>
              Speed: {debugInfo.connection.downlink}Mbps<br/>
              RTT: {debugInfo.connection.rtt}ms
            </div>
          )}

          <div style={{ marginBottom: '10px' }}>
            <strong>Classes:</strong><br/>
            {debugInfo.bodyClasses?.join(', ') || 'none'}
          </div>

          {getPerformanceRecommendations().length > 0 && (
            <div style={{ marginTop: '10px', padding: '5px', background: '#332200', borderRadius: '4px' }}>
              <strong>Recommendations:</strong><br/>
              {getPerformanceRecommendations().map((rec, i) => (
                <div key={i} style={{ fontSize: '11px', margin: '2px 0' }}>{rec}</div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MobileDebugger; 