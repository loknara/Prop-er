import React from "react";

const ScoreboardDisplay = ({ scoreboardData }) => {
  if (!scoreboardData) {
    return <div>Loading...</div>;
  }

  // Function to determine the font size class based on name length
  const getFontSizeClass = (name) => {

    if (name.length > 12) {
      return "text-sm"; // Smaller text for longer names
    } else if (name.length > 8) {
      return "text-md"; // Medium text for moderately long names
    }
    return "text-lg"; // Default text size for shorter names
  };

  return (
    <div className="font-roboto mx-auto p-5 text-center bg-gray-300 h-[92dvh]">
      <h1 className="text-4xl font-bold uppercase tracking-widest">
        Today's Scoreboard
      </h1>
      <div className="flex flex-wrap h-[93%] justify-center gap-4 mt-6 overflow-auto">
        {scoreboardData.scoreboard.games.map((game) => (
          <div
            className="flex flex-col w-11/12 md:w-11/12 lg:w-5/12 bg-gray-800 p-6 rounded-lg shadow-lg transition duration-200 ease-in-out hover:scale-105 hover:shadow-xl"
            key={game.gameId}
          >
            <div className="flex justify-center items-center mb-2">
              <div
                className={`${getFontSizeClass(
                  game.awayTeam.teamName
                )} text-yellow-400 uppercase tracking-wide flex-1 text-right pr-2`}
              >
                {game.awayTeam.teamName}
              </div>
              <div className="text-md text-white mx-1">@</div>
              <div
                className={`${getFontSizeClass(
                  game.homeTeam.teamName
                )} text-white uppercase tracking-wide flex-1 text-left pl-2`}
              >
                {game.homeTeam.teamName}
              </div>
            </div>
            <div className="flex justify-center">
              <p className="text-2xl text-yellow-400 font-bold mr-1">
                {game.awayTeam.score}
              </p>
              <p className="text-2xl text-white font-bold">
                - {game.homeTeam.score}
              </p>
            </div>
            <p className="text-sm text-gray-400">{game.gameStatusText}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoreboardDisplay;
