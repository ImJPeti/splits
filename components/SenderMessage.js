import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SenderMessage = ({message}) => {
  return (
    <View style={{
      backgroundColor: "#589dad",
      opacity: 0.9,
      borderBottomRightRadius: 0,
      borderRadius: 15,
      padding: 3,
      right: "20%",
      top: 40,
      marginVertical: 5,
      maxWidth: "76%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignSelf: "flex-start",
      marginLeft: "auto"
            }}>
      <Text style={{color: "black", fontSize: 17, padding: 10,}}>{message.message}</Text>
    </View>
  )
}

export default SenderMessage

const styles = StyleSheet.create({})