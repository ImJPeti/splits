import React from 'react';
import StackNavigator from './StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './hooks/useAuth';
import { Provider } from 'react-redux';
import { store } from './store';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notification


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



