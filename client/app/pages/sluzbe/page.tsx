"use client";

import Footer from '@/app/components/footer';
import Navbar from '@/app/components/navbar';
import Service from '@/app/components/service';
import React from 'react';

const Sluzba = () => {
  return (
    <div>
      <Navbar />
      <div
        className="relative h-screen bg-custom-gradient"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent opacity-20" />
        <Service />
      </div>
      <Footer />
    </div>
  );
};

export default Sluzba;
