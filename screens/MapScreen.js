import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import Map from '../components/Map'
import MapView from 'react-native-maps';
import Header from '../components/Header';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import navigateCard from '../components/navigateCard';
import RideOptionsCard from '../components/RideOptionsCard';
const Stack = createNativeStackNavigator();

const MapScreen = () => {
  return (
    <SafeAreaView>
    
        <View style={tw`h-1/2`}>
          <Map />
        </View>

        
        <View style={tw`h-1/2`}>
        <KeyboardAvoidingView
            behavior={Platform.OS=== "ios" ? "padding": "height"}
            style={{flex: 1}}
            keyboardVerticalOffset={10}
        >
          <Stack.Navigator>
            <Stack.Screen 
              name="NavigateCard"
              component={navigateCard}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen 
              name="RideOptionsCard"
              component={RideOptionsCard}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
          </KeyboardAvoidingView>
        </View>
        
    </SafeAreaView>
  )
}

export default MapScreen

const styles = StyleSheet.create({})