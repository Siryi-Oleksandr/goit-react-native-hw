import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  Text,
} from "react-native";
import { testDB } from "../../helpers/testDB";
import { UserComment } from "../../components/UserComment";
import { OwnComment } from "../../components/OwnComment";

const commentInfo = testDB[0];

export function CommentsScreen() {
  const [comment, setComment] = useState("");

  const { img, title } = commentInfo;
  const commentHandler = (text) => setComment(text);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image style={styles.img} source={img} alt={title} />

        <UserComment />
        <OwnComment />
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={comment}
            placeholder="Comment"
            onChangeText={commentHandler}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.btnSendComment}
            onPress={() => Alert.alert(`Send comment "${comment}"`)}
          >
            <Text>Register</Text>
          </TouchableOpacity>
        </View>
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
  inputWrapper: {},
  btnSendComment: {},
});
