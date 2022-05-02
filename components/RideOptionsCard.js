import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, FlatList, Image,  } from 'react-native'
import React,{useState} from 'react'
import tw from 'tailwind-react-native-classnames'
import {Icon} from "react-native-elements"
import {useNavigation} from "@react-navigation/native"
import { useSelector } from 'react-redux'
import { selectTravelInformation } from '../slices/navSlice'
import {GOOGLE_MAPS_APIKEY} from "@env"

const data =[
    {
        id: "Cab-P-123",
        title: "SPLTSPECS",
        multiplier: 1.3,
        image: "https://links.papareact.com/3pn",
        status: "Active",
    },
    {
        id: "Cab-P-456",
        title: "SPLTSPEST",
        multiplier: 0,
        image: "https://links.papareact.com/5w8",
        status: "Deactive",
    }
]





const RideOptionsCard = () => {
    const navigation = useNavigation()
    const [selected, setSelected] =useState(null)
    const travelTimeInformation = useSelector(selectTravelInformation);

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
        <View>
            <TouchableOpacity onPress={()=>navigation.navigate("navigateCard")} style={tw`absolute top-3 left-5 p-3 rounded-full`}>
                <Icon name='chevron-left' type='fontawesome'/>
            </TouchableOpacity>
            <Text style={tw`text-center py-5 text-xl`}>Select a Ride - {travelTimeInformation?.distance.text}</Text>
        </View>

        <FlatList 
            data={data}
            keyExtractor={(item)=>item.id}
            renderItem={({item:{id, title, multiplier, image, status},item})=>(
                <TouchableOpacity style={tw`flex-row justify-between items-center px-9 ${id === selected?.id && "bg-gray-200"}`}
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
                        <Text>{travelTimeInformation?.duration?.text} Travel Time</Text>
                        <Text style={tw`text-base text-green-800 ${status === "Deactive"? "text-red-800":"text-green-800"} `}>{status}</Text>
                    </View>
                    <Text style={tw`text-xl`}>

                        {new Intl.NumberFormat('hu', {
                            style: 'currency',
                            currency: 'HUF',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                        }).format(

                            (travelTimeInformation?.duration.value * multiplier)*5

                        )}

                    </Text>
                    
                </TouchableOpacity>
            )}
        />

        <View style={{bottom: 10}}>
            <TouchableOpacity
                onPress={()=>navigation.navigate("SuccessFullOrder")}
                disabled={!selected}
                style={tw`bg-black py-3 m-3 rounded-full ${!selected && "bg-gray-300"}`}>
                <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default RideOptionsCard

const styles = StyleSheet.create({})