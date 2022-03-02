import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ReceiverMessage = ({message}) => {
  return (
    <View style={{
            backgroundColor: "red",
            opacity: 0.60,
            borderTopLeftRadius: 0,
            borderRadius: 30,
            paddingHorizontal: 5,
            paddingVertical: 3,
            marginLeft: 20,
            top: 40,
            marginHorizontal: 3,
            marginVertical: 5,
            left: 15,
            flexDirection: "row",
            justifyContent: "space-between",
            alignSelf: "flex-start",
            }}
        >
                <Image
                    style={{
                        borderRadius: 100,
                        height: 40,
                        position: "absolute",
                        width: 40,
                        top:0,
                        left: -45,
                        }}
                    source={{uri: message.photoURL,}}
                />
            <Text style={{color: "white",fontSize: 17, padding: 10}}>{message.message}</Text>
    </View>
  )
}

export default ReceiverMessage

const styles = StyleSheet.create({})