import React from 'react';

const SportSelector = ({ selectedSport, setSelectedSport }) => {
  const sports = ['NBA', 'NFL', 'MLB', 'NHL', 'Soccer'];

  return (
    <div className="flex space-x-2">
      {sports.map(sport => (
        <button
          key={sport}
          className={`px-4 py-2 rounded ${
            selectedSport === sport 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
          onClick={() => setSelectedSport(sport)}
        >
          {sport}
        </button>
      ))}
    </div>
  );
};

export default SportSelector; 