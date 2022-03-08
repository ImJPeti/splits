import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import{useNavigation, useRoute} from "@react-navigation/core";
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import useAuth from '../hooks/useAuth';
import {db,  } from '../firebase';
import HomeScreen from './HomeScreen';

const MatchedScreen = () => {
    const navigation = useNavigation();
    const {params} = useRoute();
    const { user, logout } =useAuth();
    const [profiles, setProfiles] =useState([]);
    const {loggedInProfile, userSwiped} = params;

  return (
    <View style={{height: "100%", backgroundColor:"#b0a9d6",paddingTop: 20, opacity: 0.89}}>
        <View style={{justifyContent: 'center', paddingHorizontal: 10, paddingTop: 20}}>
            <Text style={{color: "black", fontSize: 40, paddingTop:130, marginLeft: "auto", marginRight: "auto"}}>It's a Match</Text>
        </View>
        <Text style={{color: "black", textAlign: 'center', marginTop: "5%", fontSize: 15}}>
            You and {userSwiped.fname} {userSwiped.lname} have liked each other.
        </Text>

        <View style={{flex: 10, justifyContent: "space-evenly", marginTop: "20%", flexDirection: "row"}}>
            <Image
                 style={{height: 120, width: 120, borderRadius: 100,}}
                 source={{uri: user.photoURL, }}
            />
            <Image 
                style={{height: 120, width: 120, borderRadius: 100,}}
                source={{uri: userSwiped.photoURL, }}
            />
        </View>

        <TouchableOpacity
            style={{
                backgroundColor: "white",
                margin: "14%",
                paddingHorizontal: "20%",
                paddingVertical: "8%",
                borderRadius: 100,
                marginTop: 20,
            }}
            onPress={()=>{
                navigation.goBack();
                navigation.navigate("Chat");
            }}
        >
            <Text 
            style={{
                textAlign: 'center',
                fontSize: 15,
                fontWeight: "bold",
            }}
            
            >Send a Message</Text>
        </TouchableOpacity>
    </View>
  )
}

export default MatchedScreen
