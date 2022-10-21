import React from 'react';
import { NavigationContainer } from '@react-navigation/native';


import HomeNavigator from './HomeNavigator';

export default function AppNavigator() {

  
    return (
        <NavigationContainer>
        <>
            <HomeNavigator />
        </>
        </NavigationContainer>
    )


}