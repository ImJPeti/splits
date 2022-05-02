import { View, Text, Button, Image, Stylesheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';

import ChatList from '../components/ChatList';


const ChatScreen = () => {
  return (
    <SafeAreaView>
      <ChatList />
      <Header title="teszt"/>
    </SafeAreaView>
  );
};

export default ChatScreen;
