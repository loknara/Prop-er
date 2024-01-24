import React, { useState } from 'react';
import axios from 'axios';
import './searchBar.css'; // Import the stylesheet

const SearchComponent = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://127.0.0.1:5000/box', { search_query: searchQuery });
            setPlayers(response.data);  // Set the players state to the response data
        } catch (error) {
            console.error('Error occurred:', error);
            setPlayers([]);
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
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchComponent;
