import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileOpen(false);
  };

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
                onMouseEnter={() => setIsExploreOpen(true)}
                onMouseLeave={() => setIsExploreOpen(false)}
              >
                Explore
              </button>
              {isExploreOpen && (
                <div 
                  className="absolute bg-gray-900 p-4 rounded-md shadow-lg w-48 mt-2"
                  onMouseEnter={() => setIsExploreOpen(true)}
                  onMouseLeave={() => setIsExploreOpen(false)}
                >
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
            <Link to="/cart" className="hover:text-teal-400 transition-colors relative">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            </Link>
            <div className="relative">
              <button 
                className="hover:text-teal-400 transition-colors"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <User className="h-6 w-6" />
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 bg-gray-900 p-4 rounded-md shadow-lg w-48">
                  {isAuthenticated ? (
                    <>
                      <div className="pb-2 mb-2 border-b border-gray-800">
                        <p className="text-sm text-gray-400">Signed in as</p>
                        <p className="font-medium text-white truncate">{user?.name}</p>
                      </div>
                      <Link to="/profile" className="block py-2 hover:text-teal-400">My Profile</Link>
                      <Link to="/orders" className="block py-2 hover:text-teal-400">My Orders</Link>
                      <Link to="/wishlist" className="block py-2 hover:text-teal-400">Wishlist</Link>
                      <button 
                        onClick={handleLogout}
                        className="flex items-center w-full text-left py-2 text-red-400 hover:text-red-300"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="block py-2 hover:text-teal-400">Sign In</Link>
                      <Link to="/register" className="block py-2 hover:text-teal-400">Create Account</Link>
                    </>
                  )}
                </div>
              )}
            </div>
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

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-800">
                <Link to="/cart" className="flex items-center hover:text-teal-400">
                  <ShoppingCart className="h-6 w-6 mr-2" />
                  <span>Cart (0)</span>
                </Link>
                
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <p className="text-gray-400 text-sm">Hello, {user?.name}</p>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center text-red-400 hover:text-red-300"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Link to="/login" className="hover:text-teal-400">Sign In</Link>
                    <Link to="/register" className="hover:text-teal-400">Register</Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;