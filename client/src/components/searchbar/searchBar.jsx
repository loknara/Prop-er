import React, { useState } from "react";
import SearchDisplay from "./searchDisplay";
import { handleSearch, getPlayerDetails, getUpdatedPlayerData } from "./searchBackend";

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [players, setPlayers] = useState([]);
  const [playerDetails, setPlayerDetails] = useState({});
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [loading, setLoading] = useState(false);

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
