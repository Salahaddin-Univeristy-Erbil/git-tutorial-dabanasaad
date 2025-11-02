import axios from 'axios';
import type { AxiosError, AxiosResponse } from 'axios';
import { API_CONFIG } from '../config/api.config';
import { useLoading } from '../composables/useLoading';
import { useToast } from '../composables/useToast';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000',

  withCredentials: true,
  headers: { 'X-Requested-With': 'XMLHttpRequest', Accept: 'application/json' },
});
// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const { start } = useLoading();
    start();

    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    const { stop } = useLoading();
    stop();
    return Promise.reject(error);
  },
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    const { stop } = useLoading();
    stop();
    return response;
  },
  (error: AxiosError) => {
    const { stop } = useLoading();
    const { error: showError } = useToast();
    stop();

    if (error.response) {
      const status = error.response.status;
      const message = (error.response.data as any)?.message || 'An error occurred';

      if (status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        showError('Session expired. Please login again.');
      } else {
        showError(message);
      }
    } else {
      showError('Network error. Please check your connection.');
    }

    return Promise.reject(error);
  },
);

export default apiClient;
