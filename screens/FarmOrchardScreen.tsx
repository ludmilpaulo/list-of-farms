import React, { useEffect, useState } from 'react';
import MapView, { PROVIDER_GOOGLE, Polyline } from 'react-native-maps'
import { View, StyleSheet, Dimensions, Platform, Image, TouchableOpacity, Text } from 'react-native';
import tailwind from 'tailwind-react-native-classnames';
import { useNavigation, useIsFocused, useRoute } from '@react-navigation/native';


import axios from 'axios';


export default function FarmOrchardScreen(props) {

  const GOOGLE_MAPS_APIKEY = 'AIzaSyBBkDvVVuQBVSMOt8wQoc_7E-2bvDh2-nw';

  const isFocused = useIsFocused();

  const navigation = useNavigation();

  const route = useRoute();

  const item = route.params.item;

  const { id, client_id, name  } = props.route.params;

  const [ orchardData, setOrchardData ] = useState([]);

    
  const access_token = "1566394169B0EJX2MGAVKVUGGKEMKZBMND9A7VCR";

  const [ coordinatePoints, setCoordinatePoints] = useState([]);


  const [startingPoint] = coordinatePoints;

 
  const startCoordinates = {

        latitude: startingPoint?.latitude,                     
        longitude: startingPoint?.longitude, 
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,

  }



  const getOrchards = async () => {
    const res = await  axios.get(`https://sherlock.aerobotics.com/developers/orchards/?farm_id=${id}`, {
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
          return res;
  }



 
  const getBoundaris = async () =>{


// filter the polygon properties from the Object
 const geoReference = Object.keys(orchardData).reduce((result, key) => {
  return result.concat(orchardData[key].polygon.split(' '));
}, [])

const lonlat = geoReference.map((coordsArr) => { 
            const longitude = coordsArr.split(',')[0];
            const latitude = coordsArr.split(',')[1];
            return {
              longitude : parseFloat(longitude),
              latitude : parseFloat(latitude),
            }
        },);
        setCoordinatePoints(lonlat);

      }


console.log('start', coordinatePoints)
        
useEffect(()=> {

  getOrchards();

  getBoundaris();

 

}, [])  

  /*   
  const getLatLon = async () => {
     //Converting array of Object to object 
    const output = Object.assign({}, ...orchardData)
    // getting the value of latitude and longitude from the polygon key/property
    let lonlat = output.polygon;
    // split the blank spaces into double quotes     
    let arr = lonlat.split(' ');

    try{
      // maping the array to return the interger values of latitude and longitude   
       const geoCoordinates = arr.map((coordsArr) => { 
            const longitude = coordsArr.split(',')[0];
            const latitude = coordsArr.split(',')[1];
            return {
              longitude : parseFloat(longitude),
              latitude : parseFloat(latitude),
            }  
       }, []);
      // return geoCoordinates;
       const [initialregion] = geoCoordinates
       setInitialLat(initialregion);
    
       setCoordinates(geoCoordinates); 
       }
       catch(err) {
          console.log(err)
        }      

  }
  */

 


  return (
    <View style={tailwind`flex-1 bg-white`}>

        <View style={styles.container}>
            <MapView
             mapType="satellite"
             region={startCoordinates}
             style={styles.map} >

            <Polyline
              coordinates={coordinatePoints}
              strokeColor="#FFFFFF"
              strokeColors={['#7F0000']}
              strokeWidth={10}
             />
          
            </MapView>
      <View>
      <TouchableOpacity
        onPress={getBoundaris}
          style={
            tailwind`h-10 w-full bg-white rounded-full items-center justify-center border border-blue-500 `
          }
        >
          <Text style={tailwind`text-lg text-blue-500 font-bold`}>
          Click to View {name} Orchards
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
