import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeNavigationTabs from './BottomTabs';
import Home from '../Screens/Home/Dashboard'
import Cadastro from '../Screens/Cadastro/Cadastro'
import Mqtt from '../Screens/Mqtt/mqtt'
import Profile from '../Screens/Profile/Profile'
import Version from '../Screens/Version/Version' 
import Login from '../Screens/Login/Login';


const Stack = createNativeStackNavigator()

export default props => (
    <Stack.Navigator
        initialRouteName='Login' 
        screenOptions={{ headerShown: false }}
    >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={HomeNavigationTabs} />
    </Stack.Navigator>
)

export function HomeNavigation() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    )
}

export function Cadastrar_MNavigation() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen
                name='Cadastrar novos usuarios'
                component={Cadastro}
            />
        </Stack.Navigator>
    )
}
export function Mqtt_BNavigation() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen
                name='Mqtt'
                component={Mqtt}
            />
        </Stack.Navigator>
    )
}
export function Profile_PNavigation() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen
                name='suarios'
                component={Profile}
            />

         
        </Stack.Navigator>
    )
}
export function VersionNavigation() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false}}
        >
            <Stack.Screen
                name='Versão/Links'
                component={Version}
            />

         
        </Stack.Navigator>
    )
}