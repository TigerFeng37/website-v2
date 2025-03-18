import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import hero1 from "../assets/Academy-Records-Hero.png";
import hero2 from "../assets/Tokyo-Trackmap-Hero.png";
import hero3 from "../assets/Aspecta-Hero.png";
import hero4 from "../assets/Eclair-Hero.png";

const projectsData = {
  "academy-records": {
    title: "ACADEMY RECORDS",
    type: "BRAND DESIGN",
    image: hero1,
    description: "A complete brand identity for Academy Records, focusing on modern design with vintage influences.",
    // Add more details for this project
  },
  "tokyo-trackmap": {
    title: "TOKYO TRACKMAP",
    type: "DESIGN EXPERIMENT",
    image: hero2,
    description: "An experimental mapping project visualizing Tokyo's complex railway system.",
    // Add more details for this project
  },
  "aspecta": {
    title: "ASPECTA",
    type: "BRAND DESIGN",
    image: hero3,
    description: "A brand identity system for Aspecta, focusing on geometric forms and harmonious proportions.",
    // Add more details for this project
  },
  "eclair": {
    title: "ECLAIR",
    type: "BRAND DESIGN",
    image: hero4,
    description: "Branding for Eclair, incorporating elements of light and sweetness.",
    // Add more details for this project
  }
};

function ProjectPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const project = projectsData[projectId];

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Project not found</h2>
          <button 
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-[#72EAE0] text-black rounded hover:bg-teal-300"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 px-8 max-w-6xl mx-auto">
      <button 
        onClick={() => navigate('/')}
        className="mb-8 flex items-center text-[#72EAE0] hover:underline"
      >
        <span className="mr-2">←</span> Back to projects
      </button>
      
      <div className="mb-12">
        <h1 className="text-5xl font-['IBM_Plex_Sans'] font-medium mb-2">{project.title}</h1>
        <p className="text-xl text-gray-400">{project.type}</p>
      </div>
      
      <div className="mb-12 rounded-lg overflow-hidden">
        <img src={project.image} alt={project.title} className="w-full" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-medium mb-4">Overview</h2>
          <p className="text-lg text-gray-300 mb-6">{project.description}</p>
          {/* Add more content sections as needed */}
        </div>
        
        <div className="bg-gray-900 p-6 rounded-lg">
          <h3 className="text-xl font-medium mb-4">Project Details</h3>
          <div className="mb-4">
            <h4 className="text-sm text-gray-400">CLIENT</h4>
            <p>Client Name</p>
          </div>
          <div className="mb-4">
            <h4 className="text-sm text-gray-400">YEAR</h4>
            <p>2024</p>
          </div>
          <div className="mb-4">
            <h4 className="text-sm text-gray-400">SERVICES</h4>
            <p>Brand Identity, Digital Design</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectPage; 