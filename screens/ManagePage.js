import React from "react";
import { StyleSheet, View, Button, TextInput, Text } from "react-native";

const ManageScreen = ({ navigation }) => {
  const DEFAULT = "Enter something...";

  const [item, setItem] = React.useState("");

  return (
    <View style={styles.container}>
      <View style={styles.label}>
        <Text style={styles.text}>Add a clothing item:</Text>
      </View>
      <View style={styles.preferences}>
        <TextInput
          value={item}
          placeholder={DEFAULT}
          style={styles.text_input}
          onFocus={() => setItem("")}
          onBlur={() => setItem(item || DEFAULT)}
          onChangeText={(text) => setItem(text)}
        />
        <Button
          title="Add"
          style={styles.submit_button}
          onPress={() => navigation.navigate("Home", { item_name: item })}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "#C6E5CC",
    height: "100%",
  },
  label: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 25,
  },
  preferences: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%"
  },
  text_input: {
    height: 50,
    width: "40%",
    backgroundColor: "#ffffff",
    paddingLeft: 15,
    paddingRight: 15,
  },
  submit_button: {
    width: "10%",
    height: "100%",
  },
  text: {
    fontWeight: "bold",
    fontFamily: "sans-serif-thin"
  },
});

export default ManageScreen;
