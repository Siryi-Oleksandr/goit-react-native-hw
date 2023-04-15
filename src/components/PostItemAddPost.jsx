import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { pallete } from "../helpers/variables";

// ! Main CODE

export function PostItemAddPost({ postData, navigation }) {
  const { photo, name, location } = postData;
  return (
    <View style={styles.postWrapper}>
      <Image style={styles.img} source={{ uri: photo }} alt={name} />
      <Text style={styles.postTitle}>{name}</Text>
      <View style={styles.postInfo}>
        <TouchableOpacity
          style={styles.postValues}
          activeOpacity={0.6}
          onPress={() => navigation.navigate("Comments")}
        >
          <Icon name="comment" size={18} color={pallete.gray} />
          <Text style={styles.postValuesText}>10</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.postValues}
          activeOpacity={0.6}
          onPress={() => navigation.navigate("Map")}
        >
          <Icon name="map-marker" size={18} color={pallete.gray} />
          <Text style={styles.postValuesText}>{location}</Text>
        </TouchableOpacity>
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
    height: 250,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: pallete.accent,
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
