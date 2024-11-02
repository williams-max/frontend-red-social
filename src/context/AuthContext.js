// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../config/axiosConfig'; // Importar la configuración de Axios
// import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Aquí verifica si el usuario está autenticado (ej. con AsyncStorage o algún otro método)
    const checkLoginStatus = async () => {
      const userToken = await AsyncStorage.getItem('user');
      setIsLoggedIn(!!userToken);
    };
    checkLoginStatus();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post('/auth', { email,password});
      // setIsLoggedIn(true);
      console.log("entre al metodo login ", response.data)
      // Guarda token o estado de autenticación en AsyncStorage
      // AsyncStorage.setItem('user', 'your-token');
    } catch (error) {
      console.log(error)
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    AsyncStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
