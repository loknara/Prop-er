import React, { useState } from 'react';
import axios from 'axios';
import './searchBar.css'; // Import the stylesheet

const SearchComponent = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [players, setPlayers] = useState([]);
    const [playerDetails, setPlayerDetails] = useState({});
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
            setPlayerDetails({ [playerId]: response.data }); // Store player details in state
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
                        <p><strong>ID:</strong> {player.id}</p>
                        <p><strong>Name:</strong> {player.full_name}</p>
                        <button onClick={() => getPlayerDetails(player.id)}>+</button>
                        {playerDetails[player.id] && (
                            <div className="player-details">
                                {typeof playerDetails[player.id] === 'string'
                                    ? <p>{playerDetails[player.id]}</p>
                                    : (
                                        <div>
                                            <p><strong>Rebounds Total:</strong> {playerDetails[player.id].reboundsTotal}</p>
                                            <p><strong>Steals:</strong> {playerDetails[player.id].steals}</p>
                                            <p><strong>Points:</strong> {playerDetails[player.id].points}</p>
                                            <p><strong>Assists:</strong> {playerDetails[player.id].assists}</p>
                                            <p><strong>Blocks:</strong> {playerDetails[player.id].blocks}</p>
                                        </div>
                                    )
                                }
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
export default SearchComponent;
