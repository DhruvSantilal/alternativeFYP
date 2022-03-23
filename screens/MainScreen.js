import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  SearchBar
} from "react-native";

// import uuid from 'react-native-uuid';
// const { v4: uuidv4 } = require('uuid');
// use uuidv4()


import axios from 'axios';

export default function MainScreen({ navigation }) {

    const[receipeNutritionData, setReceipeNutritionData] = useState({"results":[]});
    const[recipeImageUri, setRecipeImageUri] = useState("https://spoonacular.com/recipeImages/");
    const[showFlatlist, setShowFlatlist] = useState(false);
    
    const getRecepies = () => {
      const query = "noodles";
      const number ="2";

        const options = {
          method: 'GET',
          url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search`,
          params: {query: query, number: number},
          headers: {
            'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
            'x-rapidapi-key': 'e1a04f8dc2mshabb4ed58208d983p1f67c4jsn730b5adbd4eb'
          },
          transformResponse: [(data) => {
            // transform the response
            console.log(data);
            let jsonData = JSON.parse(data);
            console.log("This is json type",typeof(jsonData));
            setRecipeImageUri(jsonData.baseUri);
            setReceipeNutritionData(jsonData);
          }]
        }
      return axios(options);
    }

    return (
        <SafeAreaView style={styles.container}>
          
        <TouchableOpacity
            onPress={getRecepies}
            style={styles.button}
            
        >
            <Text style={styles.buttonText}>test api</Text>
        </TouchableOpacity>

        <View styles= {styles.sampleView}>
          {/* <Text>{JSON.stringify(receipeNutritionData.results)}</Text>  */}

          <FlatList
              data={receipeNutritionData.results}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                  <View>
                    <Text style={styles.text}>
                      {item.title}
                    </Text>

                    <Text style={styles.text}>
                      {"Time(m): "+item.readyInMinutes}
                    </Text>

                    <Text style={styles.text}>
                      {"Servings: "+item.servings}
                    </Text>
                    <Image
                      style={styles.img}
                      source={{uri: recipeImageUri+item.image}} />
                  </View>
              )}
          />

        </View>
    </SafeAreaView>
       
        
    );
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: "center",
        // marginTop: 48,
      },
    text:{
        fontSize: 26, 
        fontWeight: 'bold' ,
        color:"black",

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
      sampleView:{
        backgroundColor:"green",
        
      },
      img: {
        width: "100%",
        height: 58,
      },
    
  })

  
