import React, { useEffect, useState, useRef } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps'
import { View, StyleSheet, Dimensions, Platform, Image, TouchableOpacity, Text } from 'react-native';
import tailwind from 'tailwind-react-native-classnames';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';


import axios from 'axios';


export default function FarmOrchardScreen(props) {

  const GOOGLE_MAPS_APIKEY = 'AIzaSyBBkDvVVuQBVSMOt8wQoc_7E-2bvDh2-nw';

  const navigation = useNavigation();

  const route = useRoute();

  const item = route.params.item;

  const { id, client_id, name  } = props.route.params;

  const [ orchardData, setOrchardData ] = useState();

  const [ coordinate, setCoordinates ] = useState([]);

  const [ initialLon, setInitialLat ] = useState(0)

  const initalCoordinates = initialLon;

    const initial = {
        latitude: initalCoordinates.latitude,                     
        longitude: initalCoordinates.longitude, 
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
    }



  const access_token = "1566394169B0EJX2MGAVKVUGGKEMKZBMND9A7VCR";



  const getOrchards = async () => {
      axios.get(`https://sherlock.aerobotics.com/developers/orchards/?farm_id=${id}`, {
            headers: {
                'Authorization': `${access_token}`
              }
              })
              .then((res) => {
               setOrchardData(res.data.results);
               })
              .catch((error) => {
              console.error(error)
              })
  }



     
  const getLatLon = async () => {
     //Converting array of Object to object 
    const output = Object.assign({}, ...orchardData)
    // getting the value of latitude and longitude from the polygon key/property
    let lonlat = output.polygon;
    // split the blank spaces into double quotes     
    let arr = lonlat.split(' ');

  
    try{
      // maping the array to return the interger values of latitude and longitude   
       const geoCoordinates = arr.map(coordsArr => { 
            const longitude = coordsArr.split(',')[0];
            const latitude = coordsArr.split(',')[1];
          
    
            return {
              longitude : Number(longitude),
              latitude : Number(latitude),
            }
       });
       const [initialregion] = geoCoordinates
       setInitialLat(initialregion);
    
       setCoordinates(geoCoordinates); 
       }
        catch(err) {
          console.log(err)
        }      

  }
 

  useEffect(() => {
    getOrchards();
    getLatLon();

       //  const timer = setInterval(() =>  getLatLon()

     //    , 1000);
     //  return () => clearInterval(timer);
        
    },[]);

  return (
    <View style={tailwind`flex-1 bg-white`}>

        <View style={styles.container}>
            <MapView
             mapType="satellite"
             region={initial}
             style={styles.map} >

            <Polyline
              coordinates={coordinate}
              strokeColor="#FFFFFF"
              strokeColors={['#7F0000']}
              strokeWidth={10}
             />
          
            </MapView>
      <View>
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
        </View>

     
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    }
   
  })
