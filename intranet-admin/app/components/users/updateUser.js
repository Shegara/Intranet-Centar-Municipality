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
  id: "ID",
};

const UpdateUser = () => {
  const [updateUser, setUpdateUser] = useState({
    id: "",
    first_name: "",
    last_name: "",
    phone_num: "",
    mail: "",
    rank: "",
    floor: "",
    office_num: "",
    image: "",
    service: "",
  });

  const [loading, setLoading] = useState(false);

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUpdateUser((prev) => ({ ...prev, image: file }));
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    const formData = new FormData();

    Object.keys(updateUser).forEach((key) => {
      if (key === "image" && updateUser[key] && updateUser[key] instanceof File) {
        formData.append(key, updateUser[key]);
      } else if (updateUser[key] !== "" && updateUser[key] !== null) {
        formData.append(key, updateUser[key]);
      }
    });

    try {
      await axios.put(
        `http://localhost:8800/api/users/${updateUser.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success("Uposlenik uspješno uređen u bazi podataka");

      setUpdateUser({
        id: "",
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
      console.error(error);
      toast.error("Greška u uređivanju uposlenika");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border border-gray-300 max-w-2xl md:max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
        Uredi postojećeg uposlenika
      </h2>
      <div className="mb-4">
        <label className="block text-gray-700">{fieldLabels.id}</label>
        <input
          type="text"
          name="id"
          value={updateUser.id}
          onChange={handleUpdateChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      {Object.keys(updateUser).map(
        (key) =>
          key !== "id" && (
            <div key={key} className="mb-4">
              <label className="block text-gray-700 capitalize">
                {fieldLabels[key] || key.replace("_", " ")}
              </label>
              {key === "image" ? (
                <>
                  <label className="mt-1 inline-block px-4 py-2 border border-gray-300 rounded-md shadow-sm cursor-pointer bg-blue-500 text-white text-center hover:bg-blue-600 transition-colors duration-200">
                    {updateUser.image
                      ? "Promijeni u drugu sliku"
                      : "Izaberi sliku"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  {updateUser.image && (
                    <div className="relative mt-2 max-w-2xs">
                      <img
                        src={URL.createObjectURL(updateUser.image)}
                        alt="Preview"
                        className="max-w-full rounded"
                      />
                      <button
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
                        onClick={() =>
                          setUpdateUser((prev) => ({ ...prev, image: null }))
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
                  value={updateUser[key]}
                  onChange={handleUpdateChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              )}
            </div>
          )
      )}
      <button
        onClick={handleUpdate}
        className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 focus:outline-none"
        disabled={loading}
      >
        Uredi
      </button>
    </div>
  );
};

export default UpdateUser;
