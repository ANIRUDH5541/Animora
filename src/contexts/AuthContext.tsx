import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { authService } from '../Services/api';

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check if user is already logged in on initial load
  useEffect(() => {
    const checkUserSession = async () => {
      const userId = localStorage.getItem('userId');
      const userName = localStorage.getItem('userName');
      const userEmail = localStorage.getItem('userEmail');
      const userIsAdmin = localStorage.getItem('userIsAdmin');
      
      if (userId && userName && userEmail) {
        setUser({
          id: userId,
          name: userName,
          email: userEmail,
          isAdmin: userIsAdmin === 'true',
        });
        setIsAuthenticated(true);
      }
      
      setIsLoading(false);
    };
    
    checkUserSession();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authService.login(email, password);
      
      if (response.data.user) {
        const userData = response.data.user;
        
        // Save user data to localStorage
        localStorage.setItem('userId', userData._id);
        localStorage.setItem('userName', userData.name);
        localStorage.setItem('userEmail', userData.email);
        localStorage.setItem('userIsAdmin', userData.isAdmin.toString());
        
        setUser({
          id: userData._id,
          name: userData.name,
          email: userData.email,
          isAdmin: userData.isAdmin,
        });
        
        setIsAuthenticated(true);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authService.register(name, email, password);
      
      if (response.data.user) {
        const userData = response.data.user;
        
        // Save user data to localStorage
        localStorage.setItem('userId', userData._id);
        localStorage.setItem('userName', userData.name);
        localStorage.setItem('userEmail', userData.email);
        localStorage.setItem('userIsAdmin', userData.isAdmin.toString());
        
        setUser({
          id: userData._id,
          name: userData.name,
          email: userData.email,
          isAdmin: userData.isAdmin,
        });
        
        setIsAuthenticated(true);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to register');
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userIsAdmin');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      error, 
      login, 
      register, 
      logout, 
      isAuthenticated 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};