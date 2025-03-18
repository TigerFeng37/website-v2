import React from "react";
import { useNavigate } from "react-router-dom";

function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-32 px-8 max-w-6xl mx-auto">
      <h1 className="text-5xl font-['IBM_Plex_Sans'] font-medium mb-12 view-transition-name-title">ABOUT</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
        <div className="view-transition-name-about-content">
          <h2 className="text-2xl font-medium mb-6">Background</h2>
          <p className="text-lg text-gray-300 mb-6">
            I'm a multidisciplinary designer with a passion for creating meaningful
            interactions through thoughtful design. With over 8 years of experience
            across brand identity, UI/UX, and experimental design projects, I focus on
            creating work that connects with audiences on both functional and emotional levels.
          </p>
          <p className="text-lg text-gray-300 mb-6">
            My approach combines meticulous attention to detail with a holistic understanding
            of how design systems work across different touchpoints. I believe good design
            should be both beautiful and purposeful.
          </p>
        </div>
        
        <div className="view-transition-name-about-skills">
          <h2 className="text-2xl font-medium mb-6">Skills</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-medium mb-3 text-[#72EAE0]">Design</h3>
              <ul className="text-lg text-gray-300 space-y-2">
                <li>Brand Identity</li>
                <li>UI/UX Design</li>
                <li>Typography</li>
                <li>Motion Graphics</li>
                <li>Art Direction</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-3 text-[#72EAE0]">Technical</h3>
              <ul className="text-lg text-gray-300 space-y-2">
                <li>Adobe Creative Suite</li>
                <li>Figma / Sketch</li>
                <li>HTML & CSS</li>
                <li>React</li>
                <li>Motion Design</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-900 p-8 rounded-lg mb-16 view-transition-name-about-experience">
        <h2 className="text-2xl font-medium mb-6">Experience</h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-medium mb-1">Senior Designer — Design Studio X</h3>
            <p className="text-gray-400 mb-3">2020 — Present</p>
            <p className="text-gray-300">Leading brand identity projects for clients across technology, arts, and education sectors.</p>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-1">UI/UX Designer — Tech Company Y</h3>
            <p className="text-gray-400 mb-3">2017 — 2020</p>
            <p className="text-gray-300">Designed user experiences for web and mobile applications, focusing on usability and accessibility.</p>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-1">Junior Designer — Agency Z</h3>
            <p className="text-gray-400 mb-3">2015 — 2017</p>
            <p className="text-gray-300">Collaborated on various design projects while developing skills in digital and print media.</p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-16 view-transition-name-about-contact">
        <div>
          <h2 className="text-2xl font-medium mb-3">Get in Touch</h2>
          <p className="text-lg text-gray-300">
            Interested in working together? Let's create something meaningful.
          </p>
        </div>
        <a 
          href="mailto:hello@feng.design" 
          className="px-6 py-3 bg-[#72EAE0] text-black rounded hover:bg-teal-300 transition-colors"
        >
          Contact Me
        </a>
      </div>
    </div>
  );
}

export default AboutPage; 