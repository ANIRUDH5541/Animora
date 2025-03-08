import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ChevronRight, ShoppingBag, ArrowLeft, Plus, Minus } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { cartService } from '../Services/api';
import { Product } from '../components/ProductCard';
import { getProductById } from '../data/products';

interface CartItem {
  productId: number;
  quantity: number;
  product?: Product;
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // Fetch cart data and enrich with product details
  useEffect(() => {
    const fetchCart = async () => {
      if (!isAuthenticated || !user?.email) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await cartService.getCart(user.email);
        
        // Get product details for each cart item
        const enrichedCart = response.data.cart.map((item: CartItem) => {
          return {
            ...item,
            product: getProductById(item.productId)
          };
        });
        
        setCartItems(enrichedCart);
      } catch (error) {
        console.error('Error fetching cart data:', error);
        setError('Failed to load your cart. Please try again.');
        toast.error('Failed to load cart data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, [isAuthenticated, user]);

  // Handle quantity update
  const handleUpdateQuantity = async (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    try {
      await cartService.updateCartItem(user?.id || '', productId, newQuantity);
      
      // Update local state
      setCartItems(prev => 
        prev.map(item => 
          item.productId === productId ? { ...item, quantity: newQuantity } : item
        )
      );
      
      toast.success('Cart updated');
    } catch (error) {
      console.error('Error updating cart:', error);
      toast.error('Failed to update cart');
    }
  };

  // Handle remove item
  const handleRemoveItem = async (productId: number) => {
    try {
      await cartService.removeFromCart(user?.id || '', productId);
      
      // Update local state
      setCartItems(prev => prev.filter(item => item.productId !== productId));
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error('Failed to remove item');
    }
  };

  // Calculate cart totals
  const subtotal = cartItems.reduce((total, item) => {
    return total + ((item.product?.price || 0) * item.quantity);
  }, 0);
  
  const shipping = subtotal > 0 ? 9.99 : 0;
  const tax = subtotal * 0.07; // 7% tax
  const total = subtotal + shipping + tax;

  // If not authenticated, show login prompt
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-16 px-4">
        <div className="max-w-3xl mx-auto bg-gray-900 rounded-lg shadow-lg p-8 text-center">
          <ShoppingBag className="h-20 w-20 mx-auto text-purple-500 mb-6" />
          <h1 className="text-3xl font-bold mb-4 text-white">Your Cart is Waiting</h1>
          <p className="text-gray-300 mb-8">Please sign in to view your cart and continue shopping.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/login" 
              className="bg-gradient-to-r from-purple-600 to-teal-500 text-white px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              Sign In
            </Link>
            <Link 
              to="/" 
              className="border border-purple-500 text-white px-8 py-3 rounded-full font-medium hover:bg-purple-900/30 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-white">
          <span className="bg-gradient-to-r from-purple-500 to-teal-400 bg-clip-text text-transparent">
            Your Cart
          </span>
        </h1>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-900/30 border border-red-500 text-red-400 p-4 rounded-md">
            {error}
          </div>
        ) : cartItems.length === 0 ? (
          <div className="bg-gray-900 rounded-lg p-8 text-center">
            <ShoppingBag className="h-16 w-16 mx-auto text-gray-700 mb-4" />
            <h2 className="text-2xl font-bold mb-4 text-white">Your cart is empty</h2>
            <p className="text-gray-400 mb-8">Looks like you haven't added any products to your cart yet.</p>
            <Link 
              to="/explore/naruto" 
              className="inline-flex items-center bg-gradient-to-r from-purple-600 to-teal-500 text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              <ArrowLeft className="h-5 w-5 mr-2" /> Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map(item => (
                <div key={item.productId} className="bg-gray-900 rounded-lg p-4 flex gap-4">
                  {/* Product Image */}
                  <Link to={`/product/${item.productId}`} className="w-24 h-24 flex-shrink-0">
                    <img 
                      src={item.product?.image}
                      alt={item.product?.name}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </Link>
                  
                  {/* Product Details */}
                  <div className="flex-grow">
                    <Link to={`/product/${item.productId}`}>
                      <h3 className="text-white font-medium hover:text-purple-400 transition-colors">
                        {item.product?.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-400 mb-2">
                      {item.product?.category}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-gray-700 rounded-md">
                        <button 
                          onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                          className="p-1 text-gray-400 hover:text-white"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4 py-1 text-white">{item.quantity}</span>
                        <button 
                          onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                          className="p-1 text-gray-400 hover:text-white"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-medium text-white">
                          ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                        </span>
                        <button 
                          onClick={() => handleRemoveItem(item.productId)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Order Summary */}
            <div className="bg-gray-900 rounded-lg p-6 h-fit">
              <h2 className="text-xl font-bold mb-6 text-white">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span className="font-medium">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-700 pt-3 mt-3 flex justify-between">
                  <span className="text-lg font-bold text-white">Total</span>
                  <span className="text-lg font-bold text-white">${total.toFixed(2)}</span>
                </div>
              </div>
              
              <button 
                className="w-full bg-gradient-to-r from-purple-600 to-teal-500 text-white py-3 rounded-md font-medium hover:opacity-90 transition-opacity flex items-center justify-center"
                onClick={() => navigate('/checkout')}
              >
                Checkout <ChevronRight className="h-5 w-5 ml-1" />
              </button>
              
              <Link 
                to="/explore/naruto" 
                className="mt-4 block text-center text-purple-400 hover:text-purple-300"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;