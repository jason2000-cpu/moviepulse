import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q');
    
    // Here you would typically make an API call to fetch search results
    // For this example, we'll use mock data
    const mockResults = [
      { id: 1, title: 'Movie 1', year: 2023, genre: 'Action' },
      { id: 2, title: 'Series 1', year: 2022, genre: 'Drama' },
      // Add more mock results as needed
    ];

    setResults(mockResults.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase())
    ));
  }, [location.search]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Search Results</h2>
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((item) => (
            <div key={item.id} className="bg-gray-800 rounded-lg shadow overflow-hidden">
              <div className="p-4">
                <h4 className="font-bold text-lg mb-1 text-white">{item.title}</h4>
                <p className="text-sm text-gray-400">{item.year} | {item.genre}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;