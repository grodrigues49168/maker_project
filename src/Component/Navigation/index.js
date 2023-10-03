import React from 'react';
import StackNavigation from './StackNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

export default props => (
    <NavigationContainer>
        
          <StatusBar style="dark" translucent backgroundColor="transparent" />
          
      <StackNavigation />

    </NavigationContainer>
)