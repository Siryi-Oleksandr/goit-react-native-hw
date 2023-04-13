import React, { useLayoutEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { pallete } from "../../helpers/variables";
import { PostItem } from "../../components/PostItem";
import { testDB } from "../../helpers/testDB";
import { LogOut } from "../../components/LogOut";

const image = require("../../images/bg-img.png");

// ! Main CODE

export function ProfileScreen({ navigation }) {
  const [showAvatar, setShowAvatar] = useState(true);
  const [contentHeight, setContentHeight] = useState(0);

  const handleContentSizeChange = (contentWidth, height) => {
    setContentHeight(height);
  };

  useLayoutEffect(() => {
    // console.log(`Content height: ${contentHeight}`);
    // Додатковий код, який ви хочете виконати після зміни висоти контенту
  }, [contentHeight]);

  const orientation = "portrait"; // TODO

  const toggleShowAvatar = () => {
    setShowAvatar((prevState) => !prevState);
  };

  return (
    <View style={styles.container}>
      <ScrollView onContentSizeChange={handleContentSizeChange}>
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
                      borderColor: pallete.gray,
                    }}
                    onPress={toggleShowAvatar}
                  >
                    <Icon name="times" size={15} color={pallete.gray} />
                  </TouchableOpacity>
                </>
              )}
            </View>

            <LogOut styles={styles.logOutBtn} />

            <Text
              style={{
                ...styles.title,
                marginBottom: orientation === "portrait" ? 33 : 10,
              }}
            >
              Natali Romanova
            </Text>

            {testDB.map((data, index) => (
              <PostItem key={index} postData={data} />
            ))}
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
    paddingLeft: 16,
    paddingRight: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 92,

    justifyContent: "flex-end",
    backgroundColor: pallete.white,
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
