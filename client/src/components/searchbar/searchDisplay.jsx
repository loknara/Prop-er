import React from "react";
import { handleInputChange, removePlayer, updateAllPlayers } from "./searchBackend";
import { useEffect } from "react";

const SearchDisplay = ({
  searchQuery,
  setSearchQuery,
  players,
  playerDetails,
  selectedPlayers,
  loading,
  handleSearch,
  getPlayerDetails,
  getUpdatedPlayerData,
  isUpdated,
  setIsUpdated,
  showDropdown,
  setShowDropdown,
  setPlayerDetails,
  setSelectedPlayers,
  setLoading,
  setPlayers,
  updateAllPlayers
}) => {
  useEffect(() => {
    const interval = setInterval(() => {
      updateAllPlayers(selectedPlayers, setIsUpdated, setPlayerDetails, setSelectedPlayers)
    }, 20000); // Update every 15 seconds

    return () => clearInterval(interval);
  }, [updateAllPlayers]); // Dependency on selectedPlayers

  const handleUpdateAllPlayers = async () => {
    await updateAllPlayers(selectedPlayers, setIsUpdated, setPlayerDetails, setSelectedPlayers);
  }
  const getFontSizeClass = (name) => {

    if (name.length > 22) {
      return "text-[11px]"; // Smaller text for longer names
    }
    return "text-xs"; // Default text size for shorter names
  };
  return (
    <div className="flex flex-col h-[88dvh]" onClick={() => setShowDropdown(false)}>
      <div className="h-[10%] relative">
        <div className="flex w-[80%] m-auto justify-center p-2 h-18">
          <div className="w-[100%] relative">
            <div className="flex w-full items-center justify-between">
              <input
                className="w-[74%] h-10 px-3 py-2 leading-tight text-white bg-gray-800 border border-gray-700/50 rounded shadow 
                  appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-400/50 placeholder-gray-500"
                type="text"
                value={searchQuery}
                onChange={(e) => handleInputChange(e, setSearchQuery, searchQuery, players, setPlayers, setLoading, setShowDropdown)}
                placeholder="Search for players..."
              />
              <button
                className="w-[25%] h-10 px-4 py-2 font-bold flex items-center justify-center text-white bg-gray-800 
                  rounded transition hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 
                  border border-gray-700/50"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>

            {showDropdown && players.length > 0 && (
              <div className="absolute left-0 w-[74%] max-h-60 overflow-y-auto bg-gray-800 border border-gray-700/50 
                rounded-b shadow-lg z-50">
                {players.slice(0, 10).map((player, index) => (
                  <div
                    key={index}
                    className="flex items-center px-4 py-2 border-b border-gray-700/50 hover:bg-gray-700/50 
                      cursor-pointer transition-colors"
                    onClick={() => getPlayerDetails(
                      player.id,
                      setPlayerDetails,
                      setSelectedPlayers,
                      players,
                      selectedPlayers,
                      setLoading,
                      setShowDropdown,
                      setSearchQuery
                    )}
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-700/50">
                      <img
                        src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.id}.png`}
                        alt={player.full_name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'path/to/fallback/image.png';
                          e.target.onerror = null;
                        }}
                      />
                    </div>
                    <span className="ml-3 text-white hover:text-emerald-400">{player.full_name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-200 rounded-xl mr-4 h-[95%] mt-0">
      <div className="flex mb-4">
        <h2 className="ml-[40%] text-xl font-bold text-center">Selected Players</h2>
        <button className="ml-[13%] px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline" 
        onClick={handleUpdateAllPlayers} disabled={isUpdated}>{isUpdated ? 'Updated' : 'Update All Players'}</button>
      </div>
        <div className="grid grid-cols-3 gap-4 h-[90%] overflow-auto">
          {selectedPlayers.map((player, index) => (
            <div key={index} className="w-full h-fit p-4 bg-gray-800 rounded shadow">
              <div className="mb-2 text-xs">
                <img
                  src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.id}.png`}
                  alt={player.full_name}
                  className="w-full h-32 object-cover mb-2 rounded"
                />
                {player.status === 'inactive' && (
                  <div className="text-gray-400 text-sm mt-1">
                    Not currently in game
                  </div>
                )}
              </div>
              <div>
                <div className={`${getFontSizeClass(player.full_name)} mb-1 text-gray-200`}>
                  <strong className="text-gray-200">Name: </strong>
                  {player.full_name}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p className="text-xs text-gray-200">
                  <strong className="text-gray-200">Rebounds:</strong>{" "}
                  {player.details?.stat?.reboundsTotal || "-"}
                </p>
                <p className="text-xs text-gray-200">
                  <strong className="text-gray-200">Steals:</strong>{" "}
                  {player.details?.stat?.steals || "-"}
                </p>
                <p className="text-xs text-gray-200">
                  <strong className="text-gray-200">Points:</strong>{" "}
                  {player.details?.stat?.points || "-"}
                </p>
                <p className="text-xs text-gray-200">
                  <strong className="text-gray-200">Assists:</strong>{" "}
                  {player.details?.stat?.assists || "-"}
                </p>
                <p className="text-xs text-gray-200">
                  <strong className="text-gray-200">Blocks:</strong>{" "}
                  {player.details?.stat?.blocks || "-"}
                </p>
              </div>
              <div className="mt-3 text-right">
                <div className="flex justify-between">
                  <button
                    className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
                    onClick={() => removePlayer(player.id, setPlayerDetails, setSelectedPlayers, setIsUpdated)}
                  >
                    -
                  </button>
                  <button
                    className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-700 
                      focus:outline-none focus:shadow-outline disabled:bg-gray-500"
                    onClick={() => getUpdatedPlayerData(
                      player.id,
                      player.details?.gameId,
                      player.details?.homeaway,
                      setIsUpdated
                    )}
                    disabled={isUpdated || player.status === 'inactive'}
                  >
                    {player.status === 'inactive' ? 'No Active Game' : 
                      isUpdated ? 'Updated' : 'Update Player Data'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div >
  );
};

export default SearchDisplay;
