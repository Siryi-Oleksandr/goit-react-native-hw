import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Keyboard,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { pallete } from "../../helpers/variables";

export function CreatePostsScreen() {
  const [isLoadedPhoto, setIsLoadedPhoto] = useState(null);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [inputNameStyle, setInputNameStyle] = useState(styles.input);
  const [inputLocationStyle, setInputLocationStyle] = useState(styles.input);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const { width, height } = Dimensions.get("window");
  const orientation = "portrait"; // TODO

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardOpen(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardOpen(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const nameHandler = (text) => setName(text);
  const locationHandler = (text) => setLocation(text);

  const resetPublishForm = () => {
    setName("");
    setLocation("");
  };

  const onPublish = () => {
    const userCredentials = { name, location };
    Alert.alert("User post", `${name} + ${location}`);
    // navigation.navigate("somewhere");
    resetPublishForm();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View>
            <View
              style={{
                ...styles.imgWrapper,
                width: width - 32,
                minHeight: width * 0.5,
              }}
            >
              {isLoadedPhoto ? (
                <Image
                  style={styles.img}
                  source={require("../../images/nature-1.jpg")}
                  alt="user post picture"
                />
              ) : null}
            </View>

            {isLoadedPhoto ? (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setIsLoadedPhoto(false)}
              >
                <Text style={styles.editBtn}>Edit photo</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setIsLoadedPhoto(true)}
              >
                <Text style={styles.editBtn}>Add photo</Text>
              </TouchableOpacity>
            )}
            <TextInput
              style={inputNameStyle}
              value={name}
              onChangeText={nameHandler}
              placeholder="Description"
              onFocus={() =>
                setInputNameStyle({
                  ...styles.input,
                  ...styles.inputFocused,
                })
              }
              onBlur={() => setInputNameStyle(styles.input)}
            />
            <TextInput
              style={inputLocationStyle}
              value={location}
              onChangeText={locationHandler}
              placeholder="Location"
              onFocus={() =>
                setInputLocationStyle({
                  ...styles.input,
                  ...styles.inputFocused,
                })
              }
              onBlur={() => setInputLocationStyle(styles.input)}
            />

            <View style={{ display: isKeyboardOpen ? "none" : "flex" }}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  ...styles.btnRegister,
                  marginTop: orientation === "portrait" ? 32 : 10,
                }}
                onPress={onPublish}
              >
                <Text style={styles.btnTitle}>Publish</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
  },
  img: {
    width: "100%",
    borderRadius: 16,
    overflow: "hidden",
  },
  editBtn: {
    fontFamily: "Roboto-Regular",
    color: pallete.grey,
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "400",
  },
  imgWrapper: {
    marginTop: 32,
    marginBottom: 4,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: pallete.grey,
  },
  input: {
    marginTop: 16,
    width: "100%",
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: pallete.grey,
  },
  inputFocused: {
    borderBottomColor: pallete.accent,
  },
  btnRegister: {
    // marginTop: 43,
    padding: 12,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: pallete.accent,
    borderRadius: 100,
  },
  btnTitle: {
    fontFamily: "Roboto-Regular",
    color: pallete.white,
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
  },
});
