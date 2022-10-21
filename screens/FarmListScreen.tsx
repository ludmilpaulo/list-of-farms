import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native'
import tailwind from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import Screen from '../components/Screen';
import axios from 'axios';
import FarmItem from '../components/FarmItem';

export default function FarmListScreen() {
    const navigation = useNavigation();

    const [ farmData, setFarmData ] = useState();

    const access_token = "1566394169B0EJX2MGAVKVUGGKEMKZBMND9A7VCR";

    const getFarmList = () =>{
            axios.get('https://sherlock.aerobotics.com/developers/farms/', {
                headers: {
                    'Authorization': `${access_token}`
                }
                })
                .then((res) => {
                setFarmData(res.data.results);
                })
                .catch((error) => {
                console.error(error)
                })
    }

   useEffect(() => {
        getFarmList();
    }, []);

  return (
    <Screen style={tailwind`flex-1`}>
    <View style={tailwind` pt-40 `}>
      <FarmItem list={farmData}/>
    </View>
    </Screen>
  )
}