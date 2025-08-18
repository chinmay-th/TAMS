'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  role: 'aocc_operator' | 'airside_supervisor' | 'terminal_supervisor' | 'security_supervisor' | 
        'maintenance_engineer' | 'commercial_manager' | 'sustainability_manager' | 'administrator';
  name: string;
  airport_id: string;
  airport_name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing session
    const savedUser = localStorage.getItem('tams_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call with demo users
    const demoUsers: User[] = [
      {
        id: '1',
        email: 'aocc@airport.com',
        role: 'aocc_operator',
        name: 'Sarah Chen',
        airport_id: 'INTL',
        airport_name: 'International Airport'
      },
      {
        id: '2',
        email: 'airside@airport.com',
        role: 'airside_supervisor',
        name: 'Mike Rodriguez',
        airport_id: 'INTL',
        airport_name: 'International Airport'
      },
      {
        id: '3',
        email: 'terminal@airport.com',
        role: 'terminal_supervisor',
        name: 'Emily Johnson',
        airport_id: 'INTL',
        airport_name: 'International Airport'
      },
      {
        id: '4',
        email: 'security@airport.com',
        role: 'security_supervisor',
        name: 'David Kim',
        airport_id: 'INTL',
        airport_name: 'International Airport'
      },
      {
        id: '5',
        email: 'maintenance@airport.com',
        role: 'maintenance_engineer',
        name: 'Lisa Thompson',
        airport_id: 'INTL',
        airport_name: 'International Airport'
      }
    ];

    const foundUser = demoUsers.find(u => u.email === email);
    if (foundUser && password === 'demo') {
      setUser(foundUser);
      localStorage.setItem('tams_user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tams_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}