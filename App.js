import React from 'react';
import StackNavigator from './StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './hooks/useAuth';
import { Provider } from 'react-redux';
import { store } from './store';
import { KeyboardAvoidingView, Platform } from 'react-native';

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <AuthProvider>
        <KeyboardAvoidingView style={{flex: 1}}

          behavior={Platform.OS === "ios"? "padding":"height"}
        
        >
        <StackNavigator />
        </KeyboardAvoidingView>
      </AuthProvider>
    </NavigationContainer>
    </Provider>
  );
};


//stylesheet



