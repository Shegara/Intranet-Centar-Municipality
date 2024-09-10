"use client";

import React, { useState, useRef, useEffect } from "react";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import contentData from '../contentData';

interface ContentItem {
  title: string;
  content: string;
}

const Union: React.FC = () => {
  const [expanded, setExpanded] = useState<boolean[]>([false, false, false, false]);
  const contentRefs = useRef<HTMLDivElement[]>([]);

  const toggleExpand = (index: number) => {
    setExpanded((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  useEffect(() => {
    contentRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.style.transition = 'max-height 0.4s ease-in-out, opacity 0.5s ease-in-out';
        ref.style.opacity = expanded[index] ? '1' : '0';
        ref.style.maxHeight = expanded[index] ? `${ref.scrollHeight}px` : '0px';
      }
    });
  }, [expanded]);

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black via-transparent to-transparent">
      <div className="bg-white p-8 rounded-2xl max-w-[950px] border-4 border-red-700">
        <header className="text-4xl text-center text-gray-800 mb-4">
          Općinski Sindikat
        </header>
        <div className="grid grid-cols-1 gap-4 max-h-[550px] duration-500 ease-in-out overflow-y-auto transition-all">
          {contentData.map((item: ContentItem, index: number) => (
            <div
              key={index}
              className="p-4 border border-gray-300 rounded"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <button
                  className="flex items-center justify-center w-8 h-8 text-white bg-red-700 rounded-full ml-5 hover:opacity-80"
                  onClick={() => toggleExpand(index)}
                >
                  {expanded[index] ? (
                    <CloseIcon fontSize="medium" />
                  ) : (
                    <AddIcon fontSize="medium" />
                  )}
                </button>
              </div>
              <div
                ref={(el) => (contentRefs.current[index] = el!)}
                className={`transition-max-height duration-500 ease-in-out overflow-hidden max-h-0`}
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
