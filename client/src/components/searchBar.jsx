import React, { useState } from 'react';
import axios from 'axios';
import './searchBar.css'; // Import the stylesheet

const SearchComponent = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [players, setPlayers] = useState([]);
    const [playerDetails, setPlayerDetails] = useState({});
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://127.0.0.1:5000/search', { search_query: searchQuery });
            setPlayers(response.data);  // Set the players state to the response data
        } catch (error) {
            console.error('Error occurred:', error);
            setPlayers([]);
        }
        setLoading(false);
    };
    const getPlayerDetails = async (playerId) => {
        setLoading(true);
        try {
            const response = await axios.post('http://127.0.0.1:5000/playerscore', { player_id: playerId });
            // setPlayerDetails({ [playerId]: response.data }); // Store player details in state
            setPlayerDetails({ ...playerDetails, [playerId]: response.data }); // Store player details in state

            const playerInfo = players.find(player => player.id === playerId);

            const playerToAdd = {
                ...playerInfo,
                details: response.data
            };
    
            // Add player to selectedPlayers state if not already added
            if (!selectedPlayers.some(player => player.id === playerId)) {
                setSelectedPlayers([...selectedPlayers, playerToAdd]);
            }
        } catch (error) {
            console.error('Error occurred:', error);
            // Use the error message from the response if available
            const errorMessage = error.response?.data?.message || 'Error retrieving player details';
            setPlayerDetails({ [playerId]: errorMessage });
        }
        setLoading(false);
    };

    return (
        <div className="search-container">
            <div>
                <input
                    className="search-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for players..."
                />
                <button className="search-button" onClick={handleSearch}>Search</button>
            </div>

            {loading && <p className="loading">Loading...</p>}

            <div>
            {players.map((player, index) => (
                    <div key={index} className="player-card">
                        {/* <p><strong>ID:</strong> {player.id}</p> */}
                        <p><strong>Name:</strong> {player.full_name}</p>
                        <button onClick={() => getPlayerDetails(player.id)}>+</button>
                        {playerDetails[player.id] && (
                            <div className="player-details">
                                {typeof playerDetails[player.id] === 'string'
                                    ? <p>{playerDetails[player.id]}</p>  // Display error message
                                    : (
                                        <div>
                                            <p><strong>Rebounds Total:</strong> {playerDetails[player.id].stat.reboundsTotal}</p>
                                            <p><strong>Steals:</strong> {playerDetails[player.id].stat.steals}</p>
                                            <p><strong>Points:</strong> {playerDetails[player.id].stat.points}</p>
                                            <p><strong>Assists:</strong> {playerDetails[player.id].stat.assists}</p>
                                            <p><strong>Blocks:</strong> {playerDetails[player.id].stat.blocks}</p>
                                            <p><strong>Game ID:</strong> {playerDetails[player.id].gameId}</p>
                                        </div>
                                    )
                                }
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="selected-players-container">
    <h2>Selected Players</h2>
    {selectedPlayers.map((player, index) => (
        <div key={index} className="selected-player-card">
            <p><strong>Name:</strong> {player.full_name}</p>
            {/* ... display other details from player.details ... */}
            <p><strong>Rebounds Total:</strong> {player.details.stat.reboundsTotal}</p>
            <p><strong>Steals:</strong> {player.details.stat.steals}</p>
            <p><strong>Points:</strong> {player.details.stat.points}</p>
            <p><strong>Assists:</strong> {player.details.stat.assists}</p>
            <p><strong>Blocks:</strong> {player.details.stat.blocks}</p>
            <p><strong>Game ID:</strong> {player.details.gameId}</p>
        </div>
    ))}
</div>
        </div>
    );
};
export default SearchComponent;
