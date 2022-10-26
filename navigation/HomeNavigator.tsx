import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import FarmListScreen from "../screens/FarmListScreen";
import FarmOrchardScreen from "../screens/FarmOrchardScreen";
import WelcomeScreen from "../screens/WelcomeScreen";

const Stack = createStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="FarmListScreen" component={FarmListScreen} />
        <Stack.Screen name="FarmOrchardScreen" component={FarmOrchardScreen} />
      </>
    </Stack.Navigator>
  );
}
