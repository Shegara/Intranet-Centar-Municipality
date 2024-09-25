"use client";

import React, { useState, useRef, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import axios from "axios";

interface DocItem {
  id: number;
  name: string;
  category: string;
  document: string;
}

const Docs: React.FC = () => {
  const [docs, setDocs] = useState<DocItem[]>([]);
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const contentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        setLoading(true);
        const response = await axios.get<DocItem[]>(
          "http://localhost:8800/api/docs"
        );
        const data = response.data;
        setDocs(data);
        const categories = Array.from(new Set(data.map((doc) => doc.category)));
        setExpanded(
          categories.reduce(
            (acc, category) => ({ ...acc, [category]: false }),
            {}
          )
        );
      } catch (error) {
        setError("Failed to fetch documents. Please try again later.");
        console.error("Error fetching documents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocs();
  }, []);

  const toggleExpand = (category: string) => {
    setExpanded((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  useEffect(() => {
    Object.entries(contentRefs.current).forEach(([category, ref]) => {
      if (ref) {
        ref.style.transition =
          "max-height 0.3s ease-in-out, opacity 0.3s ease-in-out";
        ref.style.opacity = expanded[category] ? "1" : "0";
        ref.style.maxHeight = expanded[category]
          ? `${ref.scrollHeight}px`
          : "0px";
      }
    });
  }, [expanded]);

  const handleDownload = (file: string) => {
    const link = document.createElement("a");
    link.href = file;
    link.download = file.split("/").pop() || "";
    link.click();
  };

  const groupedDocs = docs.reduce((acc, doc) => {
    (acc[doc.category] = acc[doc.category] || []).push(doc);
    return acc;
  }, {} as { [key: string]: DocItem[] });

  if (loading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-3xl text-white">Učitavam...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-2xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black via-transparent to-transparent">
      <div className="bg-white p-10 rounded-2xl border-4 border-red-700 w-full max-w-[1000px]">
        <header className="text-4xl text-center text-gray-800 mb-4">
          Općinski Dokumenti
        </header>
        <div className="grid grid-cols-1 gap-4 max-h-[550px] overflow-y-auto">
          {Object.entries(groupedDocs).map(([category, docs]) => (
            <div key={category} className="p-4 border border-gray-300 rounded">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">{category}</h2>
                <button
                  className="flex items-center justify-center w-8 h-8 text-white bg-red-700 rounded-full hover:opacity-80"
                  onClick={() => toggleExpand(category)}
                >
                  {expanded[category] ? (
                    <CloseIcon fontSize="medium" />
                  ) : (
                    <AddIcon fontSize="medium" />
                  )}
                </button>
              </div>
              <div
                ref={(el) => {
                  contentRefs.current[category] = el;
                }}
                className={`transition-max-height duration-500 ease-in-out overflow-hidden max-h-0`}
              >
                {docs.map((item) => (
                  <div
                    key={item.id}
                    className="mt-4 flex items-center justify-between p-2 border-b border-gray-300"
                  >
                    <div>
                      {item.name}
                      <span className="ml-8 font-semibold">ID:</span> {item.id}
                    </div>
                    {item.document && (
                      <DownloadIcon
                        fontSize="medium"
                        className="text-red-700 cursor-pointer hover:opacity-60"
                        onClick={() => handleDownload(item.document)}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Docs;
