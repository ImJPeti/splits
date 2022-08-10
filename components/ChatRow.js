import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import useAuth from "../hooks/useAuth";
import getMatchedUserInfo from "../lib/getMatchedUserinfo";
import { collection, onSnapshot, orderBy, query, getFirestore } from "firebase/firestore";
import { db } from "../firebase";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import ChatRowHeader from "./ChatRowHeader";
import Header from "./Header";
import { SafeAreaView } from "react-native-safe-area-context";
import getNewMatchesInfo from "../lib/getNewMatchesInfo";


const ChatRow = ({ matchDetails, newMatches }) => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);
  const [NewMatchedUserInfo, setNewMatchedUserInfo] =useState(null)
  const [lastMessage, setLastMessage] = useState("");


const firestore = getFirestore();


  useEffect(() => {
    setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid));
  }, [matchDetails, newMatches, user]);





  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "matches", matchDetails.id, "messages"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setLastMessage(snapshot.docs[0]?.data()?.message)
      ),
    [matchDetails, db]
  );





  return (
      <View>
      <TouchableOpacity style={styles.chat}
        onPress={() =>
          navigation.navigate("Message", {
            matchDetails,
          })
        }
      >
        <Image style={{borderRadius: "100%", height: 70, width: 70,}}
          source={{ uri: matchedUserInfo?.photoURL }}
        />
        <View>
          <Text style={{fontSize: 20, padding: 3,fontWeight: "bold"}}>
            {matchedUserInfo?.fname} {matchedUserInfo?.lname}
          </Text>
          <Text style={{padding: 3, fontSize: 16, maxWidth: "90%", opacity: 0.6}}>
            {lastMessage || "Say hi!"}
          </Text>
        </View>
      </TouchableOpacity>
      </View>
  );
};

export default ChatRow;

const styles = StyleSheet.create({
  rowContainer:{
    flexDirection: "row",
    alignSelf:'stretch',
  },
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  chat:{
   
      top: 20,
      borderRadius: 10,
      marginRight: 10,
      left: 10,
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
    
  }
  
});
