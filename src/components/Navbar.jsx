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
    <div className={`navbar-backdrop fixed z-[999999] w-full p-4 flex flex-col mix-blend-difference transition-all duration-300 view-transition-exclude ${scrolled ? 'bg-black/70 backdrop-blur-md-webkit supports-[backdrop-filter]:bg-black/50' : ''}`}>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-start">
          <Link to="/" className="text-4xl font-medium font-['IBM_Plex_Sans'] tracking-tighter">FENG</Link>
          {/* <span className="text-l ml-1.5 font-regular font-['IBM_Plex_Sans'] text-gray-300">NYC</span> */}
        </div>
        <div className="flex gap-8 font-['IBM_Plex_Sans'] font-medium mt-[-0.85rem]">
          <Link to="/" className={`hover:text-teal-400 transition-colors ${location.pathname === '/' ? 'text-teal-400' : ''}`}>WORKS</Link>
          <Link to="/about" className={`hover:text-teal-400 transition-colors ${location.pathname === '/about' ? 'text-teal-400' : ''}`}>ABOUT</Link>
          <a href="https://photos.feng.works" className="hover:text-teal-400 transition-colors">PHOTOS</a>
        </div>
      </div>
      <div className="nav-divider flex w-full mt-[-0.5rem]">
        <div className="w-[6.15rem]"></div>
        <div className="flex-grow overflow-hidden">
          <div 
            className={`border-t-4 border-[#72EAE0] transition-all duration-500 ease-out origin-left ${
              scrolled ? 'w-[1.25rem]' : 'w-[full]'
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Navbar; 