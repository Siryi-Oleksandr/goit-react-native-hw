import React from "react";
import { View, Text, StyleSheet } from "react-native";

export function MapScreen() {
  return (
    <View style={styles.container}>
      <Text>MapScreen Screen</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});