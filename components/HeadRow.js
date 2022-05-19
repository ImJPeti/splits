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

const HeadRow = ({matchDetails, newMatches}) => {

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
    <View>
        
      <TouchableOpacity style={styles.chat}
        onPress={() =>navigation.navigate("Message", {matchDetails,})}>

        <Image style={{
            height: 80, width: 80, padding: "2%",
            borderRadius: 150 / 2,
            overflow: "hidden",
            borderWidth: 3,
            borderColor: "#558564"
        }}
          source={{ uri: matchedUserInfo?.photoURL }}/>
    
          <Text style={{fontSize: 20, padding: "7%"}}>
            {matchedUserInfo?.fname}
          </Text>
      </TouchableOpacity>
      </View>
  );
}

export default HeadRow

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
        top: "1%",
        borderRadius: 10,
        marginRight: 10,
        left: 10,
        alignItems: "center",
        padding: 10,
      
    }
    
  });