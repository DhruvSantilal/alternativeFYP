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

import Footer from "../components/Footer";

export default function CreateScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Text>This is a create recipes screen</Text>
      <Footer style={styles.footer} />
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
