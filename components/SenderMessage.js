import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SenderMessage = ({message}) => {
  return (
    <View style={{
            backgroundColor: "purple",
            opacity: 0.60,
            borderTopRightRadius: 0,
            borderTopLeftRadius: 30,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            paddingHorizontal: 5,
            paddingVertical: 5,
            marginHorizontal: 10,
            marginVertical: 10,
            top: 34,
            alignSelf: "flex-start",
            marginLeft: "auto",
            }}>
      <Text style={{color: "white", fontSize: 20}}>{message.message}</Text>
    </View>
  )
}

export default SenderMessage

const styles = StyleSheet.create({})