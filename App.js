import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Button,
  ImageBackground,
  Image,
} from "react-native";
import { RegistrationScreen } from "./assets/Screens";

const image = require("./assets/images/bg-img.png");

export default function App() {
  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <Image source={image} style={styles.bgImg} />

          <RegistrationScreen />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    justifyContent: "flex-end",
  },
  bgImg: {
    position: "absolute",
    width: "100%",
    top: 0,
    resizeMode: "cover",
  },
});
