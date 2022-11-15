import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import tailwind from "tailwind-react-native-classnames";
import AppNavigator from "./navigation/AppNavigator";

export default function App() {
  return (
    <GestureHandlerRootView style={tailwind`flex-1`}>
      <AppNavigator />
    </GestureHandlerRootView>
  );
}
