import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";

export default function ({ item }) {
  return (
    <View style={styles.item}>
      <View style={{paddingLeft: 20}}>
      <Image
        source={{ uri: item.img.uri }}
        style={{ width: 50, height: 100 }}
      />
      </View>
      <View style={styles.name}>
        <Text style={{fontSize: 20}}>{item.name}</Text>
        <Text style={{fontSize: 10}}>{item.type}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  }, name: {
    justifyContent: "center",
    paddingRight: 10,
  }
});
