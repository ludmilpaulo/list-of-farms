import React, { useState, useEffect } from "react";
import tailwind from "tailwind-react-native-classnames";
import Screen from "../components/Screen";
import axios from "axios";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";


interface Data{
  name : string;
  id : number;
  client_id : number;
}

  interface Navigator {
      navigate(arg0: string, arg1: { item: Data; name: string; id: number; client_id: number; }): unknown;
      item: string;
      name: string;
      id: number;
      client_id:number;
   
  }


export default function FarmListScreen() {


  const [farmData, setFarmData] = useState<Data[]>([]);

  const navigation = useNavigation<Navigator>();

  const access_token = "1566394169B0EJX2MGAVKVUGGKEMKZBMND9A7VCR";

  const getFarmList = () => {
    axios
      .get("https://sherlock.aerobotics.com/developers/farms/", {
        headers: {
          Authorization: `${access_token}`,
        },
      })
      .then((res) => {
        setFarmData(res.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getFarmList();
  }, [farmData]);

  const handlePress = (item :Data) => {
    navigation.navigate("FarmOrchardScreen", {
      item: item,
      name: item.name,
      id: item.id,
      client_id: item.client_id,
    });
  };

  return (
    <Screen style={tailwind`flex-1`}>
      {farmData?.map((item: Data) => (
      <View style={tailwind` pt-40`} key={item.id}>
      
      <TouchableOpacity
        onPress={() =>handlePress(item)}
        style={tailwind`h-10 w-full bg-white rounded-full items-center justify-center border border-blue-500 `}
      >
        <Text style={tailwind`text-lg text-blue-500 font-bold`}>
          {item.name}
        </Text>
      </TouchableOpacity>
     
      </View>
       ))}
    </Screen>
  );
}
