import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Keyboard,
  Alert,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  ImageBackground,
  KeyboardAvoidingView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { pallete } from "../../helpers/variables";

const image = require("../../images/bg-img.png");

// ! Main CODE

export function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [inputEmailStyle, setInputEmailStyle] = useState(styles.input);
  const [inputPasswordStyle, setInputPasswordStyle] = useState(styles.input);
  const [securePassword, setSecurePassword] = useState(true);

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

  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);

  const resetLoginForm = () => {
    setEmail("");
    setPassword("");
  };

  const onLogin = () => {
    const userCredentials = { email, password };
    Alert.alert("Credentials", `${email} + ${password}`);
    resetLoginForm();
  };

  const toggleShowPassword = () => {
    setSecurePassword((prevState) => !prevState);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View>
              <View
                style={{
                  ...styles.form,
                  paddingBottom: isKeyboardOpen ? 12 : 45, // TODO 32 instead 12
                }}
              >
                <Text style={styles.title}>Log In</Text>

                <TextInput
                  style={inputEmailStyle}
                  value={email}
                  onChangeText={emailHandler}
                  placeholder="Email"
                  onFocus={() =>
                    setInputEmailStyle({
                      ...styles.input,
                      ...styles.inputFocused,
                    })
                  }
                  onBlur={() => setInputEmailStyle(styles.input)}
                />

                <View style={styles.passwordWrapper}>
                  <TextInput
                    style={inputPasswordStyle}
                    value={password}
                    onChangeText={passwordHandler}
                    onFocus={() =>
                      setInputPasswordStyle({
                        ...styles.input,
                        ...styles.inputFocused,
                      })
                    }
                    onBlur={() => setInputPasswordStyle(styles.input)}
                    placeholder="Password"
                    secureTextEntry={securePassword}
                  />
                  {securePassword ? (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.btnShowPassword}
                      onPress={toggleShowPassword}
                    >
                      <Icon name="eye" size={20} />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.btnShowPassword}
                      onPress={toggleShowPassword}
                    >
                      <Icon name="eye-slash" size={20} />
                    </TouchableOpacity>
                  )}
                </View>

                <View style={{ display: isKeyboardOpen ? "none" : "flex" }}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.btnRegister}
                    onPress={onLogin}
                  >
                    <Text style={styles.btnTitle}>Log In</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.6}
                    style={styles.linkNavigate}
                    onPress={() => navigation.navigate("Register")}
                  >
                    <Text style={styles.linkTitle}>
                      Don't have accout? Register
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
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
  form: {
    position: "relative",
    paddingLeft: 40,
    paddingRight: 40,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 32,
    justifyContent: "flex-end",
    backgroundColor: pallete.white,
  },
  title: {
    marginBottom: 33,
    fontFamily: "Roboto-Medium",
    fontWeight: "500",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    color: pallete.black,
  },
  input: {
    height: 50,
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: pallete.gray,
    marginBottom: 10,
    backgroundColor: "#F6F6F6",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  inputFocused: {
    borderColor: pallete.accent,
  },
  btnRegister: {
    marginTop: 43,
    padding: 12,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: pallete.accent,
    borderRadius: 100,
  },
  btnTitle: {
    fontFamily: "Roboto-Regular",
    color: pallete.white,
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
  },

  bgImg: {
    width: "100%",
    resizeMode: "cover",
  },
  linkNavigate: {
    padding: 10,
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  linkTitle: {
    fontFamily: "Roboto-Regular",
    color: pallete.link,
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
  },
  passwordWrapper: { position: "relative" },
  btnShowPassword: {
    position: "absolute",
    top: 14,
    right: 15,
  },
});
