import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";
import ChatRow from "../components/ChatRow";
import ChatRowHeader from "./ChatRowHeader";
import LinearGradient from "react-native-linear-gradient";
import HeadRow from "../components/HeadRow";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";

const ChatList = () => {
  const [matches, setMatches] = useState([]);
  const { user } = useAuth();
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);
  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "matches"),
        where("usersMatched", "array-contains", user.uid)
      ),
      (snapshot) =>
        setMatches(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
    );
  }, [user]);

  function getTime() {
    let date = new Date();
    let hour = date.getHours();
    let greetings = " ";

    if (hour >= 0 && hour <= 12) {
      greetings = "Good Morning";
    } else if (hour > 12 && hour <= 17) {
      greetings = "Good Afternoon";
    } else {
      greetings = "Good Evening";
    }

    return greetings;
  }

  return matches.length > 0 ? (
    <View>
      <View style={styles.header}>
        <ImageBackground
          source={require("../assets/chat_background.png")}
          style={{ width: "100%", height: "100%" }}
        >
          <View style={styles.container}>
            <Text style={styles.greetings}>{getTime()}</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.greeterUser}>{user.displayName}</Text>
              <Image
                source={{ uri: user.photoURL }}
                style={{
                  width: 60,
                  height: 60,
                  marginLeft: "auto",
                  bottom: "7%",
                  borderRadius: "100%",
                  marginRight: "5%",
                }}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignContent: "center",
              alignItems: "center",
              alignSelf: "center",
              bottom: "6%",
            }}
          >
            <View>
              <Image
                source={{ uri: user.photoURL }}
                style={{
                  width: 80,
                  height: 80,
                  marginBottom: "5%",
                  left: "4%",
                  borderRadius: 150 / 2,
                  overflow: "hidden",
                  borderWidth: 3,
                  borderColor: "#564946"
                }}
              />
               <View
                style={{
                  padding: "3%",
                  position: "absolute",
                  top: "32%",
                  left: "65%",
                  
                }}
              >
                <Ionicons
                  name="add-circle"
                  size={35}
                  color="white"
                />
              </View>
              <Text style={{ fontSize: 20, textAlign: "center" }}>Me</Text>
            </View>
            <FlatList
              style={{ alignContent: "center" }}
              data={matches}
              horizontal={true}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <HeadRow matchDetails={item} />}
            />
          </View>
        </ImageBackground>
      </View>

      <ImageBackground
        source={require("../assets/messagebg.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.messageContainer}>
          <FlatList
            style={{ height: "100%" }}
            data={matches}
            horizontal={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ChatRow matchDetails={item} />}
          />
        </View>
      </ImageBackground>
    </View>
  ) : (
    <View style={{ padding: 5 }}>
      <Text style={{ textAlign: "center", fontSize: 20 }}>
        Jelenleg nincs partnered!
      </Text>
    </View>
  );
};

export default ChatList;

const styles = StyleSheet.create({
  header: {
    height: "27%",
    backgroundColor: "#cbf3f5",
  },
  linear: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  greetings: {
    marginTop: "6%",
    fontSize: 18,
    padding: 8,
    fontWeight: "bold",
    opacity: 0.5,
    fontFamily: "GillSans-Bold",
  },
  greeterUser: {
    marginLeft: "4%",
    fontSize: 23,
    fontWeight: "600",
  },
  container: {
    flex: 1,
  },
  greeterImg: {
    width: 60,
    height: 60,
    borderRadius: 100,
    marginLeft: "80%",
    marginBottom: "40%",
  },
  messageContainer: {
    backgroundColor: "white",
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
  },
});
