import { apiService } from './api.js';

class AuthService {
  constructor() {
    this.token = localStorage.getItem('authToken');
    this.user = JSON.parse(localStorage.getItem('user') || 'null');
  }

  async login(email, password) {
    try {
      console.log('Attempting login for:', email);
      const response = await apiService.auth.login({ email, password });
      
      if (response.data.success) {
        this.setAuthData(response.data.token, response.data.user);
        console.log('Login successful for:', email);
        return response.data;
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      throw new Error(errorMessage);
    }
  }

  async register(userData) {
    try {
      console.log('Attempting registration for:', userData.email);
      const response = await apiService.auth.register(userData);
      
      if (response.data.success) {
        this.setAuthData(response.data.token, response.data.user);
        console.log('Registration successful for:', userData.email);
        return response.data;
      } else {
        throw new Error(response.data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
      throw new Error(errorMessage);
    }
  }

  setAuthData(token, user) {
    this.token = token;
    this.user = user;
    
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    this.token = null;
    this.user = null;
    
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }

  isAuthenticated() {
    return !!this.token;
  }

  getUser() {
    return this.user;
  }

  getToken() {
    return this.token;
  }
}

export const authService = new AuthService();