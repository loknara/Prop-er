import React from 'react';
import useScoreboardData from './useScoreboardData';
import ScoreboardDisplay from './scoreboardDisplay';

function Scoreboard() {
  const { scoreboardData, error } = useScoreboardData();
  return <ScoreboardDisplay scoreboardData={scoreboardData} />;
}

export default Scoreboard;
