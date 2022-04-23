import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, FlatList, Image,  } from 'react-native'
import React,{useState} from 'react'
import tw from 'tailwind-react-native-classnames'
import {Icon} from "react-native-elements"
import {useNavigation} from "@react-navigation/native"

const data =[
    {
        id: "Cab-X-123",
        title: "CabX",
        multiplier: 1,
        image: "https://links.papareact.com/3pn",
        status: "Active",
    },
    {
        id: "Cab-L-456",
        title: "CabL",
        multiplier: 1.2,
        image: "https://links.papareact.com/5w8",
        status: "Deactive",
    }
]


const RideOptionsCard = () => {
    const navigation = useNavigation()
    const [selected, setSelected] =useState(null)


  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
        <View>
            <TouchableOpacity onPress={()=>navigation.navigate("navigateCard")} style={tw`absolute top-3 left-5 p-3 rounded-full`}>
                <Icon name='chevron-left' type='fontawesome'/>
            </TouchableOpacity>
            <Text style={tw`text-center py-5 text-xl`}>Select a Ride</Text>
        </View>

        <FlatList 
            data={data}
            keyExtractor={(item)=>item.id}
            renderItem={({item:{id, title, multiplier, image, status},item})=>(
                <TouchableOpacity style={tw`flex-row justify-between items-center px-10 ${id === selected?.id && "bg-gray-200"}`}
                onPress={()=>setSelected(item)}
                >
                    <Image 
                        style={{
                            width: 100,
                            height: 100,
                            resizeMode: "contain",
                        }}
                        source={{uri: image}}
                    />
                    
                    <View style={tw`-ml-6`}>
                        <Text style={tw`text-xl font-semibold`}>{title}</Text>
                        <Text>Travel time..</Text>
                        <Text style={tw`text-base text-green-800 ${status === "Deactive"? "text-red-800":"text-green-800"} `}>{status}</Text>
                    </View>
                    <Text style={tw`text-xl`}>99Ft</Text>
                    
                </TouchableOpacity>
            )}

        />
    </SafeAreaView>
  )
}

export default RideOptionsCard

const styles = StyleSheet.create({})