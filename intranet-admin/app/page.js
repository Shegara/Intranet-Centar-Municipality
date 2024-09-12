import React from "react";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import FolderIcon from "@mui/icons-material/Folder";
import "./globals.css";

const Main = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      
      <div className="text-center mb-12 px-6 py-4 bg-white rounded-lg shadow-lg border border-gray-300">
        <h1 className="text-gray-800 sm:text-5xl lg:text-7xl font-bold whitespace-nowrap">
          Admin Dashboard Intranet OC
        </h1>
      </div>

      <div className="z-10 flex items-center justify-center">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8 mx-auto">
          <a
            href="/pages/users"
            className="bg-white w-40 h-36 sm:w-60 sm:h-56 flex flex-col border border-gray-300 items-center justify-center rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 transition duration-300 text-gray-800"
          >
            <ContactPhoneIcon style={{ fontSize: 80, color: "gray" }} />
            <span className="mt-4 text-xl font-semibold">Uredi imenik</span>
          </a>

          <a
            href="/pages/docs"
            className="bg-white w-40 h-36 sm:w-60 sm:h-56 flex flex-col border border-gray-300 items-center justify-center rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 transition duration-300 cursor-pointer text-gray-800"
          >
            <FolderIcon style={{ fontSize: 80, color: "gray" }} />
            <span className="mt-4 text-xl font-semibold">Uredi dokumente</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Main;
