import React, {useState, useContext, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import useAuth from "../hooks/useAuth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
    InputField,
    InputWrapper,
    AddImage,
    SubmitBtn,
    SubmitBtnText,
    StatusWrapper,
  } from '../assets/AddPost';
  import * as ImagePicker from "expo-image-picker";
  import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
  import {doc, setDoc, serverTimestamp, collection, addDoc, onSnapshot, query, updateDoc} from '@firebase/firestore';
  import {db,} from '../firebase';
  import {ref, getDownloadURL, uploadString, putFile} from "firebase/storage";
  import storage from "../firebase";
  

  const AddPostScreen = () => {

    const {user, logout} = useAuth(); 
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [url, setUrl] = useState();
    const [loading, setLoading] = useState(false);
    const CaptionRef =useRef(null);
    
    const uploadPost = async () => {
    const uploadTask = storage().ref().child(`/posts/`).putFile(fileObj.uri)
    uploadTask.on('state_changed',
      (snapshot)=>{
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if(progress == 10) alert('Image uploaded');
        
      },
      (error)=>{
        alert('Hiba');
      },
      ()=>{
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL)=>{
          console.log('File elérhető itt: ', downloadURL)
          setImage(downloadURL);
        })
      }
    );
    }
     

    useEffect(()=>{
        (async()=>{
            const GalleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasGalleryPermission(GalleryStatus.status==='granted');
        })();
    }, []);


  



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


    
  
    
    return (
      <View style={styles.container}  onPress={Keyboard.dismiss}>
         <TouchableOpacity onPress={Keyboard.dismiss} style={{width: "100%", height: "100%",}}>
        <InputWrapper>
          {image != null ? <AddImage source={{uri: image}} /> : null}

          <TextInput style={styles.adatok} 
          ref={CaptionRef}
          placeholder='Mi jár a fejedben?'
          placeholderTextColor="#666666"
          autoCorrect={true}
          //value={userData ? userData.fname : ''}
        
   
          />
          {uploading ? (
            <StatusWrapper>
              <Text>{transferred} % Completed!</Text>
              <ActivityIndicator size="large" color="#0000ff" />
            </StatusWrapper>
          ) : (
            <SubmitBtn onPress={uploadPost}>
              <SubmitBtnText>Post</SubmitBtnText>
            </SubmitBtn>
          )}
        </InputWrapper>
        </TouchableOpacity>
        

        <ActionButton buttonColor="#2e64e5">
          <ActionButton.Item
            buttonColor="#9b59b6"
            title="Take Photo"
             onPress={{}}
             >
            <Icon name="camera-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#3498db"
            title="Choose Photo"
            onPress={handlePickAvatar}>
            <Icon name="md-images-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  };
  
  export default AddPostScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: 'white',
    },
    adatok:{
      top: "10%",
      width: "100%", height: "20%",
      textAlign: "center",
       fontSize: 20,
      padding: 10,
    }
  });