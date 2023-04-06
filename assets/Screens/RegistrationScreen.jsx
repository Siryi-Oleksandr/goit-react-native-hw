import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
  Text,
} from "react-native";

export function RegistrationScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

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

  const onLogin = () => {
    Alert.alert("Credentials", `${name} + ${password} + Hello`);
  };

  return (
    <View>
      <View
        style={{
          ...styles.form,
          paddingBottom: isKeyboardOpen ? 32 : 45,
        }}
      >
        <Text style={styles.title}>Registration</Text>
        <TextInput
          value={name}
          onChangeText={nameHandler}
          placeholder="Login"
          style={styles.input}
        />
        <TextInput
          value={email}
          onChangeText={emailHandler}
          placeholder="Email"
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={passwordHandler}
          placeholder="Password"
          secureTextEntry={true}
          style={styles.input}
        />
        <View style={{ display: isKeyboardOpen ? "none" : "flex" }}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.btnRegister}
            onPress={onLogin}
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
    // width: 250,
    paddingLeft: 40,
    paddingRight: 40,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 92,
    // paddingBottom: 45,

    justifyContent: "flex-end",
    backgroundColor: "#fff",
  },
  title: {
    marginBottom: 33,
    // fontWeight: 500,
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
    color: "#fff",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
  },
});
