// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../config/axiosConfig'; // Importar la configuración de Axios
// import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null); // Inicializado a null

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
       // Guarda la información del usuario en AsyncStorage
       const userData = {
        name: response.data.user.name,
        email: response.data.user.email,
        token: response.data.token,
      };
      // Guarda token o estado de autenticación en AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setIsLoggedIn(true);
      setUserInfo(userData); // Actualiza la información del usuario
    } catch (error) {
      console.log(error)
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await axiosInstance.post('/register', { name, email,password});
       // Guarda la información del usuario en AsyncStorage
      console.log('respuesta de registro ', response.data)
       /* const userData = {
        name: response.data.user.name,
        email: response.data.user.email,
        token: response.data.token,
      }; */
      // Guarda token o estado de autenticación en AsyncStorage
      // await AsyncStorage.setItem('user', JSON.stringify(userData));
      // setIsLoggedIn(true);
      // setUserInfo(userData); // Actualiza la información del usuario
    } catch (error) {
      console.log(error)
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    AsyncStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn , userInfo, login, logout , register }}>
      {children}
    </AuthContext.Provider>
  );
};
