import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";

const ChatRowHeader = () => {
  return (
    <View style={styles.header}>
        <Ionicons name="chatbubbles-sharp" size={50} color="#273c5a" style={{marginLeft:'auto',marginRight:"auto"}}/>
    </View>
  )
}

export default ChatRowHeader

const styles = StyleSheet.create({})