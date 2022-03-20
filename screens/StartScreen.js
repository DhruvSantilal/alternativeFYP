import React from 'react'
// import Background from '../components/Background'
// import Logo from '../components/Logo'
// import Header from '../components/Header'
// import Button from '../components/Button'
// import Paragraph from '../components/Paragraph'
import { KeyboardAvoidingView, Button,Text } from 'react-native';

export default function StartScreen({ navigation }) {
  return (
    
    <KeyboardAvoidingView>
      
      
      <Text>
        The easiest way to start with your amazing application.
      </Text>
      <Button
        title="Login"
        
        onPress={() => navigation.replace('LoginScreen')}
      >
        Login
      </Button>
      <Button
        title="Press Me"
        
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Sign Up
      </Button>
    </KeyboardAvoidingView>
  )
}
