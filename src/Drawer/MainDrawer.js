import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Dashboard from '../Component/Screens/Home/Dashboard';
import Profile from '../Component/Screens/Profile/Profile';
import Login from '../Component/Screens/Login/Login'
import Version from '../Component/Screens/Version/Version';
import Mqtt from  '../Component/Screens/Mqtt/mqtt'
import Cadastro from '../Component/Screens/Cadastro/Cadastro'

import Ionicons from '@expo/vector-icons/Ionicons';

import { View } from 'react-native'; 
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


const DashboardIcon =({focused,size})=><Ionicons name='md-home' size={size} color="blue" />
const ProfileIcon =({focused, color, size})=><Ionicons name='md-person' size={size} color={color} />
const VersionIcon =({focused, color, size})=><Ionicons name='md-refresh-circle' size={size} color={color} />
const MqqtIcon = ({focused, color, size}) =>  <Ionicons name='md-git-network' size={size} color={color}/>
const LoginIcon = ({focused, color, size}) => <Ionicons name='md-enter-sharp' size={size} color={color}/>

const CadastroIcon = ({focused, color, size}) =>  <Ionicons name='md-person-add-sharp' size={size} color={color}/>


const MainDrawer = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainDashboard">
        {() => (
          <Drawer.Navigator 
          screenOptions={{
            drawerStyle:{
              backgroundColor:'white',   //change bg color
              width:230    //change width of sidebar 
            }
          }}
          >
            <Drawer.Screen name="Home" component={Dashboard} options={{ drawerIcon: DashboardIcon }} color="white"/>
            <Drawer.Screen name="Profile" component={Profile} options={{ drawerIcon: ProfileIcon }} />
            <Drawer.Screen name="Links/Versão" component={Version} options={{ drawerIcon: VersionIcon }} />
            <Drawer.Screen name="Login" component={Login} options={{drawerIcon: LoginIcon}}  />
            <Drawer.Screen name="mqtt" component={Mqtt} options={{drawerIcon: MqqtIcon}} />
            <Drawer.Screen name="Cadastro" component={Cadastro} options={{drawerIcon: CadastroIcon}} />

          </Drawer.Navigator>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  </NavigationContainer>

  );
};

export default MainDrawer;