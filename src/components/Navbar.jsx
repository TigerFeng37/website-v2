import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Simple trigger - either scrolled or not
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`fixed z-50 w-full p-4 flex flex-col transition-all duration-300 view-transition-exclude ${scrolled ? 'bg-black/50 backdrop-blur-md' : ''}`}>
      <div className="flex flex-row justify-between items-center">
        <Link to="/" className="text-4xl font-medium font-['IBM_Plex_Sans']">FENG</Link>
        <div className="flex gap-8 font-['IBM_Plex_Sans'] font-medium mt-[-0.85rem]">
          <Link to="/" className={`hover:text-teal-400 transition-colors ${location.pathname === '/' ? 'text-teal-400' : ''}`}>WORKS</Link>
          <Link to="/about" className={`hover:text-teal-400 transition-colors ${location.pathname === '/about' ? 'text-teal-400' : ''}`}>ABOUT</Link>
        </div>
      </div>
      <div className="nav-divider flex w-full mt-[-0.5rem]">
        <div className="w-[6.15rem]"></div>
        <div className="flex-grow overflow-hidden">
          <div 
            className={`border-t-4 border-[#72EAE0] transition-all duration-500 ease-out origin-left ${
              scrolled ? 'w-[1.25rem]' : 'w-full'
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Navbar; 