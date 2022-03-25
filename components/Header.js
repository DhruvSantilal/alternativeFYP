import * as React from "react";
import {
  StyleSheet,
  Button,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
// import { useNavigation } from "@react-navigation/core";
import { useNavigation } from "@react-navigation/native";

export default function Header() {
  const navigation = useNavigation();
  return (
    <View style={styles.Container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image
            style={styles.imageHome}
            source={require("../asset/home.png")}
          />
        </TouchableOpacity>

        <Image
          style={styles.imageLogo}
          source={require("../asset/alternative.png")}
        />
        <TouchableOpacity onPress={() => navigation.navigate("Main")}>
          <Image
            style={styles.imageSearch}
            source={require("../asset/search.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    width: "100%",
    height: 70,
    padding: 15,
    backgroundColor: "#6B9080",
  },
  imageContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageHome: {
    marginTop: 15,
    height: 27,
    width: 50,
    justifyContent: "center",
    alignContent: "center",
    resizeMode: "contain",
  },
  imageLogo: {
    marginTop: 15,
    height: 27,
    width: 200,
    justifyContent: "center",
    alignContent: "center",
    resizeMode: "contain",
  },
  imageSearch: {
    marginTop: 15,
    height: 27,
    width: 60,
    justifyContent: "center",
    alignContent: "center",
    resizeMode: "contain",
  },
});
