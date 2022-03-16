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

const ChatRow = ({ matchDetails }) => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);
  const [lastMessage, setLastMessage] = useState("");

  useEffect(() => {
    setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid));
  }, [matchDetails, user]);

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
            height: 80,
            width: 80,
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

    </View>
  );
};

export default ChatRow;

const styles = StyleSheet.create({});
