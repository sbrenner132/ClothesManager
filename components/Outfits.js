import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Button, FlatList } from "react-native";
import { generate } from "../utils/generator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Outfit from "./Outfit";

export default () => {
  const [outfits, setOutfits] = useState(undefined);
  const [changed, setChanged] = useState(false);

  const loadData = async () => {
    const outfits = JSON.parse(
      (await AsyncStorage.getItem("@outfits")) || "[]"
    );
    const refactored = outfits.map((outfit) => {
      return {
        id: outfit.id,
        ...outfit,
      };
    });
    // console.log(refactored.length)
    setOutfits(refactored);
    setChanged(false);
  };

  useEffect(() => {
    console.log("here");
    loadData();
  }, [changed]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontSize: 20 }}>Outfits</Text>
      </View>
      <View style={{flex: 1, alignItems: "center"}}>
        <View style={styles.button}>
          <Button
            title="Generate new outfit"
            onPress={async () => {
              const outfit = await generate();
              if (outfit) {
                const outfits = JSON.parse(
                  (await AsyncStorage.getItem("@outfits")) || "[]"
                );
                outfits.push(outfit);
                await AsyncStorage.setItem("@outfits", JSON.stringify(outfits));
              }
              setChanged(true);
            }}
          />
        </View>
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <View style={styles.button}>
          <Button
            title="Clear Outfits"
            onPress={async () => {
              await AsyncStorage.removeItem("@outfits");
              setChanged(true);
            }}
          />
        </View>
      </View>
      <View style={{ flex: 5 }}>
        <FlatList
          data={outfits}
          renderItem={(outfit) => {
            return (
              <View style={styles.outfit}>
                <Outfit outfit={outfit.item} />
              </View>
            );
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    flex: 7,
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    width: "50%",
    paddingBottom: 5,
  },
  outfit: {
    paddingBottom: 10,
    paddingLeft: 20,
  },
});
