import React from "react";
import BackButton from "../../components/BackButton";
import hero2 from "../../assets/Tokyo-Trackmap-Hero.png";

function TokyoTrackmapPage() {
  return (
    <div className="py-24 px-8 max-w-6xl mx-auto">
      <BackButton />
      
      <div className="mb-12">
        <h1 className="text-5xl font-['IBM_Plex_Sans'] font-medium mb-2">TOKYO TRACKMAP</h1>
        <p className="text-xl text-gray-400">DESIGN EXPERIMENT</p>
      </div>
      
      <div className="mb-12 rounded-lg overflow-hidden">
        <img src={hero2} alt="Tokyo Trackmap" className="w-full" />
      </div>
      
      {/* Custom layout for this specific project */}
      <div className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Concept</h2>
        <p className="text-lg text-gray-300">
          Tokyo Trackmap is an experimental mapping project visualizing Tokyo's complex railway system.
          This project explores new ways of representing spatial information through abstract geometric forms,
          challenging traditional mapping conventions.
        </p>
      </div>
      
      {/* Project-specific layout with a different grid structure */}
      <div className="grid grid-cols-2 gap-8 mb-12">
        <div>
          <h3 className="text-xl font-medium mb-3">Methodology</h3>
          <p className="text-lg text-gray-300">
            The project began by collecting GIS data of Tokyo's rail network, then applying custom algorithms
            to transform the geographical information into abstract patterns while preserving key relationships.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-medium mb-3">Visual Language</h3>
          <p className="text-lg text-gray-300">
            A minimal color palette was chosen to emphasize the complex structural patterns. Line weights
            reflect passenger volume, creating a visual hierarchy that reveals usage patterns.
          </p>
        </div>
      </div>
      
      <div className="bg-gray-900 p-6 rounded-lg">
        <div className="flex justify-between items-start flex-wrap">
          <div className="mb-4 mr-8">
            <h4 className="text-sm text-gray-400">PROJECT TYPE</h4>
            <p>Self-initiated research</p>
          </div>
          <div className="mb-4 mr-8">
            <h4 className="text-sm text-gray-400">YEAR</h4>
            <p>2024</p>
          </div>
          <div className="mb-4">
            <h4 className="text-sm text-gray-400">TOOLS</h4>
            <p>Processing, QGIS, Adobe Illustrator</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TokyoTrackmapPage; 