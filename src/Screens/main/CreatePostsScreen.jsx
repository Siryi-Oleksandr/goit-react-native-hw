import React from "react";
import { View, Text, StyleSheet } from "react-native";

export function CreatePostsScreen() {
  return (
    <View style={styles.container}>
      <Text>CreatePostsScreen Screen</Text>
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
