import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    ImagePickerIOS,
    SafeAreaView,
    ScrollView,
    Platform,
    Dimensions,
  } from "react-native";
  import React, { useEffect, useState, useLayoutEffect } from "react";
  import { useNavigation } from "@react-navigation/core";
  import useAuth from "../hooks/useAuth";
  import { db } from "../firebase";
  import {
    collection,
    doc,
    onSnapshot,
    setDoc,
    query,
    getDocs,
    where,
    orderBy,
    getDoc,
    serverTimestamp,
  } from "@firebase/firestore";
  import ImagePicker from "react-native-image-picker";
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import getMatchedUserInfo from "../lib/getMatchedUserinfo";
  import AddPostScreen from "./AddPostScreen";
  import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
  import Header from "../components/Header";

 export default function EditProfile(){
    const navigation = useNavigation();
    const { user, logout } = useAuth();
    const [profiles, setProfiles] = useState([]);
    const [image, setImage] = useState("");
    const [job, setJob] = useState("");
    const [age, setAge] = useState("");
    const [fname, setfname] = useState("");
    const [lname, setLname] = useState("");
    const [userData, setUserData] = useState(null);
  
    var deviceWidth = Dimensions.get("window").width;
  
    const [post, setPost] = useState([]);
    const [loggedUser, setLoggedUser] = useState();



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#ffff" }}>
          <View
            style={{
              flexDirection: "row",
              alignContent: "center",
              width: "100%",
              marginBottom: "5%",
            }}
          >
            <Header />
            <Text
              style={{
                color: "#273c5a",
                fontSize: 20,
                fontWeight: "bold",
                marginRight: "auto",
                top: 5,
              }}
            >
              Edit Profile
            </Text>
           
          </View>
          <View style={
              {
                flexDirection: "row",
                padding: "2%",
                marginRight: "auto",
                marginBottom: "10%",
              }
            }>
            <Image style={styles.userImg} source={{ uri: user.photoURL }} />
            <Text style={styles.userName}>{user.displayName}</Text>
            </View>
          <ScrollView
            style={styles.container}
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center",
            }}
            showsVerticalScrollIndicator={false}
          >
            
            <Text
              style={{
                marginRight: "auto",
                fontSize: 15,
                fontWeight: "bold",
                color: "grey",
                opacity: 0.5,
              }}
            >
              Dashboard
            </Text>
    
              <View style={styles.category}>
                    <View>

                    <TouchableOpacity>
                        <View style={{flexDirection: "row"}}>
                            
                            <View style={{backgroundColor: "#0fa365", padding: "5%", borderRadius:100, width: 55, height: 55, alignItems:"center",}}>
                                <Ionicons style={{marginTop: "auto", marginBottom: "auto"}} name="medal-outline" size={30} color="white" />
                            </View>
                            <Text style={{fontSize: 20, fontWeight: "bold", top: "8%", left: "10%"}}>
                                Achievements
                            </Text>
                        </View>
                        </TouchableOpacity>

                    </View>
                    <View>

                    <TouchableOpacity>
                        <View style={{flexDirection: "row", paddingTop: "15%"}}>
                            
                            <View style={{backgroundColor: "#909694", padding: "5%", borderRadius:100, width: 55, height: 55, alignItems:"center", opacity: 0.8}}>
                                <Ionicons style={{marginTop: "auto", marginBottom: "auto"}} name="shield-outline" size={30} color="white" />
                            </View>
                            <Text style={{fontSize: 20, fontWeight: "bold", top: "8%", left: "10%"}}>
                                Privacy
                            </Text>
                        </View>
                        </TouchableOpacity>

                    </View>
                   
              </View>

              <View style={styles.category}>
                <View>
                    <Text style={{
                marginRight: "auto",
                fontSize: 15,
                fontWeight: "bold",
                color: "grey",
                opacity: 0.5,
              }}>My Account</Text>
                </View>
                <View>
                    <TouchableOpacity style={{padding: "4%", marginTop: "10%"}}>
                        <Text style={{color: "#2596be", fontSize: 16, fontWeight: "bold"}}>Switch to Other Account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{padding: "4%", marginTop: "2%"}}  onPress={logout}>
                        <Text style={{color: "#ea693c", fontSize: 16, fontWeight: "bold"}}>Log Out</Text>
                    </TouchableOpacity>
                </View>
              </View>
           
          </ScrollView>
          
        </SafeAreaView>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
      },
      category:{
        marginRight: "auto",
        marginTop: "6%",
      },
      icon: {
        marginLeft: "auto",
        height: 30,
        width: 30,
        bottom: 5,
        justifyContent: "center",
        alignItems: "center",
      },
      StatusTxt: {
        textAlign: "center",
        color: "white",
        marginLeft: "auto",
        marginRight: "auto",
        alignItems: "center",
        top: 0,
        fontSize: 17,
        justifyContent: "center",
      },
      status1: {
        backgroundColor: "#273c5a",
        width: "60%",
        borderRadius: 100,
        height: "100%",
        marginRight: "5%",
        padding: "10%",
        flexDirection: "row",
        alignContent: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.3,
        elevation: 13,
      },
      status2: {
        backgroundColor: "#067009",
        width: "60%",
        borderRadius: 100,
        height: "100%",
        padding: "10%",
        marginRight: "5%",
        flexDirection: "row",
        alignContent: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.3,
        elevation: 13,
      },
      status3: {
        backgroundColor: "#b8790d",
        width: "60%",
        borderRadius: 100,
        height: "100%",
        padding: "10%",
        flexDirection: "row",
        alignContent: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.3,
        elevation: 13,
      },
    
      settings: {
        left: 0,
        padding: "2%",
        flexDirection: "row",
      },
      userImg: {
        height: 120,
        marginRight: "auto",
        width: 120,
        borderRadius: 75,
      },
      userName: {
        fontSize: 20,
        alignContent: "center",
        alignItems: "center",
        top: "6%",
        marginLeft: "3%",
        marginRight: "auto",
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 10,
      },
      aboutUser: {
        fontSize: 12,
        fontWeight: "600",
        color: "#666",
        textAlign: "center",
        marginBottom: 10,
      },
      userBtnWrapper: {
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        marginBottom: 10,
      },
      userBtn: {
        borderColor: "#2e64e5",
        borderWidth: 2,
        borderRadius: 3,
        padding: 10,
        width: 120,
        top: 0,
        marginLeft: "auto",
      },
      userBtnTxt: {
        color: "#2e64e5",
      },
      userInfoWrapper: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
      },
      userInfoItem: {
        justifyContent: "center",
      },
      userInfoTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 5,
        textAlign: "center",
      },
      userInfoSubTitle: {
        fontSize: 12,
        color: "#666",
        textAlign: "center",
      },
      PostGrid:{
        marginTop: "10%",
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 10,
        height: 300,
        flex: 1,
      },
      postImg:{
        width: "100%",
        height: 250,
        borderColor: "grey",
        borderWidth: 2,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
      },
      postTxt:{
        width: "100%",
        bottom: 0,
        height: 50,
        backgroundColor: "white",
        borderWidth: 2,
        padding: "1%",
        borderColor: "grey",
        marginTop: "0.1%",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      },
    });
    