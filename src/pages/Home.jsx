import React from "react";
import { useNavigate } from "react-router-dom";
import GridItem from "../components/GridItem";

import hero1 from "../assets/Academy-Records-Hero.png";
import hero2 from "../assets/Tokyo-Trackmap-Hero.png";
import hero3 from "../assets/Aspecta-Hero.png";
import hero4 from "../assets/Eclair-Hero.png";
import backgroundVideo from "../assets/Filmic.webm";

const projects = [
  {
    id: "academy-records",
    imageUrl: hero1,
    projectName: "ACADEMY RECORDS",
    projectType: "BRAND DESIGN"
  },
  {
    id: "tokyo-trackmap",
    imageUrl: hero2,
    projectName: "TOKYO TRACKMAP",
    projectType: "DESIGN EXPERIMENT"
  },
  {
    id: "aspecta",
    imageUrl: hero3,
    projectName: "ASPECTA",
    projectType: "BRAND DESIGN"
  },
  {
    id: "eclair",
    imageUrl: hero4,
    projectName: "ECLAIR",
    projectType: "BRAND DESIGN"
  }
];

function Home() {
  const navigate = useNavigate();

  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <>
      {/* Hero Section with Background Video */}
      <div className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden">
        {/* Background Video with Monochrome Filter */}
        <div className="absolute top-0 left-0 w-full h-full z-0">
          {/* Black overlay for better text contrast */}
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>
          
          {/* Video element */}
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="absolute w-full h-full object-cover filter grayscale contrast-125"
            style={{ filter: 'grayscale(1)' }}
          >
            <source src={backgroundVideo} type="video/webm" />
            Your browser does not support the video tag.
          </video>
          
          {/* Gradient overlay - transitions from transparent to black at bottom */}
          <div 
            className="absolute bottom-0 left-0 w-full h-[50%] z-20"
            style={{ 
              background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 50%, #000000 100%)' 
            }}
          ></div>
        </div>
        
        {/* Hero Content */}
        <div className="text-left relative z-20">
          <h1 className="text-4xl md:text-6xl font-['IBM_Plex_Mono'] font-normal mr-[15rem]">
            Form finds meaning,
          </h1>
          <h1 className="text-4xl md:text-6xl font-['IBM_Plex_Mono'] italic font-normal ml-[25rem] mt-[-5px]">
            meaning shapes form.
          </h1>
        </div>
        <div className="absolute bottom-[6rem] z-20">
          <svg 
            className="w-6 h-6 text-teal-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </div>
      </div> 
      
      {/* Projects Grid */}
      <div className="flex flex-col items-center justify-center mt-[-4rem]">
        <div className="grid grid-cols-2 gap-4 px-4">
          {projects.map((project) => (
            <GridItem 
              key={project.id}
              imageUrl={project.imageUrl}
              projectName={project.projectName}
              projectType={project.projectType}
              onClick={() => handleProjectClick(project.id)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home; 