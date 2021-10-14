import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { StyleSheet, View, Button, Text, Image } from "react-native";

const IMG_URI =
  "https://www.thoughtco.com/thmb/C7RiS4QG5TXcBG2d_Sh9i4hFpg0=/3620x2036/smart/filters:no_upscale()/close-up-of-clothes-hanging-in-row-739240657-5a78b11f8e1b6e003715c0ec.jpg";

const HomeScreen = ({ route, navigation }) => {
  return (
    <View style={styles.homepage}>
      <View style={styles.homepage_body}>
        <Text style={styles.text}>
          Welcome to the Clothes Management App! Visit the About Page to see
          some more information, and the Manage Clothes page to add a new
          article of clothing!
        </Text>
        <Text style={styles.text}>
          <Text style={styles.text_bold}>Newest piece of clothing added:{" "}</Text>
          {(route.params && route.params.item_name) ||
            "Nothing new has been added recently! Visit the Manage Clothes page to add something!"}
        </Text>
        <Image style={styles.image} source={{ uri: IMG_URI }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  homepage: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    backgroundColor: "#C6E5CC"
  },
  homepage_header: {
    flex: 2,
    justifyContent: "space-evenly",
    alignItems: "center",
		backgroundColor: "#C6E5CC"
  },
  homepage_body: {
    display: "flex",
    flex: 8,
    alignItems: "center",
    justifyContent: "space-evenly",
		padding: 10
  },
	image: {
		width: "90%",
		height: "35%"
	},
	text: {
		fontSize: 20,
		fontFamily: "sans-serif-thin"
	},
	text_bold: {
		fontSize: 20,
		fontWeight: "bold"
	}
});

export default HomeScreen;
