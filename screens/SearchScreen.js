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
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import uuid from 'react-native-uuid';
// const { v4: uuidv4 } = require('uuid');
// use uuidv4()

import axios from "axios";

const apiHeaders = {
  "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
  "x-rapidapi-key": "e1a04f8dc2mshabb4ed58208d983p1f67c4jsn730b5adbd4eb",
};

export default function SearchScreen({ navigation }) {
  const [receipeData, setReceipeData] = useState({
    results: [],
  });

  let nutritionDict = {};

  const [receipeNutritionData, setReceipeNutritionData] = useState({});

  const [receipeCalData, setReceipeCalData] = useState(0);

  const [recipeImageUri, setRecipeImageUri] = useState(
    "https://spoonacular.com/recipeImages/"
  );
  const [showFlatlist, setShowFlatlist] = useState(false);

  const [query, setQuery] = useState("noodles");
  // const [id, setID] = useState("479101");

  const [receipesLoaded, setReceipesLoaded] = useState(false);

  const getRecepiesComplex = () => {
    const numberOfRecepies = 4;

    const options = {
      method: "GET",
      url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/searchComplex",
      params: {
        number: numberOfRecepies,
      },
      headers: apiHeaders,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const handleRecepies = async () => {
    await getRecepies();
    await getRecepiesInformation();
  };

  const getRecepies = async () => {
    // const query = "noodles";
    const number = "2";

    const options = {
      method: "GET",
      url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search`,
      params: { query: query, number: number },
      headers: apiHeaders,
      transformResponse: [
        (data) => {
          // transform the response
          console.log(data);
          let jsonData = JSON.parse(data);
          console.log("This is json type", typeof jsonData);
          setRecipeImageUri(jsonData.baseUri);
          setReceipeData(jsonData);
          setReceipesLoaded(true);
        },
      ],
    };
    return axios(options);
  };

  const getRecepiesInformation = async () => {
    console.log("getting more information...");
    console.log(receipeData.results[0].id);
    console.log("cals:", receipeCalData);
    for (let i = 0; i <= receipeData.results.length; i++) {
      let rid = receipeData.results[i].id;
      await getNutritionInformation(rid);
      console.log("This is the rid", receipeCalData);
      // nutritionDict
      // console.log(nutritionDict);
    }
  };

  const getNutritionInformation = async (id) => {
    const options = {
      method: "GET",
      url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`,
      params: { includeNutrition: "true" },
      headers: apiHeaders,
    };

    axios(options).then((data) => {
      console.log("______________________________________________________");
      console.log(data.data.nutrition.nutrients[0].amount);
      setReceipeCalData(data.data.nutrition.nutrients[0].amount);
    });
    // setReceipeCalData(results.data.nutrition.nutrients[0].amount);
    // return (
    //   results.data.nutrition.nutrients[0].amount +
    //   results.data.nutrition.nutrients[0].unit
    // );
  };

  const renderNoReceipes = () => {
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <Text style={styles.textSearchbar}>Search Your Favourite Food</Text>
        <View style={styles.searchbarContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setQuery}
            placeholder="e.g noodles"
          />
          <TouchableOpacity onPress={handleRecepies} style={styles.button}>
            <Text style={styles.buttonText}>Search </Text>
          </TouchableOpacity>
        </View>
        <Footer />
      </SafeAreaView>
    );
  };

  const renderReceipes = () => {
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <Text style={styles.textSearchbar}>Search Your Favourite Food</Text>
        <View style={styles.searchbarContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setQuery}
            placeholder="e.g noodles"
          />
          <TouchableOpacity onPress={handleRecepies} style={styles.button}>
            <Text style={styles.buttonText}>Search </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sampleView}>
          {/* <Text>{JSON.stringify(receipeData.results)}</Text> */}

          <FlatList
            data={receipeData.results}
            keyExtractor={(item) => item.id}
            style={styles.flatlistStyle}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate("Recipe", { item })}
                style={styles.flatlistView}
              >
                <Text style={styles.textTitle}>{item.title}</Text>

                <Image
                  style={styles.img}
                  source={{ uri: recipeImageUri + item.image }}
                />
                <Text style={styles.text}>{"Calories: " + receipeCalData}</Text>
                {/* <Text style={styles.text}>{`${getRecepiesNutrition(
                item.id
              )}`}</Text> */}

                <Text style={styles.text}>
                  {"Time: " + item.readyInMinutes + " mins"}
                </Text>
                <Text style={styles.text}>{"Servings: " + item.servings}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <Footer />
      </SafeAreaView>
    );
  };

  const render = () => {
    if (receipesLoaded) {
      return renderReceipes();
    } else {
      return renderNoReceipes();
    }
  };

  return render();
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
