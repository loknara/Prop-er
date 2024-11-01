import axios from "axios";

export const handleSearch = async (
  searchQuery,
  setPlayers,
  setLoading,
  setShowDropdown
) => {
  setLoading(true);
  try {
    const response = await axios.post("/search", {
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
  try {
    setLoading(true);
    
    // Check if player is already selected
    if (selectedPlayers.some(player => player.id === playerId)) {
      setLoading(false);
      return;
    }

    // Find the player from the search results
    const selectedPlayer = players.find(player => player.id === playerId);
    
    try {
      // Try to get active game data
      const response = await fetch(`/api/player/${playerId}/game`);
      const gameData = await response.json();
      
      const playerWithDetails = {
        id: playerId,
        full_name: selectedPlayer.full_name,
        details: gameData,
        status: 'active'
      };
      
      setSelectedPlayers(prevPlayers => [...prevPlayers, playerWithDetails]);
      
    } catch (error) {
      // If no active game, add player with inactive status
      const playerWithDetails = {
        id: playerId,
        full_name: selectedPlayer.full_name,
        details: {
          stat: {
            points: '-',
            assists: '-',
            rebounds: '-',
            steals: '-',
            blocks: '-'
          }
        },
        status: 'inactive'
      };
      
      setSelectedPlayers(prevPlayers => [...prevPlayers, playerWithDetails]);
    }

    // Clear search regardless of game status
    setSearchQuery('');
    setShowDropdown(false);
    setLoading(false);
    
  } catch (error) {
    console.error('Error in getPlayerDetails:', error);
    setLoading(false);
  }
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
    const response = await axios.post("/updatePlayers", {
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
  setIsUpdated
) => {
  try {
    // If no gameId is provided (player is inactive), return early
    if (!gameId) {
      console.log('Player is not in an active game');
      setIsUpdated(true);
      setTimeout(() => setIsUpdated(false), 2000); // Reset after 2 seconds
      return;
    }

    const response = await fetch(`/api/player/${playerId}/game`);
    const data = await response.json();
    
    setIsUpdated(true);
    setTimeout(() => setIsUpdated(false), 2000); // Reset after 2 seconds
    
    return data;
  } catch (error) {
    console.error('Error updating player data:', error);
    setIsUpdated(false);
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
