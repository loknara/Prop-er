import React from 'react';
import SearchBox from '../components/searchbar/searchBar.jsx'; 
import Scoreboard from '../components/scoreboard/scoreboard.jsx'
import Navbar from '../components/layout/navbar.jsx';

const HomePage = () => {
    return (
        <div className='flex flex-wrap'>
            <Navbar />
            <div className='w-full md:w-1/2'>
                <SearchBox />
            </div>
            <div className='w-full md:w-1/2'>
                <Scoreboard />
            </div>
        </div>
    );
};

export default HomePage;