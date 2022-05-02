import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import firebase from 'firebase';
require("firebase/firestore");

class fire{

    constructor(){
        firebase.initializeApp(firebaseKeys);
    }

    addPost = async({text, localUri})=>{
        const remoteUri = await this.uploadPhotoAsync(localUri, `photos/${this.uid}/${Date.now()}`);

        return new Promise((res, rej)=>{
            this.firestore
            .collection("posts")
            this.addPost({
                text,
                uid: this.uid,
                timestamp: this.timestamp,
                image: remoteUri,
            })
            .then(ref=>{
                res(ref);
            })
            .catch(error =>{
                rej(error);
            });
        });
    };

    createUser = async user =>{
        
    }

    uploadPhotoAsync = async(uri, filename)=>{

        return new Promise(async(res, rej)=>{
            const response = await fetch(uri);
            const file = await response.blob();

            let upload = firebase
            .storage()
            .ref(filename)
            .put(file);

            upload.on(
                "state_changed",
                snapshot=> {},
                err=>{
                    ref(err);
                },
                async()=>{
                    const url = await upload.snapshot.ref.getDownloadURL();
                    rest(url);
                }
            )
        })
    }



render(){


 


  return (
    <View>
      <Text>fire</Text>
    </View>
  )

}
}
const styles = StyleSheet.create({})