import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import Map from '../components/Map'
import MapView from 'react-native-maps';
import Header from '../components/Header';

const MapScreen = () => {
  return (
    <SafeAreaView>
    <Header />
        <View style={tw`h-1/2`}>
          <Map />
        </View>

        <View style={tw`h-1/2`}></View>
    </SafeAreaView>
  )
}

export default MapScreen

const styles = StyleSheet.create({})