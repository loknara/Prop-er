import React, { useState, useEffect } from "react";
import SearchDisplay from "./searchDisplay";
import { handleSearch, getPlayerDetails, getUpdatedPlayerData, handleInputChange } from "./searchBackend";

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [players, setPlayers] = useState([]);
  const [playerDetails, setPlayerDetails] = useState({});
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

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
            setIsUpdated
          );
        }
      });
    }, 15000); // Update every 15 seconds

    return () => clearInterval(interval);
  }, [selectedPlayers, setIsUpdated]); // Dependency on selectedPlayers

  return (
    <SearchDisplay
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      players={players}
      playerDetails={playerDetails}
      selectedPlayers={selectedPlayers}
      loading={loading}
      handleSearch={() => handleSearch(searchQuery, setPlayers, setLoading, setShowDropdown)}
      getPlayerDetails={(playerId) => getPlayerDetails(playerId, setPlayerDetails, setSelectedPlayers, players, selectedPlayers, setLoading, setShowDropdown)}
      getUpdatedPlayerData={(playerId, gameId, homeaway) => getUpdatedPlayerData(playerId, gameId, homeaway, setPlayerDetails, setSelectedPlayers, selectedPlayers, setIsUpdated)}
      isUpdated={isUpdated}
      setIsUpdated={setIsUpdated}
      showDropdown={showDropdown}
      setShowDropdown={setShowDropdown}
      setSelectedPlayers={setSelectedPlayers}
      setPlayerDetails={setPlayerDetails}
      setLoading={setLoading}
      setPlayers={setPlayers}
      handleInputChange={(e) => handleInputChange(e, setSearchQuery, searchQuery, players, setPlayers, setLoading, setShowDropdown)}
    />
  );
};

export default SearchComponent;
