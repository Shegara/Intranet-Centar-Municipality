'use client';

import React, { useState, useEffect } from "react";
import axios from 'axios';
import Results from "./results";
import XIcon from '@mui/icons-material/HighlightOffSharp';
import {officeNumbers, floorNumbers, serviceNumbers} from '../staticData';


interface FilterOptions {
  floor: string;
  officeNum: string;
  service: string;
}

interface User {
  first_name: string;
  last_name: string;
  rank: string;
  mail: string;
  floor: string;
  office_num: string;
  service: string;
  image?: string;
  phone_num: string;
}

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    floor: "",
    officeNum: "",
    service: "",
  });
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFilterChange = (filter: keyof FilterOptions, value: string) => {
    setFilterOptions({ ...filterOptions, [filter]: value });
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const isFilterOrSearchActive = () => {
    return searchTerm.trim() !== "" || Object.values(filterOptions).some(option => option !== "");
  };

  useEffect(() => {
    if (!isFilterOrSearchActive()) {
      setSearchResults([]);
      return;
    }
  
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get<User[]>('http://localhost:8800/api/users');
        const filteredResults = response.data.filter((item) => {
          const firstName = item.first_name ? item.first_name.toLowerCase() : '';
          const lastName = item.last_name ? item.last_name.toLowerCase() : '';
          const rank = item.rank ? item.rank.toLowerCase() : '';
          const mail = item.mail ? item.mail.toLowerCase() : '';
          const floor = item.floor ? item.floor.toString().toLowerCase() : '';
          const officeNum = item.office_num ? item.office_num.toString().toLowerCase() : '';
          const service = item.service ? item.service.toLowerCase() : '';
  
          const searchTermLower = searchTerm.toLowerCase();
  
          return (
            (filterOptions.floor === "" || filterOptions.floor.toLowerCase() === floor) &&
            (filterOptions.officeNum === "" || filterOptions.officeNum.toLowerCase() === officeNum) &&
            (filterOptions.service === "" || filterOptions.service.toLowerCase() === service) &&
            (
              firstName.includes(searchTermLower) ||
              lastName.includes(searchTermLower) ||
              (firstName + ' ' + lastName).includes(searchTermLower) ||
              rank.includes(searchTermLower) ||
              mail.includes(searchTermLower) ||
              floor.includes(searchTermLower) ||
              officeNum.includes(searchTermLower) ||
              service.includes(searchTermLower)
            )
          );
        });
  
        setSearchResults(filteredResults);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUsers();
  }, [filterOptions, searchTerm]);

  const FilterBox: React.FC<{
    label: string;
    options: string[];
    value: string;
    onChange: (value: string) => void;
  }> = ({ label, options, value, onChange }) => {
    return (
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1"
        >
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option || "-"}
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black via-transparent to-transparent">
      <div className="bg-white w-full md:w-7/8 max-w-screen-lg p-7 border-4 border-red-700 rounded-lg">
        <header className="text-4xl text-center text-gray-800 mb-4">
          Općinski Imenik
        </header>
        <div className="flex items-center mb-4 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Traži..."
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 flex-1"
          />
          {searchTerm && (
            <XIcon
              onClick={clearSearch}
              className="absolute right-4 cursor-pointer"
            />
          )}
        </div>
        <div className="flex mb-4 space-x-4">
          <FilterBox
            label="Sprat"
            options={["", ...floorNumbers]}
            value={filterOptions.floor}
            onChange={(value) => handleFilterChange("floor", value)}
          />
          <FilterBox
            label="Kancelarija br."
            options={["", ...officeNumbers]}
            value={filterOptions.officeNum}
            onChange={(value) => handleFilterChange("officeNum", value)}
          />
          <FilterBox
            label="Služba"
            options={serviceNumbers}
            value={filterOptions.service}
            onChange={(value) => handleFilterChange("service", value)}
          />
        </div>
        <div className="max-h-[450px] duration-500 ease-in-out overflow-y-auto transition-all">
          {!isFilterOrSearchActive() ? (
            <p className="text-gray-600 text-center text-xl">
              Pretraži uposlenike po imenu ili po filterima
            </p>
          ) : (
            <>
              {searchResults.length > 0 ? (
                <Results searchResults={searchResults} />
              ) : (
                <p className="text-gray-600 text-center">
                  Nema pronađenih rezultata.
                </p>
              )}
              {loading && <p className="text-gray-600 text-center">Učitavam...</p>}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
