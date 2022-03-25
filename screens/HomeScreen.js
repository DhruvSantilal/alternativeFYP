import { useNavigation } from "@react-navigation/core";
import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../firebase";
import MainContainer from "./../MainContainer";
import Header from "./../components/Header";

export default function HomeScreen({ navigation }) {
  // const navigation = useNavigation()

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };
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
      <Header />
      {/* <BackButton goBack={navigation.goBack} /> */}
      <View style={styles.itemContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Main")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>MainScreen</Text>
        </TouchableOpacity>
        <Text style={styles.text}>Email: {auth.currentUser?.email}</Text>
        <TouchableOpacity onPress={handleSignOut} style={styles.button}>
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    marginTop: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#6B9080",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  text: {
    marginTop: 100,
  },
});
