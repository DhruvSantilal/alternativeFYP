import { useNavigation } from '@react-navigation/core'
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { auth } from '../firebase'
import MainContainer from './../MainContainer';
import Header from './../components/Header';
import axios from 'axios';

export default function HomeScreen({ navigation }) {
//   const navigation = useNavigation()

  // const handleSignOut = () => {
  //   auth
  //     .signOut()
  //     .then(() => {
  //       navigation.replace("Login")
  //     })
  //     .catch(error => alert(error.message))
  // }
  // const KEY= "aaf270f497344f1694a60812ca5c507f";

  // const axiosExample = () => {
  //   const id = 1003464;
  //   const options = {
  //     method: 'get',
  //     url: `https://api.spoonacular.com/recipes/random`,
  //     headers: {
  //       'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
  //       'x-rapidapi-key': KEY
  //     },
  //     transformResponse: [(data) => {
  //       // transform the response
  //       console.log(data);
  //       return data;
  //     }]
  //   }
  //   axios(options);
  // }

  return (
      
    
            
            <View style={styles.container}>
            
                {/* <BackButton goBack={navigation.goBack} /> */}
            <Text>Email: {auth.currentUser?.email}</Text>
            <TouchableOpacity
                onPress={axiosExample}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Sign out</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Main')}
                style={styles.button}
            >
                <Text style={styles.buttonText}>MainScreen</Text>
            </TouchableOpacity>
            
            
            
            </View>
    

    
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
   button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})