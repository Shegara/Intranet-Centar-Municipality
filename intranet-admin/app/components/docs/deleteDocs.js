"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteDocs = () => {
  const [docId, setDocId] = useState("");

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8800/api/docs/${docId}`);
      toast.success("Dokument uspješno obrisan");
      setDocId("");
    } catch (error) {
      console.error("Error during delete:", error);
      toast.error("Greška prilikom brisanja dokumenta");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border border-gray-300 max-w-2xl md:max-w-4xl mx-auto mt-5">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
        Obriši dokument
      </h2>
      <input
        type="text"
        placeholder="Unesi ID dokumenta"
        value={docId}
        onChange={(e) => setDocId(e.target.value)}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none mt-4"
      >
        Obriši Dokument
      </button>
    </div>
  );
};

export default DeleteDocs;
