import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Text, Button } from "react-native";
import Item from "../components/Item";

export default function () {
  const [items, setItems] = useState([]);

  const loadData = async () => {
    const items = JSON.parse((await AsyncStorage.getItem("@items")) || "[]");
    const refactored = items.map((item) => {
      return {
        id: item.name,
        ...item,
      };
    });
    setItems(refactored);
  };

  useEffect(() => {
    loadData();
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Clothes Items Added</Text>
      </View>
      <View style={styles.button}>
        <Button title="Clear all" onPress={async () => {
          await AsyncStorage.removeItem("@items");
        }}/>
      </View>
      <View style={styles.body}>
        <FlatList
        //   contentContainerStyle={styles.list}
          data={items}
          renderItem={({ item }) => (
            <View style={{ paddingBottom: 10 }}>
              <Item item={item} />
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    flexDirection: "column",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
  },
  body: {
    flex: 9,
  },
  list: {
    justifyContent: "space-between",
  },
});
