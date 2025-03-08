import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Your backend URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productService = {
  getFeaturedProducts: () => api.get('/products/featured'),
  getAllProducts: () => api.get('/products'),
  getProductById: (id: number) => api.get(`/products/${id}`),
};

export const cartService = {
  // Add item to cart
  addToCart: (userId: string, productId: number, quantity: number = 1) => {
    return api.post('/cart/add', { userId, productId, quantity });
  },

  // Update cart item quantity
  updateCartItem: (userId: string, productId: number, quantity: number) => {
    return api.put('/cart/update', { userId, productId, quantity });
  },

  // Remove item from cart
  removeFromCart: (userId: string, productId: number) => {
    return api.delete(`/cart/${productId}`, { data: { userId } });
  },

  // Get user's cart
  getCart: (email: string) => {
    return api.get(`/cart?email=${email}`);
  }
};

export const authService = {
  // Register user
  register: (name: string, email: string, password: string) => {
    return api.post('/register', { name, email, password });
  },

  // Login user
  login: (email: string, password: string) => {
    return api.post('/login', { email, password });
  }
};

export default api;