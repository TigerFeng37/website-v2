import React from "react";
import BackButton from "../../components/BackButton";
import hero4 from "../../assets/Eclair-Hero.png";

function EclairPage() {
  return (
    <div className="py-24 px-8 max-w-6xl mx-auto">
      <BackButton />
      
      {/* Full-width hero layout */}
      <div className="mb-12 rounded-lg overflow-hidden">
        <img src={hero4} alt="Eclair" className="w-full" />
      </div>
      
      <div className="text-center mb-16">
        <h1 className="text-6xl font-['IBM_Plex_Sans'] font-medium mb-2">ECLAIR</h1>
        <p className="text-xl text-gray-400">BRAND DESIGN</p>
      </div>
      
      <div className="max-w-3xl mx-auto mb-20">
        <p className="text-xl text-gray-300 leading-relaxed">
          Eclair is a premium pastry brand that combines French tradition with modern aesthetics.
          The branding emphasizes lightness, sweetness, and artisanal craftsmanship through a
          sophisticated visual language.
        </p>
      </div>
      
      {/* Project-specific gallery layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="aspect-square bg-gray-800 rounded-lg"></div>
        <div className="aspect-square bg-gray-800 rounded-lg"></div>
        <div className="aspect-square bg-gray-800 rounded-lg"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-medium mb-4">Brand Story</h2>
          <p className="text-lg text-gray-300">
            The Eclair brand tells a story of tradition meeting innovation. The name not only
            references the delicious French pastry but also means "flash of light" in French,
            informing the brand's visual identity with elements of brightness and illumination.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-medium mb-4">Typography</h2>
          <p className="text-lg text-gray-300">
            A custom serif typeface was developed for Eclair, featuring delicate terminals and
            subtle curves that echo the craftsmanship found in their pastries. The type system
            balances elegance with readability across all brand applications.
          </p>
        </div>
      </div>
      
      <div className="flex justify-between items-center bg-gray-900 p-6 rounded-lg">
        <div>
          <h3 className="text-xl font-medium mb-2">Project Details</h3>
          <p className="text-gray-400">Brand Identity for Premium Pastry Shop, 2024</p>
        </div>
        <button className="px-6 py-3 bg-[#72EAE0] text-black rounded hover:bg-teal-300">
          View Case Study
        </button>
      </div>
    </div>
  );
}

export default EclairPage; 