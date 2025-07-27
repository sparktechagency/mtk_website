import axios from 'axios';
import useAuthStore from '@/store/auth';

const api = axios.create({
  baseURL: 'http://localhost:9090/api/v1',
});

api.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? useAuthStore.getState().token : null;
    if (token) {
      config.headers.Authorization = `${token}`;
    }

    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    } else {
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  
  (error) => {
    return Promise.reject(error);
  }

);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      useAuthStore((state) => state.clearToken);
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

export default api;