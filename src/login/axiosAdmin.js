// lib/axiosAdmin.js
import axios from 'axios';

const axiosAdmin = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

axiosAdmin.interceptors.request.use((config) => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const token = window.localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default axiosAdmin;
