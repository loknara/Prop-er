import React, { useState } from "react";
import SearchDisplay from "./searchDisplay";
import { 
  handleSearch, 
  getPlayerDetails, 
  getUpdatedPlayerData, 
  handleInputChange, 
  updateAllPlayers 
} from "./searchBackend";

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [players, setPlayers] = useState([]);
  const [playerDetails, setPlayerDetails] = useState({});
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="h-full bg-gray-800/50 rounded-2xl shadow-xl border border-gray-700/50">
      <div className="p-6 border-b border-gray-700/50">
        <h2 className="text-2xl font-bold">
          <span className="text-white">Search </span>
          <span className="text-emerald-400">Players</span>
        </h2>
      </div>
      <SearchDisplay
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        players={players}
        playerDetails={playerDetails}
        selectedPlayers={selectedPlayers}
        loading={loading}
        handleSearch={() => handleSearch(searchQuery, setPlayers, setLoading, setShowDropdown)}
        getPlayerDetails={getPlayerDetails}
        getUpdatedPlayerData={getUpdatedPlayerData}
        isUpdated={isUpdated}
        setIsUpdated={setIsUpdated}
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
        setSelectedPlayers={setSelectedPlayers}
        setPlayerDetails={setPlayerDetails}
        setLoading={setLoading}
        setPlayers={setPlayers}
        handleInputChange={handleInputChange}
        updateAllPlayers={updateAllPlayers}
      />
    </div>
  );
};

export default SearchComponent;
