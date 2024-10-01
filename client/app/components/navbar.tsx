'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleNavbar = () => {
    setIsOpen((prev) => !prev);
  };

  const links = ['imenik', 'sluzbe', 'sindikat', 'dokumenti'];

  return (
    <nav className="bg-red-700 border-b-2 border-white">
      <div className="md:ml-20 md:mr-20 lg:max-w-8xl mx-auto px-6 sm:px-2 lg:px-2 flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/opcina_logo.webp"
              width={50}
              height={50}
              alt="opcina_logo"
            />
            <p className="text-white ml-2 text-l md:text-xl">
              Intranet Općine Centar
            </p>
          </Link>
        </div>

        <div className="hidden md:flex space-x-4">
          {links.map((page) => (
            <Link 
              key={page} 
              href={`/pages/${page}`} 
              className="text-white rounded-lg px-5 py-3 hover:bg-white hover:text-black transition duration-300"
            >
              {page.charAt(0).toUpperCase() + page.slice(1)}
            </Link>
          ))}
        </div>

        <div className="md:hidden flex items-center">
          <button
            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            onClick={toggleNavbar}
          >
            <div className="relative w-8 h-8 flex items-center justify-center">
              <span className={`block w-6 h-0.5 bg-white absolute transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-0' : 'top-2'}`}></span>
              <span className={`block w-6 h-0.5 bg-white absolute transition-transform duration-300 ease-in-out ${isOpen ? 'opacity-0' : 'top-4'}`}></span>
              <span className={`block w-6 h-0.5 bg-white absolute transition-transform duration-300 ease-in-out ${isOpen ? '-rotate-45 -translate-y-0' : 'top-6'}`}></span>
            </div>
          </button>
        </div>
      </div>

      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} px-2 pt-2 pb-3 space-y-1 sm:px-3`}>
        {links.map((page) => (
          <Link 
            key={page} 
            href={`/pages/${page}`} 
            className="text-white rounded-lg px-5 py-3 hover:bg-white hover:text-black transition duration-300 block"
          >
            {page.charAt(0).toUpperCase() + page.slice(1)}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default React.memo(Navbar);
