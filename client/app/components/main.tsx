import React from "react";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import Groups2Icon from "@mui/icons-material/Groups2";
import WorkIcon from "@mui/icons-material/Work";
import FolderIcon from "@mui/icons-material/Folder";

const Main: React.FC = () => {
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent opacity-60" />

      <h1 className="absolute hidden md:block md:top-60 left-1/2 transform -translate-x-1/2 text-white sm:text-5xl lg:text-7xl font-bold whitespace-nowrap">
        Intranet Općine Centar
      </h1>

      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-20 mx-auto">
          <a
            href="/pages/imenik"
            className="bg-red-700 w-40 h-36 sm:w-60 sm:h-56 
            flex flex-col border-4 border-white items-center justify-center 
            rounded-2xl hover:scale-105 hover:bg-red-600 
            transition-transform duration-300 transition duration-300 
            cursor-pointer text-white"
          >
            <ContactPhoneIcon style={{ fontSize: 80, color: "white" }} />
            <span className="mt-4 text-xl">Imenik</span>
          </a>
          <a
            href="/pages/sluzbe"
            className="bg-red-700 w-40 h-36 sm:w-60 sm:h-56 
            flex flex-col border-4 border-white items-center justify-center 
            rounded-2xl hover:scale-105 hover:bg-red-600 
            transition-transform duration-300 transition duration-300 
            cursor-pointer text-white"
          >
            <WorkIcon style={{ fontSize: 80, color: "white" }} />
            <span className="mt-4 text-xl">Službe</span>
          </a>
          <a
            href="/pages/sindikat"
            className="bg-red-700 w-40 h-36 sm:w-60 sm:h-56 
            flex flex-col border-4 border-white items-center justify-center 
            rounded-2xl hover:scale-105 hover:bg-red-600 
            transition-transform duration-300 transition duration-300 
            cursor-pointer text-white"
          >
            <Groups2Icon style={{ fontSize: 80, color: "white" }} />
            <span className="mt-4 text-xl">Sindikat</span>
          </a>
          <a
            href="/pages/dokumenti"
            className="bg-red-700 w-40 h-36 sm:w-60 sm:h-56 
            flex flex-col border-4 border-white items-center justify-center 
            rounded-2xl hover:scale-105 hover:bg-red-600 
            transition-transform duration-300 transition duration-300 
            cursor-pointer text-white"
          >
            <FolderIcon style={{ fontSize: 80, color: "white" }} />
            <span className="mt-4 text-xl">Dokumenti</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Main;
