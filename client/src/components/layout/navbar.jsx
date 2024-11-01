// Navbar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "text-emerald-400" : "text-white";
  };

  return (
    <nav className="bg-gray-900 p-4 h-16 fixed top-0 w-full flex justify-between items-center border-b border-gray-700/50">
      <div className="flex items-center">
        <Link to="/" className="text-xl font-bold">
          <span className="text-white">Prop</span>
          <span className="text-emerald-400">-er</span>
        </Link>
      </div>
      <div className="flex items-center space-x-6">
        <Link 
          to="/" 
          className={`${isActive('/')} hover:text-emerald-400 transition-colors`}
        >
          Dashboard
        </Link>
        <Link 
          to="/odds" 
          className={`${isActive('/odds')} hover:text-emerald-400 transition-colors`}
        >
          Odds
        </Link>
        <Link 
          to="/about" 
          className={`${isActive('/about')} hover:text-emerald-400 transition-colors`}
        >
          About
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

