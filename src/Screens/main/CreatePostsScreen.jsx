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
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { pallete } from "../../helpers/variables";

export function CreatePostsScreen() {
  const [loadedPhoto, setLoadedPhoto] = useState(null);
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
    const userCredentials = { name, location, loadedPhoto };
    Alert.alert("User post", `${name} + ${location}`);
    // navigation.navigate("somewhere");
    resetPublishForm();
    setLoadedPhoto(null);
  };

  const isPostData = loadedPhoto && name;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <ScrollView>
            <View
              style={{
                ...styles.imgWrapper,
                width: width - 32,
                minHeight: width * 0.5,
              }}
            >
              {loadedPhoto ? (
                <Image
                  style={styles.img}
                  source={require("../../images/nature-1.jpg")}
                  alt="user post picture"
                />
              ) : null}
              <TouchableOpacity
                style={styles.cameraBtn}
                activeOpacity={0.8}
                onPress={() => Alert.alert("add photo from camera")}
              >
                <Icon name="camera" size={25} color={pallete.gray} />
              </TouchableOpacity>
            </View>

            {loadedPhoto ? (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setLoadedPhoto(false)}
              >
                <Text style={styles.editBtn}>Edit photo</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setLoadedPhoto(true)}
              >
                <Text style={styles.editBtn}>Add photo</Text>
              </TouchableOpacity>
            )}
            <TextInput
              style={inputNameStyle}
              require
              value={name}
              onChangeText={nameHandler}
              placeholder="Description *"
              onFocus={() =>
                setInputNameStyle({
                  ...styles.input,
                  ...styles.inputFocused,
                })
              }
              onBlur={() => setInputNameStyle(styles.input)}
            />
            <View style={styles.inputLocation}>
              <Icon
                style={styles.iconLocation}
                name="map-marker"
                size={20}
                color={pallete.gray}
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
            </View>

            <View style={{ display: isKeyboardOpen ? "none" : "flex" }}>
              <TouchableOpacity
                style={
                  !isPostData
                    ? styles.btnPublishDisabled
                    : {
                        ...styles.btnPublishDisabled,
                        backgroundColor: pallete.accent,
                      }
                }
                disabled={!isPostData}
                activeOpacity={0.8}
                onPress={onPublish}
              >
                <Text style={styles.btnTitle}>Publish</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
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
    color: pallete.gray,
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "400",
  },
  imgWrapper: {
    position: "relative",
    marginTop: 32,
    marginBottom: 4,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: pallete.gray,
  },
  cameraBtn: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 55,
    height: 55,
    borderRadius: 40,
    backgroundColor: "#ffffff85",
    justifyContent: "center",
    alignItems: "center",
    transform: [{ translateX: -27 }, { translateY: -27 }],
  },
  input: {
    marginTop: 16,
    paddingLeft: 26,
    width: "100%",
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: pallete.gray,
  },
  inputFocused: {
    borderBottomColor: pallete.accent,
  },
  inputLocation: {
    position: "relative",
  },
  iconLocation: {
    position: "absolute",
    top: "50%",
    left: 0,
  },
  btnPublishDisabled: {
    marginTop: 32,
    padding: 12,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: pallete.gray,
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
