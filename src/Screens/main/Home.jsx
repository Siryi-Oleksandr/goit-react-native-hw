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

export const Home = ({ navigation: { goBack } }) => {
  return (
    <Tabs.Navigator
      initialRouteName="Posts"
      barStyle={styles.tabBar}
      screenOptions={{
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveBackgroundColor: pallete.accent,
        tabBarActiveTintColor: pallete.white,
      }}
    >
      <Tabs.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerRight: () => <LogOut />,
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
            <MaterialCommunityIcons name="plus" color={color} size={24} />
          ),
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
    // <HomeStack.Navigator initialRouteName="Posts">
    //   <HomeStack.Screen
    //     name="Posts"
    //     component={PostsScreen}
    //     options={{
    //       headerRight: () => LogOut(),
    //       headerTitleAlign: "center",
    //     }}
    //   />
    //   <HomeStack.Screen
    //     name="Comments"
    //     component={CommentsScreen}
    //     options={{ headerTitleAlign: "center" }}
    //   />
    //   <HomeStack.Screen
    //     name="Map"
    //     component={MapScreen}
    //     options={{ headerTitleAlign: "center" }}
    //   />
    //   {/* <HomeStack.Screen
    //     name="Create"
    //     component={CreatePostsScreen}
    //     options={{
    //       headerTitleAlign: "center",
    //       headerTitle: "Create publication",
    //     }}
    //   /> */}
    // </HomeStack.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: pallete.white,
    // paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: pallete.gray,
  },
});
