import api from './api';

export const authService = {
    login: async (username, password) => {
        const response = await api.post('/auth/login/', { username, password });
        return response.data;
    },
    
    register: async (userData) => {
        const response = await api.post('/auth/register/', userData);
        return response.data;
    },
    
    logout: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        delete api.defaults.headers.common['Authorization'];
    },
    
    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },
    
    isAuthenticated: () => {
        return !!localStorage.getItem('access_token');
    }
};