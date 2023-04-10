import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/FontAwesome";
import { CommentsScreen } from "./CommentsScreen";
import { MapScreen } from "./MapScreen";
import { PostsScreen } from "./PostsScreen";
import { TouchableOpacity } from "react-native";
import { pallete } from "../../helpers/variables";

const HomeStack = createNativeStackNavigator();

export const Home = () => {
  return (
    <HomeStack.Navigator initialRouteName="Posts">
      <HomeStack.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerRight: () => LogOut(),
        }}
      />
      <HomeStack.Screen name="Comments" component={CommentsScreen} />
      <HomeStack.Screen name="Map" component={MapScreen} />
    </HomeStack.Navigator>
  );
};

function LogOut() {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        marginRight: 16,
      }}
      onPress={() => alert("Log out from your acount NEW")}
    >
      <Icon name="sign-out" size={24} color={pallete.grey} />
    </TouchableOpacity>
  );
}
