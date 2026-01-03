import React, { createContext, useState, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// AuthProvider component (only component export)
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simple auth service functions
  const authService = {
    isAuthenticated: () => {
      const token = localStorage.getItem('authToken');
      return !!token;
    },

    getUser: () => {
      try {
        const userData = localStorage.getItem('user');
        return userData ? JSON.parse(userData) : null;
      } catch (error) {
        console.error('Error parsing user data:', error);
        return null;
      }
    },

    login: async (email, password) => {
      try {
        console.log('Attempting login for:', email);
        
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Login failed');
        }

        if (data.success) {
          localStorage.setItem('authToken', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          return data;
        } else {
          throw new Error(data.message || 'Login failed');
        }
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    },

    register: async (userData) => {
      try {
        console.log('Attempting registration for:', userData.email);
        
        const response = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Registration failed');
        }

        if (data.success) {
          localStorage.setItem('authToken', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          return data;
        } else {
          throw new Error(data.message || 'Registration failed');
        }
      } catch (error) {
        console.error('Registration error:', error);
        throw error;
      }
    },

    logout: () => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  };

  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        if (authService.isAuthenticated()) {
          const currentUser = authService.getUser();
          setUser(currentUser);
          console.log('User authenticated:', currentUser?.email);
        } else {
          console.log('No user authenticated');
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, );

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await authService.login(email, password);
      
      if (response && response.user) {
        setUser(response.user);
        console.log('Login successful:', response.user.email);
        return response;
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await authService.register(userData);
      
      if (response && response.user) {
        setUser(response.user);
        console.log('Registration successful:', response.user.email);
        return response;
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    try {
      authService.logout();
      setUser(null);
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: authService.isAuthenticated()
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Export only the component
export { AuthProvider, AuthContext };