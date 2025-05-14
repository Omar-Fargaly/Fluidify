import api from '../axios';

export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);
export const forgotPassword = (data) => api.post('/auth/forgot-password', data);
export const resetPassword = (token, password) => {
    return api.post(`/auth/reset-password/${token}`, { password });
  };
  
