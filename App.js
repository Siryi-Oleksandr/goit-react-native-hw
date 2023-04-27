import React, { useCallback } from "react";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { Main } from "./src/components/Main";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

SplashScreen.preventAutoHideAsync();

// ! Main logic

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./src/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./src/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./src/fonts/Roboto-Bold.ttf"),
    Lora: require("./src/fonts/Lora-VariableFont.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <Text>Haven't loaded fonts</Text>;
  }

  return (
    <TouchableWithoutFeedback
      onLayout={onLayoutRootView}
      onPress={Keyboard.dismiss}
    >
      <View style={styles.container}>
        <Provider store={store}>
          <Main />
        </Provider>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
