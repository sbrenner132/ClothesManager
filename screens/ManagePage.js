import React from "react";
import { StyleSheet, View, Button, TextInput } from "react-native";

const ManageScreen = ({ navigation }) => {
  const DEFAULT = "Enter something...";

  const [item, setItem] = React.useState("");

  return (
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
        title="Submit"
        style={styles.submit_button}
        onPress={() => navigation.navigate("Home", { item_name: item })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  preferences: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    backgroundColor: "#C6E5CC",
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
  },
});

export default ManageScreen;
