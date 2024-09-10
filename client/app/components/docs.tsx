'use client';

import React, { useState, useRef, useEffect, MutableRefObject } from 'react';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import docsData from '../docsData';
import parse from 'html-react-parser';

interface DocItem {
  title: string;
  content: string;
  files: string[];
}

const Docs: React.FC = () => {
  const [expanded, setExpanded] = useState<boolean[]>([false, false, false, false]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

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
        ref.style.transition = 'max-height 0.6s ease-in-out, opacity 0.6s ease-in-out';
        ref.style.opacity = expanded[index] ? '1' : '0';
        ref.style.maxHeight = expanded[index] ? `${ref.scrollHeight}px` : '0px';
      }
    });
  }, [expanded]);

  const handleDownload = (file: string) => {
    const link = document.createElement('a');
    link.href = `/documents${file}`;
    link.download = file.split('/').pop() || '';
    link.click();
  };

  const renderContentWithIcons = (content: string, files: string[]) => {
    let lines = content.split('<br>').filter(line => line.trim() !== '');

    if (lines.length === 0) {
      lines = [content];
    }

    return lines.map((line, index) => (
      <React.Fragment key={index}>
        {index === 0 && <br />}
        <div className="flex items-center justify-between">
          <span className="flex-grow">{parse(line)}</span>
          {files[index] && (
            <DownloadIcon
              fontSize="medium"
              className="text-red-700 cursor-pointer hover:opacity-60"
              onClick={() => handleDownload(files[index])}
            />
          )}
        </div>
        {index < lines.length - 1 && <hr className="my-2 border-gray-400" />}
      </React.Fragment>
    ));
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black via-transparent to-transparent">
      <div className="bg-white p-10 rounded-2xl border-4 border-red-700 w-full max-w-[1000px]">
        <header className="text-4xl text-center text-gray-800 mb-4">
          Općinski Dokumenti
        </header>
        <div className="grid grid-cols-1 gap-4 max-h-[550px] overflow-y-auto">
          {docsData.map((item: DocItem, index: number) => (
            <div key={index} className="p-4 border border-gray-300 rounded">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <button
                  className="flex items-center justify-center w-8 h-8 text-white bg-red-700 rounded-full hover:opacity-80"
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
                ref={(el) => (contentRefs.current[index] = el)}
                className={`transition-max-height duration-500 ease-in-out overflow-hidden max-h-0`}
              >
                {renderContentWithIcons(item.content, item.files)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Docs;
