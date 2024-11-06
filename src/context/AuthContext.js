// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../config/axiosConfig'; // Importar la configuración de Axios
// import axios from 'axios';

export const AuthContext = createContext();

const initialState = {
  isLoggedIn: false,
  user: null, // Para guardar los datos del usuario
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      console.log('action payload ', action.payload)
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload, // Guardamos los datos del usuario aquí
      };
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case 'RESTORE_TOKEN':
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        user: action.payload.user,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const loadUserData = async () => {
      const user = await AsyncStorage.getItem('user');
      const isLoggedIn = (await AsyncStorage.getItem('isLoggedIn')) === 'true';
      dispatch({ type: 'RESTORE_TOKEN', payload: { isLoggedIn, user: JSON.parse(user) } });
    };
    loadUserData();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post('/auth', { email,password});
       // Guarda la información del usuario en AsyncStorage
       const userData = {
        id: response.data.user.id,
        name: response.data.user.name,
        email: response.data.user.email,
        imageUrl: response.data.user.imageUrl,
        token: response.data.token,
      };
      // Guarda token o estado de autenticación en AsyncStorage
      await AsyncStorage.setItem('isLoggedIn', 'true');
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      dispatch({ type: 'LOGIN', payload: userData });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };


  const logout = async () => {
    try {
      await AsyncStorage.removeItem('isLoggedIn');
      await AsyncStorage.removeItem('user');
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
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

  return (
    <AuthContext.Provider value={{ state, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;