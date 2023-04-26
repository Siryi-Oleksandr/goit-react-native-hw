import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { UserComment } from "../../components/UserComment";
import { OwnComment } from "../../components/OwnComment";
import { pallete } from "../../helpers/variables";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import {
  addComment,
  getComents,
  getNumberComents,
} from "../../redux/posts/postsOperations";
import { usePosts } from "../../hooks/usePosts";

export function CommentsScreen({ route }) {
  const [comment, setComment] = useState("");
  const { documentId, name, urlPhoto } = route.params;
  const { userName, userId } = useAuth();
  const { allComments, numberComments } = usePosts();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getComents(documentId));
  }, []);

  const commentHandler = (text) => setComment(text);

  const onSendComment = () => {
    const commentObj = {
      documentId,
      userName,
      userId,
      comment,
      datePublacation: Date.now(),
    };

    dispatch(addComment(commentObj));
    Keyboard.dismiss();
    setComment("");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image style={styles.img} source={{ uri: urlPhoto }} alt={name} />

        <FlatList
          data={allComments}
          renderItem={({ item }) => <OwnComment comments={item} />}
          keyExtractor={(item) => item.datePublacation}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={comment}
              placeholder="Comment..."
              onChangeText={commentHandler}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.btnSendComment}
              onPress={onSendComment}
            >
              <Icon name="arrow-up" size={15} color={pallete.white} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
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
    height: 250,
    borderRadius: 16,

    overflow: "hidden",
  },
  inputWrapper: {
    position: "relative",
  },
  input: {
    minHeight: 50,
    padding: 12,
    paddingRight: 50,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: pallete.gray,
    marginBottom: 10,
    backgroundColor: pallete.gray,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  btnSendComment: {
    position: "absolute",
    top: 8,
    right: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 34,
    height: 34,
    borderRadius: 18,
    backgroundColor: pallete.accent,
  },
});
