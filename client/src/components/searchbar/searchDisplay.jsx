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
    <div className="flex flex-col">
      <div className="flex justify-center p-2 h-18">
        <div className="w-full max-w-xs flex">
          <input
            className="w-3/4 h-10 px-3 py-2 mt-3 leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for players..."
          />
          <button
            className="w-1/4 h-10 ml-3 px-4 py-2 mt-3 font-bold text-center text-white bg-gray-800 rounded transition hover:bg-gray-300 focus:outline-none focus:shadow-outline"
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

      <div className="flex-1 overflow-auto p-4 mr-4">
        <div className="flex-wrap h-64">
          {players.map((player, index) => (
            <div key={index} className="w-full mb-4 p-4 bg-white rounded shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center">

                  <button
                    className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    onClick={() => getPlayerDetails(player.id)}
                  >
                    +
                  </button>
                </div>
                <p className="text-lg font-semibold">{player.full_name}</p>
              </div>
              {playerDetails[player.id] && (
                <div className="mt-3">
                  {typeof playerDetails[player.id] === "string" ? (
                    <p className="text-sm text-red-500">{playerDetails[player.id]}</p>
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

      <div className="p-4 mt-5 bg-gray-200 rounded-xl mr-4">
        <h2 className="mb-4 text-xl font-bold text-center">Selected Players</h2>
        <div className="grid grid-cols-3 gap-4 h-72 overflow-auto">
          {selectedPlayers.map((player, index) => (
            <div key={index} className="w-full h-fit p-4 bg-white rounded shadow">
              <div className="mb-2 text-xs">
              <img
                    src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.id}.png`}
                    alt={player.full_name}
                    className="w-full h-32 object-cover mb-2 rounded"
                />
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
                <div className="flex justify-between">
                  <button
                    className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
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
    </div>
  );
};

export default SearchDisplay;
