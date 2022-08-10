import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity,text, ImagePickerIOS, SafeAreaView, ScrollView, render, Button  } from 'react-native';
import React, {useState, useLayoutEffect, useEffect} from 'react';
import { useNavigation } from '@react-navigation/core';
import useAuth from '../hooks/useAuth';
import {db,  } from '../firebase';
import {doc, setDoc, serverTimestamp, collection,} from '@firebase/firestore';
import { Firestore } from 'firebase/firestore';
import * as ImagePicker from "expo-image-picker";
import {
  InputField,
  InputWrapper,
  AddImage,
  SubmitBtn,
  SubmitBtnText,
  StatusWrapper,
} from '../assets/AddPost';
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
export default ModalScreen =()=> {
  const navigation = useNavigation();
    const { user, logout } =useAuth();
    const [profiles, setProfiles] =useState([]);
    const [userData, setUserData] = useState(null);
    const [image, setImage] = useState(null);
    const [job, setJob] = useState(null);
    const [age, setAge] = useState(null);
    const [ageDay, setAgeDay] = useState(null);
    const [ageMonth, setAgeMonth] = useState(null);
    const [ageYear, setAgeYear] = useState(null);
    const [fname, setfname] = useState(null);
    const [lname, setLname] = useState(null);
    const [place, setPlace] = useState(null)



   
    const handleUpdate=()=>{
      setDoc(doc(db, 'users',user.uid), {
        id: user.uid,
        displayName: user.displayName,
        photoURL: image,
        job: job,
        ageDay: ageDay,
        ageMonth: ageMonth,
        ageYear: ageYear,
        fname: fname,
        place: place,
        lname: lname,
        timestamp: serverTimestamp()
      }).then(()=>{
        navigation.navigate('Home')
      }).catch((error)=>{
        alert(error.message);
      });
    };

    
      const handlePickAvatar=async()=>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1,
        }).then((image) => {
          console.log(image);
          const imageUri = Platform.OS === 'ios' ? image.uri : image.path;
          setImage(imageUri);
        });
    };
    
  


  return(
  <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
    <ScrollView
      style={styles.container}
      contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity onPress={handlePickAvatar} >
          <Image 
            source={{uri: image}}
            style={styles.avatar}
          />
            <View style={{left: "17%", bottom: "20%"}}>
              <Ionicons name="add-circle" size={40} color="black" />
            </View>
       </TouchableOpacity>
                            

       <View>
         <Text style={{opacity: 0.7, fontSize: 14, fontWeight: "bold", color: "grey", marginBottom: "5%"}}>Your Name</Text>
         <View style={{flexDirection: "row", marginBottom: "10%"}}>
           <View style={{left: 0}}>
                    <TextInput 
                      textAlign='center'
                      placeholder='First Name'
                      placeholderTextColor={"grey"}
                      style={{width: 150, borderBottomWidth: 1, top: 8, borderColor: "grey"}}
                      value={fname}
                      autoCorrect={true}
                      onChangeText={setfname}
                    />
            </View>
            <View style={{position: "absolute", right: 0}}>
                <TextInput 
                  textAlign='center'
                  placeholder='Last Name'
                  placeholderTextColor={"grey"}
                  style={{width: 150, left: 3, borderBottomWidth: 1, top: 8, borderColor: "grey"}}
                  value={lname}
                  autoCorrect={true}
                  onChangeText={setLname}
                />
            </View>
          </View>
          <Text style={{opacity: 0.7, fontSize: 14, fontWeight: "bold", color: "grey", marginBottom: "4%", marginTop: "5%"}}>Date of Birth</Text>
            <View style={{flexDirection: "row"}}> 
              <View style={styles.birthContainer}> 
                <TextInput
                  style={styles.birth}
                  textAlign='center'
                  placeholder='Day'
                  placeholderTextColor={"grey"}
                  value={ageDay}
                  keyboardType='numeric'
                  maxLength={2}
                  autoCorrect={false}
                  onChangeText={setAgeDay}
                />
              </View>
              <View style={styles.birthContainer}> 
                <TextInput 
                  style={styles.birth}
                  textAlign='center'
                  placeholder='Month'
                  
                  placeholderTextColor={'grey'}
                  value={ageMonth}
                  keyboardType='numeric'
                  maxLength={2}
                  autoCorrect={false}
                  onChangeText={setAgeMonth}
                />
              </View>
              <View style={styles.birthContainer}> 
                <TextInput
                  style={styles.birth}
                  textAlign='center'
                  placeholder='Year'
                  placeholderTextColor={"grey"}
                  value={ageYear}
                  keyboardType='numeric'
                  maxLength={4}
                  autoCorrect={false}
                  onChangeText={setAgeYear}
                />
              </View>
            </View>

            <Text style={{marginTop: 2}}>Work</Text>
            <TextInput style={styles.adatok} 
            value={job}
              autoCorrect={true}
              onChangeText={setJob}
            />
            <Text style={{marginTop: 2}}>Your Place</Text>
            <TextInput style={styles.adatok} 
            value={place}
              autoCorrect={true}
              onChangeText={setPlace}
            />
       </View>

       <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.btext}>Update profile</Text>
      </TouchableOpacity>


    <TouchableOpacity onPress={logout} style={{top: "10%",}}>
                <Text style={{bottom: 0,}}>Kijelentkezés</Text>
    </TouchableOpacity>
    </ScrollView>
    
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  adatok:{
    width: 300,
    left: "1%",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "grey"
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  userBtn: {
    borderColor: '#2e64e5',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: '#2e64e5',
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: 'center',
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  avatar:{
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: "#E1E2E6",
    marginTop: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  UpdateProfile:{
    marginTop: "4%",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    width: 250,
    elevation: 2,
    backgroundColor: "white",
  },
  btext:{
    fontSize: 17,
    lineHeight: 21,
    fontWeight: 'bold',
    textAlign: "center",
    letterSpacing: 1,
    color: 'black',
  },
  button:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: "3%",
    paddingHorizontal: 3,
    borderRadius: 25,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "4%",
    width: 250,
    elevation: 2,
    backgroundColor: "white",

  },
  birth:{
    width: 100,
    borderBottomWidth: 1,
    alignItems: "center",
    borderColor: "grey"
  },
  birthContainer:{
    alignItems: "center",
    position: "relative",
    alignContent: "center",
    padding: 5,
  }
});
