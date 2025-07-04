import React from 'react';

function Navbar() {
  return (
    <nav className="bg-gradient-to-br from-gray-900 to-gray-700 px-6 py-3 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <span role="img" aria-label="logo" className="text-2xl">🌱</span>
        <span className="text-white font-semibold text-lg">AI Caption Generator</span>
      </div>
      <div className="hidden md:flex space-x-6">
        <a href="#" className="text-gray-300 hover:text-white text-sm transition">Home</a>
        <a href="#" className="text-gray-300 hover:text-white text-sm transition">About</a>
        <a href="#" className="text-gray-300 hover:text-white text-sm transition">Contact</a>
      </div>
    </nav>
  );
}

export default Navbar;