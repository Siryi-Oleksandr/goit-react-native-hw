import React, { useState, useEffect, useCallback } from "react";
import * as Font from "expo-font";
import { useFonts } from "expo-font";
import {
  StyleSheet,
  View,
  TextInput,
  Keyboard,
  Alert,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
// import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();

export function RegistrationScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [inputLoginStyle, setInputLoginStyle] = useState(styles.input);
  const [inputEmailStyle, setInputEmailStyle] = useState(styles.input);
  const [inputPasswordStyle, setInputPasswordStyle] = useState(styles.input);
  // const [fontsLoaded] = useFonts({
  //   "Roboto-Regular": require("../fonts/Roboto-Regular.ttf"),
  //   "Roboto-Medium": require("../fonts/Roboto-Medium.ttf"),
  //   "Roboto-Bold": require("../fonts/Roboto-Bold.ttf"),
  //   Lora: require("../fonts/Lora-VariableFont.ttf"),
  // });

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
  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);

  const resetRegisterForm = () => {
    setEmail("");
    setName("");
    setPassword("");
  };

  const onRegister = () => {
    const userCredentials = { name, email, password };
    Alert.alert("Credentials", `${name}, ${email}, ${password}`);
    resetRegisterForm();
  };

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  // if (!fontsLoaded) {
  //   return null;
  // }

  return (
    <View>
      <View
        style={{
          ...styles.form,
          paddingBottom: isKeyboardOpen ? 12 : 45, // TODO 32 instead 12
        }}
      >
        <View style={styles.imgWrapper}>
          <Image
            style={styles.avatar}
            source={require("../images/avatar.jpg")}
          />
        </View>
        <Text style={styles.title}>Registration</Text>
        <TextInput
          style={inputLoginStyle}
          value={name}
          placeholder="Login"
          onChangeText={nameHandler}
          onFocus={() =>
            setInputLoginStyle({ ...styles.input, ...styles.inputFocused })
          }
          onBlur={() => setInputLoginStyle(styles.input)}
        />
        <TextInput
          style={inputEmailStyle}
          value={email}
          onChangeText={emailHandler}
          placeholder="Email"
          onFocus={() =>
            setInputEmailStyle({ ...styles.input, ...styles.inputFocused })
          }
          onBlur={() => setInputEmailStyle(styles.input)}
        />
        <TextInput
          style={inputPasswordStyle}
          value={password}
          onChangeText={passwordHandler}
          onFocus={() =>
            setInputPasswordStyle({ ...styles.input, ...styles.inputFocused })
          }
          onBlur={() => setInputPasswordStyle(styles.input)}
          placeholder="Password"
          secureTextEntry={true}
        />
        <View style={{ display: isKeyboardOpen ? "none" : "flex" }}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.btnRegister}
            onPress={onRegister}
          >
            <Text style={styles.btnTitle}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    position: "relative",
    paddingLeft: 40,
    paddingRight: 40,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 92,

    justifyContent: "flex-end",
    backgroundColor: "#fff",
  },
  title: {
    marginBottom: 33,
    fontFamily: "Roboto-Medium",
    fontWeight: "500",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    color: "#000",
  },
  input: {
    height: 50,
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "rgba(232, 232, 232, 1)",
    marginBottom: 10,
    backgroundColor: "#F6F6F6",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  inputFocused: {
    borderColor: "rgba(255, 108, 0, 1)",
  },
  btnRegister: {
    marginTop: 43,
    padding: 12,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 108, 0, 1)",
    borderRadius: 100,
  },
  btnTitle: {
    fontFamily: "Roboto-Regular",
    color: "#fff",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
  },
  imgWrapper: {
    position: "absolute",
    top: 0,
    left: "50%",
    width: 120,
    height: 120,
    transform: [{ translateX: -30 }, { translateY: -60 }],
    borderRadius: 16,
    overflow: "hidden",
  },
  bgImg: {
    width: "100%",
    resizeMode: "cover",
  },
});
