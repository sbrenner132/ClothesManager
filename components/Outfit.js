import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default ({ outfit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text>Top</Text>
        {outfit.top ? (
          <View>
            <Text>{outfit.top.name}</Text>
            <Image
              source={{ uri: outfit.top.img.uri }}
              style={{ width: 50, height: 100 }}
            />
          </View>
        ) : null}
      </View>
      <View style={styles.item}>
        <Text>Bottom</Text>
        {outfit.bottom ? (
          <View>
            <Text>{outfit.bottom.name}</Text>
            <Image
              source={{ uri: outfit.bottom.img.uri }}
              style={{ width: 50, height: 100 }}
            />
          </View>
        ) : null}
      </View>
      <View style={styles.item}>
        <Text>Headwear</Text>
        {outfit.headwear ? (
          <View>
            <Text>{outfit.headwear.name}</Text>
            <Image
              source={{ uri: outfit.headwear.img.uri }}
              style={{ width: 50, height: 100 }}
            />
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  item: {
    flexDirection: "column",
    flex: 3,
  },
});
