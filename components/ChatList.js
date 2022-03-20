import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../firebase'
import useAuth from '../hooks/useAuth'
import ChatRow from '../components/ChatRow'
import ChatRowHeader from './ChatRowHeader'

const ChatList = () => {
    const[matches, setMatches] =useState([])
    const {user} = useAuth();
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

  


  return  matches.length > 0?(
      <View>
          <ChatRowHeader />
          <Text style={{color: "#273c5a", fontSize: 20, fontWeight: "bold", marginLeft: "2%", marginTop: "8%", marginBottom: "0%"}}>Új matchek</Text>
          <FlatList
            style={{width: "100%", height: "17%", marginTop: "-4%"}}
            inverted={-1}
            data={matches}
            horizontal={true}
            keyExtractor={(item)=>item.id}
            renderItem={({item})=><ChatRow matchDetails={item} />}
          />
          <Text  style={{color: "#273c5a", fontSize: 20, fontWeight: "bold", marginLeft: "2%", marginTop: "8%", marginBottom: "0%"}}>Üzenetek</Text>
        <FlatList
            style={{height: "100%"}}
            data={matches}
            horizontal={false}
            keyExtractor={(item)=>item.id}
            renderItem={({item})=> <ChatRow matchDetails={item} />}
        /> 
        </View>
      ) :(
        <View style={{padding: 5}}>
            <Text style={{textAlign: "center", fontSize: 20}}>Jelenleg nincs partnered :c</Text>
        </View>
      );
  
};

export default ChatList

const styles = StyleSheet.create({})