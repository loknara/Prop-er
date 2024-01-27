import React from 'react';
import SearchBox from './components/searchBar.jsx';  // Adjust the path based on your file structure
import Scoreboard from './components/scoreboard.jsx'
import './App.css'

const App = () => {
    return (
        <div className='tester'>
            <div className='left'>
            <Scoreboard/>
            </div>
            <div className='right'>
            <SearchBox />
            </div>
        </div>
    );
};

export default App;
