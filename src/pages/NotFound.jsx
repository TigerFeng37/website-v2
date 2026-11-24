import React from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";

function NotFound() {
  return (
    <div className="flex items-center min-h-screen px-6 md:px-8 max-w-6xl mx-auto">
      <Seo title="Page not found" />
      <div>
        <p className="font-mono text-sm tracking-widest text-[#72EAE0] mb-4">ERROR 404</p>
        <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6">
          This page doesn't exist.
        </h1>
        <p className="text-lg text-gray-400 mb-10 max-w-xl">
          The link may be out of date, or the project may have moved.
        </p>
        <Link
          to="/#works"
          className="group inline-flex items-center gap-3 px-5 py-3 bg-[#72EAE0] text-black rounded transition-colors hover:bg-white"
        >
          See all work
          <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
