import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export function PostsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PostsScreen Screen</Text>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.navigate("Comments")}
      >
        <Text style={styles.linkTitle}>Go to comments</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.navigate("Map")}
      >
        <Text>Go to location</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 48,
    color: "#ca3131",
  },
});
