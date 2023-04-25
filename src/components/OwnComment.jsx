import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { testDB } from "../helpers/testDB";
import { pallete } from "../helpers/variables";

const ownComment = testDB[0].comments[1];

export function OwnComment({ comments }) {
  const { comment, userName, datePublacation } = comments;
  const { avatar } = ownComment; // TODO DELETE IT

  return (
    <View style={styles.commentInfoWrapper}>
      <View style={styles.avatarWrapper}>
        <Image style={styles.avatar} source={avatar} alt={userName} />
      </View>
      <View style={styles.commentWrapper}>
        <Text>{comment}</Text>
        <Text style={styles.textDate}>{datePublacation}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  commentInfoWrapper: {
    marginBottom: 32,
    width: "100%",
    flexDirection: "row-reverse",
  },
  avatarWrapper: {
    marginLeft: 32,
    width: 28,
  },
  commentWrapper: {
    flex: 1,
    padding: 16,
    backgroundColor: pallete.lightGray,
    borderTopLeftRadius: 8,
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
    textAlign: "left",
    fontSize: 10,
    lineHeight: 12,
    color: pallete.gray,
  },
});
