import React from 'react';
import useScoreboardData from './useScoreboardData';
import ScoreboardDisplay from './scoreboardDisplay';

function Scoreboard() {
  const { scoreboardData, error } = useScoreboardData();
  
  if (error) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-red-400">Error loading scores</h2>
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-800/50 rounded-2xl shadow-xl border border-gray-700/50">
      <div className="p-6 border-b border-gray-700/50">
        <h2 className="text-2xl font-bold">
          <span className="text-white">Today's </span>
          <span className="text-emerald-400">Scoreboard</span>
        </h2>
      </div>
      <ScoreboardDisplay scoreboardData={scoreboardData} />
    </div>
  );
}

export default Scoreboard;
