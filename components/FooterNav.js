import {
    View,
    Text,
    Button,
    SafeAreaView,
    TouchableOpacity,
    Image,
    StyleSheet,
    ViewComponent,
    Platform,
    Animated,
  } from "react-native";
  import { useNavigation } from "@react-navigation/core";
  import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
  import useAuth from "../hooks/useAuth";
  import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
  import Swiper from "react-native-deck-swiper";
  import { db } from "../firebase";
  import {
    collection,
    doc,
    onSnapshot,
    setDoc,
    query,
    getDocs,
    where,
    getDoc,
    serverTimestamp,
  } from "@firebase/firestore";

const FooterNav = () => {
    const navigation = useNavigation();
    const { user, logout } = useAuth();
    const [profiles, setProfiles] = useState([]);
    const swipeRef = useRef(null);

  return (
    <View style={styles.View}>
        <TouchableOpacity
          style={styles.TouchableOpacity}
          onPress={() => navigation.navigate("MyProfile")}
        >
          <Ionicons name="person-sharp" size={30} color="rgba(0,0,0,0.63)"/>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={()=>navigation.navigate("Cab")}
        >
          <Ionicons name="map-sharp" size={30} color="rgba(0,0,0,0.63)"/>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.chatBubble}
          onPress={() => navigation.navigate("Chat")}
        >
          <Ionicons name="chatbubbles-sharp" size={30} color="rgba(0,0,0,0.63)"/>
        </TouchableOpacity>
      </View>
      
  )
}

export default FooterNav

const styles = StyleSheet.create({
    profileimg: {
        position: "absolute",
        width: 40,
        height: 40,
        borderRadius: 100,
        marginLeft: "auto",
        marginRight: "auto",
        top: 3,
        alignItems: 'center',
        padding: 5,
      },
      TouchableOpacity: {
        position: "absolute",
        left: 5,
        top: 3,
      },
     
      View: {
        alignItems: "center",
        position: "relative",
        alignContent: "center",
        padding: 5,
        top: 10,
        backgroundColor: "transparent",
        height: "8%",
        marginLeft: "auto",
        marginRight: "auto",
        borderBottomColor: "black",
        borderTopColor: "black",
        width: "80%",
        borderRadius: 20,
        marginBottom: "5%",
        shadowColor: "grey",
        shadowOffset:{width:0, height: 2},
        shadowOpacity: 2,
        shadowRadius: 2,
      },
      chatBubble: {
        position: "absolute",
        right: 3,
        marginLeft: "auto",
        marginRight: "auto",
        top: 3,
        alignItems: "center",
        padding: 1,
      },
      SwiperCard: {
        backgroundColor: "white",
        height: "100%",
        top: 0,
        borderRadius: 0,
        position: "relative",
        shadowColor: "#000",
        width: "100%",
        marginRight: "auto",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
      },
      SafeAreaView: {
        flex: 1,
        backgroundColor: "white",
        height: '100%',
      },
      CardImg: {
        flex: 1,
        resizeMode: "cover",
        borderRadius: 15,
        height: "100%",
        top: 0,
      },
      name: {
        fontSize: 22,
        padding: 10,
        fontWeight: "bold",
      },
      age: {
        right: 0,
        textAlign: "right",
        position: "absolute",
        padding: 10,
        fontSize: 22,
        fontWeight: "bold",
      },
      location: {
        right: 0,
        textAlign: "right",
        position: "absolute",
        top: "55%",
        padding: 10,
        fontSize: 15,
      },
      details: {
        position: "absolute",
        bottom: 2.5,
        backgroundColor: "white",
        height: 80,
        width: "90%",
        marginLeft: "5%",
        borderRadius: 15,
        flexDirection: "row",
        textAlign: "center",
        shadowColor: "grey",
        shadowOffset:{width:0, height: 2},
        shadowOpacity: 2,
        shadowRadius: 2,
      },
      bottomnav: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        paddingBottom: 25,
      },
      yep: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(2, 166, 4, 0.41)",
        padding: 15,
        borderRadius: 100,
      },
      nop: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(224, 5, 5, 0.41)",
        padding: 15,
        borderRadius: 100,
      },
      noMore: {
        height: "20%",
        width: "100%",
        marginTop: "auto",
        marginBottom: "auto",
        marginLeft: "auto",
        marginRight: "auto",
      }
})