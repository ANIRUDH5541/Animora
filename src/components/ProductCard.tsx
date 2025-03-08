import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Heart, Check, Loader, AlertCircle } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast'; // You'll need to install this package

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
  const { addToCart, isLoading } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdded, setIsAdded] = useState(false); // Add this missing state variable

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

  // Handle add to cart
  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (!product.inStock) return;

    // If user is not authenticated, redirect to login
    if (!isAuthenticated) {
      navigate('/login', { 
        state: { 
          from: location.pathname,
          message: 'Please login to add items to your cart' 
        } 
      });
      return;
    }

    try {
      await addToCart(product.id, 1);
      // Add this to provide visual feedback
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000); // Reset after 2 seconds
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  // Handle add to wishlist with auth integration
  const handleAddToWishlist = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    // If user is not authenticated, redirect to login
    if (!isAuthenticated) {
      navigate('/login', { 
        state: { 
          from: window.location.pathname,
          message: 'Please login to add items to your wishlist' 
        } 
      });
      return;
    }
    
    // Wishlist logic will go here
    console.log('Adding to wishlist:', product.id);
  };

  return (
    <div className={`bg-gray-900 rounded-lg overflow-hidden shadow-lg ${style.hover} transition-all hover:translate-y-[-5px]`}>
      <Link to={`/product/${product.id}?theme=${theme}`} className="block">
        <div className="relative">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-64 object-cover"
          />
          <button 
            className="absolute top-3 right-3 bg-black/50 p-2 rounded-full hover:bg-black transition-colors"
            onClick={handleAddToWishlist}
          >
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
          <button 
            onClick={handleAddToCart}
            disabled={isLoading || !product.inStock}
            className={`${style.button} text-white p-2 rounded-full transition-colors ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <Loader className="h-5 w-5 animate-spin" />
            ) : isAdded ? (
              <Check className="h-5 w-5" />
            ) : (
              <ShoppingCart className="h-5 w-5" />
            )}
          </button>
        </div>
        {!product.inStock && (
          <p className="text-red-500 text-sm mt-2">Out of stock</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;