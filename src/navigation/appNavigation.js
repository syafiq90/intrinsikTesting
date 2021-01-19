import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {View, TouchableOpacity, Text  } from 'react-native';
// React Native Library for Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Pages for Navigation
import LoginScreen from '../pages/LoginScreen';
import ChatScreen from '../pages/ChatScreen';


const Stack = createStackNavigator();

const handleClick = (props) =>{
console.log('props', props)
}

// Make the AppIndex available to other parts of the application for Navigating between screens
const AppStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName = "Login"
        screenOptions={{
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#FFFFFF',
            borderColor: '#5ec6c5',
          },
          headerTintColor: '#fff',
        }}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
