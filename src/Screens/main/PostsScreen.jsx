import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { pallete } from "../../helpers/variables";
import { testDB } from "../../helpers/testDB";
import { PostItemAddFeatures } from "../../components/PostItemAddFeatures";
import { PostItemAddPost } from "../../components/PostItemAddPost";

export function PostsScreen({ navigation, route }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params?.userPost) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
      const { userPost } = route.params;
      setPosts((prevState) => [...prevState, userPost]);
      console.log("userPosts ==>", posts);
    }
  }, [route.params?.userPost]);

  return (
    <View style={styles.container}>
      <View style={styles.userWrapper}>
        <Image
          style={styles.avatar}
          source={require("../../images/avatar.jpg")}
          alt="user avatar"
        />
        <View>
          <Text style={styles.userName}>Natali Romanova</Text>
          <Text style={styles.userEmail}>example@mail.com</Text>
        </View>
      </View>

      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <PostItemAddPost postData={item} navigation={navigation} />
        )}
        keyExtractor={(_, idx) => idx.toString()}
      />

      {/* <ScrollView>
        {posts.map((data, index) => (
          <PostItemAddPost
            key={index}
            postData={data}
            navigation={navigation}
          />
        ))}
      </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
  },
  avatar: {
    marginRight: 8,
    width: 60,
    height: 60,
    borderRadius: 16,
    overflow: "hidden",
  },
  userWrapper: {
    marginBottom: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    fontFamily: "Roboto-Bold",
    color: pallete.black,
    fontSize: 13,
    lineHeight: 15,
    fontWeight: "700",
  },
  userEmail: {
    fontFamily: "Roboto-Regular",
    color: "rgba(33, 33, 33, 0.8)",
    fontSize: 11,
    lineHeight: 13,
    fontWeight: "400",
  },
  btnAddPost: {
    position: "absolute",
    bottom: 0,
    left: "47%",
    zIndex: 1000,
    width: 60,

    height: 35,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: pallete.accent,
    borderRadius: 20,
  },
});
