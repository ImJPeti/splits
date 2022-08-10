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
import Status from "../components/Status";



export default function MyPofile() {
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
          alignItems: "center",
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
            marginLeft: "auto",
            top: 5,
          }}
        >
          Profile
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("EditProfile")}
          style={{ padding: 3 }} 
        > 
        <Text>Beállítások</Text>
        </TouchableOpacity>
      </View>
      
        <View style={{
          width: '100%',
          alignContent: "center",
        }}>
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
          My Status
        </Text>

          <Status />
       
        {/*
        <View style={styles.userInfoWrapper}>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>22</Text>
            <Text style={styles.userInfoSubTitle}>Posts</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>88.000</Text>
            <Text style={styles.userInfoSubTitle}>Followers</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>22</Text>
            <Text style={styles.userInfoSubTitle}>Following</Text>
          </View>
        </View>
      */}
      
      <Text
          style={{
            marginRight: "auto",
            fontSize: 15,
            fontWeight: "bold",
            color: "grey",
            opacity: 0.5,
          }}
        >
          My Posts
        </Text>
        <View style={styles.PostGrid}>
          <View style={styles.postImg}>
            <Image style={
              {
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                width: "100%",
                height: "100%",
              }
            }
          source={require("../assets/work-test.jpg")}
            />
          </View>
          <View style={styles.postTxt}>
            <Text style={
              {
                fontSize: 15,
                marginTop: "1%",
              }
            }>Csicska munkák</Text>
          </View>
        </View>
        <View style={styles.PostGrid}>
          <View style={styles.postImg}>
            <Image style={
              {
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                width: "100%",
                height: "100%",
              }
            }
          source={require("../assets/dog-test.jpg")}
            />
          </View>
          <View style={styles.postTxt}>
            <Text style={
              {
                fontSize: 15,
                marginTop: "1%",
              }
            }>Kiskutyám fotózása</Text>
          </View>
        </View>
      </ScrollView>
      <View >
        <TouchableOpacity onPress={() => navigation.navigate("Post")} style={{
        
        }}>
          <Ionicons
            name="add-circle-sharp"
            size={40}
            color="#273c5a"
            style={{
              marginLeft: "auto",
              marginRight: "7%",
              bottom: "2%",
            }}
             />
        </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
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
    height: 100,
    marginTop: "2%",
    marginLeft: "auto",
    marginRight: "auto",
    alignContent: "center",
    width: 100,
    borderRadius: 75,
  },
  userName: {
    fontSize: 20,
    top: "6%",
    marginLeft: "auto",
    marginRight: "auto",
    fontWeight: "500",
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
