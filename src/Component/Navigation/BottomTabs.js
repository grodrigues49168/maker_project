import React from 'react';
import { Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {
    HomeNavigation,
    Cadastrar_MNavigation,
    Profile_PNavigation,
    VersionNavigation,
    Mqtt_BNavigation
} from './StackNavigation';

const Drawer = createDrawerNavigator();

export default function HomeNavigationDrawer() {
    return (
        <Drawer.Navigator
            initialRouteName="HomeTab"
            screenOptions={{
                headerShown: true,
            }}
        >
            <Drawer.Screen
                name='Home'
                component={HomeNavigation}
                options={{
                    drawerIcon: ({ focused }) => (
                        <>
                            <Icon
                                name='home'
                                size={20}
                                color={focused ? '#320487' : '#1637f5'}
                            />
                            <Text
                                allowFontScaling={false}
                                style={{
                                    color: focused ? '#320487' : '#1637f5',
                                    width: 50,
                                    fontSize: 11,
                                    textAlign: 'center'
                                }}>
                                
                            </Text>
                        </>
                    )
                }}
            />
            <Drawer.Screen
                name="Cadastro novos usuários"
                component={Cadastrar_MNavigation}
                options={{
                    drawerIcon: ({ focused }) => (
                        <>
                            <Icon
                                name='user-plus'
                                size={20}
                                color={focused ? '#320487' : '#1637f5'}
                            />
                            <Text
                                allowFontScaling={false}
                                style={{
                                    color: focused ? '#320487' : '#1637f5',
                                    width: 50,
                                    fontSize: 11,
                                    textAlign: 'center'
                                }}>
                                
                            </Text>
                        </>
                    )
                }}
            />
            <Drawer.Screen
                name="Registro de Usuários"
                component={Profile_PNavigation}
                options={{
                    drawerIcon: ({ focused }) => (
                        <>
                            <Icon
                                name='users'
                                size={20}
                                color={focused ? '#320487' : '#1637f5'}
                            />
                            <Text
                                allowFontScaling={false}
                                style={{
                                    color: focused ? '#320487' : '#1637f5',
                                    width: 50,
                                    fontSize: 11,
                                    textAlign: 'center'
                                }}>
                                
                            </Text>
                        </>
                    )
                }}
            />
          
          <Drawer.Screen
                name="Mqtt-Id"
                component={Mqtt_BNavigation}
                options={{
                    drawerIcon: ({ focused }) => (
                        <>
                            <Icon
                                name='server'
                                size={20}
                                color={focused ? '#320487' : '#1637f5'}
                            />
                            <Text
                                allowFontScaling={false}
                                style={{
                                    color: focused ? '#320487' : '#1637f5',
                                    width: 50,
                                    fontSize: 11,
                                    textAlign: 'center'
                                }}>
                                
                            </Text>
                        </>
                    )
                }}
            />
            <Drawer.Screen
                name="Versão/Links"
                component={VersionNavigation}
                options={{
                    drawerIcon: ({ focused }) => (
                        <>
                            <Icon
                                name='retweet'
                                size={20}
                                color={focused ? '#320487' : '#1637f5'}
                            />
                            <Text
                                allowFontScaling={true}
                                style={{
                                    color: focused ? '#320487' : '#1637f5',
                                    width: 50,
                                    fontSize: 11,
                                    textAlign: 'center'
                                }}>
                                
                            </Text>
                        </>
                    )
                }}
            />
        </Drawer.Navigator>
    );
}
