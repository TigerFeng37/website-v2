import React, { useEffect, useRef } from 'react';

const AnimatedSection = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = 400; // Fixed height for the section
    };

    // Initial resize
    resizeCanvas();

    // Handle window resize
    window.addEventListener('resize', resizeCanvas);

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0a0a0a');
      gradient.addColorStop(1, '#1a1a1a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw animated lines
      const numLines = 50;
      const lineSpacing = canvas.width / numLines;
      
      for (let i = 0; i < numLines; i++) {
        const x = i * lineSpacing;
        const amplitude = 50;
        const frequency = 0.002;
        const y = canvas.height / 2 + Math.sin(x * frequency + time) * amplitude;
        
        // Create gradient for each line
        const lineGradient = ctx.createLinearGradient(0, y - 2, 0, y + 2);
        lineGradient.addColorStop(0, 'rgba(114, 234, 224, 0)');
        lineGradient.addColorStop(0.5, 'rgba(114, 234, 224, 0.5)');
        lineGradient.addColorStop(1, 'rgba(114, 234, 224, 0)');
        
        ctx.beginPath();
        ctx.strokeStyle = lineGradient;
        ctx.lineWidth = 2;
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + 100);
        ctx.stroke();
      }

      time += 0.02;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="w-full bg-black overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full"
        style={{ height: '400px' }}
      />
    </div>
  );
};

export default AnimatedSection; 