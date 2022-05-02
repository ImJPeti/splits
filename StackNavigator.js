import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import LoginScreen from './screens/LoginScreen';
import MyPofile from './screens/MyProfile';
import AddPostScreen from './screens/AddPostScreen';
import RegisterScreen from './screens/RegisterScreen';
import useAuth  from './hooks/useAuth';
import EditProfile from './screens/EditProfile';
import ModalScreen from './screens/ModalScreen';
import MatchedScreen from './screens/MatchedScreen';
import MessageScreen from './screens/MessageScreen';
import CabScreen from './screens/CabScreen';
import MapScreen from './screens/MapScreen';
import SuccessFullOrder from './screens/SuccessFullOrder';
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    const {user} = useAuth();

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
        {user ?  (
        <>
            <Stack.Group>
              <Stack.Screen name='Home' component={HomeScreen} />
              <Stack.Screen name='Chat' component={ChatScreen} />
              <Stack.Screen name='Message' component={MessageScreen} />
              <Stack.Screen name='MyProfile' component={MyPofile} />
              <Stack.Screen name="EditProfile" component={EditProfile} />
              <Stack.Screen name='Post' component={AddPostScreen} />
              <Stack.Screen name='Register' component={RegisterScreen} />
              <Stack.Screen name='Cab' component={CabScreen} />
              <Stack.Screen name='MapScreen' component={MapScreen} />
              <Stack.Screen name='SuccessFullOrder' component={SuccessFullOrder} />
          
            </Stack.Group>
            <Stack.Group screenOptions={ {presentation:'modal'} }>
            <Stack.Screen name='Modal' component={ModalScreen} />
            </Stack.Group>
            <Stack.Group screenOptions={ {presentation:'transparentModal'} }>
              <Stack.Screen name='Match' component={MatchedScreen} />
            </Stack.Group>
        </>
        ):(
            <Stack.Screen name='Login' component={LoginScreen} />

        )}
        </Stack.Navigator>
  );
};

export default StackNavigator;
