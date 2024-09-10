import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="bg-red-700 border-t-2 border-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-2 flex justify-between items-center lg:px-2 h-10 relative">
        <h1 className="text-white">Centar za uposlenike Općine Centar</h1>
        <h1 className="text-white hidden md:block">Kabinet Informatike OC - 2024</h1>
      </div>
    </div>
  );
};

export default Footer;
