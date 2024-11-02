// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../config/axiosConfig'; // Importar la configuración de Axios

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
    // const response = await axios.post('/auth/login', credentials);
    setIsLoggedIn(true);
    console.log("entre al metodo login ", email, password)
    // Guarda token o estado de autenticación en AsyncStorage
    AsyncStorage.setItem('user', 'your-token');
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
