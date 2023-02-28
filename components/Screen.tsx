import React from "react";
import { SafeAreaView, StyleSheet, View, ImageBackground } from "react-native";
import tailwind from "tailwind-react-native-classnames";
import Constants from "expo-constants";

interface IProps {
  [x: string]: any;
  children: React.ReactNode;
}

export default function Screen({children}: IProps) {
  return (
    <SafeAreaView >
      <ImageBackground
        source={require("../assets/giphy.gif")}
        style={tailwind`h-full w-full`}
      >
        <View  style={tailwind`flex-1`}>{children}</View>
      </ImageBackground>
    </SafeAreaView>
  );
}

