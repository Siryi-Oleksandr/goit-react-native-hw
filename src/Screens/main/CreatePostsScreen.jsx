import React, { useEffect, useState } from "react";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import Icon from "react-native-vector-icons/FontAwesome";
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
import { pallete } from "../../helpers/variables";

export function CreatePostsScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [photo, setPhoto] = useState("");
  const [loadedPhoto, setLoadedPhoto] = useState(null);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [inputNameStyle, setInputNameStyle] = useState(styles.input);
  const [inputLocationStyle, setInputLocationStyle] = useState(styles.input);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Camera.requestCameraPermissionsAsync();
  //     // await MediaLibrary.requestPermissionsAsync();

  //     setHasPermission(status === "granted");
  //   })();
  // }, []);

  // if (hasPermission === null) {
  //   return <Text>No access to camera</Text>;
  // }
  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }

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
    setPhoto("");
  };

  const onPublish = () => {
    const userPost = { name, location, photo };
    // Alert.alert("User post", `${name} + ${location}`);
    // navigation.navigate("Posts", { userPost });
    navigation.navigate({
      name: "Posts",
      params: { userPost },
      merge: true,
    });
    resetPublishForm();
  };

  const isPostData = photo && name;

  const takePhoto = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      console.log("my uri", uri);
      setPhoto(uri);
      // await MediaLibrary.createAssetAsync(uri);
    }
  };

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <ScrollView>
            <Camera
              style={styles.camera}
              type={type}
              ref={(ref) => {
                setCameraRef(ref);
              }}
            >
              {photo && (
                <View style={styles.photoWrapper}>
                  <Image
                    style={styles.photo}
                    source={{ uri: photo }}
                    alt="user last photo"
                  />
                </View>
              )}

              <TouchableOpacity
                style={styles.cameraBtn}
                activeOpacity={0.8}
                onPress={takePhoto}
              >
                <Icon name="camera" size={25} color={pallete.gray} />
              </TouchableOpacity>

              <View style={styles.btnChangeCameraContainer}>
                <TouchableOpacity
                  style={styles.btnChangeCamera}
                  onPress={toggleCameraType}
                >
                  <Text style={styles.text}>Change Camera</Text>
                </TouchableOpacity>
              </View>
            </Camera>

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
                onPress={() => setLoadedPhoto(true)}
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

            {/* <View style={{ display: isKeyboardOpen ? "none" : "flex" }}> */}
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
            {/* </View> */}
          </ScrollView>
        </KeyboardAvoidingView>

        <TouchableOpacity
          style={styles.deleteBtn}
          activeOpacity={0.8}
          onPress={() => {
            setLoadedPhoto(false);
            Alert.alert("delete post");
          }}
        >
          <Icon name="trash" size={30} color={pallete.gray} />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 32,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },
  camera: {
    position: "relative",
    height: 250,
  },
  photoWrapper: {
    position: "absolute",
    top: 10,
    left: 10,
    width: 150,
    height: 150,
    borderWidth: 1,
    borderColor: pallete.accent,
  },
  photo: { width: "100%", height: "100%" },
  btnChangeCameraContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  btnChangeCamera: {},
  text: { color: pallete.accent },
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
  deleteBtn: {
    // marginBottom: 22,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 40,
    borderRadius: 25,
    // backgroundColor: "#cccccc3f",
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
