import React from 'react';

const SportSelector = ({ selectedSport, setSelectedSport }) => {
  return (
    <select 
      value={selectedSport}
      onChange={(e) => setSelectedSport(e.target.value)}
      className="bg-gray-800 text-white border border-gray-700/50 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
    >
      <option value="NBA">NBA</option>
      <option value="NFL">NFL</option>
      <option value="MLB">MLB</option>
    </select>
  );
};

export default SportSelector; 