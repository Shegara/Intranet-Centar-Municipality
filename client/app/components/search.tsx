'use client';

import React, { useState, useEffect } from "react";
import axios from 'axios';
import Results from "./results";
import XIcon from '@mui/icons-material/HighlightOffSharp';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOptions, setFilterOptions] = useState({
    floor: "",
    officeNum: "",
    service: "",
  });
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFilterChange = (filter, value) => {
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
        const response = await axios.get('http://localhost:8800/api/users');
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

  const FilterBox = ({ label, options, value, onChange }) => {
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
            options={["", "Prizemlje", "2", "3"]}
            value={filterOptions.floor}
            onChange={(value) => handleFilterChange("floor", value)}
          />
          <FilterBox
            label="Kancelarija br."
            options={["", "211", "215", "220", "230", "337"]}
            value={filterOptions.officeNum}
            onChange={(value) => handleFilterChange("officeNum", value)}
          />
          <FilterBox
            label="Služba"
            options={[
              "",
              "01 - Općinsko vijeće",
              "02 - Zajednički poslovi",
              "03 - Stambeno i komunalno", 
              "04 - Finansije",
              "05 - Imovinsko pravni poslovi geodetski poslovi i katastar nekretnina",
              "06 - Inspektorat",
              "07 - Prostorno uređenje i investicije",
              "08 - Opća uprava",
              "09 - Boračko-invalidska zaštita i socijalna zaštita",
              "10 - Kabinet općinskog načelnika",
              "11 - LER i mjesna samouprava",
              "12 - Ured za internu reviziju",
              "13 - Obrazovanje, kultura i sport",
              "14 - Pravobranilaštvo",
              "16 - Privreda i poslovni prostori",
              "17 - Civilna zaštita"
            ]}
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
