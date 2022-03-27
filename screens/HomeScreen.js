import { useNavigation } from "@react-navigation/core";
import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../firebase";
import MainContainer from "./../MainContainer";
import Header from "./../components/Header";
import Footer from "./../components/Footer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function HomeScreen({ navigation }) {
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <Header />
      {/* <BackButton goBack={navigation.goBack} /> */}
      <View style={styles.itemContainer}>
        <Text style={styles.homeText}>Home:</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Search")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            PRESS HERE {"\n"}to start searching your favorite food
          </Text>
        </TouchableOpacity>

        <Text style={styles.loggedinText}>Logged in as:</Text>
        <Text style={styles.text}>Email: {auth.currentUser?.email}</Text>
        <TouchableOpacity onPress={handleSignOut} style={styles.logoutButton}>
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  homeText: {
    fontWeight: "700",
    fontSize: 30,
  },
  button: {
    backgroundColor: "#6B9080",
    width: "80%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    height: 100,
  },
  logoutButton: {
    backgroundColor: "#e63946",
    width: 200,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 90,
    height: 80,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  loggedinText: {
    marginTop: 200,
    fontWeight: "700",
    fontSize: 20,
  },
  text: {
    marginTop: 20,
  },
});
