import axios from 'axios';

// API Base URL
const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests if available
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
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
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth API
export const authAPI = {
    signup: (data) => api.post('/auth/signup', data),
    login: (data) => api.post('/auth/login', data),
    getMe: () => api.get('/auth/me'),
    forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
    resetPassword: (token, password) => api.post(`/auth/reset-password/${token}`, { password }),
    logout: () => api.post('/auth/logout')
};

// Trip API
export const tripAPI = {
    getAll: () => api.get('/trips'),
    getById: (id) => api.get(`/trips/${id}`),
    create: (formData) => api.post('/trips', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    update: (id, formData) => api.put(`/trips/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    delete: (id) => api.delete(`/trips/${id}`),
    share: (id) => api.post(`/trips/${id}/share`),
    getShared: (token) => api.get(`/trips/shared/${token}`)
};

// Itinerary API
export const itineraryAPI = {
    getByTripId: (tripId) => api.get(`/itineraries/trip/${tripId}`),
    update: (id, data) => api.put(`/itineraries/${id}`, data),
    addActivity: (id, activity) => api.post(`/itineraries/${id}/activities`, activity),
    updateActivity: (id, activityId, activity) =>
        api.put(`/itineraries/${id}/activities/${activityId}`, activity),
    deleteActivity: (id, activityId) =>
        api.delete(`/itineraries/${id}/activities/${activityId}`)
};

// Budget API
export const budgetAPI = {
    getByTripId: (tripId) => api.get(`/budgets/trip/${tripId}`),
    update: (id, data) => api.put(`/budgets/${id}`, data),
    addExpense: (id, expense) => api.post(`/budgets/${id}/expenses`, expense),
    updateExpense: (id, expenseId, expense) =>
        api.put(`/budgets/${id}/expenses/${expenseId}`, expense),
    deleteExpense: (id, expenseId) =>
        api.delete(`/budgets/${id}/expenses/${expenseId}`),
    getBreakdown: (id) => api.get(`/budgets/${id}/breakdown`)
};

// User API
export const userAPI = {
    getProfile: () => api.get('/users/profile'),
    updateProfile: (data) => api.put('/users/profile', data),
    uploadAvatar: (formData) => api.post('/users/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    getStats: () => api.get('/users/stats')
};

// Search API
export const searchAPI = {
    cities: (query, limit = 10) => api.get('/search/cities', { params: { query, limit } }),
    activities: (params) => api.get('/search/activities', { params }),
    popular: (limit = 10) => api.get('/search/popular', { params: { limit } })
};

export default api;
