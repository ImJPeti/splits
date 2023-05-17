import { StyleSheet, Text, View, Button, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import React, { useLayoutEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { Icon } from 'react-native-elements';


const image= {uri: "https://tinder.com/static/tinder.png"};


const LoginScreen = () => {
  const {signInWithGoogle, loading} = useAuth();
  const navigation = useNavigation()

  useLayoutEffect(()=>{
    navigation.setOptions({
      headerShown: false,
    });
  },[]);

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/Background.png')} resizeMode="cover" style={styles.image}>


    <View style={{top: 260, flexDirection: "row", alignContent: "center", alignItems: "center", marginLeft: "auto", marginRight: "auto"}}>
      <TouchableOpacity style={styles.getStarted}>
        <Text style={{fontSize: 20, color: 'white', textAlign: "left"}}>Get started</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={signInWithGoogle}>
        <Icon name='google' type='font-awesome' color="black" size={30}></Icon>
      </TouchableOpacity>
      
    </View> 
    <View style={{top: 270, alignItems: "center", flexDirection: "row", alignContent: "center", marginLeft: "auto", marginRight: "auto",}}>
      <Text style={{color: "rgba(0,0,0,0.5)", }}>Already have an account?</Text>
      <Text> </Text>
      <Text style={{color: "rgba(242,0,0,0.54)", fontWeight: "800"}} onPress={signInWithGoogle}>Sign in</Text>
    </View>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({

  container:{
    flex: 1,
    backgroundColor: 'black',
    flexDirection: "row",
  },
  
  LoginWithEmail:{
    backgroundColor: "white",
    borderRadius: 25,
    width: 250,
    marginLeft: "auto",
    paddingVertical: 23,
    paddingHorizontal: 3,
    elevation: 2,
    marginTop: "5%",
    marginRight: "auto",
  },

  image:{
    flex: 1,
    justifyContent: "center"
  },
  text:{
    color: "white",
    fontSize: 25,
    lineHeight: 84,
    letterSpacing: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  btext:{
    fontSize: 17,
    lineHeight: 21,
    fontWeight: 'bold',
    textAlign: "center",
    letterSpacing: 1,
    color: 'black',
  },
  button:{
    top: 0,
    backgroundColor: "rgba(0,0,0,0.11)",
    alignContent: "center",
    alignItems: "center",
    right: "5%",
    padding: "4%",
    borderRadius: 10,
  },
  getStarted:{
    top: 0,
    backgroundColor: "black",
    padding: "5%",
    marginRight: "4%",
    borderRadius: 10,
  }
});
