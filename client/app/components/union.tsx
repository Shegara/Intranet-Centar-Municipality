"use client";

import React, { useEffect, useState } from "react";

interface ContentItem {
  content: string;
}

const Union: React.FC = () => {
  const [sindikatData, setSindikatData] = useState<ContentItem[]>([]);

  useEffect(() => {
    fetch('/sindikatData.txt')
      .then((response) => response.text())
      .then((text) => {
        const data = parseTextFile(text);
        setSindikatData(data);
      });
  }, []);

  const parseTextFile = (text: string): ContentItem[] => {
    const sections = text.split("\n\n"); 
    return sections.map(section => {
      const contentParts = section.split("\n");
      return {
        content: contentParts.join("<br>").replace("Content:\n", "").trim() 
      };
    });
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black via-transparent to-transparent">
      <div className="bg-white p-8 rounded-2xl max-w-[950px] border-4 border-red-700 max-h-[80vh] overflow-y-auto">
        <header className="text-4xl text-center text-gray-800 mb-4">
          Općinski Sindikat
        </header>
        <div className="grid grid-cols-1 gap-4">
          {sindikatData.map((item: ContentItem, index: number) => (
            <div key={index} className="p-4 border border-gray-300 rounded">
              <div
                className="mt-2"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Union;
