import React from "react";
import UserCard from "./userCard";

interface SearchResult {
  id: number;
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

const Results: React.FC<ResultsProps> = ({ searchResults }) => {
  const sortedResults = searchResults.slice().sort((a, b) => {
    return a.first_name.localeCompare(b.first_name);
  });

  return (
    <div>
      {sortedResults.length > 0 ? (
        <>
          <h2 className="text-lg font-medium mb-2">Rezultati pretrage:</h2>
          {sortedResults.map((item) => (
            <UserCard
              key={item.id}
              id={item.id}
              firstName={item.first_name}
              lastName={item.last_name}
              image={item.image || '/Default.png'}
              service={item.service}
              rank={item.rank}
              mail={item.mail}
              floor={item.floor}
              officeNum={item.office_num}
              phoneNum={item.phone_num}
            />
          ))}
        </>
      ) : (
        <p className="text-gray-600 text-center">Nema pronađenih rezultata.</p>
      )}
    </div>
  );
};

export default Results;
