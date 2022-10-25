import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import tailwind from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";

export default function FarmItem({ list }) {
  const navigation = useNavigation();

  const handlePress = (item) => {
    navigation.navigate("FarmOrchardScreen", {
      item: item,
      name: item.name,
      id: item.id,
      client_id: item.client_id,
    });
  };

  return (
    <View>
      {list?.map((item, index) => (
        <FarmItemCard
          key={index}
          item={item}
          onPress={() => handlePress(item)}
        />
      ))}
    </View>
  );
}

const FarmItemCard = ({ item, onPress }) => {
  return (
    <View style={tailwind` pt-40 `}>
      <TouchableOpacity
        onPress={onPress}
        style={tailwind`h-10 w-full bg-white rounded-full items-center justify-center border border-blue-500 `}
      >
        <Text style={tailwind`text-lg text-blue-500 font-bold`}>
          {item.name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
