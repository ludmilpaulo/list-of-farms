import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import Screen from '../components/Screen';
import tailwind from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {

  const navigation = useNavigation();

  return (
    <Screen style={tailwind`flex-1`}>
      <View style={tailwind`w-60 h-60 items-center justify-center `}>
          <Image
            style={tailwind`w-60 h-60 items-center justify-center`}
            source={require('../assets/logo.png')}
          />
     </View>
    <View style={tailwind` pt-40 `}>
        <TouchableOpacity
         onPress={() => navigation.navigate("FarmListScreen")}
          style={
            tailwind`h-10 w-full bg-white rounded-full items-center justify-center border border-blue-500 `
          }
        >
          <Text style={tailwind`text-lg text-blue-500 font-bold`}>
          Let&#39;s find your Ochard
          </Text>
        </TouchableOpacity>
    </View>
    </Screen>
  )
}