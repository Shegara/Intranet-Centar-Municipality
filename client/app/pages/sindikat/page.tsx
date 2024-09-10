import Navbar from "@/app/components/navbar";
import React from "react";
import Union from "@/app/components/union";
import Footer from "@/app/components/footer";

const Sindikat: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div
        className="relative h-screen bg-custom-gradient"
      >
        <Union />
      </div>
      <Footer />
    </div>
  );
};

export default Sindikat;

