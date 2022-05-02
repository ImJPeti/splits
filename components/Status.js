import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from "tailwind-react-native-classnames";

const data = [
    {
        id: "123",
        title: "Away",
        image: "https://i.imgur.com/bIUWjl6.png",
        
    },
    {
        id: "456",
        title: "At work",
        image: "https://i.imgur.com/6JXEjPW.png",
        
    },
    {
        id: "789",
        title: "Gaming",
        image: "https://i.imgur.com/e6lQHlP.png",
        
    },
]


const Status = () => {
  return (
   <FlatList 
   data = {data}
   horizontal
   scroll
   keyExtractor={(item)=>item.id}
   renderItem={({item})=>(
       <TouchableOpacity
       style={tw`p-2 pl-0 pr-0 pb-2 pt-2 bg-gray-100 m-2 w-40 rounded-full`}
       >
           <View>
           <Image
                style={{width: 50, height: 50, resizeMode: "contain", marginLeft: "auto", marginRight: "auto"}}
                 source={{ uri: item.image}}
                    />
               <Text style={tw`mt-2 text-lg font-semibold text-center`}>{item.title}</Text>
           </View>
       </TouchableOpacity>
   )}
    
   />
  )
}

export default Status

const styles = StyleSheet.create({
    status1: {
        backgroundColor: "#273c5a",
        width: "60%",
        borderRadius: 100,
        height: "100%",
        marginRight: "5%",
        padding: "10%",
        flexDirection: "row",
        alignContent: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.3,
        elevation: 13,
      },
      status2: {
        backgroundColor: "#067009",
        width: "60%",
        borderRadius: 100,
        height: "100%",
        padding: "10%",
        marginRight: "5%",
        flexDirection: "row",
        alignContent: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.3,
        elevation: 13,
      },
      status3: {
        backgroundColor: "#b8790d",
        width: "60%",
        borderRadius: 100,
        height: "100%",
        padding: "10%",
        flexDirection: "row",
        alignContent: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.3,
        elevation: 13,
      },
})