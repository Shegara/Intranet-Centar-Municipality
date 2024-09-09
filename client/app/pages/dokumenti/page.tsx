import React from "react";
import Navbar from "@/app/components/navbar";
import Docs from "@/app/components/docs";
import Footer from "@/app/components/footer";

const Documents = () => {
  return (
    <div>
      <Navbar />
      <div
        className="relative h-screen bg-custom-gradient"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full md:w-5/6 lg:w-3/4 xl:w-2/3">
            <Docs/>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Documents;
