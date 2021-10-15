import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { StyleSheet, View, Button, TextInput, Text, Image } from "react-native";

const ManageScreen = ({ navigation, route }) => {
  const DEFAULT = "Clothing Item Name";

  const [item, setItem] = useState("");

  const reset = () => {
    setItem("");
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.text}>Add a clothing item:</Text>
      </View>
      <View style={{ flex: 9, justifyContent: "space-evenly", alignItems: "center" }}>
        <TextInput
          value={item}
          placeholder={DEFAULT}
          style={styles.text_input}
          onFocus={() => setItem("")}
          onBlur={() => setItem(item || DEFAULT)}
          onChangeText={(text) => setItem(text)}
        />
        {route.params && route.params.image ? (
          <View style={{flex: 1, justifyContent: "space-evenly", alignItems: "center"}}>
            <Image
              style={{
                width: 100,
                height: 150,
              }}
              source={{ uri: route.params.image.uri }}
            />
            <Button
              title="retake"
              onPress={() => navigation.navigate("Images")}
            />
          </View>
        ) : (
          <Button
            title={"Choose Image"}
            onPress={() => {
              navigation.navigate("Images");
            }}
          />
        )}
        <Button
          title="Add"
          style={styles.submit_button}
          onPress={async () => {
            const items = JSON.parse(
              (await AsyncStorage.getItem("@items")) || "[]"
            );
            const new_item = { img: route.params.image, name: item };
            items.push(new_item);
            await AsyncStorage.setItem("@items", JSON.stringify(items));
            reset();
            navigation.navigate("Home", { item_name: item });
          }}
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
    flex: 1,
    paddingBottom: 30
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
    width: "100%",
  },
  text_input: {
    height: 50,
    width: "50%",
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
    fontFamily: "sans-serif-thin",
    fontSize: 25,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ManageScreen;
