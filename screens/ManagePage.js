import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Button,
  TextInput,
  Text,
  Image,
  KeyboardAvoidingView,
  Picker,
} from "react-native";

const ManageScreen = ({ navigation, route }) => {
  const DEFAULT = "Clothing Item Name";

  const [item, setItem] = useState("");
  const [type, setType] = useState("Bottom");
  const [submitted, setSubmitted] = useState(false);

  const reset = () => {
    setItem("");
    setSubmitted(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 0}
      enabled={Platform.OS === "ios" ? true : false}
    >
      <View style={{ flex: 1, paddingTop: 10 }}>
        <Text style={styles.text}>Add a clothing item:</Text>
      </View>
      <View
        style={{
          flex: 9,
          justifyContent: "space-evenly",
          alignItems: "center",
          height: "20%",
        }}
      >
        <View style={{ flex: 3, justifyContent: "space-evenly" }}>
          <TextInput
            value={item}
            placeholder={DEFAULT}
            style={styles.text_input}
            onChangeText={(text) => setItem(text)}
          />
          <Picker
            selectedValue={type}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, _itemIndex) => setType(itemValue)}
          >
            <Picker.Item label="Bottom" value="Bottom" />
            <Picker.Item label="Top" value="Top" />
            <Picker.Item label="Headwear" value="Headwear" />
          </Picker>
        </View>
        {(submitted ? route.params && route.params.image : false) ? (
          
          <View
            style={{
              flex: 3,
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
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
          <View style={{ flex: 3, justifyContent: "center" }}>
            <Button
              title={"Choose Image"}
              onPress={() => {
                navigation.navigate("Images");
                setSubmitted(true);
              }}
            />
          </View>
        )}
        <View style={{ flex: 3, justifyContent: "center" }}>
          <Button
            title="Add"
            onPress={async () => {
              const items = JSON.parse(
                (await AsyncStorage.getItem("@items")) || "[]"
              );
              const new_item = { img: route.params.image, name: item, type: type };
              items.push(new_item);
              await AsyncStorage.setItem("@items", JSON.stringify(items));
              reset();
              navigation.navigate("Home", { item_name: item });
            }}
            disabled={!(submitted ? route.params && route.params.image : false)}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    flex: 1,
    paddingBottom: 30,
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
    backgroundColor: "#ffffff",
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10,
    height: "30%",
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
