import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [players, setPlayers] = useState([]);
  const [updatedPlayers, setUpdatedPlayers] = useState([]);
  const [playerDetails, setPlayerDetails] = useState({});
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:5000/search", {
        search_query: searchQuery,
      });
      setPlayers(response.data); // Set the players state to the response data
    } catch (error) {
      console.error("Error occurred:", error);
      setPlayers([]);
    }
    setLoading(false);
  };
  const getPlayerDetails = async (playerId) => {
    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:5000/playerscore", {
        player_id: playerId,
      });
      // setPlayerDetails({ [playerId]: response.data }); // Store player details in state
      setPlayerDetails({ ...playerDetails, [playerId]: response.data }); // Store player details in state

      const playerInfo = players.find((player) => player.id === playerId);

      const playerToAdd = {
        ...playerInfo,
        details: response.data,
      };

      // Add player to selectedPlayers state if not already added
      if (!selectedPlayers.some((player) => player.id === playerId)) {
        setSelectedPlayers([...selectedPlayers, playerToAdd]);
      }
    } catch (error) {
      console.error("Error occurred:", error);
      // Use the error message from the response if available
      const errorMessage =
        error.response?.data?.message || "Error retrieving player details";
      setPlayerDetails({ [playerId]: errorMessage });
    }
    setLoading(false);
  };

  const fetchPlayerData = async (playerId, gameId, homeaway) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/updatePlayers", {
        player_id: playerId,
        game_id: gameId,
        home_id: homeaway,
      });
      return response.data;
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };


  const updatePlayerData = (playerId, data) => {
    setPlayerDetails({ ...playerDetails, [playerId]: data });

    setSelectedPlayers(selectedPlayers.map(player => {
      if (player.id === playerId) {
        return { ...player, details: data };
      }
      return player;
    }));
  };

  const getUpdatedPlayerData = async (playerId, gameId, homeaway) => {
    setLoading(true);
    const data = await fetchPlayerData(playerId, gameId, homeaway);
    if (data) {
      updatePlayerData(playerId, data);
    }
    setLoading(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      selectedPlayers.forEach(player => {
        if (player.details?.gameId && player.details?.homeaway) {
          fetchPlayerData(player.id, player.details.gameId, player.details.homeaway)
            .then(data => {
              if (data) {
                updatePlayerData(player.id, data);
              }
            });
        }
      });
    }, 15000);

    return () => clearInterval(interval);
  }, [selectedPlayers, playerDetails]);


  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-center p-4">
        <div className="w-full max-w-xs">
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for players..."
          />
          <button
            className="w-full px-4 py-2 mt-3 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center p-4">
          <p className="text-xl text-gray-800">Loading...</p>
        </div>
      )}

      <div className="flex-1 overflow-auto p-4">
        <div className="grid grid-cols-1 gap-4">
          {players.map((player, index) => (
            <div key={index} className="p-4 bg-white rounded shadow">
              <div className="flex items-center justify-between">
                <button
                  className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                  onClick={() => getPlayerDetails(player.id)}
                >
                  +
                </button>
                <p className="text-lg font-semibold">{player.full_name}</p>
              </div>

              {playerDetails[player.id] && (
                <div className="mt-3">
                  {typeof playerDetails[player.id] === "string" ? (
                    <p className="text-red-500">{playerDetails[player.id]}</p>
                  ) : (
                    <div className="text-sm">
                      <p>Player has been added!</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full p-4 bg-gray-200">
        <h2 className="mb-4 text-xl font-bold text-center">Selected Players</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedPlayers.map((player, index) => (
            <div key={index} className="p-4 bg-white rounded shadow">
              <div className="mb-2">
                <strong>Name:</strong> {player.full_name}
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p>
                  <strong>Rebounds:</strong>{" "}
                  {player.details?.stat?.reboundsTotal || "0"}
                </p>
                <p>
                  <strong>Steals:</strong> {player.details?.stat?.steals || "0"}
                </p>
                <p>
                  <strong>Points:</strong> {player.details?.stat?.points || "0"}
                </p>
                <p>
                  <strong>Assists:</strong>{" "}
                  {player.details?.stat?.assists || "0"}
                </p>
                <p>
                  <strong>Blocks:</strong> {player.details?.stat?.blocks || "0"}
                </p>
              </div>
              <div className="mt-3 text-right">
                <button
                  className="px-3 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline"
                  onClick={() =>
                    getUpdatedPlayerData(
                      player.id,
                      player.details.gameId,
                      player.details.homeaway
                    )
                  }
                >
                  Update Player Data
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default SearchComponent;
