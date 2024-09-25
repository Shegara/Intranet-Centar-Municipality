'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import Groups2Icon from '@mui/icons-material/Groups2';
import WorkIcon from '@mui/icons-material/Work';
import FolderIcon from '@mui/icons-material/Folder';

const Main: React.FC = () => {
  const baseClasses = 'bg-red-700 w-40 h-36 sm:w-60 sm:h-56 flex flex-col border-4 border-white items-center justify-center rounded-2xl hover:scale-105 hover:bg-red-600 transition-transform duration-300 text-white cursor-pointer';
  const iconClasses = 'text-white text-6xl sm:text-8xl';

  const navItems = useMemo(() => [
    { href: '/pages/imenik', label: 'Imenik', icon: <ContactPhoneIcon className={iconClasses} /> },
    { href: '/pages/sluzbe', label: 'Službe', icon: <WorkIcon className={iconClasses} /> },
    { href: '/pages/sindikat', label: 'Sindikat', icon: <Groups2Icon className={iconClasses} /> },
    { href: '/pages/dokumenti', label: 'Dokumenti', icon: <FolderIcon className={iconClasses} /> },
  ], []);

  return (
    <section className="relative h-screen">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent opacity-60" />
      
      <h1 className="absolute hidden md:block md:top-60 left-1/2 transform -translate-x-1/2 text-white sm:text-5xl lg:text-7xl font-bold whitespace-nowrap">
        Intranet Općine Centar
      </h1>

      <nav className="relative z-10 flex items-center justify-center h-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-20 mx-auto">
          {navItems.map((item) => (
            <Link href={item.href} key={item.label} aria-label={item.label} passHref>
              <div className={baseClasses}>
                {item.icon}
                <span className="mt-4 text-xl sm:text-2xl">{item.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </nav>
    </section>
  );
};

export default React.memo(Main);
