import React from 'react';
import SearchBox from './components/searchBar.jsx';  // Adjust the path based on your file structure
import Scoreboard from './components/scoreboard.jsx'

const App = () => {
    return (
        <div>
            <SearchBox />
            <Scoreboard/>
        </div>
    );
};

export default App;
