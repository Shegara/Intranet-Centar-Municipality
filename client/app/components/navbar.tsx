"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import MenuIcon from '@mui/icons-material/Menu';
import CancelIcon from '@mui/icons-material/Cancel';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <nav className="bg-red-700 border-b-2 border-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-2 lg:px-2 flex items-center justify-between h-16 relative">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <a href="/" className="flex items-center">
                <Image
                  src="/opcina_logo.webp"
                  width={50}
                  height={50}
                  alt="opcina_logo"
                />
                <p className="text-white ml-2 text-l md:text-xl">
                  Intranet Općine Centar
                </p>
              </a>
            </div>
          </div>
          <div className="flex items-center hidden md:flex">
            <a 
              href='/pages/imenik' 
              className="text-white rounded-lg px-5 py-3 hover:bg-white hover:text-black transition duration-300 block mr-3"
            >
              Imenik
            </a>
            <a 
              href='/pages/sluzbe' 
              className="text-white rounded-lg px-5 py-3 hover:bg-white hover:text-black transition duration-300 block mr-3"
            >
              Službe
            </a>
            <a 
              href='/pages/sindikat' 
              className="text-white rounded-lg px-5 py-3 hover:bg-white hover:text-black transition duration-300 block mr-3"
            >
              Sindikat
            </a>
            <a 
              href='/pages/dokumenti' 
              className="text-white rounded-lg px-5 py-3 hover:bg-white hover:text-black transition duration-300 block mr-3"
            >
              Dokumenti
            </a>
          </div>
          <div className="md:hidden flex items-center">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={toggleNavbar}
            >
              <div className="relative w-8 h-8 flex items-center justify-center">
                <span
                  className={`block w-6 h-0.5 bg-white absolute transition-transform duration-300 ease-in-out ${
                    isOpen ? 'rotate-45 translate-y-0' : 'top-2'
                  }`}
                ></span>
                <span
                  className={`block w-6 h-0.5 bg-white absolute transition-transform duration-300 ease-in-out ${
                    isOpen ? 'opacity-0' : 'top-4'
                  }`}
                ></span>
                <span
                  className={`block w-6 h-0.5 bg-white absolute transition-transform duration-300 ease-in-out ${
                    isOpen ? '-rotate-45 -translate-y-0' : 'top-6'
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a 
                href='/pages/imenik' 
                className="text-white rounded-lg px-5 py-3 hover:bg-white hover:text-black transition duration-300 block"
              >
                Imenik
              </a>
              <a 
                href='/pages/sluzbe' 
                className="text-white rounded-lg px-5 py-3 hover:bg-white hover:text-black transition duration-300 block"
              >
                Službe
              </a>
              <a 
                href='/pages/sindikat' 
                className="text-white rounded-lg px-5 py-3 hover:bg-white hover:text-black transition duration-300 block"
              >
                Sindikat
              </a>
              <a 
                href='/pages/dokumenti' 
                className="text-white rounded-lg px-5 py-3 hover:bg-white hover:text-black transition duration-300 block"
              >
                Dokumenti
              </a>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
