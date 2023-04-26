import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { pallete } from "../helpers/variables";
import { useState } from "react";
import { getNumberComents } from "../firebase/operation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleLike } from "../redux/posts/postsOperations";
import { useAuth } from "../hooks/useAuth";

// ! Main CODE

export function PostItemAddPost({ postData, navigation }) {
  const {
    // photo = null,
    // loadedPhoto = null,
    urlPhoto,
    name,
    locationName,
    location,
    documentId,
    // like,
  } = postData;
  const { userId } = useAuth();

  const [allComments, setAllComments] = useState(0);
  const [like, setLike] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getNumberComents(documentId).then((data) => setAllComments(data));
  }, []);

  const onToggleLike = () => {
    const LikeObj = {
      documentId,
      userId,
      like: !like,
    };

    dispatch(toggleLike(LikeObj));
    setLike((prev) => !prev);
  };

  return (
    <View style={styles.postWrapper}>
      <Image style={styles.img} source={{ uri: urlPhoto }} alt={name} />

      <Text style={styles.postTitle}>{name}</Text>
      <View style={styles.postInfo}>
        <View style={styles.postValues}>
          <TouchableOpacity
            style={styles.postValues}
            activeOpacity={0.6}
            onPress={() =>
              navigation.navigate({
                name: "Comments",
                params: { name, urlPhoto, documentId },
                merge: true,
              })
            }
          >
            <Icon name="comment" size={18} color={pallete.gray} />
            <Text style={styles.postValuesText}>{allComments}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.postValues, marginLeft: 24 }}
            onPress={onToggleLike}
          >
            {like ? (
              <Icon name="thumbs-up" size={18} color={pallete.accent} />
            ) : (
              <Icon name="thumbs-o-up" size={18} color={pallete.accent} />
            )}

            <Text style={styles.postValuesText}>24</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.postValues}
          activeOpacity={0.6}
          onPress={() =>
            navigation.navigate({
              name: "Map",
              params: { location },
              merge: true,
            })
          }
        >
          <Icon name="map-marker" size={18} color={pallete.gray} />
          <Text style={styles.postValuesText}>{locationName}</Text>
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
