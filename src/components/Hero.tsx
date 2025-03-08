import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Hero: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <section className="py-16 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image on the left */}
          <div className="order-2 md:order-1">
            <div className="rounded-lg overflow-hidden shadow-2xl shadow-purple-500/20 transform transition-transform hover:scale-[1.02]">
              <img
                src="/imgs/heromain.jpg"
                alt="Stylish fashion model"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          
          {/* Text on the right */}
          <div className="order-1 md:order-2">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-500 to-teal-400 bg-clip-text text-transparent">
                {isAuthenticated ? `Welcome Back, ${user?.name}!` : 'Redefine Your Style'}
              </span>
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Discover the latest trends and exclusive collections that will elevate your wardrobe. 
              Animora brings you premium quality fashion with a touch of elegance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to={isAuthenticated ? "/explore/naruto" : "/login"} 
                className="bg-gradient-to-r from-purple-600 to-teal-500 text-white px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity text-center"
              >
                {isAuthenticated ? 'Shop Now' : 'Sign In'}
              </Link>
              <Link 
                to="/explore" 
                className="border border-purple-500 text-white px-8 py-3 rounded-full font-medium hover:bg-purple-900/30 transition-colors text-center"
              >
                Explore Collections
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;