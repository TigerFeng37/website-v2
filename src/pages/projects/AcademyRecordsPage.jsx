import React from "react";
import BackButton from "../../components/BackButton";
import hero1 from "../../assets/Academy-Records-Hero.png";

function AcademyRecordsPage() {
  return (
    <div className="py-24 px-8 max-w-6xl mx-auto">
      <BackButton />
      
      <div className="mb-12">
        <h1 className="text-5xl font-['IBM_Plex_Sans'] font-medium mb-2">ACADEMY RECORDS</h1>
        <p className="text-xl text-gray-400">BRAND DESIGN</p>
      </div>
      
      <div className="mb-12 rounded-lg overflow-hidden">
        <img src={hero1} alt="Academy Records" className="w-full" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-medium mb-4">Overview</h2>
          <p className="text-lg text-gray-300 mb-6">
            A complete brand identity for Academy Records, focusing on modern design with vintage influences.
            The project aimed to capture the essence of classic vinyl records while presenting a contemporary 
            aesthetic that appeals to both collectors and casual music enthusiasts.
          </p>
          
          <h2 className="text-2xl font-medium mb-4 mt-8">Design Process</h2>
          <p className="text-lg text-gray-300 mb-6">
            The design process began with extensive research into the history of record labels and vinyl 
            culture. Multiple concepts were explored before arriving at the final design direction that 
            balances nostalgia with contemporary appeal.
          </p>
          
          {/* Additional custom sections specific to this project */}
        </div>
        
        <div className="bg-gray-900 p-6 rounded-lg h-fit">
          <h3 className="text-xl font-medium mb-4">Project Details</h3>
          <div className="mb-4">
            <h4 className="text-sm text-gray-400">CLIENT</h4>
            <p>Academy Records</p>
          </div>
          <div className="mb-4">
            <h4 className="text-sm text-gray-400">YEAR</h4>
            <p>2023</p>
          </div>
          <div className="mb-4">
            <h4 className="text-sm text-gray-400">SERVICES</h4>
            <p>Brand Identity, Logo Design, Packaging</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AcademyRecordsPage; 