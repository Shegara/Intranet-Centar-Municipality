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

const UpdateUser = () => {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState(null);
  const [updateFields, setUpdateFields] = useState({
    first_name: '',
    last_name: '',
    phone_num: '',
    mail: '',
    rank: '',
    floor: '',
    office_num: '',
    image: null,
    service: ''
  });

  const [tempImage, setTempImage] = useState(null); 

  const fetchUserData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8800/api/users/${id}`);
      setUserData(response.data);
      setUpdateFields(response.data);
    } catch (error) {
      toast.error("Greška u učitavanju podataka uposlenika");
    }
  };

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleFetchUser = () => {
    if (userId) {
      setUpdateFields({
        first_name: '',
        last_name: '',
        phone_num: '',
        mail: '',
        rank: '',
        floor: '',
        office_num: '',
        image: null,
        service: ''
      });
      setTempImage(null); 
      fetchUserData(userId);
    }
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTempImage(file); 
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();

    Object.keys(updateFields).forEach((key) => {
      if (key === 'image' && tempImage) {
        formData.append(key, tempImage); 
      } else if (updateFields[key] !== null && updateFields[key] !== '') {
        formData.append(key, updateFields[key]);
      }
    });

    try {
      await axios.put(`http://localhost:8800/api/users/${userId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Uposlenik uspješno uređen u bazi podataka");
    } catch (error) {
      console.error(error);
      toast.error("Greška u uređivanju uposlenika");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border border-gray-300 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
        Uredi postojećeg uposlenika
      </h2>

      <div className="mb-4">
        <label className="block text-gray-700">ID Uposlenika</label>
        <input
          type="text"
          value={userId}
          onChange={handleUserIdChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <button
          onClick={handleFetchUser}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Učitaj podatke
        </button>
      </div>

      {userData && (
        <>
          {Object.keys(updateFields).map((key) => (
            <div key={key} className="mb-4">
              <label className="block text-gray-700 capitalize">
                {fieldLabels[key] || key.replace("_", " ")}
              </label>
              {key === "image" ? (
                <>
                  <label className="mt-1 inline-block px-4 py-2 border border-gray-300 rounded-md shadow-sm cursor-pointer bg-blue-500 text-white text-center hover:bg-blue-600 transition-colors duration-200">
                    {tempImage ? "Promijeni u drugu sliku" : "Izaberi sliku"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  {tempImage && (
                    <div className="relative mt-2 max-w-2xs">
                      <img
                        src={URL.createObjectURL(tempImage)}
                        alt="Preview"
                        className="max-w-full rounded"
                      />
                    </div>
                  )}
                </>
              ) : (
                <input
                  type="text"
                  name={key}
                  value={updateFields[key]}
                  onChange={handleUpdateChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              )}
            </div>
          ))}
          <button
            onClick={handleUpdate}
            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 focus:outline-none"
          >
            Uredi
          </button>
        </>
      )}
    </div>
  );
};

export default UpdateUser;
