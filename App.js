import { StatusBar } from 'expo-status-bar';
import * as React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from './screens/StartScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer style={styles.container} >
        <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}>
          <Stack.Screen  name="Start" component={StartScreen} />
          <Stack.Screen  name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
   
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:"red",

  },
});
