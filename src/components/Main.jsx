import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dimensions,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useRoutes } from "../../router";
import { onAuthStateChanged } from "firebase/auth";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { auth } from "../../src/firebase/config";
import { authSlice } from "../../src/redux/auth/authSlice";

SplashScreen.preventAutoHideAsync();

export function Main() {
  const [user, setUser] = useState(null);
  const router = useRoutes(user);
  const state = useSelector((state) => state);
  const [orientation, setOrientation] = useState("portrait");
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../../src/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../../src/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("../../src/fonts/Roboto-Bold.ttf"),
    Lora: require("../../src/fonts/Lora-VariableFont.ttf"),
  });

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

  //!  Observe User state
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      setUser(user);
      console.log("user change in", user);
    } else {
      // User is signed out
      console.log("user change out", user);
    }
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  console.log("my state ==>", state);

  return (
    <>
      <TouchableWithoutFeedback
        onLayout={onLayoutRootView}
        onPress={Keyboard.dismiss}
      >
        <View style={styles.container}>
          <NavigationContainer>{router}</NavigationContainer>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
