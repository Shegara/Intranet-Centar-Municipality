import Navbar from "@/app/components/navbar";
import React from "react";
import Union from "@/app/components/union";
import Footer from "@/app/components/footer";

const Sindikat = () => {
  return (
    <div>
      <Navbar />
      <div
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/opcina_wallpaper.webp')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent opacity-20" />
        <Union />
      </div>
      <Footer />
    </div>
  );
};

export default Sindikat;
