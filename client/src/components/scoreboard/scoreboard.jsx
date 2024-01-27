import axios from "axios";
import React, { useEffect, useState } from "react";


function Scoreboard() {
  const [scoreboardData, setScoreboardData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Hi");
    axios
      .get("http://127.0.0.1:5000/scoreboard")
      .then((response) => {
        setScoreboardData(response.data);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });

    const interval = setInterval(() => {
      axios
        .get("http://127.0.0.1:5000/scoreboard")
        .then((response) => {
          setScoreboardData(response.data);
        })
        .catch((error) => {
          console.log(error);
          setError(error);

          // Handle any errors that occur
        });
    }, 10000); // set interval to 10 seconds (5000 milliseconds)

    return () => clearInterval(interval); // clear interval on component unmount
  }, []);

  if (!scoreboardData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="font-roboto w-150 mx-auto p-1 text-center h-192">
      <h1 className="text-3xl text-yellow-400 uppercase tracking-widest mt-1">
        Scoreboard for {scoreboardData.scoreboard.gameDate}
      </h1>
      <div className="flex flex-col h-full mt-5 overflow-hidden">
        {scoreboardData.scoreboard.games.map((game) => (
          <div
            className="flex flex-col bg-gray-800 mx-auto my-2 p-5 rounded-lg shadow-lg transition duration-200 ease-in-out hover:scale-105 hover:shadow-xl"
            key={game.gameId}
          >
            <div className="text-left">
              <div className="flex justify-center">
                <h2 className="text-xl text-yellow-400 uppercase tracking-wide">
                  {game.homeTeam.teamName}
                </h2>
                <h2 className="text-xl text-white">
                  {" "}
                  vs. {game.awayTeam.teamName}
                </h2>
              </div>
              <p className="text-base text-gray-400 mb-2">
                {game.gameStatusText}
              </p>
              <div className="flex justify-center">
                <p className="text-xl text-yellow-400 font-bold">
                  {game.homeTeam.score}
                </p>
                <p className="text-xl text-white font-bold">
                  - {game.awayTeam.score}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Scoreboard;
