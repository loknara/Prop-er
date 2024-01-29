// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 h-16 fixed top-0 w-full flex justify-between items-center">
      <div className="flex items-center">
        <Link to="/home" className="text-white text-xl font-bold">
          Prop-er
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link to="/about" className="text-white">
          About
        </Link>
        <Link to="/contact" className="text-white">
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

