import React from "react";
import { Link } from "react-router-dom";

function BackButton() {
  return (
    <Link
      to="/#work" viewTransition
      className="group inline-flex items-center gap-2 text-sm tracking-wide uppercase text-[#72EAE0] hover:text-white transition-colors duration-300"
    >
      <span className="transition-transform duration-300 group-hover:-translate-x-1" aria-hidden>
        ←
      </span>
      All work
    </Link>
  );
}

export default BackButton;
