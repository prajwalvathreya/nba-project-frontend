import axios from 'axios';

// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API endpoints - based on your FastAPI backend
export const endpoints = {
  // Auth endpoints (matching your auth.py)
  auth: {
    login: '/auth/login',              // POST with form data
    register: '/auth/register',        // POST with JSON
    validateToken: '/auth/verify-token', // GET
  },
  
  // User endpoints
  users: {
    me: '/users/me',                   // GET current user
  },

  // Groups endpoints
  groups: {
    create: '/groups',                           // POST - create new group
    join: '/groups/join',                        // POST - join group by code
    myGroups: '/groups/me',                      // GET - get user's groups
    details: (id: number) => `/groups/${id}`,   // GET - get group details
    byCode: (code: string) => `/groups/code/${code}`, // GET - get group by code
    members: (id: number) => `/groups/${id}/members`, // GET - get group members
    leave: (id: number) => `/groups/${id}/leave`,     // DELETE - leave group
    delete: (id: number) => `/groups/${id}`,          // DELETE - delete group
  },
  

  // Fixtures endpoints (for future integration)
  fixtures: {
    upcoming: '/fixtures/upcoming',
    current: '/fixtures/current',
  },
  
  // Predictions endpoints (for future integration)
  predictions: {
    create: '/predictions',
    user: '/predictions/user',
  },
};

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);