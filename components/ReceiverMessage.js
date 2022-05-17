import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ReceiverMessage = ({message}) => {
  return (
    <View style={{
            backgroundColor: "#92cc87",
            opacity: 0.9,
            borderTopLeftRadius: 0,
            borderRadius: 15,
            padding: 3,
            top: 40,
            marginVertical: 5,
            maxWidth: "76%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignSelf: "flex-start",
            }}
        >
            <Text style={{color: "black",fontSize: 17, padding: 10}}>{message.message}</Text>
    </View>
  )
}

export default ReceiverMessage

const styles = StyleSheet.create({})