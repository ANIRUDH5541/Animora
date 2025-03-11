import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { authService } from '../Services/api';

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing session on load
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('auth_token');
      const savedUser = localStorage.getItem('user');
      
      if (token && savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
        } catch (err) {
          // Invalid stored user data
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user');
        }
      }
      
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await authService.login(email, password);
      
      // Store user data in state and localStorage
      const userData = response.data.user;
      const token = response.data.token || 'fake-token'; // Use the token from response if available
      
      setUser(userData);
      setIsAuthenticated(true);
      
      // Store in localStorage for persistence
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to login. Please try again.';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await authService.register(name, email, password);
      
      // Store user data
      const userData = response.data.user;
      const token = response.data.token || 'fake-token';
      
      setUser(userData);
      setIsAuthenticated(true);
      
      // Store in localStorage for persistence
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to register. Please try again.';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      error, 
      isAuthenticated,
      login, 
      register, 
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};