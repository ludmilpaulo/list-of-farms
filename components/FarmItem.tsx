import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import tailwind from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";

interface Props{
  onPress : any;
  map: any;
  navigate: any;
  item: any;
  name: string;
  id: number;
  client_id: number;
}

export default function FarmItem(list : Props) {
  const navigation = useNavigation<Props>();

  const handlePress = (item:any) => {
    navigation.navigate("FarmOrchardScreen", {
      item: item,
      name: item.name,
      id: item.id,
      client_id: item.client_id,
    });
  };

  return (
    <View>
      {list?.map((item: any, index: any) => (
        <FarmItemCard
          key={index}
          item={item}
          onPress={() => handlePress(item)} map={undefined} navigate={undefined} name={""} id={0} client_id={0}        />
      ))}
    </View>
  );
}

const FarmItemCard = ({ item, onPress } : Props) => {
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
