import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { pallete } from "../helpers/variables";

// ! Main CODE

export function PostItem({ postData }) {
  const { img, title, comments, likes, location } = postData;
  return (
    <View style={styles.postWrapper}>
      <Image style={styles.img} source={img} alt="user post picture" />
      <Text style={styles.postTitle}>{title}</Text>
      <View style={styles.postInfo}>
        <View style={styles.postValuesWrapper}>
          <View style={styles.postValues}>
            <Icon name="comment" size={18} color={pallete.accent} />
            <Text style={styles.postValuesText}>{comments}</Text>
          </View>

          <View style={{ ...styles.postValues, marginLeft: 24 }}>
            <Icon name="thumbs-o-up" size={18} color={pallete.accent} />
            <Text style={styles.postValuesText}>{likes}</Text>
          </View>
        </View>

        <View style={styles.postValues}>
          <Icon name="map-marker" size={20} color={pallete.gray} />
          <Text
            style={{
              ...styles.postValuesText,
              textDecorationLine: "underline",
            }}
          >
            {location}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  postWrapper: {
    width: "100%",
    marginBottom: 32,
  },
  img: {
    width: "100%",
    borderRadius: 16,
    overflow: "hidden",
  },
  postTitle: {
    marginTop: 8,
    fontFamily: "Roboto-Medium",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 19,
    color: pallete.black,
  },
  postInfo: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  postValues: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  postValuesText: {
    marginLeft: 8,
    fontSize: 16,
    lineHeight: 19,
    color: pallete.black,
  },
  postValuesWrapper: {
    flexDirection: "row",
  },
});
