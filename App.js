import React, { useCallback, useEffect, useState } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { RegistrationScreen, LoginScreen } from "./src/Screens";

// ! Main logic

const image = require("./src/images/bg-img.png");
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./src/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./src/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./src/fonts/Roboto-Bold.ttf"),
    Lora: require("./src/fonts/Lora-VariableFont.ttf"),
  });
  const [orientation, setOrientation] = useState("portrait");

  const getOrientation = useCallback(() => {
    const { width, height } = Dimensions.get("window");
    if (width > height) {
      setOrientation("landscape");
    } else {
      setOrientation("portrait");
    }
  }, []);

  useEffect(() => {
    getOrientation();
    const subscription = Dimensions.addEventListener("change", getOrientation);

    return () => subscription?.remove();
  }, [getOrientation]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <TouchableWithoutFeedback
        onLayout={onLayoutRootView}
        onPress={Keyboard.dismiss}
      >
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <Image source={image} style={styles.bgImg} />

          {/* <RegistrationScreen orientation={orientation} /> */}
          <LoginScreen />
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
