// src/config/axiosConfig.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Crear una instancia de Axios
const axiosInstance = axios.create({
  baseURL: 'http://192.168.145.33:3000/api', // Cambia esto a la URL base de tu API
  timeout: 10000, // Tiempo máximo de espera para la solicitud
  /* headers: {
    'Content-Type': 'application/json',
  },*/
});

// Interceptores de solicitud
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token'); // Obtener el token de AsyncStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptores de respuesta
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Manejo de errores de no autorizado, como redirigir al login
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
