import React, { useState, useRef, useEffect } from "react";

function GridItem({ imageUrl, projectName, projectType, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const [skewValues, setSkewValues] = useState({ x: 0, y: 0 });
  const [lightPosition, setLightPosition] = useState({ x: 50, y: 50 }); // Default center position (50%)
  const itemRef = useRef(null);
  
  const handleMouseMove = (e) => {
    if (!itemRef.current || !isHovered) return;
    
    // Get the bounding rectangle of the item
    const rect = itemRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to the center of the item
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate the distance from center as a percentage (-1 to 1)
    const relativeX = (e.clientX - centerX) / (rect.width / 2);
    const relativeY = (e.clientY - centerY) / (rect.height / 2);
    
    // Apply a subtle skew based on mouse position
    setSkewValues({
      x: relativeY * 0.5, // Skew X based on vertical position
      y: -relativeX * 0.5  // Skew Y based on horizontal position
    });
    
    // Calculate light position (0-100%)
    const lightX = ((e.clientX - rect.left) / rect.width) * 100;
    const lightY = ((e.clientY - rect.top) / rect.height) * 100;
    setLightPosition({ x: lightX, y: lightY });
  };
  
  const resetEffects = () => {
    setSkewValues({ x: 0, y: 0 });
    setLightPosition({ x: 50, y: 50 });
  };
  
  // Clean up the event listener when component unmounts
  useEffect(() => {
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div 
      ref={itemRef}
      className="flex flex-col items-start justify-start h-[30rem] w-[30rem] mb-4 group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        resetEffects();
      }}
      onMouseMove={handleMouseMove}
      onClick={onClick}
    >
      <div 
        className="w-full h-full mb-3 rounded-lg overflow-hidden transition-all duration-300 ease-in-out transform group-hover:scale-[0.98] group-active:scale-95 relative"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: isHovered ? `skew(${skewValues.x}deg, ${skewValues.y}deg)` : 'skew(0deg, 0deg)',
          transition: 'transform 0.15s ease-out'
        }}
      >
        {/* Dynamic light/shadow overlay */}
        <div 
          className="absolute inset-0 rounded-lg transition-opacity duration-300"
          style={{
            opacity: isHovered ? 0.4 : 0,
            background: isHovered ? 
              `radial-gradient(circle at ${lightPosition.x}% ${lightPosition.y}%, rgba(255,255,255,0.8) 0%, rgba(0,0,0,0.5) 100%)` : 
              'none',
            mixBlendMode: 'overlay',
            pointerEvents: 'none' // Make the overlay non-interactive
          }}
        ></div>
      </div>
      <span className="text-lg font-bold mb-[-5px]">
        {projectName} <span className="transition-all duration-300 ease-in-out group-hover:text-[#72EAE0] group-hover:translate-x-2 inline-block">→</span>
      </span>
      <span className="text-lg font-bold text-gray-500 transition-all duration-300 ease-in-out group-hover:text-gray-400">
        {projectType}
      </span>
    </div>
  );
}

export default GridItem; 