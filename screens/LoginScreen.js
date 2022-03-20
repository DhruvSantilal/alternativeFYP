import { StyleSheet, Text, View, KeyboardAvoidingView,TextInput, Image,  TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/core'
import { styleProps } from 'react-native-web/dist/cjs/modules/forwardedProps'
import Header from '../components/Header';



export default function LoginScreen({navigation}) {

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')



useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Home")
      }
    })

    return unsubscribe
  }, [])

const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
      })
      .catch(error => alert(error.message))
  }

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
      })
      .catch(error => alert(error.message))
  }

  return (
     
          
      
    <KeyboardAvoidingView
      style={styles.container}
      behavior="height" enabled
    >
        {/* <Header style={styles.headerContainer} title={'Activity Log'} /> */}

        <View style={styles.logo}>
        <Image
            style={styles.image}
            source={require('../asset/alternative.png')}
            />
            <Text style={styles.text}>Search quick and nutritious alternative {'\n'} to your favorite foods</Text>
        </View>
        <View style={styles.inputContainer}>
            
            <TextInput
            placeholder="Email"
              value={email}
              onChangeText={text => setEmail(text)}
            style={styles.input}
            />
            <TextInput
            placeholder="Password"
              value={password}
              onChangeText={text => setPassword(text)}
            style={styles.input}
            secureTextEntry
            />
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity
            onPress={handleLogin}
            style={styles.button}
            >
            <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={handleSignUp}
            style={[styles.button, styles.buttonOutline]}
            >
            <Text style={[styles.buttonOutlineText, styles.buttonBackground]}>Register</Text>
            </TouchableOpacity>
        </View>
        
    </KeyboardAvoidingView>
  )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"#EAF4F4",
      },
      inputContainer: {
        width: '80%'
      },
      headerContainer: {
        margin:0,
        padding:0,
        justifyContent:"flex-start",
        height:100,
        width:100,
      },
      logo:{
        justifyContent: 'center',
        alignItems: 'center',
      },
      image:{
        // flex: 1,
        width: 350,
        height: 100,
        resizeMode: 'contain',
        alignItems:"center",
        

      },
      text:{
        textAlign: 'center',
        justifyContent:"center",
        alignItems: "center",
        marginBottom: 45,
        marginTop:10,
      },
      input: {
        color:"black",
        backgroundColor: '#6B9080',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
      },
      buttonContainer: {
        // flexDirection:'row',
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
      },
      button: {
        backgroundColor: '#FFFFFF',
        fontWeight:"normal",
        color:"black",
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
      },
      buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#6B9080',
        borderWidth: 2,
      },
      buttonText: {
        color: 'black',
        fontWeight: '700',
        fontSize: 16,
      },
      buttonOutlineText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
      },
      buttonBackground: {
        color: '#6B9080',
        fontWeight: '700',
        fontSize: 16,
      },
})