import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Home from './src/pages/Home';
import UserProfile from './src/pages/UserProfile';
import MessageScreen from './src/pages/MessageScreen';
import SettingsScreen from './src/pages/SettingsScreen';
import UserListScreen from './src/pages/UserListScreen';
import LoginScreen from './src/pages/LoginScreen';
import RegisterScreen from './src/pages/RegisterScreen';
import { AuthContext, AuthProvider } from './src/context/AuthContext';

const Tab = createBottomTabNavigator();
const MessageStack = createStackNavigator();
const Stack = createStackNavigator();

const MessagesStackScreen = () => (
  <MessageStack.Navigator>
    <MessageStack.Screen name="UserListScreen" component={UserListScreen} options={{ title: 'Mensajes' }} />
    <MessageStack.Screen name="MessageScreen" component={MessageScreen} options={({ route }) => ({ title: route.params.user?.name ?? 'error' })} />
  </MessageStack.Navigator>
);

const AppContent = () => {
  const { state } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {state.isLoggedIn ? (
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
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;
