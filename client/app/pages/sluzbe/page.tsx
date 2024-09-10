"use client";

import Footer from '@/app/components/footer';
import Navbar from '@/app/components/navbar';
import Service from '@/app/components/service';
import React from 'react';

const Sluzba: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div
        className="relative h-screen bg-custom-gradient"
      >
        <Service />
      </div>
      <Footer />
    </div>
  );
};

export default Sluzba;
