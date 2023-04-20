import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dimensions,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useRoutes } from "../../router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { auth } from "../../src/firebase/config";
import { authSlice } from "../../src/redux/auth/authSlice";
import { authStateChangeUser } from "../redux/auth/authOperations";

SplashScreen.preventAutoHideAsync();

export function Main() {
  const selectIsAuth = useSelector((state) => state.auth.isAuth);
  const router = useRoutes(selectIsAuth);
  const [orientation, setOrientation] = useState("portrait");
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../../src/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../../src/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("../../src/fonts/Roboto-Bold.ttf"),
    Lora: require("../../src/fonts/Lora-VariableFont.ttf"),
  });
  const dispatch = useDispatch();

  // *** listen change User
  useEffect(() => {
    dispatch(authStateChangeUser());
  }, [authStateChangeUser]);

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
    return <Text>Haven't loaded fonts</Text>;
  }

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
