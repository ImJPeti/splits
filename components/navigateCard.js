import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from "tailwind-react-native-classnames"
import useAuth from "../hooks/useAuth";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { setDestination } from '../slices/navSlice';
import {useDispatch} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { Icon } from 'react-native-elements';

const navigateCard = () => {
    const { user, logout } = useAuth();
    const dispatch = useDispatch();

    const navigation = useNavigation();


    function getTime(){

        let date = new Date();
        let hour = date.getHours();
        let greetings = " ";

        if(hour>=0 && hour<=12){
            greetings = "Good Morning"
        }
        else if(hour>12 && hour<=17){
            greetings = "Good Afternoon"
        }
        else{
            greetings = "Good Evening"
        }

        return greetings;
    }


    function splitName(){
        let splitted = user.displayName.split(" ")
        let LastName = splitted[1];

        return LastName;
    }


  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`}>{getTime()}, {splitName()}!</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
      
        <SafeAreaView>
            <GooglePlacesAutocomplete 
                styles={toInputBoxStyle}
                placeholder='Where to?'
                nearbyPlacesAPI='GooglePlacesSearch'
                fetchDetails={true}
                returnKeyType={'search'}
                minLength={2}
                enablePoweredByContainer={false}
                debounce={400}
                query={{
                    key: 'AIzaSyBW75u9H17j1HwSs1UBvXABmeArjxOfg3w',
                    language: 'hu',
                }}
                onPress={(data, details = null)=>{
                    dispatch(setDestination({
                        location: details.geometry.location,
                        description: data.description,
                    })
                    )

                    navigation.navigate("RideOptionsCard")
                }}

            />
        </SafeAreaView>
        
      </View>
      
      <View style={tw`flex-row bg-white justify-evenly border-t border-gray-100 pt-3`}>
          <TouchableOpacity style={tw`flex flex-row bg-black w-24 px-4 py-3 rounded-full justify-between`}
            onPress={()=>navigation.navigate('RideOptionsCard')}
          >
                <Icon name='car' type='font-awesome' color="white" size={16}></Icon>
                <Text style={tw`text-white text-center`}>Rides</Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default navigateCard

const toInputBoxStyle = StyleSheet.create({
    container:{
        backgroundColor: "white",
        paddingTop: 20,
        flex: 0,
    },
    textInput:{
        backgroundColor: "#DDDDDF",
        borderRadius: 0,
        fontSize: 18,
    },
    textInputContainer:{
        paddingHorizontal: 20,
        paddingBottom: 0,
    }
})