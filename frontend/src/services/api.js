import axios from 'axios';

const api = axios.create({ 
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/' 
});

// Add a request interceptor
api.interceptors.request.use(config => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Add a response interceptor
api.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;
        
        // If error is 401 and we haven't already tried to refresh the token
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            try {
                const refreshToken = localStorage.getItem('refresh_token');
                if (refreshToken) {
                    const response = await api.post('/token/refresh/', { refresh: refreshToken });
                    const { access } = response.data;
                    
                    localStorage.setItem('access_token', access);
                    api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
                    originalRequest.headers['Authorization'] = `Bearer ${access}`;
                    
                    return api(originalRequest);
                }
            } catch (refreshError) {
                // Refresh token failed, logout user
                localStorage.clear();
                window.location.href = '/login';
            }
        }
        
        if (error.response?.status === 401) {
            // Handle token refresh or redirect to login
            localStorage.clear();
            window.location.href = '/login'; // Redirect to login page
        }
        
        return Promise.reject(error);
    }
);

export default api;