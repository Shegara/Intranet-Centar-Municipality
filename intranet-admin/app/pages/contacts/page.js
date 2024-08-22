'use client';

import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const fieldLabels = {
  first_name: 'Ime',
  last_name: 'Prezime',
  phone_num: 'Broj telefona',
  mail: 'Email',
  rank: 'Pozicija',
  floor: 'Sprat',
  office_num: 'Broj kancelarije',
  image: 'Slika',
  service: 'Služba',
  id: 'ID'
};

const Contacts = () => {
  const [createUser, setCreateUser] = useState({
    first_name: '',
    last_name: '',
    phone_num: '',
    mail: '',
    rank: '',
    floor: '',
    office_num: '',
    image: '',
    service: ''
  });

  const [updateUser, setUpdateUser] = useState({
    id: '',
    first_name: '',
    last_name: '',
    phone_num: '',
    mail: '',
    rank: '',
    floor: '',
    office_num: '',
    image: '',
    service: ''
  });

  const [deleteUserId, setDeleteUserId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setCreateUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeleteChange = (e) => {
    setDeleteUserId(e.target.value);
  };

  const handleCreate = async () => {
    setLoading(true);
    try {
      await axios.post('http://localhost:8800/api/users', createUser); 
      toast.success('Uposlenik uspješno dodat u bazu podataka');
      setCreateUser({
        first_name: '',
        last_name: '',
        phone_num: '',
        mail: '',
        rank: '',
        floor: '',
        office_num: '',
        image: '',
        service: ''
      });
    } catch (error) {
      console.error(error);
      toast.error('Greška u dodavanju uposlenika');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:8800/api/users/${updateUser.id}`, updateUser); 
      toast.success('Uposlenik uspješno uređen u bazi podataka');
      setUpdateUser({
        id: '',
        first_name: '',
        last_name: '',
        phone_num: '',
        mail: '',
        rank: '',
        floor: '',
        office_num: '',
        image: '',
        service: ''
      });
    } catch (error) {
      console.error(error);
      toast.error('Greška u uređivanju uposlenika');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:8800/api/users/${deleteUserId}`); 
      toast.success('Uposlenik uspješno izbrisan iz baze podataka');
      setDeleteUserId('');
    } catch (error) {
      console.error(error);
      toast.error('Greška u brisanju uposlenika');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link href="/" className="text-blue-500 hover:text-blue-700 mr-4 flex items-center">
          &larr; Nazad na početnu stranicu
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border border-gray-300 max-w-2xl md:max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">Dodaj novog uposlenika</h2>
        {Object.keys(createUser).map((key) => (
          key !== 'id' && (
            <div key={key} className="mb-4">
              <label className="block text-gray-700 capitalize">{fieldLabels[key] || key.replace('_', ' ')}</label>
              <input
                type={key === 'floor' ? 'number' : 'text'}
                name={key}
                value={createUser[key]}
                onChange={handleCreateChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          )
        ))}
        <button
          onClick={handleCreate}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
        >
          Dodaj
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border border-gray-300 max-w-2xl md:max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">Uredi postojećeg uposlenika</h2>
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
        {Object.keys(updateUser).map((key) => (
          key !== 'id' && (
            <div key={key} className="mb-4">
              <label className="block text-gray-700 capitalize">{fieldLabels[key] || key.replace('_', ' ')}</label>
              <input
                type={key === 'floor' ? 'number' : 'text'}
                name={key}
                value={updateUser[key]}
                onChange={handleUpdateChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          )
        ))}
        <button
          onClick={handleUpdate}
          className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 focus:outline-none"
        >
          Uredi
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border border-gray-300 max-w-2xl md:max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">Izbriši uposlenika</h2>
        <div className="mb-4">
          <label className="block text-gray-700">ID Uposlenika</label>
          <input
            type="text"
            value={deleteUserId}
            onChange={handleDeleteChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
        >
          Izbriši
        </button>
      </div>
    </div>
  );
};

export default Contacts;
