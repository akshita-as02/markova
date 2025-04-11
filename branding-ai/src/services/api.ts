import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add a request interceptor to add the auth token to requests
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

// Auth functions
export const signUp = async (name: string, email: string, password: string) => {
  const response = await api.post('/auth/signup', { name, email, password });
  return response.data;
};

export const signIn = async (email: string, password: string) => {
  const response = await api.post('/auth/signin', { email, password });
  return response.data;
};

export default api; 