import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
const products = [
  {
    id: 1,
    name: 'Uchiha Madara hoodie',
    price: 129.99,
    image: '/imgs/featured1.webp',
    category: 'Dresses',
    isNew: true,
  },
  {
    id: 2,
    name: 'onepiece hoodie',
    price: 199.99,
    image: '/imgs/featured2.webp',  
    category: 'Outerwear',
    isNew: false,
  },
  {
    id: 3,
    name: 'Law keychain',
    price: 89.99,
    image: '/imgs/featured3.webp',
    category: 'Footwear',
    isNew: true,
  },
  {
    id: 4,
    name: 'Zaraki Kenpachi t-shirt',
    price: 249.99,
    image: '/imgs/featured4.webp',
    category: 'Accessories',
    isNew: false,
  },
];

const ProductCard: React.FC<{product: typeof products[0]}> = ({ product }) => {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-purple-500/20 transition-all hover:translate-y-[-5px]">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-64 object-cover"
        />
        <button className="absolute top-3 right-3 bg-black/50 p-2 rounded-full hover:bg-black transition-colors">
          <Heart className="h-5 w-5 text-white" />
        </button>
        {product.isNew && (
          <div className="absolute top-3 left-3 bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            NEW
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="text-xs text-purple-400 mb-2">{product.category}</div>
        <h3 className="text-lg font-semibold mb-2 text-white">{product.name}</h3>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-white">${product.price}</span>
          <button className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full transition-colors">
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const FeaturedProducts: React.FC = () => {
  return (
    <section className="py-16 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-500 to-teal-400 bg-clip-text text-transparent">
              Featured Products
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover our handpicked selection of premium products that combine style, quality, and innovation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="border border-purple-500 text-white px-8 py-3 rounded-full font-medium hover:bg-purple-900/30 transition-colors">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;