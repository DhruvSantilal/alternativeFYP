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

export default function Footer() {
  const navigation = useNavigation();
  return (
    <View style={styles.Container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image
            style={styles.imageInformation}
            source={require("../asset/information.png")}
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
    backgroundColor: "#6B9080",
  },
  imageContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    justifyContent: "center",
  },
  imageInformation: {
    marginTop: 15,
    height: 40,
    width: 40,
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
