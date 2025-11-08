import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// User types and interfaces
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'user' | 'viewer';
  avatar?: string;
  lastLogin: Date;
  createdAt: Date;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (userData: Partial<User>) => Promise<{ success: boolean; error?: string }>;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Mock users database (in real app, this would be a backend API)
const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    email: 'admin@mycistern.com',
    password: 'admin123',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    avatar: '/logo-small.png',
    lastLogin: new Date(),
    createdAt: new Date('2024-01-01')
  },
  {
    id: '2',
    email: 'user@mycistern.com',
    password: 'user123',
    firstName: 'John',
    lastName: 'Doe',
    role: 'user',
    lastLogin: new Date(),
    createdAt: new Date('2024-02-01')
  },
  {
    id: '3',
    email: 'viewer@mycistern.com',
    password: 'viewer123',
    firstName: 'Jane',
    lastName: 'Smith',
    role: 'viewer',
    lastLogin: new Date(),
    createdAt: new Date('2024-03-01')
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    token: null
  });

  // Check for stored auth on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('myCistern_token');
    const storedUser = localStorage.getItem('myCistern_user');

    if (storedToken && storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
          token: storedToken
        });
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('myCistern_token');
        localStorage.removeItem('myCistern_user');
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const user = mockUsers.find(u => u.email === email && u.password === password);
      
      if (!user) {
        setAuthState(prev => ({ ...prev, isLoading: false }));
        return { success: false, error: 'Invalid email or password' };
      }

      // Create mock JWT token (in real app, this comes from backend)
      const token = `mock_jwt_${user.id}_${Date.now()}`;
      
      const userData: User = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        avatar: user.avatar,
        lastLogin: new Date(),
        createdAt: user.createdAt
      };

      // Store auth data
      localStorage.setItem('myCistern_token', token);
      localStorage.setItem('myCistern_user', JSON.stringify(userData));

      setAuthState({
        user: userData,
        isAuthenticated: true,
        isLoading: false,
        token
      });

      return { success: true };
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const register = async (userData: RegisterData): Promise<{ success: boolean; error?: string }> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if user already exists
      const existingUser = mockUsers.find(u => u.email === userData.email);
      if (existingUser) {
        setAuthState(prev => ({ ...prev, isLoading: false }));
        return { success: false, error: 'User with this email already exists' };
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: 'user',
        lastLogin: new Date(),
        createdAt: new Date()
      };

      // Add to mock database
      mockUsers.push({ ...newUser, password: userData.password });

      // Create token and log in
      const token = `mock_jwt_${newUser.id}_${Date.now()}`;
      
      localStorage.setItem('myCistern_token', token);
      localStorage.setItem('myCistern_user', JSON.stringify(newUser));

      setAuthState({
        user: newUser,
        isAuthenticated: true,
        isLoading: false,
        token
      });

      return { success: true };
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  };

  const updateProfile = async (userData: Partial<User>): Promise<{ success: boolean; error?: string }> => {
    if (!authState.user) return { success: false, error: 'Not authenticated' };

    try {
      const updatedUser = { ...authState.user, ...userData };
      
      localStorage.setItem('myCistern_user', JSON.stringify(updatedUser));
      
      setAuthState(prev => ({
        ...prev,
        user: updatedUser
      }));

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Profile update failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('myCistern_token');
    localStorage.removeItem('myCistern_user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      token: null
    });
  };

  const value: AuthContextValue = {
    ...authState,
    login,
    logout,
    register,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Role-based access control helper
export function useRole() {
  const { user } = useAuth();
  
  return {
    isAdmin: user?.role === 'admin',
    isUser: user?.role === 'user',
    isViewer: user?.role === 'viewer',
    canEdit: user?.role === 'admin' || user?.role === 'user',
    canDelete: user?.role === 'admin',
    canView: true // All authenticated users can view
  };
}
