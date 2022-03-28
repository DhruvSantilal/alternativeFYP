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
  ScrollView,
  SearchBar,
} from "react-native";
import Header from "../components/Header";
import axios from "axios";
import Footer from "./../components/Footer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function RecipeScreen({ route, navigation }) {
  const { item } = route.params;
  const [receipeNutritionData, setReceipeNutritionData] = useState({});
  const [receipeNutritionDataOnly, setReceipeNutritionDataOnly] = useState({});
  const [recipeImageUri, setRecipeImageUri] = useState(
    "https://spoonacular.com/recipeImages/"
  );
  const [showFlatlist, setShowFlatlist] = useState(false);
  const [id, setID] = useState(item.id);
  const [query, setQuery] = useState("noodles");

  const [receipesLoaded, setReceipesLoaded] = useState(false);

  //   getting the recipe info
  useEffect(() => {
    getRecepiesInformation();
  }, []);

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
          setReceipesLoaded(true);
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

  const renderNoReceipes = () => {
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <Text style={styles.textSearchbar}>No receipes...</Text>

        <Footer style={styles.footer} />
      </SafeAreaView>
    );
  };

  const getHealthScoreColour = (score) => {
    if (score < 30) {
      return "red";
    } else if (score >= 30 && score <= 70) {
      return "orange";
    } else {
      return "green";
    }
  };

  const getIngredients = (ingredientsList) => {
    console.log(ingredientsList.length);
    return (
      <View>
        {ingredientsList.map((ingredient) => {
          return (
            <View style={{ flex: 1, flexDirection: "row", width: "100%" }}>
              <Text style={{ fontSize: 20 }}>{ingredient.original}</Text>
            </View>
          );
        })}
      </View>
    );
  };

  const renderNutritionItem = (itemName, itemData) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          width: "100%",
          borderBottomColor: "black",
          borderBottomWidth: 1,
        }}
      >
        <Text
          style={{
            textAlign: "left",
            fontSize: 20,
            fontWeight: "bold",
            padding: 3,
            width: "50%",
          }}
        >
          {itemName}
        </Text>
        <Text
          style={{
            textAlign: "right",
            fontSize: 20,
            width: "50%",
          }}
        >
          {itemData.amount + itemData.unit}
        </Text>
      </View>
    );
  };

  const renderReceipes = () => {
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <Text style={styles.textSearchbar}>Results for your food:</Text>
        <ScrollView>
          <View style={{ margin: 5 }}>
            <Text style={styles.infoTextTitle}>
              {receipeNutritionData.title}
            </Text>
            <Image
              style={styles.img}
              source={{ uri: receipeNutritionData.image }}
            />
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                width: "100%",
                borderBottomColor: "black",
                borderBottomWidth: 1,
              }}
            >
              <Text style={{ fontSize: 40, fontWeight: "500" }}>
                Nutrition Facts
              </Text>
            </View>
            <View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    textAlign: "left",
                    fontSize: 30,
                    width: "50%",
                    fontWeight: "bold",
                  }}
                >
                  {"Healthscore"}
                </Text>
                <Text
                  style={{
                    textAlign: "right",
                    width: "50%",
                    fontSize: 30,
                    color: getHealthScoreColour(
                      receipeNutritionData.healthScore
                    ),
                  }}
                >
                  {receipeNutritionData.healthScore}
                </Text>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  width: "100%",
                  borderBottomColor: "black",
                  borderTopColor: "black",
                  borderBottomWidth: 5,
                  borderTopWidth: 10,
                }}
              >
                <Text
                  style={{
                    textAlign: "left",
                    fontSize: 30,
                    fontWeight: "bold",
                    padding: 3,
                    width: "50%",
                  }}
                >
                  {"Calories"}
                </Text>
                <Text
                  style={{
                    textAlign: "right",
                    fontSize: 30,
                    fontWeight: "bold",
                    width: "50%",
                  }}
                >
                  {receipeNutritionData.nutrition.nutrients[0].amount +
                    receipeNutritionData.nutrition.nutrients[0].unit}
                </Text>
              </View>
              {renderNutritionItem(
                "Total Carbohydrates",
                receipeNutritionData.nutrition.nutrients[3]
              )}

              {renderNutritionItem(
                "Total Fats",
                receipeNutritionData.nutrition.nutrients[2]
              )}

              {renderNutritionItem(
                "Protein",
                receipeNutritionData.nutrition.nutrients[8]
              )}

              {renderNutritionItem(
                "Fiber",
                receipeNutritionData.nutrition.nutrients[16]
              )}

              {renderNutritionItem(
                "Sugar",
                receipeNutritionData.nutrition.nutrients[5]
              )}

              {renderNutritionItem(
                "Sodium",
                receipeNutritionData.nutrition.nutrients[7]
              )}
            </View>
            <View>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: "bold",
                  borderBottomColor: "black",
                  borderBottomWidth: 2,
                }}
              >
                Ingredients
              </Text>
              {getIngredients(receipeNutritionData.extendedIngredients)}
            </View>

            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                borderTopColor: "black",
                borderBottomColor: "black",
                borderBottomWidth: 2,
                borderTopWidth: 5,
              }}
            >
              {"Instructions"}
            </Text>
            <Text style={{ fontSize: 20 }}>
              {receipeNutritionData.instructions}
            </Text>
            {/* <Text style={styles.infoText}>
              {"Summary: " + receipeNutritionData.summary}
            </Text> */}

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
        </ScrollView>

        <Footer style={styles.footer} />
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

    alignItems: "center",
  },
  img: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  infoText: {
    padding: 3,
    fontSize: 18,
  },
  infoTextTitle: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 35,
    fontWeight: "bold",
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
