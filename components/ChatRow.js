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
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
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
      <SafeAreaView>
    
      <TouchableOpacity
        style={{
          top: 20,
          borderRadius: 10,
          marginRight: 10,
          left: 10,
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
        }}
        onPress={() =>
          navigation.navigate("Message", {
            matchDetails,
          })
        }
      >
        <Image
          style={{
            borderRadius: 100,
            height: 90,
            width: 90,
          }}
          source={{ uri: matchedUserInfo?.photoURL }}
        />
        <View>
          <Text
            style={{
              fontSize: 20,
              padding: 4,
              fontWeight: "bold",
            }}
          >
            {matchedUserInfo?.fname} {matchedUserInfo?.lname}
          </Text>
          <Text
            style={{
              padding: 4,
              fontSize: 15,
            }}
          >
            {lastMessage || "Say hi!"}
          </Text>
        </View>
      </TouchableOpacity>
      </SafeAreaView>
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
  }
  
});
