import { StyleSheet, Text, View, FlatList, ImageBackground, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../firebase'
import useAuth from '../hooks/useAuth'
import ChatRow from '../components/ChatRow'
import ChatRowHeader from './ChatRowHeader'
import LinearGradient from 'react-native-linear-gradient'

const ChatList = () => {
    const[matches, setMatches] =useState([])
    const {user} = useAuth();
    const [matchedUserInfo, setMatchedUserInfo] = useState(null);
    useEffect(()=>{
        onSnapshot(query(collection(db, "matches"), where("usersMatched",
        "array-contains",user.uid)
        ),
        (snapshot)=>
        setMatches(
            snapshot.docs.map((doc)=>({
                id: doc.id,
                ...doc.data(),
            }))
        ))
    }, [user])

  
    function getTime(){

      let date = new Date();
      let hour = date.getHours();
      let greetings = " ";

      if(hour>=0 && hour<=12){
          greetings = "Good Morning"
      }
      else if(hour>12 && hour<=17){
          greetings = "Good Afternoon"
      }
      else{
          greetings = "Good Evening"
      }

      return greetings;
  }


  return  matches.length > 0?(
      <View>
        
         <View style={styles.header}>
            <ImageBackground source={require('../assets/chat_background.png')} style={{width: '100%', height: '100%'}}>
              <View style={styles.container}> 
                <Text style={styles.greetings}>{getTime()}</Text>
                <Text style={styles.greeterUser}>{user.displayName}</Text>
              </View>
             
            </ImageBackground>
            
        </View>

        <ImageBackground source={require("../assets/messagebg.png")} style={{width: "100%", height: "100%"}} >
        <View style={styles.messageContainer}>
        <FlatList
            style={{height: "100%"}}
            data={matches}
            horizontal={false}
            keyExtractor={(item)=>item.id}
            renderItem={({item})=> <ChatRow matchDetails={item} />}
        /> 
    
      </View>
      </ImageBackground>
      
        </View>
      ) :(
        <View style={{padding: 5}}>
            <Text style={{textAlign: "center", fontSize: 20}}>Jelenleg nincs partnered :c</Text>
            
        </View>
      );
  
};

export default ChatList

const styles = StyleSheet.create({
  header:{
    height: "25%",
    backgroundColor: "#cbf3f5",
  },
  linear:{
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  greetings:{
    marginTop: '10%',
    fontSize: 15,
    padding: 10,
    fontWeight: "bold",
    opacity: 0.5,
  },
  greeterUser:{
    marginLeft: '4%',
    fontSize: 20,
    fontWeight: "bold",
  },
  container:{
    flex: 1,
  },
  greeterImg:{
    width: 60,
    height:60,
    borderRadius: 100,
    marginLeft: "80%",
    marginBottom: "40%",
  },
  messageContainer:{
    backgroundColor: "white",
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
  }
})