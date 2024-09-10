import React from "react";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import Image from "next/image";

const DEFAULT_IMAGE_PATH = "/default.png";

interface SearchResult {
  first_name: string;
  last_name: string;
  image?: string;
  service: string;
  rank: string;
  mail: string;
  floor: string;
  office_num: string;
  phone_num: string;
}

interface ResultsProps {
  searchResults: SearchResult[];
}

const getNameClass = (firstName: string, lastName: string): string => {
  const totalLength = firstName.length + lastName.length;
  
  if (totalLength >= 20) {
    return "text-sm"; 
  } else if (totalLength >= 15 && totalLength < 20) {
    return "text-base"; 
  } else {
    return "text-lg"; 
  }
};

const getEmailClass = (mail: string): string => {
  return mail.length >= 20 ? "text-sm" : "text-base";
};

const Results: React.FC<ResultsProps> = ({ searchResults }) => {
  const sortedResults = searchResults.slice().sort((a, b) => {
    return a.first_name.localeCompare(b.first_name);
  });

  return (
    <div>
      {sortedResults.length > 0 ? (
        <>
          <h2 className="text-lg font-medium mb-2">Rezultati pretrage:</h2>
          {sortedResults.map((item, index) => (
            <div
              key={index}
              className="mb-4 p-4 border border-gray-300 rounded-md hidden md:block"
            >
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-1 flex items-center">
                  <div className="w-30 h-30 rounded-lg overflow-hidden mr-4 border-2 border-red-500">
                    <Image
                      src={item.image || DEFAULT_IMAGE_PATH}
                      alt="Img"
                      width={60}
                      height={60}
                      className="rounded-lg"
                    />
                  </div>
                  <div>
                    <div className={getNameClass(item.first_name, item.last_name)}>
                      {item.first_name}
                    </div>
                    <div className={getNameClass(item.first_name, item.last_name) + " mt-2"}>
                      {item.last_name}
                    </div>
                  </div>
                </div>

                <div className="col-span-2 border-l border-gray-300 pl-4 flex flex-col justify-center">
                  <div>
                    <strong>Služba:</strong> {item.service}
                  </div>
                  <div className="mt-2">
                    <strong>Pozicija:</strong> {item.rank}
                  </div>
                  <div className="mt-2">
                    <strong>Email:</strong>{" "}
                    <span className={getEmailClass(item.mail)}>
                      {item.mail}
                    </span>
                  </div>
                </div>

                <div className="border-l border-gray-300 pl-4 flex flex-col items-center justify-center">
                  <div>
                    <strong>Sprat:</strong> {item.floor}
                  </div>
                  <div className="mt-2">
                    <strong>Broj Kancelarije:</strong> {item.office_num}
                  </div>
                  <div className="mt-2">
                    <LocalPhoneIcon className="mr-2 inline-block mt-2" />
                    {item.phone_num}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {sortedResults.map((item, index) => (
            <div
              key={index}
              className="md:hidden mb-4 p-4 border border-gray-300 rounded-md"
            >
              <div className="flex items-center mb-4">
                <div className="rounded-lg overflow-hidden mr-4 border-2 border-red-500">
                  <Image
                    src={item.image || DEFAULT_IMAGE_PATH}
                    alt="Img"
                    width={60}
                    height={60}
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <div className={getNameClass(item.first_name, item.last_name)}>
                    {item.first_name} {item.last_name}
                  </div>
                </div>
              </div>

              <div>
                <div>
                  <strong>Služba:</strong> {item.service}
                </div>
                <div className="mt-2">
                  <strong>Pozicija:</strong> {item.rank}
                </div>
                <div className="mt-2">
                  <strong>Email:</strong>{" "}
                  <span className={getEmailClass(item.mail)}>{item.mail}</span>
                </div>
                <div className="mt-2">
                  <strong>Sprat:</strong> {item.floor}
                </div>
                <div className="mt-2">
                  <strong>Broj Kancelarije:</strong> {item.office_num}
                </div>
                <div className="mt-2 flex items-center">
                  <LocalPhoneIcon className="mr-2" />
                  {item.phone_num}
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p className="text-gray-600 text-center">Nema pronađenih rezultata.</p>
      )}
    </div>
  );
};

export default Results;
