import { View, Text, Button, SafeAreaView, TouchableOpacity, Image, StyleSheet, ViewComponent } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import {AntDesign, Entypo, Ionicons} from '@expo/vector-icons';
import Swiper from 'react-native-deck-swiper';
import { db } from '../firebase';
import {collection, doc, onSnapshot, setDoc, query, getDocs, where, getDoc, serverTimestamp} from '@firebase/firestore';
import generateId from '../lib/generateId';




const HomeScreen = () => {
    const navigation = useNavigation();
    const { user, logout } =useAuth();
    const [profiles, setProfiles] =useState([]);
    const swipeRef = useRef(null);

    useLayoutEffect(
      ()=>
      onSnapshot(doc(db, 'users', user.uid), (snapshot)=>{
        if (!snapshot.exists()){
          navigation.navigate("Modal");
        }
      }),
      []
    );
  
useEffect(()=>{
  let unsub;

  const fetchCards=async () =>{

    const passes =await getDocs(collection(db, 'users', user.uid, 'passes')).then(
    (snapshot) => snapshot.docs.map((doc) => doc.id)
    );

    const swipes =await getDocs(collection(db, 'users', user.uid, 'passes')).then(
    (snapshot) => snapshot.docs.map((doc) => doc.id)
    );

    const passedUserIds = passes.length > 0 ? passes:['test'];
    const swipedUserIds = swipes.length > 0 ? swipes:['test'];

    unsub =onSnapshot(query(collection(db, 'users'), 
          where ('id', 'not-in', [...passedUserIds, ...swipedUserIds])),
      snapshot => {
      setProfiles(
        snapshot.docs.filter(doc => doc.id !==user.uid).map(doc =>({
          id: doc.id,
          ...doc.data()
        }))
        )
    })
  }

  fetchCards();
  return unsub;
}, [db])


const swipeLeft = async(cardIndex) =>{
  if(!profiles[cardIndex]) return;

  const userSwiped=profiles[cardIndex];
  console.log(`you swiped pass on ${userSwiped.displayName}`);
  
  setDoc(doc(db, "users", user.uid,"passes", userSwiped.id), userSwiped);
};

const swipeRight = async(cardIndex) =>{
  if(!profiles[cardIndex]) return;

  const userSwiped = profiles[cardIndex];
  const loggedProfile = await (
    await getDoc(doc(db, 'users', user.uid))
    ).data();

    //check if the user swiped on you
    getDoc(doc(db, 'users',userSwiped.id,'swipes', user.uid)).then(DocumentSnapshot =>{
      if(DocumentSnapshot.exists()){
        //Create MATCH
        console.log(`hooraay, you MATCHED with ${userSwiped.fname} ${userSwiped.lname}`);
        setDoc(doc(db,'users',user.uid,'swipes',userSwiped.id),
          userSwiped
        );

        setDoc(doc(db, "matches", generateId(user.uid, userSwiped.id)),{
          users: {
            [user.uid]: loggedProfile,
            [userSwiped.id]: userSwiped
          },
            usersMatched: [user.uid, userSwiped.id],
            timestamp: serverTimestamp(),
        });

        navigation.navigate('Match', {
          loggedProfile,
          userSwiped,
        });
        
      }else{

        console.log(`You swiped on ${userSwiped.displayName}`);
        setDoc(doc(db, "users", user.uid, "swipes", userSwiped.id),userSwiped);
      }
    }
  );
  
 
};

  return (
    <SafeAreaView style={styles.SafeAreaView}>
        {/*Header*/}
          <View style={styles.View}>
            <TouchableOpacity style={styles.TouchableOpacity} onPress={()=>navigation.navigate("EditProfile")}>
              <Image style={styles.profileimg} source={{uri: user.photoURL}} />
            </TouchableOpacity>
            <TouchableOpacity onPress={logout}>
                <Image style={styles.logo} source={require('../logo.png')} />
            </TouchableOpacity>

              <TouchableOpacity style={styles.chatBubble} onPress={()=> navigation.navigate('Chat')} >
                <Ionicons name="chatbubbles-sharp" size={40} color="#FF5864"/>
              </TouchableOpacity>
              </View>
        {/* End Header*/}

        {/* Card */}
      <View style={{flex: 1}}>
          <Swiper 
             ref={swipeRef}
             cards={profiles}
            containerStyle={{backgroundColor: "transparent"}}
            stackSize={5}
            cardIndex={0}
            animateCardOpacity
            verticalSwipe={false}
            onSwipedLeft={(cardIndex)=>{
              console.log("SWIPE PASS")
              swipeLeft(cardIndex)
            }}
            onSwipedRight={(cardIndex)=>{
              console.log("SWIPE MATCH")
              swipeRight(cardIndex)
            }}
            overlayLabels={{
              left: {
                title: "NOPE",
                style: {
                  label: {
                    textAlign: "right",
                    color: "red",
                  },
                },
              },
              right: {
                title: "MATCH",
                style: {
                  label: {
                    color: "#4DED30",
                  },
                },
              }
            }}
            renderCard ={(card) => card ?(
              <View
                 key={card.id}
                 style={styles.SwiperCard}
              >
                <Image
                 style={styles.CardImg}
                 source={{ uri: card.photoURL}}
                 />
                 <View style={styles.details}>
                      <View>
                        <Text style={styles.name}>
                          {card.fname} {card.lname}
                        </Text>
                        <Text style={{paddingRight: 13, paddingTop: 10, fontSize: 18}}>
                          {card.job}
                        </Text>
                        
                     </View>
                     <Text style={styles.age}>
                       {card.age}
                     </Text>
                     <Text style={styles.location}>
                          <Ionicons name='location-outline' size={18} color='#FF5864'/> {card.place}
                        </Text>
                 </View>
              </View>
            ):(
              <View
                  style={styles.SwiperCard}
             >
               <Text style={{fontWeight:"bold", paddingBottom: 2, marginLeft: "auto", marginRight: "auto", 
                  marginTop: "auto",
                  marginBottom: "auto",
                }}>No more profiles</Text>
               <Image
                  style={styles.noMore}
                  height={100}
                  width={100}
                  source={{uri: "https://links.papareact.com/6gb"}}
               />
              </View>  
            )}/>
     </View>

     <View style={styles.bottomnav}>
            <TouchableOpacity style={styles.nop}
              onPress={()=>swipeRef.current.swipeLeft()}
            >
              
              <Entypo name='cross'size={27} color='red'/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.yep}
              onPress={()=>swipeRef.current.swipeRight()}
            >
              <AntDesign name='heart' size={27} color='green'/>
            </TouchableOpacity>
     </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

//Sytelsheet

const styles = StyleSheet.create({
  profileimg:{
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
    top: 5,
    padding: 5,
  },
  TouchableOpacity:{
    position: 'absolute',
    left: 5,
    top: 3,
  },
  logo:{
      height: 130,
      width: 130,
      marginVertical: -35,
      marginLeft: 'auto',
      marginRight: 'auto',
  },
  View:{
    alignItems: 'center',
    position: 'relative',
    padding: 5,
  },
  chatBubble:{
    position: 'absolute',
    right: 3,
    marginLeft: 'auto',
    marginRight: 'auto',
    top: 5,
    padding: 5,
  },
  SwiperCard:{
    backgroundColor: 'white',
    height: 400,
    borderRadius: 15,
    position: "relative",
    shadowColor: "#000",
    shadowOffset:{
      width:0,
      height:1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  SafeAreaView:{
    flex: 1,
  },
  CardImg:{
    flex: 1,
    resizeMode: "cover",
    borderRadius: 15,
    top: 0,
  },
  name:{
    fontSize: 22,
    fontWeight: "bold",
  },
  age:{
    right: 0,
    textAlign: "right",
    position: "absolute",
    paddingTop: 10,
    paddingRight: 10,
    fontSize: 20,
    fontWeight: "bold"
  },
  location:{
    right: 0,
    textAlign: "right",
    position: "absolute",
    top: "65%",
    paddingRight: 10,
    fontSize: 15,
  },
  details:{
    position: "absolute",
    bottom: 0,
    backgroundColor: "white",
    height: 80,
    width: "100%",
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    flexDirection: "row",
    textAlign: "center",
    paddingTop: 10,
    paddingLeft: 10,
  },
  bottomnav:{
    flexDirection:"row",
    justifyContent: "space-evenly",
    paddingBottom: 25,
  },
  yep:{
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(2, 166, 4, 0.41)",
    padding: 15,
    borderRadius: 100,
  },
  nop:{
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'rgba(224, 5, 5, 0.41)',
    padding: 15,
    borderRadius: 100,
  },
  noMore:{
    height: "20%",
    width:"100%",
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: "auto",
    marginRight: "auto"
  }
})
