import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);

  return (
    <nav className="bg-black text-white py-4 px-6 sticky top-0 z-50 border-b border-purple-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-teal-400 bg-clip-text text-transparent">
                Animora
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <button 
                className="hover:text-teal-400 transition-colors flex items-center"
                onMouseEnter={() => setIsExploreOpen(!isExploreOpen)}
              >
                Explore
              </button>
              {isExploreOpen && (
                <div className="absolute bg-gray-900 p-4 rounded-md shadow-lg w-48 mt-2">
                  <Link to="/explore/naruto" className="block py-2 hover:text-teal-400">Naruto</Link>
                  <Link to="/explore/one-piece" className="block py-2 hover:text-teal-400">One Piece</Link>
                  <Link to="/explore/kaiju" className="block py-2 hover:text-teal-400">Kaiju No. 8</Link>
                  <Link to="/explore/bleach" className="block py-2 hover:text-teal-400">Bleach</Link>
                </div>
              )}
            </div>
            <div className="relative group">
              <Link to="#categories" className="hover:text-teal-400 transition-colors">
                Categories
              </Link>
              <div className="absolute hidden group-hover:block bg-gray-900 p-4 rounded-md shadow-lg w-48 mt-2">
                <Link to="#clothing" className="block py-2 hover:text-teal-400">Clothing</Link>
                <Link to="#accessories" className="block py-2 hover:text-teal-400">Accessories</Link>
                <Link to="#footwear" className="block py-2 hover:text-teal-400">Footwear</Link>
                <Link to="#electronics" className="block py-2 hover:text-teal-400">Electronics</Link>
              </div>
            </div>
          </div>

          {/* Search and Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-800 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <button className="hover:text-teal-400 transition-colors relative">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </button>
            <button className="hover:text-teal-400 transition-colors">
              <User className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => setIsExploreOpen(!isExploreOpen)}
                className="hover:text-teal-400 transition-colors"
              >
                Explore
              </button>
              {isExploreOpen && (
                <div className="pl-4 flex flex-col space-y-2">
                  <Link to="/explore/naruto" className="hover:text-teal-400">Naruto</Link>
                  <Link to="/explore/one-piece" className="hover:text-teal-400">One Piece</Link>
                  <Link to="/explore/kaiju" className="hover:text-teal-400">Kaiju No. 8</Link>
                  <Link to="/explore/bleach" className="hover:text-teal-400">Bleach</Link>
                </div>
              )}
              <Link to="#categories" className="hover:text-teal-400 transition-colors">
                Categories
              </Link>
              <div className="relative mt-4">
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-gray-800 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <div className="flex space-x-4 mt-4">
                <button className="hover:text-teal-400 transition-colors relative">
                  <ShoppingCart className="h-6 w-6" />
                  <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    0
                  </span>
                </button>
                <button className="hover:text-teal-400 transition-colors">
                  <User className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;