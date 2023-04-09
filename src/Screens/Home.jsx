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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { ProfileScreen } from "./ProfileScreen";
import { CommentsScreen } from "./CommentsScreen";
import { CreatePostsScreen } from "./CreatePostsScreen";
import { pallete } from "../helpers/variables";

const Tab = createMaterialBottomTabNavigator();
// const Tabs = createBottomTabNavigator();

export const Home = () => {
  return (
    <Tab.Navigator
      initialRouteName="Comment"
      barStyle={{ backgroundColor: "tomato", paddingBottom: 16 }}
      activeColor={pallete.white}
      labeled={false}
    >
      <Tab.Screen
        name="Comment"
        component={CommentsScreen}
        labeled={false}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="view-grid-outline"
              color={color}
              size={36}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="plus" color={color} size={36} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-outline"
              color={color}
              size={36}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
