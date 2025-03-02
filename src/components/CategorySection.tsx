import React from 'react';

const categories = [
  {
    id: 1,
    name: 'Clothing',
    image: '/imgs/category_sec_cloth.jpeg',
    count: 120,
  },
  {
    id: 2,
    name: 'Accessories',
    image: '/imgs/category_sec_access.webp',
    count: 85,
  },
  {
    id: 3,
    name: 'Footwear',
    image: '/imgs/category_sec_shoes.avif',
    count: 64,
  },
];

const CategorySection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-black" id="categories">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text on the left */}
          <div>
            <h2 className="text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-500 to-teal-400 bg-clip-text text-transparent">
                Shop by Category
              </span>
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Browse our extensive collection of products organized by categories. 
              Find exactly what you're looking for with our intuitive navigation system.
            </p>
            <div className="space-y-4">
              {categories.map(category => (
                <div key={category.id} className="flex items-center space-x-4">
                  <div className="w-2 h-2 rounded-full bg-teal-400"></div>
                  <span className="text-white font-medium">{category.name}</span>
                  <span className="text-gray-400 text-sm">({category.count} items)</span>
                </div>
              ))}
            </div>
            <button className="mt-8 bg-gradient-to-r from-purple-600 to-teal-500 text-white px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity">
              Explore All Categories
            </button>
          </div>
          
          {/* Image grid on the right */}
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category, index) => (
              <div 
                key={category.id} 
                className={`rounded-lg overflow-hidden shadow-lg hover:shadow-purple-500/20 transition-transform hover:scale-[1.03] ${
                  index === 0 ? 'col-span-2' : ''
                }`}
              >
                <div className="relative group">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-white">{category.name}</h3>
                      <p className="text-gray-300 text-sm">{category.count} Products</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;