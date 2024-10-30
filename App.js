import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Importar las pantallas
import Home from './src/pages/Home';
import UserProfile from './src/pages/UserProfile';
import MessageScreen from './src/pages/MessageScreen';
import SettingsScreen from './src/pages/SettingsScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Perfil') {
              iconName = 'person';
            } else if (route.name === 'Mensajes') {
              iconName = 'chat-bubble-outline';
            } else if (route.name === 'Configuración') {
              iconName = 'settings';
            }
            else if (route.name === 'Home') {
              iconName = 'home';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#ff69b4',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Tab.Screen name="Perfil" component={UserProfile} options={{ headerShown: false }} />
        <Tab.Screen name="Mensajes" component={MessageScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Configuración" component={SettingsScreen} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
