// Navbar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "text-blue-300" : "text-white";
  };

  return (
    <nav className="bg-gray-800 p-4 h-16 fixed top-0 w-full flex justify-between items-center">
      <div className="flex items-center">
        <Link to="/" className="text-white text-xl font-bold">
          Prop-er
        </Link>
      </div>
      <div className="flex items-center space-x-6">
        <Link 
          to="/" 
          className={`${isActive('/')} hover:text-gray-300 transition-colors`}
        >
          Dashboard
        </Link>
        <Link 
          to="/odds" 
          className={`${isActive('/odds')} hover:text-gray-300 transition-colors`}
        >
          Odds
        </Link>
        <Link 
          to="/about" 
          className={`${isActive('/about')} hover:text-gray-300 transition-colors`}
        >
          About
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

