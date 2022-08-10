import {
  View,
  Text,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ViewComponent,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import { db } from "../firebase";
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  query,
  getDocs,
  where,
  getDoc,
  serverTimestamp,
} from "@firebase/firestore";
import generateId from "../lib/generateId";
import {AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,} from "expo-ads-admob";
//IOS HOME: ca-app-pub-3666417548845300/2874153739
//IOS CHAT: ca-app-pub-3666417548845300/3590191805

//ADROID HOME: ca-app-pub-3666417548845300/3777894065
//ADROIND CHAT: ca-app-pub-3666417548845300/1890097326

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const swipeRef = useRef(null);


  function splitName(){
    let splitted = user.displayName.split(" ")
    let LastName = splitted[1];

    return LastName;
}

  useLayoutEffect(
    () =>
      onSnapshot(doc(db, "users", user.uid), (snapshot) => {
        if (!snapshot.exists()) {
          navigation.navigate("Modal");
        }
      }),
    []
  );

  useEffect(() => {
    let unsub;

    const fetchCards = async () => {
      const passes = await getDocs(
        collection(db, "users", user.uid, "passes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      const swipes = await getDocs(
        collection(db, "users", user.uid, "swipes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      const passedUserIds = passes.length > 0 ? passes : ["test"];
      const swipedUserIds = swipes.length > 0 ? swipes : ["test"];

      unsub = onSnapshot(
        query(
          collection(db, "users"),
          where("id", "not-in", [...passedUserIds, ...swipedUserIds])
        ),
        (snapshot) => {
          setProfiles(
            snapshot.docs
              .filter((doc) => doc.id !== user.uid)
              .map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
          );
        }
      );
    };

    fetchCards();
    return unsub;
  }, [db]);

  const swipeLeft = async (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];
    console.log(`you swiped pass on ${userSwiped.displayName}`);

    setDoc(doc(db, "users", user.uid, "passes", userSwiped.id), userSwiped);
  };

  const swipeRight = async (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];
    const loggedProfile = await (
      await getDoc(doc(db, "users", user.uid))
    ).data();

    //Megnézzük, hogy a felhasználó jobbra húzott-e
    getDoc(doc(db, "users", userSwiped.id, "swipes", user.uid)).then(
      (DocumentSnapshot) => {
        if (DocumentSnapshot.exists()) {
          //Create MATCH
          console.log(
            `hooraay, you MATCHED with ${userSwiped.fname} ${userSwiped.lname}`
          );
          setDoc(
            doc(db, "users", user.uid, "swipes", userSwiped.id),
            userSwiped
          );

          setDoc(doc(db, "matches", generateId(user.uid, userSwiped.id)), {
            users: {
              [user.uid]: loggedProfile,
              [userSwiped.id]: userSwiped,
            },
            usersMatched: [user.uid, userSwiped.id],
            timestamp: serverTimestamp(),
          });

          navigation.navigate("Match", {
            loggedProfile,
            userSwiped,
          });
        } else {
          console.log(`You swiped on ${userSwiped.displayName}`);
          setDoc(
            doc(db, "users", user.uid, "swipes", userSwiped.id),
            userSwiped
          );
        }
      }
    );
  };

  return (
    <SafeAreaView style={styles.SafeAreaView}>  

      <View style={{flexDirection: "row", alignItems: "center", marginLeft: "5%"}}>
        <Image style={{width: 65, height: 65, borderRadius: 100}} source={{uri: user.photoURL}}/>
        <Text style={{alignContent: "center", alignItems: "center", marginLeft: "4%", fontSize: 20}}>Hi, </Text>
        <Text style={{fontWeight: "bold", fontSize: 20}}>{splitName()}</Text>
      </View>


      {/* Card */}
      <View style={{flex: 1, height: 160, top: 0, }}>
        <Swiper
          ref={swipeRef}
          cards={profiles}
          containerStyle={{ backgroundColor: "transparent" }}
          stackSize={1}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          onSwipedLeft={(cardIndex) => {
            console.log("SWIPE PASS");
            swipeLeft(cardIndex);
          }}
          onSwipedRight={(cardIndex) => {
            console.log("SWIPE MATCH");
            swipeRight(cardIndex);
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
            },
          }}
          renderCard={(card) =>
            card ? (
              <View key={card.id} style={styles.SwiperCard}>
                <Image style={styles.CardImg} source={{ uri: card.photoURL }} />
                <View style={styles.details}>
                  <View>
                    <Text style={styles.name}>
                      {card.fname} {card.lname}
                    </Text>
                    <Text
                      style={{ paddingRight: 13, padding: 10, fontSize: 18, bottom: 5, }}
                    >
                      {card.job}
                    </Text>
                  </View>
                  <Text style={styles.age}>{card.age}</Text>
                  <Text style={styles.location}>
                   {" "}
                    {card.place}
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.SwiperCard}>
                <Text
                  style={{
                    fontWeight: "bold",
                    paddingBottom: 2,
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "auto",
                    marginBottom: "auto",
                  }}
                >
                  No more profiles
                </Text>
                <Image
                  style={styles.noMore}
                  height={100}
                  width={100}
                  source={{ uri: "https://links.papareact.com/6gb" }}
                />
              </View>
            )
          }
        />
      </View>
      
  {/*FOOTER NAV*/}
  <View style={styles.View}>
        <TouchableOpacity
          style={styles.TouchableOpacity}
          onPress={() => navigation.navigate("MyProfile")}
        >
          <Ionicons name="ios-person" size={40} color="#273c5a"/>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={()=>navigation.navigate("Cab")}
        >
          <Ionicons name="car-sport-sharp" size={40} color="#273c5a"/>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.chatBubble}
          onPress={() => navigation.navigate("Chat")}
        >
          <Ionicons name="chatbubble-sharp" size={40} color="#273c5a"/>
        </TouchableOpacity>
      </View>
      {/* End FOOTER NAV*/}

    </SafeAreaView>
     /* { 
     <View style={styles.bottomnav}>
            <TouchableOpacity style={styles.nop}
              onPress={()=>swipeRef.current.swipeLeft()}
            >
              
              <Entypo name='cross'size={27} color='#a83232'/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.yep}
              onPress={()=>swipeRef.current.swipeRight()}
            >
              <AntDesign name='heart' size={27} color='#32a852' />
            </TouchableOpacity>
     </View>
  }*/
     
  );
};

export default HomeScreen;

//Sytelsheet

const styles = StyleSheet.create({
  profileimg: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 100,
    marginLeft: "auto",
    marginRight: "auto",
    top: 3,
    alignItems: 'center',
    padding: 5,
  },
  TouchableOpacity: {
    position: "absolute",
    left: 5,
    top: 3,
  },
 
  View: {
    alignItems: "center",
    position: "relative",
    alignContent: "center",
    padding: 5,
    top: 0,
    backgroundColor: "white",
    height: "8%",
    marginLeft: "auto",
    marginRight: "auto",
    borderBottomColor: "black",
    borderTopColor: "black",
    width: "50%",
    borderRadius: 20,
    marginBottom: "5%",
    shadowColor: "grey",
    shadowOffset:{width:0, height: 2},
    shadowOpacity: 2,
    shadowRadius: 2,
  },
  chatBubble: {
    position: "absolute",
    right: 3,
    marginLeft: "auto",
    marginRight: "auto",
    top: 3,
    alignItems: "center",
    padding: 1,
  },
  SwiperCard: {
    backgroundColor: "white",
    height: 430,
    top: 0,
    borderRadius: 15,
    position: "relative",
    shadowColor: "#000",
    width: "100%",
    marginRight: "auto",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  SafeAreaView: {
    flex: 1,
    backgroundColor: "white",
    height: '100%',
  },
  CardImg: {
    flex: 1,
    resizeMode: "cover",
    borderRadius: 15,
    height: "100%",
    top: 0,
  },
  name: {
    fontSize: 22,
    padding: 10,
    fontWeight: "bold",
  },
  age: {
    right: 0,
    textAlign: "right",
    position: "absolute",
    padding: 10,
    fontSize: 22,
    fontWeight: "bold",
  },
  location: {
    right: 0,
    textAlign: "right",
    position: "absolute",
    top: "55%",
    padding: 10,
    fontSize: 15,
  },
  details: {
    position: "absolute",
    bottom: 2.5,
    backgroundColor: "white",
    height: 80,
    width: "90%",
    marginLeft: "5%",
    borderRadius: 15,
    flexDirection: "row",
    textAlign: "center",
    shadowColor: "grey",
    shadowOffset:{width:0, height: 2},
    shadowOpacity: 2,
    shadowRadius: 2,
  },
  bottomnav: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingBottom: 25,
  },
  yep: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(2, 166, 4, 0.41)",
    padding: 15,
    borderRadius: 100,
  },
  nop: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(224, 5, 5, 0.41)",
    padding: 15,
    borderRadius: 100,
  },
  noMore: {
    height: "20%",
    width: "100%",
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: "auto",
    marginRight: "auto",
  },
});
