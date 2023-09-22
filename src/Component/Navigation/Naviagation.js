import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../Screens/Login/Login'// Importe a tela de login
import CadastroScreen from '../Screens/Cadastro/Cadastro'; // Importe a tela de cadastro

const Stack = createStackNavigator();

function Navigation() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Cadastro" component={CadastroScreen} />
    </Stack.Navigator>
  );
}

export default Navigation;
