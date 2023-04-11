import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { pallete } from "../../helpers/variables";
import { testDB } from "../../helpers/testDB";
import { PostItemAddFeatures } from "../../components/PostItemAddFeatures";

export function PostsScreen({ navigation }) {
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

      <TouchableOpacity
        style={styles.btnAddPost}
        activeOpacity={0.6}
        onPress={() => navigation.navigate("Create")}
      >
        <MaterialCommunityIcons name="plus" color={pallete.white} size={24} />
      </TouchableOpacity>

      <View>
        {testDB.map((data, index) => (
          <PostItemAddFeatures key={index} postData={data} />
        ))}
      </View>
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
