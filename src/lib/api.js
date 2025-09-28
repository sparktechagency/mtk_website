import axios from 'axios';
import useAuthStore from '@/store/auth';
import { toast } from 'sonner';

const api = axios.create({
  baseURL: 'https://backend.triplemcompany.com/api/v1',
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
      console.log(error);
      toast.error("Your session has expired or is invalid. Please log in again.");
      useAuthStore.getState().clearToken();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default api;