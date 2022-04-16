import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import tw from "tailwind-react-native-classnames";
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';


const data = [
    {
        id: "123",
        title: "Get a ride",
        image: "https://links.papareact.com/3pn",
        screen: "MapScreen",
    }
]


const NavOption = () => {
    const navigation = useNavigation();

  return (
   <FlatList 
        data = {data}
        horizontal
        keyExtractor={(item)=>item.id}
        renderItem={({item})=>(
            <TouchableOpacity
                style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}
                onPress={()=>navigation.navigate(item.screen)}
            >
                <View>
                    <Image
                        style={{width: 140, height: 140, resizeMode: "contain"}}
                        source={{ uri: item.image}}
                    />
                    <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
                    <Icon 
                        style={tw`p-2 bg-black rounded-full w-10 mt-4`}
                        name='arrowright'
                        color={'white'}
                        type='antdesign'
                    />
                </View>
            </TouchableOpacity>
        )}

   />
  )
}

export default NavOption

