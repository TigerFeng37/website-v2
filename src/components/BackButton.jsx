import React from "react";
import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();
  
  return (
    <button 
      onClick={() => navigate('/')}
      className="mb-8 flex items-center text-[#72EAE0] hover:text-[#72EAE0]/80 transition-all duration-300"
    >
      <span className="mr-2">←</span> Back to projects
    </button>
  );
}

export default BackButton; 