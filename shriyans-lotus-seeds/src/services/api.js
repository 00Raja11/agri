import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with better error handling
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API service methods
export const apiService = {
  // Health check
  health: () => api.get('/health'),

  // Auth endpoints
  auth: {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
  },

  // Product endpoints
  products: {
    getAll: (params = {}) => api.get('/products', { params }),
    getById: (id) => api.get(`/products/${id}`),
    getFeatured: () => api.get('/products/featured/products'),
  },

  // Order endpoints
  orders: {
    create: (orderData) => api.post('/orders', orderData),
    getMyOrders: () => api.get('/orders/my-orders'),
  },

  // Contact endpoint
  contact: {
    submit: (formData) => api.post('/contact', formData),
  },
};

export default api;