import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";

export default function ({ img, name }) {
  return (
    <View style={styles.item}>
      <View style={{paddingLeft: 20}}>
      <Image
        source={{ uri: img.uri }}
        style={{ width: 50, height: 100 }}
      />
      </View>
      <View style={styles.name}>
        <Text style={{fontSize: 20}}>{name}</Text>
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
