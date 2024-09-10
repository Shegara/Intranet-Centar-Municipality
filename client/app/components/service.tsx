"use client";

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import XIcon from '@mui/icons-material/HighlightOffSharp';

interface User {
  first_name: string;
  last_name: string;
  rank: string;
  mail: string;
  phone_num: string;
  service: string;
}

interface Services {
  [key: string]: User[];
}

const Service: React.FC = () => {
  const [expanded, setExpanded] = useState<boolean[]>([]);
  const [searchQueries, setSearchQueries] = useState<string[]>([]);
  const [services, setServices] = useState<Services>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const contentRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>("http://localhost:8800/api/users");
        const users = response.data;

        const groupedServices = users.reduce((acc: Services, user) => {
          const serviceName = user.service;
          if (!acc[serviceName]) {
            acc[serviceName] = [];
          }
          acc[serviceName].push(user);
          return acc;
        }, {});

        const sortedServiceKeys = Object.keys(groupedServices).sort((a, b) => {
          const numA = parseInt(a.match(/\d+/)?.[0] || "0", 10);
          const numB = parseInt(b.match(/\d+/)?.[0] || "0", 10);
          return numA - numB;
        });

        const sortedServices = sortedServiceKeys.reduce((acc: Services, key) => {
          acc[key] = groupedServices[key];
          return acc;
        }, {});

        setServices(sortedServices);
        setExpanded(Array(sortedServiceKeys.length).fill(false));
        setSearchQueries(Array(sortedServiceKeys.length).fill(""));
      } catch (error) {
        setError("Failed to load data");
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const toggleExpand = (index: number) => {
    setExpanded((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const handleSearchChange = (index: number, query: string) => {
    setSearchQueries((prevQueries) => {
      const newQueries = [...prevQueries];
      newQueries[index] = query;
      return newQueries;
    });
  };

  const clearSearch = (index: number) => {
    setSearchQueries((prevQueries) => {
      const newQueries = [...prevQueries];
      newQueries[index] = "";
      return newQueries;
    });
  };

  useEffect(() => {
    contentRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.style.transition =
          "max-height 0.5s ease-in-out, opacity 0.5s ease-in-out";
        ref.style.opacity = expanded[index] ? "1" : "0";
        ref.style.maxHeight = expanded[index] ? `${ref.scrollHeight}px` : "0px";
      }
    });
  }, [expanded]);

  if (loading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-3xl text-white">Učitavam...</div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black via-transparent to-transparent">
      <div className="bg-white p-8 rounded-2xl border-4 border-red-700 w-full max-w-[1000px]">
        <header className="text-4xl text-center text-gray-800 mb-4">
          Općinske Službe
        </header>
        <div className="grid grid-cols-1 gap-4 max-h-[550px] duration-500 ease-in-out overflow-y-auto transition-all">
          {Object.keys(services).map((service, index) => {
            const filteredUsers = services[service].filter((user) => {
              const query = searchQueries[index].toLowerCase();
              return (
                user.first_name.toLowerCase().includes(query) ||
                user.last_name.toLowerCase().includes(query)
              );
            });

            return (
              <div key={service} className="p-4 border border-gray-300 rounded">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">{service}</h2>
                  <div className="flex-shrink-0">
                    <button
                      className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 text-white bg-red-700 rounded-full hover:opacity-80"
                      onClick={() => toggleExpand(index)}
                    >
                      {expanded[index] ? (
                        <CloseIcon fontSize="medium" />
                      ) : (
                        <AddIcon fontSize="medium" />
                      )}
                    </button>
                  </div>
                </div>
                <div
                  ref={(el) => (contentRefs.current[index] = el!)}
                  className={`transition-max-height duration-500 ease-in-out overflow-hidden max-h-0`}
                >
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Pretraga u ovoj službi..."
                      className="mb-2 p-3 border border-gray-300 rounded mt-4 w-full"
                      value={searchQueries[index]}
                      onChange={(e) => handleSearchChange(index, e.target.value)}
                    />
                    {searchQueries[index] && (
                      <XIcon
                        onClick={() => clearSearch(index)}
                        className="absolute top-7 right-4 cursor-pointer"
                      />
                    )}
                  </div>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user, userIndex) => (
                      <div
                        key={userIndex}
                        className="py-2 border-b last:border-b-0"
                      >
                        <p className="mt-1">
                          <span className="font-bold">Ime i prezime:</span>{" "}
                          {user.first_name} {user.last_name}
                        </p>
                        <p className="mt-1">
                          <span className="font-bold">Pozicija:</span>{" "}
                          {user.rank}
                        </p>
                        <p className="mt-1">
                          <span className="font-bold">Email:</span> {user.mail}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <LocalPhoneIcon fontSize="small" />
                          <p>{user.phone_num}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="mt-2 text-gray-500">
                      Nema uposlenika u ovoj službi
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Service;
