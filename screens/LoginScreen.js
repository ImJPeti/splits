import { StyleSheet, Text, View, Button, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import React, { useLayoutEffect } from 'react';
import useAuth from '../hooks/useAuth';


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

      <Text style={styles.Splits}>
        SPLITS
      </Text>

      <TouchableOpacity style={styles.button} onPress={signInWithGoogle}>
        <Text style={styles.btext}>Login with Google</Text>
      </TouchableOpacity>
     
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
  Splits:{
    color: "rgba(221,202,233,255)",
    textAlign: "center",
    top: "25%",
    fontSize: 30,
    fontWeight: "bold",
    letterSpacing: 4,
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 23,
    paddingHorizontal: 3,
    borderRadius: 25,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 350,
    width: 250,
    elevation: 2,
    backgroundColor: "white",

  }
});
