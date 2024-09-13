"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fieldLabels = {
  first_name: "Ime",
  last_name: "Prezime",
  phone_num: "Broj telefona",
  mail: "Email",
  rank: "Pozicija",
  floor: "Sprat",
  office_num: "Broj kancelarije",
  image: "Slika",
  service: "Služba",
};

const CreateUser = () => {
  const [createUser, setCreateUser] = useState({
    first_name: "",
    last_name: "",
    phone_num: "",
    mail: "",
    rank: "",
    floor: "",
    office_num: "",
    image: null,
    service: "",
  });

  const [loading, setLoading] = useState(false);

  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setCreateUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCreateUser((prev) => ({ ...prev, image: file }));
    }
  };

  const handleCreate = async () => {
    setLoading(true);

    const formData = new FormData();
    for (const key in createUser) {
      // Append each field to FormData, including files
      if (createUser[key] !== null) {
        formData.append(key, createUser[key]);
      }
    }

    try {
      const response = await axios.post("http://localhost:8800/api/users", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("API Response:", response.data);
      toast.success("Uposlenik uspješno kreiran u bazi podataka");
      setCreateUser({
        first_name: "",
        last_name: "",
        phone_num: "",
        mail: "",
        rank: "",
        floor: "",
        office_num: "",
        image: null,
        service: "",
      });
    } catch (error) {
      console.error("Error during API request:", error);
      toast.error("Greška u kreiranju uposlenika");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border border-gray-300 max-w-2xl md:max-w-4xl mx-auto mt-5">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
        Dodaj novog uposlenika
      </h2>
      {Object.keys(createUser).map(
        (key) =>
          key !== "id" && (
            <div key={key} className="mb-4">
              <label className="block text-gray-700 capitalize">
                {fieldLabels[key] || key.replace("_", " ")}
              </label>
              {key === "image" ? (
                <>
                  <label className="mt-1 inline-block px-4 py-2 border border-gray-300 rounded-md shadow-sm cursor-pointer bg-blue-500 text-white text-center hover:bg-blue-600 transition-colors duration-200">
                    {createUser.image
                      ? "Promijeni u drugu sliku"
                      : "Izaberi sliku"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  {createUser.image && (
                    <div className="relative mt-2 max-w-2xs">
                      <img
                        src={URL.createObjectURL(createUser.image)}
                        alt="Preview"
                        className="max-w-full rounded"
                      />
                      <button
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
                        onClick={() =>
                          setCreateUser((prev) => ({ ...prev, image: null }))
                        }
                      >
                        &#10005;
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <input
                  type={key === "floor" ? "number" : "text"}
                  name={key}
                  value={createUser[key]}
                  onChange={handleCreateChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              )}
            </div>
          )
      )}
      <button
        onClick={handleCreate}
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
        disabled={loading}
      >
        Dodaj
      </button>
    </div>
  );
};

export default CreateUser;
