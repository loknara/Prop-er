import axios from "axios";

export const handleSearch = async (searchQuery, setPlayers, setLoading) => {
  setLoading(true);
  try {
    const response = await axios.post("http://127.0.0.1:5000/search", {
      search_query: searchQuery,
    });
    setPlayers(response.data);
  } catch (error) {
    console.error("Error occurred:", error);
    setPlayers([]);
  }
  setLoading(false);
};

export const getPlayerDetails = async (
  playerId,
  setPlayerDetails,
  setSelectedPlayers,
  players,
  selectedPlayers,
  setLoading
) => {
  setLoading(true);
  try {
    const response = await axios.post("http://127.0.0.1:5000/playerscore", {
      player_id: playerId,
    });
    setPlayerDetails((prevDetails) => ({
      ...prevDetails,
      [playerId]: response.data,
    }));

    const playerInfo = players.find((player) => player.id === playerId);
    const playerToAdd = {
      ...playerInfo,
      details: response.data,
    };

    if (!selectedPlayers.some((player) => player.id === playerId)) {
      setSelectedPlayers((prevSelected) => [...prevSelected, playerToAdd]);
    }
  } catch (error) {
    console.error("Error occurred:", error);
    const errorMessage =
      error.response?.data?.message || "Error retrieving player details";
    setPlayerDetails((prevDetails) => ({
      ...prevDetails,
      [playerId]: errorMessage,
    }));
  }
  setLoading(false);
};

export const fetchPlayerData = async (playerId, gameId, homeaway) => {
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

export const updatePlayerData = (playerId, data, setPlayerDetails, setSelectedPlayers) => {
  setPlayerDetails((prevDetails) => ({
    ...prevDetails,
    [playerId]: data
  }));

  setSelectedPlayers((prevSelected) =>
    prevSelected.map((player) => {
      if (player.id === playerId) {
        return { ...player, details: data };
      }
      return player;
    })
  );
};

export const getUpdatedPlayerData = async (
  playerId,
  gameId,
  homeaway,
  setPlayerDetails,
  setSelectedPlayers,
  selectedPlayers,
  setLoading
) => {
  setLoading(true);
  const data = await fetchPlayerData(playerId, gameId, homeaway);
  if (data) {
    updatePlayerData(playerId, data, setPlayerDetails, setSelectedPlayers);
  }
  setLoading(false);
};