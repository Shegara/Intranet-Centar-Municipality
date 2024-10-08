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

const UpdateDocs = () => {
  const [docId, setDocId] = useState("");
  const [docData, setDocData] = useState(null);
  const [updateDoc, setUpdateDoc] = useState({
    name: "",
    category: "",
    document: null,
  });

  const fetchDocsData = async (id) => {
    try {
      const response = await axios.get(`http://192.168.1.2:8800/api/docs/${id}`);
      setDocData(response.data);
      setUpdateDoc(response.data); 
    } catch (error) {
      toast.error("Greška u učitavanju dokumenata");
    }
  };

  const [loading, setLoading] = useState(false);

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateDoc((prev) => ({ ...prev, [name]: value }));
  };

  const handleDocumentChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUpdateDoc((prev) => ({ ...prev, document: file }));
    }
  };

  const handleUpdate = async () => {
    setLoading(true);

    const formData = new FormData();
    Object.keys(updateDoc).forEach((key) => {
      if (key === "document") {
        if (updateDoc.document) {
          formData.append(key, updateDoc.document);
        }
      } else if (updateDoc[key] !== null && updateDoc[key] !== "") {
        formData.append(key, updateDoc[key]);
      }
    });

    try {
      await axios.put(`http://localhost:8800/api/docs/${docId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Dokument uspješno ažuriran u bazi podataka");
    } catch (error) {
      toast.error("Greška u ažuriranju dokumenta");
    }
  };

  const handleFetchDoc = () => {
    if (docId) {
      fetchDocsData(docId); 
    } else {
      toast.error("Unesi ID dokumenta");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border border-gray-300 max-w-2xl md:max-w-4xl mx-auto mt-5">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
        Ažuriraj dokument
      </h2>
      <input
        type="text"
        placeholder="Unesi ID dokumenta"
        value={docId}
        onChange={(e) => setDocId(e.target.value)}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-4"
      />
      <button
        onClick={handleFetchDoc}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none mb-4"
      >
        Učitaj podatke
      </button>
      {docData && (
        <>
          {Object.keys(updateDoc).map((key) => (
            <div key={key} className="mb-4">
              <label className="block text-gray-700 capitalize">
                {fieldLabels[key] || key.replace("_", " ")}
              </label>
              {key === "document" ? (
                <>
                  <label className="mt-1 inline-block px-4 py-2 border border-gray-300 rounded-md shadow-sm cursor-pointer bg-blue-500 text-white text-center hover:bg-blue-600 transition-colors duration-200">
                    {updateDoc.document
                      ? "Promijeni u drugi dokument"
                      : "Izaberi dokument"}
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleDocumentChange}
                      className="hidden"
                    />
                  </label>
                  {updateDoc.document && (
                    <div className="relative mt-2 max-w-2xs">
                      <p>{updateDoc.document.name}</p>
                      <button
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
                        onClick={() =>
                          setUpdateDoc((prev) => ({ ...prev, document: null }))
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
                  value={updateDoc[key]}
                  onChange={handleUpdateChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              )}
            </div>
          ))}
          <button
            onClick={handleUpdate}
            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 focus:outline-none"
            disabled={loading}
          >
            Ažuriraj Dokument
          </button>
        </>
      )}
    </div>
  );
};

export default UpdateDocs;
