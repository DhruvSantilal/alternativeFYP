import React from 'react';
import { StyleSheet,Button , Text, View, TouchableOpacity, Image, SafeAreaView } from 'react-native';




export default function Header({title}) {
  return (
    <View style={styles.header}>
        <Text style={styles.text}>{title}</Text>
      
    </View>

  );
}


const styles = StyleSheet.create({
  header: {
    height: 60,
    padding:15,
    backgroundColor: 'green',
  },
  text:{
      color: 'black',
      fontSize: 23,
      textAlign:'center',
  }
});
