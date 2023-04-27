import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { testDB } from "../helpers/testDB";
import { pallete } from "../helpers/variables";

const userComment = testDB[0].comments[0]; // TODO only for testing

export function UserComment() {
  const { author, avatar, date, text } = userComment;
  return (
    <View style={styles.commentInfoWrapper}>
      <View style={styles.avatarWrapper}>
        <Image style={styles.avatar} source={avatar} alt={author} />
      </View>
      <View style={styles.commentWrapper}>
        <Text>{text}</Text>
        <Text style={styles.textDate}>{date}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  commentInfoWrapper: {
    marginBottom: 32,
    width: "100%",
    flexDirection: "row",
  },
  avatarWrapper: {
    marginRight: 32,
    width: 28,
  },
  commentWrapper: {
    flex: 1,
    padding: 16,
    backgroundColor: pallete.lightGray,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 20,
    overflow: "hidden",
  },
  textDate: {
    marginTop: 8,
    textAlign: "right",
    fontSize: 10,
    lineHeight: 12,
    color: pallete.gray,
  },
});
