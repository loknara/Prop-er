import React from "react";

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
  setIsUpdated
}) => {
  return (
    <div className="flex flex-col h-screen p-5">
      <div className="flex justify-center p-4">
      <div className="flex w-full max-w-md">
        <input
          className="flex-grow h-12 px-4 text-xl border-2 border-r-0 border-gray-300 rounded-l-lg focus:outline-none"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a player or team"
        />
        <button
          className="w-auto px-8 h-12 text-xl font-semibold text-white bg-blue-600 rounded-r-lg hover:bg-blue-700 focus:outline-none"
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

      <div className="flex-1 overflow-auto p-4 bg-gray-100 rounded shadow">
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

      <div className="p-4 bg-gray-100 rounded h-96 mt-5">
        <h2 className="mb-4 text-xl font-bold text-center">Selected Players</h2>
        <div className="grid grid-cols-3 gap-4 h-80 overflow-auto">
          {selectedPlayers.map((player, index) => (
            <div key={index} className="w-full h-44 p-4 bg-white rounded shadow">
              <div className="mb-2 text-xs">
                <strong>Name:</strong> {player.full_name}
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchDisplay;
