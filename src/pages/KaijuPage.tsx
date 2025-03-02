import React, { useState } from 'react';
import ProductFilter from '../components/ProductFilter';
import ProductCard from '../components/ProductCard';
import { getProductsByTheme } from '../data/products';

const KaijuPage: React.FC = () => {
  const [filters, setFilters] = useState({});
  const products = getProductsByTheme('kaiju');
  const themeColors = ['Black', 'Teal', 'Aqua', 'Navy'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Hero Section with Video Background */}
      <div className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <video 
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-blue-ink-swirling-in-water-21862-large.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
            Kaiju No. 8 Collection
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Embrace the monster within with our exclusive Kaiju No. 8 merchandise featuring bold designs and characters.
          </p>
        </div>
      </div>

      {/* Products Section with Filters */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="md:col-span-1">
            <ProductFilter themeColors={themeColors} onFilterChange={setFilters} />
          </div>

          {/* Products Grid */}
          <div className="md:col-span-3">
            <div className="mb-8 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">All Products</h2>
              <div className="flex items-center">
                <span className="text-gray-400 mr-2">Sort by:</span>
                <select className="bg-gray-800 text-white rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-teal-500">
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} theme="kaiju" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KaijuPage;