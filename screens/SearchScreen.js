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
  TouchableWithoutFeedback,
  SearchBar,
} from "react-native";
import Header from "../components/Header";
import Footer from "./../components/Footer";

// import uuid from 'react-native-uuid';
// const { v4: uuidv4 } = require('uuid');
// use uuidv4()

import axios from "axios";

export default function SearchScreen({ navigation }) {
  const [receipeNutritionData, setReceipeNutritionData] = useState({
    results: [],
  });
  // const [receipeNutritionDataOnly, setReceipeNutritionDataOnly] = useState({});
  const [recipeImageUri, setRecipeImageUri] = useState(
    "https://spoonacular.com/recipeImages/"
  );
  const [showFlatlist, setShowFlatlist] = useState(false);

  const [query, setQuery] = useState("noodles");
  // const [id, setID] = useState("479101");

  const getRecepies = () => {
    // const query = "noodles";
    const number = "4";

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

  // const getRecepiesNutrition = () => {
  //   // const query = "noodles";

  //   const options = {
  //     method: "GET",
  //     url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/nutritionWidget.json`,
  //     headers: {
  //       "x-rapidapi-host":
  //         "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
  //       "x-rapidapi-key": "e1a04f8dc2mshabb4ed58208d983p1f67c4jsn730b5adbd4eb",
  //     },
  //     transformResponse: [
  //       (data) => {
  //         // transform the response
  //         console.log(data);
  //         let jsonData = JSON.parse(data);
  //         console.log("This is json type", typeof jsonData);
  //         setReceipeNutritionDataOnly(jsonData);
  //         console.log(receipeNutritionDataOnly);
  //       },
  //     ],
  //   };
  //   return axios(options);
  // };
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

      <View style={styles.sampleView}>
        {/* <Text>{JSON.stringify(receipeNutritionData.results)}</Text>  */}

        <FlatList
          data={receipeNutritionData.results}
          keyExtractor={(item) => item.id}
          style={styles.flatlistStyle}
          renderItem={({ item }) => (
            <View style={styles.flatlistView}>
              <Text style={styles.textTitle}>{item.title}</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Recipe", item.id)}
              >
                <Image
                  style={styles.img}
                  source={{ uri: recipeImageUri + item.image }}
                />
              </TouchableOpacity>
              <Text style={styles.text}>{"Calories: " + item.id}</Text>
              {/* <Text style={styles.text}>{`${getRecepiesNutrition(
                item.id
              )}`}</Text> */}

              <Text style={styles.text}>
                {"Time: " + item.readyInMinutes + " mins"}
              </Text>
              <Text style={styles.text}>{"Servings: " + item.servings}</Text>
            </View>
          )}
        />
      </View>
      <Footer />
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
  textTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "black",
    justifyContent: "center",
  },
  textSearchbar: {
    color: "black",
    paddingTop: 10,
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
    width: "100%",
    flexGrow: 1,
    flex: 1,
    paddingBottom: 5,
  },
  img: {
    width: "100%",
    height: 150,
  },
  flatlistStyle: {
    flexGrow: 1,
  },
  flatlistView: {
    paddingTop: 10,
    paddingBottom: 10,
  },
});
