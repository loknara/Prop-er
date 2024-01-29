import React from 'react';
import SearchBox from '../components/searchbar/searchBar.jsx'; 
import Scoreboard from '../components/scoreboard/scoreboard.jsx'

const Dashboard = () => {
    return (
        <div className='flex flex-wrap'>
            <div className='w-full md:w-1/2'>
                <Scoreboard />
            </div>
            <div className='w-full md:w-1/2'>
                <SearchBox />
            </div>
        </div>
    );
};

export default Dashboard;