import React, { useEffect, useState } from 'react';
import { ShoppingCart, Heart, Loader, Check } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { productService } from '../Services/api';
import { toast } from 'react-hot-toast';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

// Define the Product interface to match your MongoDB schema
interface Product {
  id: number;
  name: string;
  price: number;
  image: string | string[];  // Handle both string and string array
  category: string;
  description?: string;
  colors?: string;
  sizes?: string;
  isNew?: boolean;
  inStock?: boolean;
  rating?: number;
  reviews?: number;
  animeTheme?: string;
}

const ProductCard: React.FC<{product: Product}> = ({ product }) => {
  // Add these hooks for cart integration
  const { addToCart, isLoading: cartLoading } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdded, setIsAdded] = useState(false);
  
  // Handle image being either a string or an array
  const imageUrl = Array.isArray(product.image) ? product.image[0] : product.image;

  // Handle add to cart
  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation(); // Stop event from triggering Link navigation
    
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
      toast.success(`${product.name} added to cart!`);
      setTimeout(() => setIsAdded(false), 2000); // Reset after 2 seconds
    } catch (error) {
      console.error('Error adding item to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  // Handle wishlist
  const handleWishlist = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation(); // Stop event from triggering Link navigation
    
    if (!isAuthenticated) {
      navigate('/login', { 
        state: { 
          from: location.pathname,
          message: 'Please login to add items to your wishlist' 
        } 
      });
      return;
    }
    
    toast.success(`${product.name} added to wishlist!`);
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-purple-500/20 transition-all hover:translate-y-[-5px]">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative">
          <img 
            src={imageUrl}
            alt={product.name} 
            className="w-full h-64 object-cover"
          />
          <button 
            className="absolute top-3 right-3 bg-black/50 p-2 rounded-full hover:bg-black transition-colors"
            onClick={handleWishlist}
          >
            <Heart className="h-5 w-5 text-white" />
          </button>
          {product.isNew && (
            <div className="absolute top-3 left-3 bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              NEW
            </div>
          )}
        </div>
      </Link>
      <div className="p-5">
        <div className="text-xs text-purple-400 mb-2">{product.category}</div>
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-lg font-semibold mb-2 text-white hover:text-purple-400 transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-white">${product.price.toFixed(2)}</span>
          <button 
            onClick={handleAddToCart}
            disabled={cartLoading || (product.inStock === false)}
            className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cartLoading ? (
              <Loader className="h-5 w-5 animate-spin" />
            ) : isAdded ? (
              <Check className="h-5 w-5" />
            ) : (
              <ShoppingCart className="h-5 w-5" />
            )}
          </button>
        </div>
        {product.inStock === false && (
          <p className="text-red-500 text-sm mt-2">Out of stock</p>
        )}
      </div>
    </div>
  );
};

const FeaturedProducts: React.FC = () => {
  // Properly type the state variables
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setIsLoading(true);
        const response = await productService.getFeaturedProducts();
        setProducts(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
        toast.error('Could not load featured products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

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
        
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader className="h-10 w-10 text-purple-500 animate-spin" />
          </div>
        ) : error ? (
          <div className="bg-red-900/30 text-red-400 p-4 rounded-md text-center">
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-2 text-white bg-red-600 px-4 py-2 rounded-md hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.length > 0 ? (
                products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <p className="col-span-4 text-center text-gray-400 py-10">No featured products available at the moment.</p>
              )}
            </div>
            
            <div className="text-center mt-12">
              <Link 
                to="/products" 
                className="border border-purple-500 text-white px-8 py-3 rounded-full font-medium hover:bg-purple-900/30 transition-colors"
              >
                View All Products
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;