import React from 'react';
import SearchBox from '../components/searchbar/searchBar'; 
import Scoreboard from '../components/scoreboard/scoreboard';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <Scoreboard />
        <SearchBox />
      </div>
    </div>
  );
};

export default Dashboard;