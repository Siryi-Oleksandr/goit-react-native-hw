import React, { useCallback, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
  View,
} from "react-native";
import { RegistrationScreen, LoginScreen } from "./src/Screens/auth";
import { Home } from "./src/Screens/Home";

// ! Main logic

SplashScreen.preventAutoHideAsync();
const AuthStack = createNativeStackNavigator();

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

  const useRoute = (isAuth) => {};

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <TouchableWithoutFeedback
        onLayout={onLayoutRootView}
        onPress={Keyboard.dismiss}
      >
        <View style={styles.container}>
          <NavigationContainer>
            <AuthStack.Navigator initialRouteName="Home">
              <AuthStack.Screen name="Home" component={Home} />
              <AuthStack.Screen
                name="Register"
                component={RegistrationScreen}
                options={{ headerShown: false }}
                initialParams={{ orientation }}
              />
              <AuthStack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
            </AuthStack.Navigator>
          </NavigationContainer>
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
