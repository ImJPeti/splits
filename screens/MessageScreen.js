import { StyleSheet, Text, View, SafeAreaView, TextInput, Button,Image ,KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, FlatList, Animated, Easing, } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import getMatchedUserInfo from '../lib/getMatchedUserinfo'
import useAuth from '../hooks/useAuth'
import { useRoute } from '@react-navigation/native'
import SenderMessage from '../components/SenderMessage'
import ReceiverMessage from '../components/ReceiverMessage'
import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
const MessageScreen = () => {
    const {user} = useAuth();
    const {params} = useRoute();
    const [input, setInput] = useState("");
    const {matchDetails} = params;
    const [messages, setMessages] = useState([])
    const [matchedUserInfo, setMatchedUserInfo]=useState(null);
    useEffect(()=>{
        onSnapshot(
            query(
                collection(db, "matches", matchDetails.id, "messages"),
                orderBy("timestamp", "desc")
            ),
            (snapshot)=>
            setMessages(
                snapshot.docs.map((doc)=>({
                    id:doc.id,
                    ...doc.data(),
                }))
            )
        );
    }, [matchDetails, db]);

    const sendMessage= () => {
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
    <SafeAreaView style={{flex: 1}}>
        <Header title={getMatchedUserInfo(matchDetails.users, user.uid).lname}></Header>
        
       
            
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <FlatList 
                data = {messages}
                inverted={-1}
                style={{
                    paddingLeft: "4%",
                    
                }}
                keyExtractor={(item)=>item.id}
                renderItem={({item:message})=>
                    message.userId ===user.uid ? (
                        <SenderMessage key={message.id} message={message} />
                        
                    ):(
                        <ReceiverMessage key={message.id} message={message} />
                    )
                }

              />
            </TouchableWithoutFeedback>

            <View style={{
          flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: "5%",
            paddingVertical: "2%",
            borderTopColor: "grey",
            backgroundColor: "white",
            bottom: 2.5,
            justifyContent: "space-between",
            shadowColor: "grey",
             shadowOffset:{width:0, height: 2},
            shadowOpacity: 2,
            shadowRadius: 2,
            width: "80%",
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: 15,
             }}>
          <TextInput
            style={{
                height: 15,
                width: 20,
                flex: 1,
                textAlign: 'left',

            }}
            placeholder="Send Message..."
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            value={input}
          />
          <Button title='send' onPress={sendMessage} color="#FF5864"/>
          </View>
       
    </SafeAreaView>
  )
}

export default MessageScreen

const styles = StyleSheet.create({})