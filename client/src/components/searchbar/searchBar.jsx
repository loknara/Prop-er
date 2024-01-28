import React, { useState, useEffect } from "react";
import SearchDisplay from "./searchDisplay";
import { handleSearch, getPlayerDetails, getUpdatedPlayerData } from "./searchBackend";

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [players, setPlayers] = useState([]);
  const [playerDetails, setPlayerDetails] = useState({});
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [loading, setLoading] = useState(false);

  // useEffect for periodic updates
  useEffect(() => {
    const interval = setInterval(() => {
      selectedPlayers.forEach((player) => {
        if (player.details?.gameId && player.details?.homeaway) {
          getUpdatedPlayerData(
            player.id,
            player.details.gameId,
            player.details.homeaway,
            setPlayerDetails,
            setSelectedPlayers,
            selectedPlayers,
            setLoading
          );
        }
      });
    }, 15000); // Update every 15 seconds

    return () => clearInterval(interval);
  }, [selectedPlayers]); // Dependency on selectedPlayers

  return (
    <SearchDisplay
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      players={players}
      playerDetails={playerDetails}
      selectedPlayers={selectedPlayers}
      loading={loading}
      handleSearch={() => handleSearch(searchQuery, setPlayers, setLoading)}
      getPlayerDetails={(playerId) => getPlayerDetails(playerId, setPlayerDetails, setSelectedPlayers, players, selectedPlayers, setLoading)}
      getUpdatedPlayerData={(playerId, gameId, homeaway) => getUpdatedPlayerData(playerId, gameId, homeaway, setPlayerDetails, setSelectedPlayers, selectedPlayers, setLoading)}
    />
  );
};

export default SearchComponent;
