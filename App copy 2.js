import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Importar las pantallas
import Home from './src/pages/Home';
import UserProfile from './src/pages/UserProfile';
import MessageScreen from './src/pages/MessageScreen';
import SettingsScreen from './src/pages/SettingsScreen';
import UserListScreen from './src/pages/UserListScreen';
import LoginScreen from './src/pages/LoginScreen';
import RegisterScreen from './src/pages/RegisterScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const AuthStack = createStackNavigator();

// Configura el Stack Navigator para la pestaña "Mensajes"
const MessagesStackScreen = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="UserListScreen"
      component={UserListScreen}
      options={{ title: 'Mensajes' }}
    />
    <Stack.Screen
      name="MessageScreen"
      component={MessageScreen}
      options={({ route }) => ({ title: route.params?.user?.name ?? 'error' })}
    />
  </Stack.Navigator>
);

// Tab Navigator principal para la app después de iniciar sesión
const MainTabScreen = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === 'Perfil') iconName = 'person';
        else if (route.name === 'Mensajes') iconName = 'chat-bubble-outline';
        else if (route.name === 'Configuración') iconName = 'settings';
        else if (route.name === 'Home') iconName = 'home';

        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#ff69b4',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
    <Tab.Screen name="Perfil" component={UserProfile} options={{ headerShown: false }} />
    <Tab.Screen name="Mensajes" component={MessagesStackScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Configuración" component={SettingsScreen} options={{ headerShown: false }} />
  </Tab.Navigator>
);

// Configura el stack de autenticación
const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    <AuthStack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
  </AuthStack.Navigator>
);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Lógica para verificar si el usuario ya ha iniciado sesión
    // setIsLoggedIn(/* Verificar el estado de autenticación aquí */);
  }, []);

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainTabScreen /> : <AuthStackScreen />}
    </NavigationContainer>
  );
};

export default App;
