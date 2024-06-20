
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import { AuthProvider } from './src/context/AuthContext';
import React from 'react';


export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar backgroundColor='#1D1D2E' barStyle="light-content" translucent={false} />
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}