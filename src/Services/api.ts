import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Adjust to your backend URL

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
}

interface AuthResponse {
  message: string;
  token?: string;
  user: User;
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

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
    return api.post<AuthResponse>('/register', { name, email, password });
  },

  // Login user
  login: (email: string, password: string) => {
    return api.post<AuthResponse>('/login', { email, password });
  }
};

export default api;