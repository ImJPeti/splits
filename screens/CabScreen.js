import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import {Provider} from "react-redux";
import { store } from '../store';
import tw from "tailwind-react-native-classnames";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";


export default function CabScreen(){
  


  
return (
    <Provider store={store}>
        <SafeAreaView style={tw`bg-white h-full`}>
            <View style={tw`p-5`}>
                <Text style={styles.Splits}>SPLITS</Text>
            </View>
            <TouchableOpacity style={ tw`bg-gray-200 p-2 pl-6 pb-8 pt-4 m-2 w-40`} >
                <View>
                   
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    </Provider>
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