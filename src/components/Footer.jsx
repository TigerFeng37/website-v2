import React from 'react';

function Footer() {
  return (
    <div className="flex flex-row justify-between pt-[4rem] pb-4 mx-4">
      <div className="flex flex-col justify-start">
        <span className="text-lg font-bold">FENG<span className="text-[#72EAE0]">_</span></span>
        <span className="text-lg font-bold">-</span>
        <span className="text-lg font-bold">-</span>
        <span className="text-lg font-bold">-</span>
        <span className="text-lg font-bold">-</span>
        <span className="text-lg font-bold text-gray-500">©Feng Works LLC</span>
      </div>
      <div className="flex flex-col items-end justify-start">
        <span className="text-lg font-medium">About</span>
        <span className="text-lg font-bold">-</span>
        <span className="text-lg font-bold">-</span>
        <span className="text-lg font-bold">-</span>
        <span className="text-lg font-bold">-</span>
        <span className="text-lg font-bold">-</span>
      </div>
    </div>
  );
}

export default Footer;