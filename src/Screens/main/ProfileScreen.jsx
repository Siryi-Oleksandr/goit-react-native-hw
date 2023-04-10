import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Keyboard,
  Alert,
  TouchableOpacity,
  Text,
  Image,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ImageBackground,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { pallete } from "../../helpers/variables";

const image = require("../../images/bg-img.png");

// ! Main CODE

export function ProfileScreen({ navigation }) {
  const [showAvatar, setShowAvatar] = useState(true);

  const orientation = "portrait"; // TODO

  const toggleShowAvatar = () => {
    setShowAvatar((prevState) => !prevState);
  };

  const toggleShowPassword = () => {
    setSecurePassword((prevState) => !prevState);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <View style={styles.form}>
            <View style={styles.imgWrapper}>
              {!showAvatar ? (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    ...styles.btnAddAvatar,
                    borderColor: pallete.accent,
                  }}
                  onPress={toggleShowAvatar}
                >
                  <Icon name="plus" size={15} color={pallete.accent} />
                </TouchableOpacity>
              ) : (
                <>
                  <Image
                    style={styles.avatar}
                    source={require("../../images/avatar.jpg")}
                    alt="user avatar"
                  />
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                      ...styles.btnAddAvatar,
                      borderColor: pallete.grey,
                    }}
                    onPress={toggleShowAvatar}
                  >
                    <Icon name="times" size={15} color={pallete.grey} />
                  </TouchableOpacity>
                </>
              )}
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.logOutBtn}
              onPress={() => alert("Log out from your acount NEW")}
            >
              <Icon name="sign-out" size={24} color={pallete.grey} />
            </TouchableOpacity>

            <Text
              style={{
                ...styles.title,
                marginBottom: orientation === "portrait" ? 33 : 10,
              }}
            >
              Natali Romanova
            </Text>

            <View style={styles.postWrapper}>
              <Image
                style={styles.img}
                source={require("../../images/nature-1.jpg")}
                alt="user post picture"
              />
              <Text style={styles.postTitle}>Forest</Text>
              <View style={styles.postInfo}>
                <View style={styles.postValuesWrapper}>
                  <View style={styles.postValues}>
                    <Icon name="comment" size={18} color={pallete.accent} />
                    <Text style={styles.postValuesText}>8</Text>
                  </View>

                  <View style={{ ...styles.postValues, marginLeft: 24 }}>
                    <Icon name="thumbs-o-up" size={18} color={pallete.accent} />
                    <Text style={styles.postValuesText}>200</Text>
                  </View>
                </View>

                <View style={styles.postValues}>
                  <Icon name="map-marker" size={20} color={pallete.grey} />
                  <Text
                    style={{
                      ...styles.postValuesText,
                      textDecorationLine: "underline",
                    }}
                  >
                    Ukraine
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.postWrapper}>
              <Image
                style={styles.img}
                source={require("../../images/nature-2.jpg")}
                alt="user post picture"
              />
              <Text style={styles.postTitle}>Forest</Text>
              <View style={styles.postInfo}>
                <View style={styles.postValuesWrapper}>
                  <View style={styles.postValues}>
                    <Icon name="comment" size={18} color={pallete.accent} />
                    <Text style={styles.postValuesText}>16</Text>
                  </View>

                  <View style={{ ...styles.postValues, marginLeft: 24 }}>
                    <Icon name="thumbs-o-up" size={18} color={pallete.accent} />
                    <Text style={styles.postValuesText}>53</Text>
                  </View>
                </View>

                <View style={styles.postValues}>
                  <Icon name="map-marker" size={20} color={pallete.grey} />
                  <Text
                    style={{
                      ...styles.postValuesText,
                      textDecorationLine: "underline",
                    }}
                  >
                    Ukraine
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
    overflow: "hidden",
  },
  form: {
    position: "relative",
    marginTop: 100,
    paddingLeft: 40,
    paddingRight: 40,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 92,

    justifyContent: "flex-end",
    backgroundColor: pallete.white,
    // backgroundColor: "#b25757",
  },
  logOutBtn: {
    position: "absolute",
    top: 25,
    right: 25,
  },
  title: {
    // marginBottom: 33,
    fontFamily: "Roboto-Medium",
    fontWeight: "500",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    color: pallete.black,
  },
  postWrapper: {
    marginBottom: 32,
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

  imgWrapper: {
    position: "absolute",
    top: 0,
    left: "50%",
    width: 120,
    height: 120,
    backgroundColor: "#fafafa",
    transform: [{ translateX: -30 }, { translateY: -60 }],
    borderRadius: 16,
  },
  btnAddAvatar: {
    position: "absolute",
    top: "70%",
    right: -12,
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center",

    width: 25,
    height: 25,
    borderRadius: 12,
    borderWidth: 1,

    backgroundColor: pallete.white,
  },
  bgImg: {
    width: "100%",
    resizeMode: "cover",
  },
});
