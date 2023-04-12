import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/FontAwesome";
import { CommentsScreen } from "./CommentsScreen";
import { MapScreen } from "./MapScreen";
import { ProfileScreen } from "./ProfileScreen";
import { PostsScreen } from "./PostsScreen";
import { TouchableOpacity, StyleSheet } from "react-native";
import { pallete } from "../../helpers/variables";
import { CreatePostsScreen } from "./CreatePostsScreen";

const HomeStack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export const Home = () => {
  return (
    <Tab.Navigator
      initialRouteName="Posts"
      barStyle={styles.tabBar}
      activeColor={pallete.accent}
      labeled={false}
      shifting={true}
    >
      <Tab.Screen
        name="Posts"
        component={PostsScreen}
        labeled={false}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="view-grid-outline"
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="plus" color={color} size={24} />
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
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
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

function LogOut() {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{
        marginRight: 16,
      }}
      onPress={() => alert("Log out from your acount NEW")}
    >
      <Icon name="sign-out" size={24} color={pallete.gray} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: pallete.white,
    // paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: pallete.gray,
  },
});
