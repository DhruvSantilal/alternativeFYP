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
  SearchBar,
} from "react-native";
import Header from "../components/Header";

// import uuid from 'react-native-uuid';
// const { v4: uuidv4 } = require('uuid');
// use uuidv4()

import axios from "axios";

export default function MainScreen({ navigation }) {
  const [receipeNutritionData, setReceipeNutritionData] = useState({
    results: [],
  });
  const [recipeImageUri, setRecipeImageUri] = useState(
    "https://spoonacular.com/recipeImages/"
  );
  const [showFlatlist, setShowFlatlist] = useState(false);

  const [query, setQuery] = useState("noodles");

  const getRecepies = () => {
    // const query = "noodles";
    const number = "1";

    const options = {
      method: "GET",
      url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search`,
      params: { query: query, number: number },
      headers: {
        "x-rapidapi-host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "x-rapidapi-key": "e1a04f8dc2mshabb4ed58208d983p1f67c4jsn730b5adbd4eb",
      },
      transformResponse: [
        (data) => {
          // transform the response
          console.log(data);
          let jsonData = JSON.parse(data);
          console.log("This is json type", typeof jsonData);
          setRecipeImageUri(jsonData.baseUri);
          setReceipeNutritionData(jsonData);
        },
      ],
    };
    return axios(options);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Text style={styles.textSearchbar}>Search Your Favorite Food</Text>
      <View style={styles.searchbarContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setQuery}
          placeholder="e.g noodles"
        />
        <TouchableOpacity onPress={getRecepies} style={styles.button}>
          <Text style={styles.buttonText}>Search </Text>
        </TouchableOpacity>
      </View>

      <View styles={styles.sampleView}>
        {/* <Text>{JSON.stringify(receipeNutritionData.results)}</Text>  */}

        <FlatList
          data={receipeNutritionData.results}
          keyExtractor={(item) => item.id}
          style={styles.flatlistStyle}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.text}>{item.title}</Text>

              <Text style={styles.text}>
                {"Time(m): " + item.readyInMinutes}
              </Text>

              <Text style={styles.text}>{"Servings: " + item.servings}</Text>
              <Image
                style={styles.img}
                source={{ uri: recipeImageUri + item.image }}
              />
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
    justifyContent: "space-between",
    // marginTop: 48,
  },
  text: {
    fontSize: 26,
    fontWeight: "bold",
    color: "black",
  },
  textSearchbar: {
    color: "black",
    paddingTop: 25,
    fontSize: 17,
    fontWeight: "500",
  },
  searchbarContainer: {
    marginTop: 30,
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20,
  },
  input: {
    marginRight: 10,
    borderWidth: 1,
    height: 50,
    width: "70%",
    borderColor: "#6B9080",
    paddingLeft: 20,
    borderRadius: 10,
  },
  button: {
    padding: 20,
    backgroundColor: "#6B9080",
    width: "30%",
    padding: 15,

    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  sampleView: {
    paddingTop: 50,
    backgroundColor: "green",
  },
  img: {
    width: "100%",
    height: 58,
  },
  flatlistStyle: {
    paddingTop: 30,
  },
});
