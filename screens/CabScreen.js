import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import {useDispatch} from "react-redux";
import tw from "tailwind-react-native-classnames";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import NavOption from '../components/NavOption';
import Header from '../components/Header';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { setDestination, setOrigin } from '../slices/navSlice';

export default function CabScreen(){
  const dispatch = useDispatch();


  
return (
    
        <SafeAreaView>
            <Header />
            <View style={tw`p-5`}>
                <Text style={styles.Splits}>SPLITS</Text>
            </View>

    <GooglePlacesAutocomplete
        placeholder='Where from?'
        styles={{
            container:{
                flex:0,
            },
            textInput:{
                fontSize: 18,
            }
        }}
        onPress={(data, details = null)=>{
            dispatch(
                setOrigin({
                location: details.geometry.location,
                description: data.description,
            })
        );
            dispatch(setDestination(null));
        }}
        fetchDetails={true}
        returnKeyType={'search'}
        minLength={2}
        enablePoweredByContainer={false}
        query={{
            key: 'AIzaSyBW75u9H17j1HwSs1UBvXABmeArjxOfg3w',
            language: 'hu',
        }}
        nearbyPlacesAPI='GooglePlacesSearch'
        debounce={400}

    />

            <NavOption />
        </SafeAreaView>
  )
}



const styles = StyleSheet.create({
    brand:{
        color: "#273c5a",
        fontSize: 30,
        fontWeight: "bold",
    },
    ride:{
        backgroundColor: "#273c5a",
        padding: "20%",
        borderRadius: 100,
    },
    arrow:{
        marginRight: "auto",
        marginLeft: "auto",
    },
    Splits: {
        top: 0,
        fontSize: 28,
        fontWeight: "bold",
        color: "#273c5a",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "10%"
      },
})