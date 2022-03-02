import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import {foundation} from "@expo/vector-icons";
import {Ionicons} from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/core';


const Header = ({title, callEnabled}) => {
    const navigation = useNavigation();

  return (
    <View style={{padding: 2, flexDirection: "row", marginRight: "auto"}}>
        <View style={{flexDirection: "row", flex: "flex", alignItems: "center"}}>
            <TouchableOpacity onPress={()=>navigation.goBack()} style={{padding: "2%"}}>
                <Ionicons name='chevron-back-outline' size={34} color="#FF5864"/>
            </TouchableOpacity>
            <Text style={{fontSize: 20, fontWeight: "bold"}}>{title}</Text>
        </View>
    </View>
  )
}

export default Header;