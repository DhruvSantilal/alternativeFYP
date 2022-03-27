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
import axios from "axios";
import Footer from "./../components/Footer";

export default function RecipeScreen({ navigation }) {
  const [receipeNutritionData, setReceipeNutritionData] = useState({});
  const [receipeNutritionDataOnly, setReceipeNutritionDataOnly] = useState({});
  const [recipeImageUri, setRecipeImageUri] = useState(
    "https://spoonacular.com/recipeImages/"
  );
  const [showFlatlist, setShowFlatlist] = useState(false);

  const [query, setQuery] = useState("noodles");
  const [id, setID] = useState("479101");

  //   getting the recipe info
  const getRecepiesInformation = () => {
    // const query = "noodles";
    const number = "1";

    const options = {
      method: "GET",
      url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`,
      params: { includeNutrition: "true" },
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

  //get recipe nutrition
  const getRecepiesNutrition = () => {
    // const query = "noodles";

    const options = {
      method: "GET",
      url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/nutritionWidget.json`,
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
          setReceipeNutritionDataOnly(jsonData);
        },
      ],
    };
    return axios(options);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Text style={styles.textSearchbar}>Results for your food</Text>
      <View style={styles.searchbarContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setID}
          placeholder="e.g 125641"
        />
        <TouchableOpacity
          onPress={getRecepiesNutrition || getRecepiesInformation}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Search </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sampleView}>
        {/* <Text>{JSON.stringify(receipeNutritionData.results)}</Text>  */}
        <Text style={styles.infoText}>{"id: " + receipeNutritionData.id}</Text>
        <Text style={styles.infoText}>
          {"title: " + receipeNutritionData.title}
        </Text>
        <Text style={styles.infoText}>
          {"Calories: " + receipeNutritionDataOnly.calories}
        </Text>
        <Text style={styles.infoText}>
          {"healthscore: " + receipeNutritionData.healthScore}
        </Text>

        <Text style={styles.infoText}>
          {"carbs: " + receipeNutritionDataOnly.carbs}
        </Text>
        <Text style={styles.infoText}>
          {"Fat: " + receipeNutritionDataOnly.fat}
        </Text>
        <Text style={styles.infoText}>
          {"Protein: " + receipeNutritionDataOnly.protein}
        </Text>
        <Text style={styles.infoText}>
          {"Instructions: " + receipeNutritionData.instructions}
        </Text>

        {/* <FlatList
          data={receipeNutritionData}
          // keyExtractor={(item) => item.id}
          style={styles.flatlistStyle}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.text}>{item.title}</Text>
              <Text style={styles.text}>{item.id}</Text>

              <Text style={styles.text}>
                {"Time(m): " + item.readyInMinutes}
              </Text>

              <Text style={styles.text}>{"Servings: " + item.servings}</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Recipe")}>
                <Image
                  style={styles.img}
                  source={{ uri: recipeImageUri + item.image }}
                />
              </TouchableOpacity>
            </View>
          )}
        /> */}
      </View>
      <Footer style={styles.footer} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "space-between",
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
    marginTop: 10,
    justifyContent: "space-between",
    padding: 10,
  },
  img: {
    width: "100%",
    height: 58,
  },
  infoText: {
    padding: 3,
    fontSize: 18,
  },
  flatlistStyle: {
    paddingTop: 30,
    fontSize: 26,
    fontWeight: "bold",
    color: "black",
  },
  footer: {
    alignItems: "flex-end",
    alignSelf: "flex-end",
  },
});
