import axios from "axios";

export const handleSearch = async (
  searchQuery,
  setPlayers,
  setLoading,
  setShowDropdown
) => {
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
  setShowDropdown(true);
};

export const handleInputChange = (event, setSearchQuery, searchQuery, players, setPlayers, setLoading, setShowDropdown) => {

  const inputValue = event.target.value;
  
  setSearchQuery((prevSearchQuery) => inputValue)

  handleSearch(inputValue, setPlayers, setLoading, setShowDropdown)
}

export const getPlayerDetails = async (
  playerId,
  setPlayerDetails,
  setSelectedPlayers,
  players,
  selectedPlayers,
  setLoading,
  setShowDropdown,
  setSearchQuery
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
    setShowDropdown(false);

    setSearchQuery("")
  } catch (error) {
    console.error("Error occurred:", error);
    const errorMessage =
      error.response?.data?.message || "Error retrieving player details";
    setPlayerDetails((prevDetails) => ({
      ...prevDetails,
      [playerId]: errorMessage,
    }));
    setShowDropdown(false);
  }
  setLoading(false);
};

export const removePlayer = (
  playerId,
  setPlayerDetails,
  setSelectedPlayers,
  setIsUpdated
) => {
  // Remove player from state based on playerId
  setPlayerDetails((prevDetails) => {
    const updatedDetails = { ...prevDetails };
    delete updatedDetails[playerId];
    return updatedDetails;
  });

  // Remove player from selected players
  setSelectedPlayers((prevSelected) =>
    prevSelected.filter((player) => player.id !== playerId)
  );

  // Optional: You may want to update the UI to indicate that the player was removed
  setIsUpdated(true);

  // Reset isUpdated after a certain time
  setTimeout(() => {
    setIsUpdated(false);
  }, 1000);
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



export const updatePlayerData = (
  playerId,
  data,
  setPlayerDetails,
  setSelectedPlayers,
  setIsUpdated
) => {
  setPlayerDetails((prevDetails) => ({
    ...prevDetails,
    [playerId]: data,
  }));

  setSelectedPlayers((prevSelected) =>
    prevSelected.map((player) => {
      if (player.id === playerId) {
        return { ...player, details: data };
      }
      return player;
    })
  );
  // Set isUpdated to true to show the updated message
  setIsUpdated(true);

  // After a certain time (e.g., 1 seconds), reset isUpdated to false
  setTimeout(() => {
    setIsUpdated(false);
  }, 1000); // Adjust the duration as needed
};

export const getUpdatedPlayerData = async (
  playerId,
  gameId,
  homeaway,
  setPlayerDetails,
  setSelectedPlayers,
  selectedPlayers,
  setIsUpdated
) => {
  // Disable the button immediately to prevent multiple clicks
  setIsUpdated(true);
  try {
    const data = await fetchPlayerData(playerId, gameId, homeaway);

    if (data) {
      updatePlayerData(
        playerId,
        data,
        setPlayerDetails,
        setSelectedPlayers,
        setIsUpdated
      );
    }
  } finally {
    // After the asynchronous operation (fetching data), re-enable the button after a certain time
    setTimeout(() => {
      setIsUpdated(false);
    }, 1000); // Adjust the duration as needed
  }
};

export const updateAllPlayers = async (selectedPlayers, setIsUpdated, setPlayerDetails, setSelectedPlayers) => {
  console.log(selectedPlayers);
  setIsUpdated(true);
    try {
      // Loop through selected players and update them
      for (const player of selectedPlayers) {
        // Assuming you have some logic to determine gameId and homeaway
        const gameId = player.details.gameId; // Replace with actual logic
        const homeaway = player.details.homeaway; // Replace with actual logic
        await getUpdatedPlayerData(
          player.id,
          gameId,
          homeaway,
          setPlayerDetails,
          setSelectedPlayers,
          selectedPlayers,
          setIsUpdated
        );
      }
    } finally {
      // After the asynchronous operation (fetching data for all players),
      // re-enable the button after a certain time
      setTimeout(() => {
        setIsUpdated(false);
      }, 1000); // Adjust the duration as needed
    }
}
