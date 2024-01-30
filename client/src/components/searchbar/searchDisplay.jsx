import React from "react";
import { handleInputChange, removePlayer } from "./searchBackend";

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
  setPlayers
}) => {
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
                className="w-[74%] h-10 px-3 py-2 leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                type="text"
                value={searchQuery}
                // onChange={(e) => setSearchQuery(e.target.value)}
                onChange={(e) => handleInputChange(e, setSearchQuery, searchQuery, players, setPlayers, setLoading, setShowDropdown)}
                // onChange={e => { handleInputChange(e.target.value, setSearchQuery, searchQuery, setPlayers, setLoading, setShowDropdown) }}
                // onInput={e => setSearchQuery(e.target.value)}
                // onChange={handleInputChange}
                placeholder="Search for players..."
              />
              <button
                className="w-[25%] h-10 px-4 py-2 font-bold flex items-center justify-center  text-white bg-gray-800 rounded transition hover:bg-gray-700 focus:outline-none focus:shadow-outline"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>

            {showDropdown && (
              players.length > 0 && (
                <div className="absoluteleft-0 w-[74%] max-h-40 overflow-y-auto bg-white border shadow">
                  {/* {players.map((player, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => getPlayerDetails(player.id)}
                    >
              
                      {player.full_name}
                    </div>

                  )

                  )} */}
                  {players.map((player, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center border-b"
                      onClick={() => getPlayerDetails(player.id)}
                    >
                      <img
                        src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.id}.png`}
                        alt={player.full_name}
                        className="h-10 w-10 object-cover mb-2 rounded mr-2"
                      />
                      <span className="ml-3">{player.full_name}</span>
                    </div>
                  ))}
                </div>
              ))}

          </div>
        </div>
      </div>


      <div className="p-4 bg-gray-200 rounded-xl mr-4 h-[95%] mt-0">
        <h2 className="mb-2 text-xl font-bold text-center">Selected Players</h2>
        <div className="grid grid-cols-3 gap-4 h-[90%] overflow-auto">
          {selectedPlayers.map((player, index) => (
            <div key={index} className="w-full h-fit p-4 bg-white rounded shadow">
              <div className="mb-2 text-xs">
                <img
                  src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.id}.png`}
                  alt={player.full_name}
                  className="w-full h-32 object-cover mb-2 rounded"
                />

              </div>
              <div>
                <div className={`${getFontSizeClass(player.full_name)} mb-1`}>
                  <strong>Name: </strong>
                  {player.full_name}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p className="text-xs">
                  <strong>Rebounds:</strong>{" "}
                  {player.details?.stat?.reboundsTotal || "0"}
                </p>
                <p className="text-xs">
                  <strong>Steals:</strong> {player.details?.stat?.steals || "0"}
                </p>
                <p className="text-xs">
                  <strong>Points:</strong> {player.details?.stat?.points || "0"}
                </p>
                <p className="text-xs">
                  <strong>Assists:</strong>{" "}
                  {player.details?.stat?.assists || "0"}
                </p>
                <p className="text-xs">
                  <strong>Blocks:</strong> {player.details?.stat?.blocks || "0"}
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
                    className="px-3 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline"
                    onClick={() =>
                      getUpdatedPlayerData(
                        player.id,
                        player.details.gameId,
                        player.details.homeaway
                      )
                    }
                    disabled={isUpdated}
                  >
                    {isUpdated ? 'Updated' : 'Update Player Data'}
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
