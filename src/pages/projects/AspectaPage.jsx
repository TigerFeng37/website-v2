import React from "react";
import BackButton from "../../components/BackButton";
import hero3 from "../../assets/Aspecta-Hero.png";
import colorSystem from "../../assets/aspecta/color-system.png";

function AspectaPage() {
  return (
    <div className="py-24 px-8 max-w-6xl mx-auto">
      <BackButton />
      
      {/* Different layout for this project */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-12">
        <div>
          <h1 className="text-5xl font-['IBM_Plex_Sans'] font-medium mb-2">ASPECTA</h1>
          <p className="text-xl text-gray-400">BRAND DESIGN</p>
        </div>
        <div className="mt-4 md:mt-0 md:w-1/3">
          <p className="text-lg text-gray-300">
            A minimalist brand identity for Aspecta, focusing on the golden ratio and geometric harmony.
          </p>
        </div>
      </div>
      
      <div className="mb-16 rounded-lg overflow-hidden">
        <img src={hero3} alt="Aspecta" className="w-full" />
      </div>
      
      {/* Project-specific content with a unique layout */}
      <div className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-medium mb-6">Brand Philosophy</h2>
            <p className="text-lg text-gray-300 mb-6">
              Aspecta's brand is built around the concept of perfect proportions and visual harmony.
              The name itself references both aspect ratios and the idea of looking at things from
              different perspectives.
            </p>
          </div>
        </div>
      </div>
      
      {/* 3 Image Collage - Two horizontal and one vertical */}
      <div className="mb-16">
        <h2 className="text-2xl font-medium mb-6">Design Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1 aspect-[2/3] bg-gray-800 rounded-lg overflow-hidden">
            {/* Placeholder for vertical image */}
            <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-600">
              Vertical Image
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="grid grid-rows-2 gap-4 h-full">
              <div className="aspect-[3/1.5] bg-gray-800 rounded-lg overflow-hidden">
                {/* Placeholder for horizontal image 1 */}
                <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-600">
                  Horizontal Image 1
                </div>
              </div>
              <div className="aspect-[3/1.5] bg-gray-800 rounded-lg overflow-hidden">
                {/* Placeholder for horizontal image 2 */}
                <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-600">
                  Horizontal Image 2
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Color palette section with image */}
      <div className="mb-16">
        <div className="rounded-lg overflow-hidden">
          <img 
            src={colorSystem} 
            alt="Aspecta Color System" 
            className="w-[50%]"
          />
        </div>
      </div>
      
      
      {/* Hero Image Section 1 */}
      <div className="mb-16">
        <div className="aspect-[21/9] bg-gray-800 rounded-lg overflow-hidden">
          {/* Placeholder for hero image 1 */}
          <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-600">
            Hero Image 1
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-medium mb-3">Typography System</h3>
            <p className="text-gray-300">
              A carefully selected combination of fonts creates visual hierarchy while maintaining readability across all brand applications.
            </p>
          </div>
          <div>
            <p className="text-gray-300">
              The primary typeface is paired with a complementary secondary font that enhances versatility across digital and print media.
            </p>
          </div>
        </div>
      </div>
      
      {/* Large Client Quote Section */}
      <div className="mb-16 py-16 px-8 bg-gray-900 rounded-lg text-center">
        <blockquote className="max-w-4xl mx-auto">
          <p className="text-3xl md:text-4xl font-['IBM_Plex_Mono'] italic font-light text-[#72EAE0] leading-relaxed mb-8">
            "Aspecta's design system transformed how our audiences perceive our brand. The thoughtful proportions and harmonious elements create an identity that is both memorable and timeless."
          </p>
          <footer className="text-lg text-gray-300">
            <span className="font-medium">— Sarah Johnson</span>, Creative Director at Aspecta
          </footer>
        </blockquote>
      </div>
      
      {/* Hero Image Section 2 */}
      <div className="mb-16">
        <div className="aspect-[21/9] bg-gray-800 rounded-lg overflow-hidden">
          {/* Placeholder for hero image 2 */}
          <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-600">
            Hero Image 2
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-medium mb-3">Applications</h3>
          <p className="text-gray-300 max-w-3xl">
            The brand system was designed to be highly adaptable, working seamlessly across digital platforms, environmental graphics, and print materials. Each application maintains the core principles of proportion and balance.
          </p>
        </div>
      </div>
      
      <div className="bg-gray-900 p-6 rounded-lg">
        <h3 className="text-xl font-medium mb-4">Project Details</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <h4 className="text-sm text-gray-400">CLIENT</h4>
            <p>Aspecta Design Studio</p>
          </div>
          <div>
            <h4 className="text-sm text-gray-400">YEAR</h4>
            <p>2023</p>
          </div>
          <div>
            <h4 className="text-sm text-gray-400">SERVICES</h4>
            <p>Brand Identity, Logo Design</p>
          </div>
          <div>
            <h4 className="text-sm text-gray-400">WEBSITE</h4>
            <p>aspecta.design</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AspectaPage; 