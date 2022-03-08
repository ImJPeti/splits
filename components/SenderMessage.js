import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SenderMessage = ({message}) => {
  return (
    <View style={{
            backgroundColor: "purple",
            opacity: 1,
            borderRadius: 10,
            padding: 10,
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