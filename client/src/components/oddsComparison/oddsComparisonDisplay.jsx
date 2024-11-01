import React from 'react';
import SportSelector from './sportSelector';
import OddsTable from './oddsTable';
import SearchBar from './searchBar';

const OddsComparisonDisplay = ({ propsData, selectedSport, setSelectedSport }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="max-w-[1800px] mx-auto bg-gray-800/50 rounded-2xl shadow-xl border border-gray-700/50 backdrop-blur-sm p-6">
        <div className="flex justify-between items-center mb-6 border-b border-gray-700/50 pb-4">
          <h1 className="text-2xl font-bold">
            <span className="text-white">Props </span>
            <span className="text-emerald-400">Comparison</span>
          </h1>
          <SportSelector 
            selectedSport={selectedSport}
            setSelectedSport={setSelectedSport}
          />
        </div>

        <OddsTable propsData={propsData} />
        <SearchBar />
      </div>
    </div>
  );
};

export default OddsComparisonDisplay; 