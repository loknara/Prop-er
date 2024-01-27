import axios from 'axios';
import React, { useEffect, useState } from "react";

import "./scoreboard.css";



function Scoreboard() {
  const [scoreboardData, setScoreboardData] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    console.log("Hi")
    axios.get('http://127.0.0.1:5000/scoreboard')
    .then((response) => {
      setScoreboardData(response.data);
      console.log("Hola")
    })
    .catch(error => {
      console.log(error);
      setError(error);
      
    });

    const interval = setInterval(() => {
      axios.get('http://127.0.0.1:5000/scoreboard')
        .then((response) => {
          setScoreboardData(response.data);
        })
        .catch(error => {
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
    <div className='scoreboard-container' >  
      <h1 className='home_scoreboard' >Scoreboard for {scoreboardData.scoreboard.gameDate}</h1>
      {scoreboardData.scoreboard.games.map(game => (
        <div  className = "scoreboard" key={game.gameId}>
          <div className='core'>
            <div className='text_aligner'>
            <h2 className='home'>{game.homeTeam.teamName}</h2> <h2 className='away' > vs. {game.awayTeam.teamName}</h2>
            </div>
            <p className='game-status'>{game.gameStatusText}</p>
            <div className='text_aligner'>
            <p className='home'>{game.homeTeam.score}</p> <p className='away'>- {game.awayTeam.score}</p>
            </div>
          </div>
        </div>
      ))}
      <div>
      </div>

    </div>
  );
}

export default Scoreboard