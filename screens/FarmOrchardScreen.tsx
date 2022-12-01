import React, { useEffect, useMemo, useRef, useState } from "react";
import MapView, {  Polyline } from "react-native-maps";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import tailwind from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";

import axios from "axios";

interface Props {
  route: any
}

interface Data{
  id: number;
  hectares: number;
  name: string;
  farm_id: number;
  client_id: number;
  polygon: number;
  crop_type: string;
}

export default function FarmOrchardScreen({route}: Props) {

  const ref = useRef<MapView>()

  const navigation = useNavigation<any>();

  const { id, name } = route?.params;

  const [orchardData, setOrchardData] = 
   useState<Data[]>([]);


  const access_token = "1566394169B0EJX2MGAVKVUGGKEMKZBMND9A7VCR";
 
  // const startingPoint = coordinatePoints[0];

  //const [startingPoint] = coordinatePoints;

  // console.log('starting', startingPoint);
  
  // const startCoordinates = {
  //   latitude: startingPoint?.latitude,
  //   longitude: startingPoint?.longitude,
  //   latitudeDelta: 0.005,
  //   longitudeDelta: 0.005,
  // };

  const getOrchards =  () => {
     axios
      .get(
        `https://sherlock.aerobotics.com/developers/orchards/?farm_id=${id}`,
        {
          headers: {
            Authorization: `${access_token}`,
          },
        }
      )
      .then((res) => {
       setOrchardData(res?.data?.results);
      })
      .catch((error) => {
        console.error(error);
      });
  };

    console.log('data collected', orchardData);  
  
  useEffect(()=>{
    getOrchards();
  }, []);


  const coordinatePoints = useMemo(() => {

    // filter the polygon properties from the Object
    const geoReference = Object.keys(orchardData).reduce((result, key) => {
      return result.concat(orchardData[key].polygon.split(" "));
    }, []);

    const initialCoordinates = geoReference.map((coordsArr:any) => {
      let longitude = coordsArr.split(",")[0];
      let latitude = coordsArr.split(",")[1];
      return {
        longitude: parseFloat(longitude),
        latitude: parseFloat(latitude),
      };
  });

    return initialCoordinates;
  }, [orchardData]);

  useEffect(() => {
    if (coordinatePoints) {
      console.debug(coordinatePoints[0])
      ref.current?.animateCamera({center: coordinatePoints[0], zoom: 5})
    }
  },[coordinatePoints])

  return (
    <View style={tailwind`flex-1 bg-white`}>


      <View style={styles.container}>
        <MapView
          ref={ref}
          mapType="satellite"
          // region={startCoordinates}
          style={styles.map}
        >
          <Polyline
            coordinates={coordinatePoints}
            strokeColor="#FFFFFF"
            strokeColors={["#7F0000"]}
            strokeWidth={10}
          />
        </MapView>

        <TouchableOpacity
          onPress={() => navigation.navigate("FarmListScreen")}
          style={tailwind`pb-10 w-full bg-white rounded-full items-center justify-center border border-blue-500 `}
        >
          <Text style={tailwind` pb-10 text-lg text-blue-500 font-bold`}>List of Farms
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});