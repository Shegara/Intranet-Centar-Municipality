"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fieldLabels = {
  name: "Ime dokumenta",
  category: "Kategorija",
  document: "Dokument",
};

const CreateDocs = () => {
  const [createDoc, setCreateDoc] = useState({
    name: "",
    category: "",
    document: null,
  });

  const [loading, setLoading] = useState(false);

  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setCreateDoc((prev) => ({ ...prev, [name]: value }));
  };

  const handleDocumentChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCreateDoc((prev) => ({ ...prev, document: file }));
    }
  };

  const handleCreate = async () => {
    setLoading(true);

    const formData = new FormData();
    for (const key in createDoc) {
      if (createDoc[key] !== null) {
        formData.append(key, createDoc[key]);
      }
    }

    try {
      const response = await axios.post("http://localhost:8800/api/docs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("API Response:", response.data);
      toast.success("Dokument uspješno kreiran u bazi podataka");
      setCreateDoc({
        name: "",
        category: "",
        document: null,
      });
    } catch (error) {
      console.error("Error during API request:", error);
      toast.error("Greška u kreiranju dokumenta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border border-gray-300 max-w-2xl md:max-w-4xl mx-auto mt-5">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
        Dodaj novi dokument
      </h2>
      {Object.keys(createDoc).map((key) => (
        <div key={key} className="mb-4">
          <label className="block text-gray-700 capitalize">
            {fieldLabels[key] || key.replace("_", " ")}
          </label>
          {key === "document" ? (
            <>
              <label className="mt-1 inline-block px-4 py-2 border border-gray-300 rounded-md shadow-sm cursor-pointer bg-blue-500 text-white text-center hover:bg-blue-600 transition-colors duration-200">
                {createDoc.document
                  ? "Promijeni u drugi dokument"
                  : "Izaberi dokument"}
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleDocumentChange}
                  className="hidden"
                />
              </label>
              {createDoc.document && (
                <div className="relative mt-2 max-w-2xs">
                  <p>{createDoc.document.name}</p>
                  <button
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
                    onClick={() =>
                      setCreateDoc((prev) => ({ ...prev, document: null }))
                    }
                  >
                    &#10005;
                  </button>
                </div>
              )}
            </>
          ) : (
            <input
              type="text"
              name={key}
              value={createDoc[key]}
              onChange={handleCreateChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          )}
        </div>
      ))}
      <button
        onClick={handleCreate}
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
        disabled={loading}
      >
        Dodaj Dokument
      </button>
    </div>
  );
};

export default CreateDocs;
