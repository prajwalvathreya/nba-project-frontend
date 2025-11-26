import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, UserLogin, UserRegister } from '../types';
import { api, endpoints } from '../config/api';

// Define AuthResponse locally to avoid import issues
interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: UserLogin) => Promise<void>;
  register: (userData: UserRegister) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  // Check for existing token on app load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          
          // Validate token with backend
          await validateToken();
        } catch (error) {
          console.error('Error parsing stored user data:', error);
          logout();
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const validateToken = async () => {
    try {
      const response = await api.get(endpoints.auth.validateToken);
      if (!response.data.valid) {
        logout();
      }
    } catch (error) {
      console.error('Token validation failed:', error);
      logout();
    }
  };

  const login = async (credentials: UserLogin): Promise<void> => {
    try {
      setIsLoading(true);
      
      // Send JSON data (not form data) - matching your backend
      const response = await api.post<AuthResponse>(
        endpoints.auth.login,
        {
          username: credentials.username,
          password: credentials.password
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const { access_token, user: userData } = response.data;
      
      // Store token and user data
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      setUser(userData);
    } catch (error: any) {
      console.error('Login failed:', error);
      const errorMessage = error.response?.data?.detail || 'Login failed. Please check your credentials.';
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: UserRegister): Promise<void> => {
    try {
      setIsLoading(true);
      
      // Register with JSON data (your backend expects JSON for registration)
      const response = await api.post(endpoints.auth.register, userData);
      
      // After successful registration, automatically log in
      await login({
        username: userData.username,
        password: userData.password,
      });
    } catch (error: any) {
      console.error('Registration failed:', error);
      const errorMessage = error.response?.data?.detail || 'Registration failed. Please try again.';
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};