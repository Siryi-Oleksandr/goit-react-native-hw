import React from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import { testDB } from "../../helpers/testDB";
import { UserComment } from "../../components/UserComment";
import { OwnComment } from "../../components/OwnComment";

const commentInfo = testDB[0];

export function CommentsScreen() {
  const { img, title } = commentInfo;
  return (
    <View style={styles.container}>
      <ScrollView>
        <Image style={styles.img} source={img} alt={title} />

        <UserComment />
        <OwnComment />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  img: {
    marginTop: 32,
    marginBottom: 32,
    width: "100%",
    borderRadius: 16,
    overflow: "hidden",
  },
});
