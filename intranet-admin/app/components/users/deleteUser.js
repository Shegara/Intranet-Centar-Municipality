"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteUser = () => {
  const [deleteId, setDeleteId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDeleteChange = (e) => {
    setDeleteId(e.target.value);
  };

  const handleDelete = async () => {
    if (!deleteId) {
      toast.error("Unesite ID uposlenika za brisanje");
      return;
    }

    setLoading(true);

    try {
      await axios.delete(`http://localhost:8800/api/users/${deleteId}`);
      toast.success("Uposlenik uspješno obrisan iz baze podataka");
      setDeleteId("");
    } catch (error) {
      console.error(error);
      toast.error("Greška u brisanju uposlenika");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border border-gray-300 max-w-2xl md:max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
        Obriši uposlenika
      </h2>
      <div className="mb-4">
        <label className="block text-gray-700">ID uposlenika za brisanje</label>
        <input
          type="text"
          name="deleteId"
          value={deleteId}
          onChange={handleDeleteChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
        disabled={loading}
      >
        Obriši
      </button>
    </div>
  );
};

export default DeleteUser;
