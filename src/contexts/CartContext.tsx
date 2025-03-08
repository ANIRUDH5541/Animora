import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { cartService } from '../Services/api';
import { toast } from 'react-hot-toast';
import { getProductById } from '../data/products';

interface CartItem {
  productId: number;
  quantity: number;
  product?: any;
}

interface CartContextType {
  cartItems: CartItem[];
  isLoading: boolean;
  error: string | null;
  addToCart: (productId: number, quantity: number) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  removeItem: (productId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, user } = useAuth();

  // Fetch cart data when user logs in
  useEffect(() => {
    const fetchCart = async () => {
      if (!isAuthenticated || !user?.email) {
        setCartItems([]);
        return;
      }

      try {
        setIsLoading(true);
        const response = await cartService.getCart(user.email);
        
        // Enrich cart items with product details
        const enrichedCart = response.data.cart.map((item: CartItem) => {
          return {
            ...item,
            product: getProductById(item.productId)
          };
        });
        
        setCartItems(enrichedCart);
      } catch (error) {
        console.error('Error fetching cart:', error);
        setError('Failed to load cart data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, [isAuthenticated, user]);

  // Add item to cart
  const addToCart = async (productId: number, quantity: number) => {
    if (!isAuthenticated || !user?.id) {
      return;
    }

    try {
      setIsLoading(true);
      await cartService.addToCart(user.id, productId, quantity);
      
      // Update local state
      const existingItemIndex = cartItems.findIndex(item => item.productId === productId);
      
      if (existingItemIndex > -1) {
        // Item exists, update quantity
        const updatedItems = [...cartItems];
        updatedItems[existingItemIndex].quantity += quantity;
        setCartItems(updatedItems);
      } else {
        // Add new item
        const product = getProductById(productId);
        setCartItems([...cartItems, { productId, quantity, product }]);
      }
      
      toast.success('Added to cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      setError('Failed to add item to cart');
      toast.error('Failed to add item to cart');
    } finally {
      setIsLoading(false);
    }
  };

  // Update item quantity
  const updateQuantity = async (productId: number, quantity: number) => {
    if (!isAuthenticated || !user?.id || quantity < 1) {
      return;
    }

    try {
      setIsLoading(true);
      await cartService.updateCartItem(user.id, productId, quantity);
      
      // Update local state
      setCartItems(prev => 
        prev.map(item => 
          item.productId === productId ? { ...item, quantity } : item
        )
      );
      
      toast.success('Cart updated');
    } catch (error) {
      console.error('Error updating cart:', error);
      setError('Failed to update cart');
      toast.error('Failed to update item quantity');
    } finally {
      setIsLoading(false);
    }
  };

  // Remove item from cart
  const removeItem = async (productId: number) => {
    if (!isAuthenticated || !user?.id) {
      return;
    }

    try {
      setIsLoading(true);
      await cartService.removeFromCart(user.id, productId);
      
      // Update local state
      setCartItems(prev => prev.filter(item => item.productId !== productId));
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Error removing item:', error);
      setError('Failed to remove item from cart');
      toast.error('Failed to remove item');
    } finally {
      setIsLoading(false);
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    if (!isAuthenticated || !user?.id) {
      return;
    }

    try {
      setIsLoading(true);
      // This would require a new API endpoint to clear the cart
      // await cartService.clearCart(user.id);
      
      // For now, just clear local state
      setCartItems([]);
      toast.success('Cart cleared');
    } catch (error) {
      console.error('Error clearing cart:', error);
      setError('Failed to clear cart');
      toast.error('Failed to clear cart');
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate cart count and total
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => {
    return total + ((item.product?.price || 0) * item.quantity);
  }, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      isLoading,
      error,
      addToCart,
      updateQuantity,
      removeItem,
      clearCart,
      cartCount,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
};