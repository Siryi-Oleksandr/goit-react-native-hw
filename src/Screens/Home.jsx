import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Button,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RegistrationScreen } from "./auth/RegistrationScreen";
import { LoginScreen } from "./auth/LoginScreen";
import { ProfileScreen } from "./ProfileScreen";
import { CommentsScreen } from "./CommentsScreen";

const Tabs = createBottomTabNavigator();

export const Home = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Profile" component={ProfileScreen} />
      <Tabs.Screen name="Comment" component={CommentsScreen} />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
