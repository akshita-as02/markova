import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'Collaborator',
    email: 'collaborator@example.com'
  });
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    // Temporarily bypass authentication check for collaboration
    setUser({
      id: '1',
      name: 'Collaborator',
      email: 'collaborator@example.com'
    });
    setIsAuthenticated(true);
  }, []);

  const login = async (email: string, password: string) => {
    // Temporarily bypass login for collaboration
    setUser({
      id: '1',
      name: 'Collaborator',
      email: 'collaborator@example.com'
    });
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Temporarily bypass logout for collaboration
    setUser({
      id: '1',
      name: 'Collaborator',
      email: 'collaborator@example.com'
    });
    setIsAuthenticated(true);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 