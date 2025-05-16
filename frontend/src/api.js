import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // или твой backend URL
});

// Добавим авторизацию через JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // или AsyncStorage в React Native
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
 
export default api;
