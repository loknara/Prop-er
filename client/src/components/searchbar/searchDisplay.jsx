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
}) => {
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
                {/* Display player stats here */}
                <p>
                  <strong>Rebounds:</strong>{" "}
                  {player.details?.stat?.reboundsTotal || "0"}
                </p>
                <p>
                  <strong>Steals:</strong> {player.details?.stat?.steals || "0"}
                </p>
                {/* Other stats... */}
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

export default SearchDisplay;
