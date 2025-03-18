import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Page not found</h2>
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

export default NotFound; 