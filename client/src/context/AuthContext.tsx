import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Create context for authentication
interface AuthContextType {
  currentUser: string | null; // Could be a user object, here it's a string (user id or token)
  login: (userId: string) => void;
  logout: () => void;
}

// Define props type with children
interface AuthProviderProps {
  children: ReactNode; // Type for children prop
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    // Try to get user from localStorage (or session storage if preferred)
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(user); // You can store a user object or token here
    }
  }, []);

  const login = (userId: string) => {
    setCurrentUser(userId);
    localStorage.setItem('currentUser', userId); // Save userId to localStorage
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser'); // Remove userId from localStorage
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
