import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";

const IMG_URI =
  "https://i.pinimg.com/736x/7d/bb/e3/7dbbe3886a77aecc8f75b73713f54bc9.jpg";

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>
          This application allows you to manage your clothes and, in later
          updates, will allows you to pick a random outfit and save it as a
          profile.
        </Text>
      </View>
      <View style={styles.body}>
        <Image style={styles.image} source={{ uri: IMG_URI }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#C6E5CC",
    paddingBottom: 20
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontFamily: "sans-serif-thin"
  },
  image: {
    width: "50%",
    height: "100%",
  },
});

export default AboutScreen;
