import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);
  const navigate = useNavigate();

  const login = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  useEffect(() => {
    if (!token) return;

    try {
      // Check if token is in correct JWT format (has two dots)
      if (!token.includes('.') || token.split('.').length !== 3) {
        console.error('Invalid token format');
        logout();
        return;
      }

      const [, base64Url] = token.split('.');
      if (!base64Url) {
        console.error('Invalid token structure');
        logout();
        return;
      }

      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(base64));
      
      if (!payload.exp) {
        console.error('Token missing expiration');
        logout();
        return;
      }

      const expirationTime = payload.exp * 1000; // Convert to milliseconds
      const timeUntilExpiry = expirationTime - Date.now();
      console.log('Token will expire in:', timeUntilExpiry/1000, 'seconds');
      
      if (timeUntilExpiry <= 0) {
        console.log('Token expired, logging out');
        logout();
        return;
      }

      // Set timeout to logout when token expires
      const timeoutId = setTimeout(() => {
        console.log('Token expiration timeout reached, logging out');
        logout();
      }, timeUntilExpiry);

      return () => clearTimeout(timeoutId);
    } catch (error) {
      console.error('Error processing token:', error);
      logout();
    }
  }, [token, navigate]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
