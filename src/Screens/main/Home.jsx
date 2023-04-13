import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/FontAwesome";
import { CommentsScreen } from "./CommentsScreen";
import { MapScreen } from "./MapScreen";
import { ProfileScreen } from "./ProfileScreen";
import { PostsScreen } from "./PostsScreen";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { pallete } from "../../helpers/variables";
import { CreatePostsScreen } from "./CreatePostsScreen";
import { getHeaderTitle } from "@react-navigation/elements";
import { LogOut } from "../../components/LogOut";
import { CustomGoBack } from "../../components/CustomGoBack";

// const Tab = createMaterialBottomTabNavigator();
const Tabs = createBottomTabNavigator();
const TAB_HEIGHT = 50; // висота панелі Bottom Tabs

export const Home = ({ navigation: { goBack } }) => {
  return (
    <Tabs.Navigator
      initialRouteName="Posts"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        // tabBarActiveBackgroundColor: pallete.accent,
        tabBarActiveTintColor: pallete.accent,
        tabBarStyle: styles.tabBar,
        // tabBarItemStyle: styles.tabBarItem,
      }}
    >
      <Tabs.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerRight: () => <LogOut styles={{ marginRight: 20 }} />,
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="view-grid-outline"
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Create"
        component={CreatePostsScreen}
        options={{
          headerTitleAlign: "center",
          headerTitle: "Create publication",
          headerLeft: () => <CustomGoBack goBack={goBack} />,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="plus"
              color={pallete.white}
              size={24}
            />
          ),
          tabBarStyle: { position: "absolute", bottom: -TAB_HEIGHT },
          tabBarItemStyle: styles.tabBarItem,
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-outline"
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: TAB_HEIGHT,
    backgroundColor: pallete.white,
    // paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: pallete.gray,
  },
  tabBarItem: {
    borderRadius: 30,
    backgroundColor: pallete.accent,
  },
});
