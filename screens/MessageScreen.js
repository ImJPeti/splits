import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TextInput,
    Button,
    Image,
    TouchableWithoutFeedback,
    Keyboard,
    FlatList,
    TouchableOpacity,
    ImageBackground,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import getMatchedUserInfo from "../lib/getMatchedUserinfo";
  import useAuth from "../hooks/useAuth";
  import { useRoute } from "@react-navigation/native";
  import SenderMessage from "../components/SenderMessage";
  import ReceiverMessage from "../components/ReceiverMessage";
  import {
    addDoc,
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
  } from "firebase/firestore";
  import { db } from "../firebase";
  import { Icon } from "react-native-elements";
  import { useNavigation } from "@react-navigation/native";
  import ChatList from "../components/ChatList";
  import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
  
  const MessageScreen = () => {
    const navigation = useNavigation();
    const { user } = useAuth();
    const { params } = useRoute();
    const [input, setInput] = useState("");
    const { matchDetails } = params;
    const [messages, setMessages] = useState([]);
    const [matchedUserInfo, setMatchedUserInfo] = useState(null);
    useEffect(() => {
      onSnapshot(
        query(
          collection(db, "matches", matchDetails.id, "messages"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
      );
    }, [matchDetails, db]);
  
    const sendMessage = () => {
      addDoc(collection(db, "matches", matchDetails.id, "messages"), {
        timestamp: serverTimestamp(),
        userId: user.uid,
        displayName: user.displayName,
        photoURL: matchDetails.users[user.uid].photoURL,
        message: input,
      });
  
      setInput("");
    };
  
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
            <Icon name="left" color={"black"} type="antdesign" />
          </TouchableOpacity>
          <Text style={styles.chatName}>
            {getMatchedUserInfo(matchDetails.users, user.uid).lname}{" "}
            {getMatchedUserInfo(matchDetails.users, user.uid).fname}
          </Text>
          <Image
            style={{ borderRadius: 100, height: 40, width: 40, borderWidth: 1 }}
            source={{
              uri: getMatchedUserInfo(matchDetails.users, user.uid).photoURL,
            }}
          />
        </View>
  
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            data={messages}
            inverted={-1}
            style={{
              paddingLeft: "4%",
            }}
            keyExtractor={(item) => item.id}
            renderItem={({ item: message }) =>
              message.userId === user.uid ? (
                <SenderMessage key={message.id} message={message} />
              ) : (
                <ReceiverMessage key={message.id} message={message} />
              )
            }
          />
        </TouchableWithoutFeedback>
  
        <View
          style={{
            flexDirection: "row",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: "3%",
              backgroundColor: "#F5F4F4",
              bottom: 2.5,
              top: 2.5,
              width: "70%",
              marginBottom: "6%",
              marginTop: "6%",
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: "100%",
            }}
          >
            <View style={{ marginRight: "3%" }}>
              <Ionicons name="attach-outline" size={33} color="#273c5a" />
            </View>
            <TextInput
              style={{
                height: 15,
                width: 20,
                flex: 1,
                textAlign: "left",
                color: "black",
              }}
              placeholder="Type a message..."
              placeholderTextColor={"grey"}
              onChangeText={setInput}
              onSubmitEditing={sendMessage}
              value={input}
            />
            <Button
              style={{ fontWeight: "bold" }}
              title="send"
              onPress={sendMessage}
              color="#273c5a"
            />
          </View>
          <View
            style={{
              marginRight: "5%",
              backgroundColor: "#F5F4F4",
              padding: "3%",
              borderRadius: "100%",
              alignContent: "center",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Ionicons
              style={{ marginLeft: "auto", marginRight: "auto" }}
              name="mic-outline"
              size={35}
              color="#273c5a"
            />
          </View>
        </View>
      </View>
    );
  };
  
  export default MessageScreen;
  
  const styles = StyleSheet.create({
    chatName: {
      fontSize: 25,
      fontWeight: "bold",
      marginLeft: "auto",
      marginRight: "auto",
    },
    header: {
      padding: "10%",
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      flexDirection: "row",
      alignContent: "center",
      alignItems: "center",
      alignSelf: "auto",
    },
  });