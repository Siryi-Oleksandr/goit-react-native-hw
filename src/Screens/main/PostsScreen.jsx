import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { pallete } from "../../helpers/variables";
import { PostItemAddPost } from "../../components/PostItemAddPost";
import { db } from "../../firebase/config";
import { useAuth } from "../../hooks/useAuth";
import { usePosts } from "../../hooks/usePosts";

export function PostsScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const { userName, userEmail } = useAuth();

  const getAllPosts = async () => {
    const spredPosts = [];
    const querySnapshot = await getDocs(collection(db, "posts"));

    querySnapshot.forEach((doc) => {
      spredPosts.push({ ...doc.data(), id: doc.id });
    });

    setPosts(spredPosts);
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.userWrapper}>
        <Image
          style={styles.avatar}
          source={require("../../images/avatar.jpg")}
          alt="user avatar"
        />
        <View>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userEmail}>{userEmail}</Text>
        </View>
      </View>

      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <PostItemAddPost postData={item} navigation={navigation} />
        )}
        keyExtractor={(_, idx) => idx.toString()}
      />
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
