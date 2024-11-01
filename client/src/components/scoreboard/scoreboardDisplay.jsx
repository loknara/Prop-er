import React from "react";
import { teamColors } from './teamColors';

const ScoreboardDisplay = ({ scoreboardData }) => {
  if (!scoreboardData) {
    return <div className="text-white text-center p-4">Loading...</div>;
  }

  const getFontSizeClass = (name) => {
    if (name.length > 12) return "text-sm";
    if (name.length > 8) return "text-md";
    return "text-lg";
  };

  const getTeamColor = (teamTricode) => {
    return teamColors[teamTricode] || 'text-white';
  };

  return (
    <div className="font-roboto mx-auto p-5 text-center bg-gray-800/50 h-[88dvh]">
      <div className="flex flex-wrap p-4 h-auto lg:max-h-[95%] justify-center gap-2 mt-6 overflow-auto">
        {scoreboardData.scoreboard.games.map((game) => (
          <div
            className="flex flex-col h-full lg:h-[140px] w-full lg:w-5/12 bg-gray-200 p-6 rounded-lg 
              shadow-lg transition duration-200 ease-in-out hover:scale-105 hover:shadow-xl mb-4 flex-shrink-0
              border border-gray-300 backdrop-blur-sm hover:bg-gray-100"
            key={game.gameId}
          >
            <div className="flex justify-center items-center mb-2">
              <div className={`${getFontSizeClass(game.awayTeam.teamName)} ${getTeamColor(game.awayTeam.teamTricode)} uppercase tracking-wide flex-1 text-right pr-2 font-bold`}>
                {game.awayTeam.teamName}
              </div>
              <div className="text-md text-gray-600 mx-1">@</div>
              <div className={`${getFontSizeClass(game.homeTeam.teamName)} ${getTeamColor(game.homeTeam.teamTricode)} uppercase tracking-wide flex-1 text-left pl-2 font-bold`}>
                {game.homeTeam.teamName}
              </div>
            </div>
            <div className="flex justify-center items-center">
              <p className={`text-2xl font-bold mr-1 ${getTeamColor(game.awayTeam.teamTricode)}`}>
                {game.awayTeam.score}
              </p>
              <p className="text-2xl text-gray-600 font-bold">-</p>
              <p className={`text-2xl font-bold ml-1 ${getTeamColor(game.homeTeam.teamTricode)}`}>
                {game.homeTeam.score}
              </p>
            </div>
            <p className="text-sm text-gray-600">{game.gameStatusText}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoreboardDisplay;
