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

  fixtures: {
  next: '/fixtures/next',
  upcoming: '/fixtures/upcoming',
  lastUpdatedFixture: '/fixtures/lastupdatedfixture',
  nextWithPredictions: '/fixtures/next-fixtures-with-predictions',
  byMatchNum: (matchNum: number) => `/fixtures/${matchNum}`,
  },

  predictions: {
  create: '/predictions',                    // POST - create prediction
  update: '/predictions',                    // PUT - update prediction
  delete: '/predictions',                    // DELETE - delete prediction
  myPredictions: '/predictions/me',          // GET - my predictions
  byFixture: (fixtureId: number) => `/predictions/fixture/${fixtureId}`, // GET
  byId: (predictionId: number) => `/predictions/${predictionId}`,        // GET
  },
  
  leaderboard: {
  byGroup: (groupId: number) => `/leaderboard/${groupId}`,
  myRank: (groupId: number) => `/leaderboard/${groupId}/me`,
  // Admin endpoints (if needed in frontend)
  completeFixture: (fixtureId: number) => `/leaderboard/admin/fixtures/${fixtureId}/complete`,
  updateFixtureScores: (fixtureId: number) => `/leaderboard/admin/fixtures/${fixtureId}/scores`,
  recalculate: '/leaderboard/admin/recalculate',
  }

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