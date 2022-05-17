import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import {Icon} from "react-native-elements"
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import tw from 'tailwind-react-native-classnames'
import {useNavigation} from "@react-navigation/native"

const SuccessFullOrder = () => {
    const navigation = useNavigation()


  return (
   <SafeAreaView style={{marginTop: "auto", marginBottom: "auto", marginLeft: "auto", marginRight: "auto"}}>
      <View style={[tw`bg-gray-300 rounded-lg`, styles.container]}> 
        <View style={[styles.card, tw`bg-gray-200 rounded-full bg-green-400`]}>
            <Ionicons name="checkmark-done" size={80} color="white"/>
        </View>
        <Text style={styles.success}>
            SUCCESS!
        </Text>
        <Text style={styles.info}>
            The driver will contact you shortly
        </Text>
        <TouchableOpacity
                onPress={()=>navigation.navigate("Home")}
             style={[styles.btn, tw`rounded-full`]}>
            <Text style={[tw`text-green-800 leading-6 text-center text-xl`]}>CONTINUE</Text>
        </TouchableOpacity>
       </View>
   </SafeAreaView>
  )
}

export default SuccessFullOrder

const styles = StyleSheet.create({
    card:{
       alignItems: "center",
       padding: 80,
    },
    container:{
        padding: 40,
        height: "86%"
    },
    success:{
        color: "green",
        fontSize: 24,
        fontWeight: "bold",
        marginTop: "7%",
        marginLeft: "auto",
        marginRight: "auto",

    },
    info:{
        fontSize: 14,
        marginTop: "10%",
        marginLeft: "auto",
        marginRight: "auto",
        fontWeight: "bold",
        color: "black",
        textAlign: "center",
    },
    btn:{
        padding: 15,
        marginTop: "auto",
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "white",
        borderWidth: 2,
        borderColor: "green",
    }
})