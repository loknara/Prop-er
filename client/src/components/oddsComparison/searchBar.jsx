import React from 'react';

const SearchBar = () => {
  return (
    <div className="mt-4">
      <input 
        type="text" 
        placeholder="Search by player name..."
        className="w-full bg-gray-800 text-white border border-gray-700/50 rounded px-4 py-2 
          placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
      />
    </div>
  );
};

export default SearchBar; 