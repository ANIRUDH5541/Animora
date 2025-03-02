import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  colors: string[];
  sizes: string[];
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
  theme?: 'naruto' | 'one-piece' | 'kaiju' | 'bleach';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, theme = 'naruto' }) => {
  // Theme-specific styles
  const themeStyles = {
    naruto: {
      accent: 'from-orange-500 to-purple-600',
      hover: 'hover:shadow-orange-500/20',
      badge: 'bg-orange-500',
      button: 'bg-orange-600 hover:bg-orange-700',
      text: 'text-orange-400',
    },
    'one-piece': {
      accent: 'from-red-500 to-gray-600',
      hover: 'hover:shadow-red-500/20',
      badge: 'bg-red-500',
      button: 'bg-red-600 hover:bg-red-700',
      text: 'text-red-400',
    },
    kaiju: {
      accent: 'from-blue-500 to-teal-600',
      hover: 'hover:shadow-teal-500/20',
      badge: 'bg-teal-500',
      button: 'bg-teal-600 hover:bg-teal-700',
      text: 'text-teal-400',
    },
    bleach: {
      accent: 'from-gray-500 to-gray-700',
      hover: 'hover:shadow-gray-500/20',
      badge: 'bg-gray-500',
      button: 'bg-gray-600 hover:bg-gray-700',
      text: 'text-gray-400',
    },
  };

  const style = themeStyles[theme];

  return (
    <div className={`bg-gray-900 rounded-lg overflow-hidden shadow-lg ${style.hover} transition-all hover:translate-y-[-5px]`}>
      <Link to={`/product/${product.id}?theme=${theme}`} className="block">
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
            <div className={`absolute top-3 left-3 ${style.badge} text-white text-xs font-bold px-3 py-1 rounded-full`}>
              NEW
            </div>
          )}
        </div>
      </Link>
      <div className="p-5">
        <div className={`text-xs ${style.text} mb-2`}>{product.category}</div>
        <Link to={`/product/${product.id}?theme=${theme}`} className="block">
          <h3 className="text-lg font-semibold mb-2 text-white hover:underline">{product.name}</h3>
        </Link>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-white">${product.price.toFixed(2)}</span>
          <button className={`${style.button} text-white p-2 rounded-full transition-colors`}>
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;