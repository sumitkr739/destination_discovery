import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 120000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: async (userData) => {
    const response = await api.post('/api/auth/register', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/api/auth/login', credentials);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/api/auth/profile');
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

export const tripAPI = {
  generate: async (tripData) => {
    const response = await api.post('/api/trips/generate', tripData);
    return response.data;
  },

  getTrip: async (tripId) => {
    const response = await api.get(`/api/trips/${tripId}`);
    return response.data;
  },

  getAllTrips: async () => {
    const response = await api.get('/api/trips');
    return response.data;
  },

  deleteTrip: async (tripId) => {
    const response = await api.delete(`/api/trips/${tripId}`);
    return response.data;
  },
};

export default api;
